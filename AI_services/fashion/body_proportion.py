def estimate_body_shape(landmarks):

    left_shoulder=landmarks[11]
    right_shoulder=landmarks[12]

    left_hip=landmarks[23]
    right_hip=landmarks[24]

    shoulder=abs(right_shoulder[0]-left_shoulder[0])
    hip=abs(right_hip[0]-left_hip[0])

    ratio=shoulder/hip

    if ratio>1.1:
        return "Inverted Triangle"
    elif ratio<0.9:
        return "Pear"
    else:
          return "Rectangle"