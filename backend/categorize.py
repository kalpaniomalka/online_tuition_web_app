from flask import Flask
from flask import request
from flask_cors import CORS
import os,sys
from operator import attrgetter
import pickle
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
import shutil

current_path =  os.path.abspath(os.path.join(os.path.dirname(__file__)))
model = current_path+'\\finalized_model.pickle'
vec_count = current_path+'\\vec_count.pkl'
tfidf = current_path+'\\tfidf.pkl'
input_path = current_path+'\input.txt'
doc_path = current_path+'\Docs'
notice_path = current_path+'\Docs\\notices'
grade10_path = current_path+'\Docs\\grade10'
grade11_path = current_path+'\Docs\\grade11'

path = str(sys.argv[1])
content = str(sys.argv[2])
print(content)
new_doc = [content]

loaded_model = pickle.load(open(model, 'rb'))
loaded_vec = CountVectorizer(vocabulary=pickle.load(open(vec_count, "rb"))) 
loaded_tfidf = pickle.load(open(tfidf,"rb"))

x_new_counts = loaded_vec.transform(new_doc)
x_new_tfidf = loaded_tfidf.transform(x_new_counts)
predict = loaded_model.predict(x_new_tfidf)
print(predict[0])

if(predict[0] == "Notice"):
    print("awa")
    shutil.move(doc_path+"\\"+path, notice_path+"\\"+path)
    print("awa2")
elif(predict[0] == "grade10"):
    shutil.move(doc_path+"\\"+path, grade10_path+"\\"+path)
elif(predict[0] == "grade11"):
    shutil.move(doc_path+"\\"+path, grade11_path+"\\"+path)
print("success")