#Importing libraries
from cv2 import cv2
import numpy as np
import os
import matplotlib.pyplot as plt
from watchdog.observers import Observer
from watchdog.events import LoggingEventHandler
import time
import read_images as ri

# Declaring Paths
current_path =  os.path.abspath(os.path.join(os.path.dirname(__file__)))
img_path = current_path+"\\Images"
#test_images_path = current_path+"\\Test_images"

per = 25
scale = 0.5

roi = [[(285, 230), (2000, 364), 'text', 'Validation'], #(x,y) (width+x,height+y)
       [(1150, 660), (2400, 780), 'text', 'Name'], 
       [(2654, 660), (3400, 730), 'text', 'RegNo'], 
       [(784, 960), (2350, 1040), 'text', 'Course'], 
       [(2412, 1350), (3250, 1450),  'text', 'Amount']]

imageT = cv2.imread("template.jpg")
h,w,c  = imageT.shape

orb = cv2.ORB_create(1000)

# unique key points/elements to image,  decsripters are the representation of these key points that will be easier for
#the computer to understand
kp1, des1 = orb.detectAndCompute(imageT, None)

#Image_list = os.listdir(test_images_path)
def on_created(event):
    print(event.src_path)
    time.sleep(5)
    img = cv2.imread(event.src_path)
    fileName = (event.src_path).split("\\")
    fileName1 = fileName[len(fileName)-1]
    fileName = fileName1.split(".")
    h,w,c  = img.shape
    kp2, des2 = orb.detectAndCompute(img, None)
    bf = cv2.BFMatcher(cv2.NORM_HAMMING)
    matches = bf.match(des2,des1)
    matches.sort(key= lambda x: x.distance)
    good = matches[:int(len(matches)*(per/100))]
    imgMatch = cv2.drawMatches(img,kp2,imageT,kp1,good[:100],None,flags=2)

    srcPoints = np.float32([kp2[m.queryIdx].pt for m in good]).reshape(-1,1,2)
    dstPoints = np.float32([kp1[m.trainIdx].pt for m in good]).reshape(-1,1,2)

    M, _ = cv2.findHomography(srcPoints,dstPoints,cv2.RANSAC,5.0)
    imgScan = cv2.warpPerspective(img,M,(w,h))

    imgShow = imgScan.copy()
    imgMask = np.zeros_like(imgShow)

    Data_list = []
    i =0
    for x,r in enumerate(roi):
        i += 1
        cv2.rectangle(imgMask, ((r[0][0]), r[0][1]), ((r[1][0]), r[1][1]), (0,255,0), cv2.FILLED)
        imgShow = cv2.addWeighted(imgShow, 0.99, imgMask, 0.1,0)

        imgCrop = imgScan[r[0][1]:r[1][1], r[0][0]:r[1][0]]
      #  cv2.imshow(str(x), imgCrop)
        plt.imsave('Outputs\\'+fileName[0]+str(i)+'.png', imgCrop)
    ri.main()
#     img = cv2.resize(img, (w//4,h//4), None, scale, scale)
#     imgShow = cv2.resize(imgShow, (w//4,h//4), None, scale, scale)
#     cv2.imshow(y+"2", imgShow)

# cv2.waitKey(0)


if __name__ == "__main__":
    # An agent has been created here to monitor video-data folder. when a new video is uploaded to that folder,
    # it automatically starts processing that video.
    event_handler = LoggingEventHandler()
    event_handler.on_created = on_created

    observer = Observer()
    observer.schedule(event_handler, img_path, recursive=True)
    observer.start()

    try:
        print("Started")
        while True:
            time.sleep(1)
    finally:
        observer.stop()
    observer.join()