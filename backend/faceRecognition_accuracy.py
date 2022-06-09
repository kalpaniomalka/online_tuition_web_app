from sklearn.model_selection import train_test_split
from sklearn import metrics
from sklearn.metrics import accuracy_score
import pickle
import os
from cv2 import cv2
import face_recognition as fr
import numpy as np

# declaring paths
current_path =  os.path.abspath(os.path.join(os.path.dirname(__file__)))
encodingsFile: str = r"E:\\newProjects\\onlinetution\\com1_old\\encoding.pickle"
testing_data = current_path+"\\dataset_testing"

# load the known faces and embeddings
print("[INFO] loading encodings...")
data = pickle.loads(open(encodingsFile, "rb").read())

known_face_encoding = data["encodings"]
known_face_names = data["names"]

images_list = os.listdir(testing_data)

images = []
result_list = []
className = []

for img in images_list:
    curImg = cv2.imread(f'{testing_data}\\{img}')
    images.append(curImg)
    className.append((os.path.splitext(img)[0]).split('_')[0])

# validate images
print("[INFO] Validating")
for img in images:
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    face_location = fr.face_locations(img)
    face_encode = fr.face_encodings(img, face_location)

    if face_encode:
        for encoding in face_encode:
            matches = fr.compare_faces(known_face_encoding,encoding)
            name = "Unknown"
            face_distances = fr.face_distance(known_face_encoding, encoding)
            best_match_index = np.argmin(face_distances)

            if True in matches:
                name = known_face_names[best_match_index]
            result_list.append(name)
    else:
        result_list.append("NA")

count = 0
index = 0

for result in result_list:
    print(result,className[index])
    if(result == className[index]):
        count += 1
    index += 1

accuracy = (count / len(result_list)) * 100
print("Face Recognition Accuracy: "+str(accuracy))