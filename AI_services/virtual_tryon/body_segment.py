def get_torso_region(image,landmarks):

    h,w,_=image.shape

    left_shoulder=landmarks[11]
    right_shoulder=landmarks[12]

    left_hip=landmarks[23]

    x1=int(left_shoulder[0]*w)
    x2=int(right_shoulder[0]*w)

    y1=int(left_shoulder[1]*h)
    y2=int(left_hip[1]*h)

    torso=image[y1:y2,x1:x2]

    return torso,(x1,y1,x2,y2)