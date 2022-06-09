import numpy as np
import string
import pickle
from flask import Flask
from flask import request
from flask_cors import CORS
import pickle
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
import os

app  = Flask("__main__")
CORS(app)

current_path =  os.path.abspath(os.path.join(os.path.dirname(__file__)))
model = current_path+'\\finalized_model.pickle'
vec_count = current_path+'\\vec_count.pkl'
tfidf = current_path+'\\tfidf.pkl'
input_path = current_path+'\input.txt'

#function to predict cetogory
@app.route('/api', methods=['GET']) 
def cetogoryPrediction(path):
    with open(path, 'r') as file:
        content = file.read()

    new_doc = [content]

    loaded_model = pickle.load(open(model, 'rb'))
    loaded_vec = CountVectorizer(vocabulary=pickle.load(open(vec_count, "rb"))) 
    loaded_tfidf = pickle.load(open(tfidf,"rb"))

    x_new_counts = loaded_vec.transform(new_doc)
    x_new_tfidf = loaded_tfidf.transform(x_new_counts)
    predict = loaded_model.predict(x_new_tfidf)
    print(predict)

    return predict

if __name__ == '__main__':
    cetogoryPrediction(input_path)