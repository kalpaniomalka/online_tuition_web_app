#!/usr/bin/env python
# coding: utf-8

# In[1]:


# Import libraries
import pandas as pd
import glob
import pickle
import matplotlib.pyplot as plt 
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
from sklearn import metrics
from sklearn.metrics import accuracy_score
from sklearn import svm
from sklearn.neural_network import MLPClassifier
import warnings
warnings.filterwarnings('ignore')


# In[75]:


category_list = ["IT4060", "IT4130", "SE4010", "SE1234", "Notice"]
directory_list = ["Dataset/IT4060/*.txt",  "Dataset/IT4130/*.txt", "Dataset/SE4010/*.txt", "Dataset/SE1234/*.txt", "Dataset/Notices/*.txt"]

text_files = list(map(lambda x: glob.glob(x), directory_list))
text_files = [item for sublist in text_files for item in sublist]

dataset = []
data = ""

for file in text_files:
    f = open(file, 'r', encoding='utf-8')
    f = f.read()
    file = f.split('\n')
    last_line = file[len(file)-1]
    file = file[:-1]
    data = ""
    for i in range(len(file)):
        data += file[i] 
    dataset.append({'data' :  data, 'flag' : last_line})
    
dataset[200]


# In[76]:


dataset = pd.DataFrame(dataset, columns=['data','flag'])
dataset.to_csv("dataset.csv", sep=',', encoding='utf-8')
print(dataset.shape)


# In[77]:


# Get Vector Count
vec_count = CountVectorizer()
X_train_count = vec_count.fit_transform(dataset.data)

print(vec_count.vocabulary_)

# Save word vector
pickle.dump(vec_count.vocabulary_, open("vec_count.pkl", "wb"))


# In[78]:


# Transform word vector to TF IDF
tfidf_transformer = TfidfTransformer()
X_train_tfidf = tfidf_transformer.fit_transform(X_train_count)
print(X_train_tfidf)

# Save TF IDF
pickle.dump(tfidf_transformer, open("tfidf.pkl", "wb"))


# In[79]:


x_train, x_test, y_train, y_test = train_test_split(X_train_tfidf, dataset.flag, test_size=0.2, random_state=42)


# # Validate Accuracy using different algorithms

# In[80]:


results = []
names = []


# # Naive Bayes Algorithm

# In[81]:


# Naive Bayes Algorithm
clf = MultinomialNB().fit(x_train, y_train)
y_predicted = clf.predict(x_test)

acc = (metrics.accuracy_score(y_test, y_predicted))*100
results.append(acc)
names.append('NBA')
print("Test Data Accuracy Naive Bayes Algorithm: "+str(acc))


# In[82]:


matrix = metrics.confusion_matrix(y_test,y_predicted)
print('Confusion matrix : \n', matrix)


# In[83]:


new_doc = "Advantage of density-based clustering over k means"
new_doc = [new_doc]

loaded_vec = CountVectorizer(vocabulary=pickle.load(open("vec_count.pkl", "rb"))) 
loaded_tfidf = pickle.load(open("tfidf.pkl","rb"))

x_new_counts = loaded_vec.transform(new_doc)
x_new_tfidf = loaded_tfidf.transform(x_new_counts)
predict = clf.predict(x_new_tfidf)
print(predict)


# In[84]:


result_bayes = pd.DataFrame({'true_labels': y_test, "predicted_labels": y_predicted})
print(result_bayes)


# # Support Vector Machine

# In[85]:


# SVM
clf_svm = svm.LinearSVC()
clf_svm.fit(x_train, y_train)

y_predicted_svm = clf_svm.predict(x_test)

acc = (metrics.accuracy_score(y_test, y_predicted_svm))*100
results.append(acc)
names.append('SVM')
print("Test Data Accuracy SVM Algorithm: "+str(acc))


# In[86]:


new_doc = "Secure software development violations threats faults"
new_doc = [new_doc]

loaded_vec = CountVectorizer(vocabulary=pickle.load(open("vec_count.pkl", "rb"))) 
loaded_tfidf = pickle.load(open("tfidf.pkl","rb"))

x_new_counts = loaded_vec.transform(new_doc)
x_new_tfidf = loaded_tfidf.transform(x_new_counts)
predict = clf_svm.predict(x_new_tfidf)
print(predict)


# In[87]:


result_bayes = pd.DataFrame({'true_labels': y_test, "predicted_labels": y_predicted})
print(result_bayes)


# # Multi-layer Perceptron classifier

# In[88]:


# MLP Classifier

clf_mlp = MLPClassifier(solver='lbfgs', alpha=1e-5, hidden_layer_sizes=(15,), random_state=1)
clf_mlp.fit(x_train, y_train)

y_predicted_neural = clf_mlp.predict(x_test)

acc = (metrics.accuracy_score(y_test, y_predicted_neural))*100
results.append(acc)
names.append('MLP')
print("Test Data Accuracy MLP Classifier: "+str(acc))


# In[89]:


new_doc = "Advantage of density-based clustering over k means"
new_doc = [new_doc]

loaded_vec = CountVectorizer(vocabulary=pickle.load(open("vec_count.pkl", "rb"))) 
loaded_tfidf = pickle.load(open("tfidf.pkl","rb"))

x_new_counts = loaded_vec.transform(new_doc)
x_new_tfidf = loaded_tfidf.transform(x_new_counts)
predict = clf_mlp.predict(x_new_tfidf)
print(predict)


# # Plot the results

# In[90]:


fig = plt.figure()
ax = fig.add_axes([0,0,1,1])
classifier = names
accuracy = results
ax.bar(classifier,accuracy)
plt.show()


# # Save the model

# In[91]:


# SVM
filename = 'finalized_model.pickle'
pickle.dump(clf_svm, open(filename, 'wb'))


# # Load the model

# In[92]:


filename = 'finalized_model.pickle'
loaded_model = pickle.load(open(filename, 'rb'))

new_doc ="Advantage of density-based clustering over k means"
new_doc = [new_doc]

loaded_vec = CountVectorizer(vocabulary=pickle.load(open("vec_count.pkl", "rb"))) 
loaded_tfidf = pickle.load(open("tfidf.pkl","rb"))

x_new_counts = loaded_vec.transform(new_doc)
x_new_tfidf = loaded_tfidf.transform(x_new_counts)
predict = loaded_model.predict(x_new_tfidf)
print(predict)


# In[ ]:




