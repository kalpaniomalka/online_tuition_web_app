import numpy as np
import face_recognition as fr
from cv2 import cv2
import pickle
from datetime import datetime
import time
import dlib
from pygame import mixer
from parameters import *
from imutils import face_utils as face
from scipy.spatial import distance
from flask import Flask
from flask import request
from flask_cors import CORS
import ffmpeg    
import db
import json, os, signal
import question as qu
import ast
from operator import attrgetter
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer

app  = Flask("__main__")
CORS(app)

encodingsFile: str = r"E:\\newProjects\\onlinetution\\component1\\encoding.pickle"

current_path = os.path.abspath(os.path.join(os.path.dirname(__file__)))
video_path = current_path+"\\resources\\testt.mp4"

########## compenent 3 #################
model = current_path+'\\finalized_model.pickle'
vec_count = current_path+'\\vec_count.pkl'
tfidf = current_path+'\\tfidf.pkl'
input_path = current_path+'\input.txt'

def check_rotation():
     # this returns meta-data of the video file in form of a dictionary
     meta_dict = ffmpeg.probe(video_path)

     # from the dictionary, meta_dict['streams'][0]['tags']['rotate'] is the key
     # we are looking for
     rotateCode = None
     if int(meta_dict['streams'][0]['tags']['rotate']) == 90:
         rotateCode = cv2.ROTATE_90_CLOCKWISE
     elif int(meta_dict['streams'][0]['tags']['rotate']) == 180:
         rotateCode = cv2.ROTATE_180
     elif int(meta_dict['streams'][0]['tags']['rotate']) == 270:
         rotateCode = cv2.ROTATE_90_COUNTERCLOCKWISE

     return rotateCode

def correct_rotation(frame, rotateCode):  
     return cv2.rotate(frame, rotateCode) 

def MarkAttendence(name,id):
    now = datetime.now()
    dt = now.strftime('%H:%M:%S')
    con = db.connection()
    cursor = con.cursor()
    sql = "INSERT INTO attendence (name, time, sub) VALUES (%s, %s, %s)" 
    val = [name,str(dt),id]
    cursor.execute(sql,val)

def get_max_area_rect(rects):
    if len(rects)==0: return
    areas=[]
    for rect in rects:
        areas.append(rect.area())
    return rects[areas.index(max(areas))]

def get_eye_aspect_ratio(eye):
    vertical_1 = distance.euclidean(eye[1], eye[5])
    vertical_2 = distance.euclidean(eye[2], eye[4])
    horizontal = distance.euclidean(eye[0], eye[3])
    return (vertical_1+vertical_2)/(horizontal*2) #aspect ratio of eye

def get_mouth_aspect_ratio(mouth):
    horizontal=distance.euclidean(mouth[0],mouth[4])
    vertical=0
    for coord in range(1,4):
        vertical+=distance.euclidean(mouth[coord],mouth[8-coord])
    return vertical/(horizontal*3) #mouth aspect ratio


