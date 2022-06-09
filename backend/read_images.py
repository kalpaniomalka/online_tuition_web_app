# import the necessary packages
from tensorflow.keras.models import load_model
from imutils.contours import sort_contours
import numpy as np
import imutils
from cv2 import cv2
import os
import csv
import smtplib
import mimetypes
import email
import email.mime.application
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
import glob
import db
import email_template as et

current_path =  os.path.abspath(os.path.join(os.path.dirname(__file__)))

model = "handwriting_recognition.model"
img_path = current_path+"\\Outputs"

EMAIL_ADDRESS = "eduhelp.finance@gmail.com"
rec_email = "Dinujasm@gmail.com"
password = "eduhelp@12"
value_arr = []

# load the handwriting OCR model
model = load_model(model)

def main():
	Image_list = os.listdir(img_path)
	print(Image_list)
	for j,y in enumerate(Image_list):
		# load the input image from disk, convert it to grayscale, and blur
		# it to reduce noise
		image = cv2.imread(img_path + "\\"+y)
		gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
		blurred = cv2.GaussianBlur(gray, (5, 5), 0)
		# perform edge detection, find contours in the edge map, and sort the
		# resulting contours from left-to-right
		edged = cv2.Canny(blurred, 30, 150)
		cnts = cv2.findContours(edged.copy(), cv2.RETR_EXTERNAL,
			cv2.CHAIN_APPROX_SIMPLE)
		cnts = imutils.grab_contours(cnts)
		cnts = sort_contours(cnts, method="left-to-right")[0]
		# initialize the list of contour bounding boxes and associated
		#print(cnts)
		chars = []

		# loop over the contours
		for c in cnts:
			# compute the bounding box of the contour
			(x, y, w, h) = cv2.boundingRect(c)

			# filter out bounding boxes, ensuring they are neither too small
			if (w >= 10 and w <= 150) and (h >= 20 and h <= 200):
				# extract the character and threshold it to make the character
				# appear as *white* (foreground) on a *black* background, then
				roi = gray[y:y + h, x:x + w]
				thresh = cv2.threshold(roi, 0, 255,
					cv2.THRESH_BINARY_INV | cv2.THRESH_OTSU)[1]
				(tH, tW) = thresh.shape
				# if the width is greater than the height, resize along the
				# width dimension
				if tW > tH:
					thresh = imutils.resize(thresh, width=32)
				# otherwise, resize along the height
				else:
					thresh = imutils.resize(thresh, height=32)

        		# re-grab the image dimensions (now that its been resized)
				# and then determine how much we need to pad the width and
				# height such that our image will be 32x32
				(tH, tW) = thresh.shape
				dX = int(max(0, 32 - tW) / 2.0)
				dY = int(max(0, 32 - tH) / 2.0)
				# pad the image and force 32x32 dimensions
				padded = cv2.copyMakeBorder(thresh, top=dY, bottom=dY,
					left=dX, right=dX, borderType=cv2.BORDER_CONSTANT,
					value=(0, 0, 0))
				padded = cv2.resize(padded, (32, 32))
				# prepare the padded image for classification via our
				# handwriting OCR model
				padded = padded.astype("float32") / 255.0
				padded = np.expand_dims(padded, axis=-1)
				# update our list of characters that will be OCR'd
				chars.append((padded, (x, y, w, h)))

		# extract the bounding box locations and padded characters
		boxes = [b[1] for b in chars]
		chars = np.array([c[0] for c in chars], dtype="float32")
		# OCR the characters using our handwriting recognition model
		preds = model.predict(chars)
		# define the list of label names
		labelNames = "0123456789"
		labelNames += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
		labelNames = [l for l in labelNames]
		value = ''
		# loop over the predictions and bounding box locations together
		for (pred, (x, y, w, h)) in zip(preds, boxes):
			# find the index of the label with the largest corresponding
			# probability, then extract the probability and label
			i = np.argmax(pred)
			prob = pred[i]
			label = labelNames[i]
			# draw the prediction on the image
			#print("[INFO] {} - {:.2f}%".format(label, prob * 100))
			if(prob * 100 > 50):
				value += label
			cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)
			cv2.putText(image, label, (x - 10, y - 10),
			cv2.FONT_HERSHEY_SIMPLEX, 1.2, (0, 255, 0), 2)
		# # show the image
		# cv2.imshow("Image", image)
		# cv2.waitKey(0)
		value_arr.append(value)
	
	name = ""
	val = 0
	for i in value_arr[1]:
		val += 1
		if val < 3:
			name = name + i + " "
		else:
			name = name + i

	temp = et.getTemplate(name,value_arr[2],value_arr[3],value_arr[4])
	msg = MIMEMultipart('alternative')
	msg = email.mime.multipart.MIMEMultipart()
	msg['Subject'] = "Payement Verification"
	msg['From'] = EMAIL_ADDRESS
	msg.attach(temp)

	server = smtplib.SMTP('smtp.gmail.com',587)
	server.starttls()
	server.login(EMAIL_ADDRESS, password)
#	msg = "Your bank slip was successfully received by Eduhelp.\n\nName: "+value_arr[1]+"\nRegistration Number:"+value_arr[2]+"\nCourse: "+value_arr[3]+"\nAmount:"+value_arr[4]
#	message = 'Subject:{} \n\n{}'.format("Payment verification",msg)
	server.sendmail(EMAIL_ADDRESS, rec_email, msg.as_string())
	server.quit()

	con = db.connection()
	cursor = con.cursor()
	sql = "INSERT INTO payment (slip_name,reg_no,amount,course,varified) VALUES(%s, %s, %s, %s,%s)"
	val = [name,value_arr[2], value_arr[4],value_arr[3],0]
	cursor.execute(sql,val)
	con.commit()

	files = glob.glob(img_path+'/*')
	for f in files:
		os.remove(f)