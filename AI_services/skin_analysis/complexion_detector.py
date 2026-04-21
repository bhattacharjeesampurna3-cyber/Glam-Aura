import numpy as np

def detect_complexion(image):

    avg = np.mean(image)

    if avg > 180:
        return "Fair"

    elif avg > 130:
        return "Medium"

    else:
        return "Deep"