@app.route('/detectFaces', methods=['GET']) 
def main():
    id = request.args.get('id')
    time.sleep(10)
    video_capture = cv2.VideoCapture(0)
    # check if video requires rotation
    #rotateCode = cv2.ROTATE_90_CLOCKWISE
    # load the known faces and embeddings
    print("[INFO] loading encodings...")
    data = pickle.loads(open(encodingsFile, "rb").read())

    known_face_encoding = data["encodings"]
    known_face_names = data["names"]

    mixer.init()
    distracton_initlized = False
    eye_initialized      = False
    mouth_initialized    = False

    detector    = dlib.get_frontal_face_detector()
    predictor   = dlib.shape_predictor(shape_predictor_path)

    ls,le = face.FACIAL_LANDMARKS_IDXS["left_eye"]
    rs,re = face.FACIAL_LANDMARKS_IDXS["right_eye"]

    fps_couter = 0
    fps_to_display = 'initializing..'
    fps_timer = time.time()

    while True:

        if id == "stop":
            break

        ret, frame = video_capture.read()

        fps_couter+=1
        frame_new = cv2.flip(frame,1)
        if time.time()-fps_timer>=1.0:
            fps_to_display=fps_couter
            fps_timer=time.time()
            fps_couter=0

        # change the colors of frame to RGB
        rgb_frame = frame [:, :, ::-1] 

        face_location = fr.face_locations(rgb_frame)
        face_encodings = fr.face_encodings(rgb_frame)

        for (top, right, bottom, left), face_encoding in zip(face_location, face_encodings):
            matches = fr.compare_faces(known_face_encoding, face_encoding)

            name = "Unknown"
            face_distances = fr.face_distance(known_face_encoding, face_encoding)
            best_match_index = np.argmin(face_distances)
        
            #print(known_face_encoding[best_match_index])
            if matches[best_match_index]:
                name = known_face_names[best_match_index]
                MarkAttendence(name,id)
        
            # frame over face. rectangle vertices, frame color, frame thickness
            cv2.rectangle(frame, (left, top), (right, bottom), (0,0,255), 2)
            # frame to display name
            cv2.rectangle(frame, (left, bottom -35), (right, bottom), (0, 0, 255), cv2.FILLED)
            font = cv2.FONT_HERSHEY_SIMPLEX

        gray = cv2.cvtColor(frame_new, cv2.COLOR_BGR2GRAY)

        rects = detector(gray, 0)
        rect=get_max_area_rect(rects)

        if rect!=None:

            distracton_initlized=False

            shape = predictor(gray, rect)
            shape = face.shape_to_np(shape)

            leftEye = shape[ls:le]
            rightEye = shape[rs:re]
            leftEye = get_eye_aspect_ratio(leftEye)
            rightEye = get_eye_aspect_ratio(rightEye)

            inner_lips=shape[60:68]
            mar=get_mouth_aspect_ratio(inner_lips)

            eye_aspect_ratio = (leftEye + rightEye) / 2.0

            if eye_aspect_ratio < EYE_DROWSINESS_THRESHOLD:

                if not eye_initialized:
                    eye_start_time= time.time()
                    eye_initialized=True

                if time.time()-eye_start_time >= EYE_DROWSINESS_INTERVAL:
                    alarm_type=0

                    if  not distracton_initlized and not mouth_initialized and not mixer.music.get_busy():
                        mixer.music.load(alarm_paths[alarm_type])
                        mixer.music.play()
            else:
                eye_initialized=False
                if not distracton_initlized and not mouth_initialized and mixer.music.get_busy():
                    mixer.music.stop()


            if mar > MOUTH_DROWSINESS_THRESHOLD:

                if not mouth_initialized:
                    mouth_start_time= time.time()
                    mouth_initialized=True

                if time.time()-mouth_start_time >= MOUTH_DROWSINESS_INTERVAL:
                    alarm_type=2

                    if not mixer.music.get_busy():
                        mixer.music.load(alarm_paths[alarm_type])
                        mixer.music.play()
            else:
                mouth_initialized=False
                if not distracton_initlized and not eye_initialized and mixer.music.get_busy():
                    mixer.music.stop()
        else:
            alarm_type=1
            if not distracton_initlized:
                distracton_start_time=time.time()
                distracton_initlized=True

            if time.time()- distracton_start_time> DISTRACTION_INTERVAL:

                if not eye_initialized and not mouth_initialized and not  mixer.music.get_busy():
                    mixer.music.load(alarm_paths[alarm_type])
                    mixer.music.play()


        #cv2.imshow('Webcam_facerecognition', frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    video_capture.release()
    cv2.destroyAllWindows()

@app.route('/login', methods=['GET']) 
def login():
    uname = request.args.get('uname')
    pwd = request.args.get('pwd')
        
    con = db.connection()
    cursor = con.cursor()
    selectData = "select * from users where uname='%s'"%uname #retrieve data from mysql db
    cursor.execute(selectData)   
    result = cursor.fetchall()
    print(result[0])
    user = False

    if(result[0][1] == pwd):
        user = True

    values = {
        "user" : user,
        "type" : result[0][2]
    }

    return values

@app.route('/attendence', methods=['GET']) 
def attendence():
    sub = request.args.get('id')

    con = db.connection()
    cursor = con.cursor()
    selectData = "select name from attendence where sub='%s'"%sub #retrieve data from mysql db
    cursor.execute(selectData)   
    result = cursor.fetchall()
 
    values = {
        "user" : result[0],
        "size" : len(result[0])
    }

    return values

@app.route('/stopServer')
def stopServer():
    os.kill(os.getpid(), signal.SIGINT)
    return "Server is shutting down..."


####################### compoenet 03 ########################################
#function to generate questions
@app.route('/generateQuestions', methods=['GET']) 
def generateQuestions():
    text = request.args.get('text')
    print(text)
    qList, aList, shortAList = qu.createQuestions(text)

    values = {
            "questions": qList,
            "answers": aList,
            "short": shortAList
    }
    return values

#function to insert questions
@app.route('/insertQuestions', methods=['GET']) 
def insertQuestions():
    questions = json.loads(request.args.get('question'))
    answers = json.loads(request.args.get('answers'))
    shortAnswers = json.loads(request.args.get('short'))
    selectedQuestions = json.loads(request.args.get('selected'))
    name = request.args.get('name')

    new_qs = []
    new_as = []
    new_shrt = []

    for index in selectedQuestions:
        index = int(index)
        new_qs.append(questions[index])
        new_as.append(answers[index])
        new_shrt.append(shortAnswers[index])
        
    con = db.connection()
    cursor = con.cursor()
    sql = "INSERT INTO questions (qs_name, qs_list,as_list,as_shrt_list) VALUES (%s, %s, %s, %s)" 
    val = [name,str(new_qs),str(new_as),str(new_shrt)]
    cursor.execute(sql,val)
    val = con.commit()

    return str(1)

#function to log
# @app.route('/upload/login', methods=['GET']) 
# def login():
#     uname = request.args.get('uname')
#     pwd = request.args.get('pwd')
        
#     con = db.connection()
#     cursor = con.cursor()
#     selectData = "select * from users where uname='%s'"%uname #retrieve data from mysql db
#     cursor.execute(selectData)   
#     result = cursor.fetchall()
#     print(result[0])
#     user = False

#     if(result[0][1] == pwd):
#         user = True

#     values = {
#         "user" : user,
#         "type" : result[0][2]
#     }

#     return values

#function to load questions name list
@app.route('/loadQuestions', methods=['GET']) 
def loadQuestions():      
    con = db.connection()
    cursor = con.cursor()
    selectData = "select qs_name from questions" #retrieve data from mysql db
    cursor.execute(selectData)   
    result = cursor.fetchall()
    print(result)

    values = {
        "name" : result,
    }

    return values

#function to load questions
@app.route('/getQuestions', methods=['GET']) 
def getQuestions():  
    qname = request.args.get('name')   
    
    con = db.connection()
    cursor = con.cursor()
    selectData = "select * from questions where qs_name='%s'"%qname #retrieve data from mysql db
    cursor.execute(selectData)   
    result = cursor.fetchall()

    values = {
        "questions" : ast.literal_eval(result[0][1]),
        "answers" : ast.literal_eval(result[0][2]),
        "short" : ast.literal_eval(result[0][3]),
    }
  
    return values

#function to load questions
@app.route('/insertResult', methods=['GET']) 
def insertResult():  
    uname = request.args.get('uname')  
    correct = request.args.get('correct_an')   
    wrong = request.args.get('wrong_an')    
    qname = request.args.get('qname') 
    
    con = db.connection()
    cursor = con.cursor()
    sql = "INSERT INTO result (uname,correct,wrong,qname) VALUES (%s, %s, %s,%s)" 
    val = [uname,correct,wrong,qname]
    cursor.execute(sql,val)
    val = con.commit()

    return "1"

#function to load questions
@app.route('/loadResult', methods=['GET']) 
def loadResult():  
    qname = request.args.get('qname')  
  
    con = db.connection()
    cursor = con.cursor()
    selectData = "select * from result where qname='%s'"%qname #retrieve data from mysql db
    cursor.execute(selectData)   
    result = cursor.fetchall()
    final = []
    for r in result:
        marks = (r[1]/(r[1]+r[2])) * 100
        name = (r[0].split('@'))[0].split('.')
        st_name = name[0] + " " + name[1] + " : "
        final.append((st_name,marks))
 
    final.sort(key=lambda y: y[1],reverse=True)

    values = {
        "result" : final[:5],
    }
 
    return values

#function to predict cetogory
@app.route('/cetogoryPrediction', methods=['GET']) 
def cetogoryPrediction():
    content = request.args.get('text')  
    
    new_doc = [content]

    loaded_model = pickle.load(open(model, 'rb'))
    loaded_vec = CountVectorizer(vocabulary=pickle.load(open(vec_count, "rb"))) 
    loaded_tfidf = pickle.load(open(tfidf,"rb"))

    x_new_counts = loaded_vec.transform(new_doc)
    x_new_tfidf = loaded_tfidf.transform(x_new_counts)
    predict = loaded_model.predict(x_new_tfidf)
    values = {
        "result" : predict,
    }

    return values

if __name__ == '__main__':
    attendence()