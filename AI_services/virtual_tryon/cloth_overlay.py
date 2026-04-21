import cv2

def overlay_cloth(body,cloth,coords):

    x1,y1,x2,y2=coords

    cloth=cv2.resize(cloth,(x2-x1,y2-y1))

    body[y1:y2,x1:x2]=cloth

    return body