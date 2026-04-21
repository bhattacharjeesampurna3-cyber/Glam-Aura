import cv2
import numpy as np
from sklearn.cluster import KMeans
import mediapipe as mp

def detect_skin_and_face_shape(image_path):

    image = cv2.imread(image_path)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    mp_face = mp.solutions.face_detection
    face_detection = mp_face.FaceDetection()

    results = face_detection.process(image)

    if not results.detections:
        return {"error": "No face detected"}

    bbox = results.detections[0].location_data.relative_bounding_box

    h, w, _ = image.shape

    x = int(bbox.xmin * w)
    y = int(bbox.ymin * h)
    width = int(bbox.width * w)
    height = int(bbox.height * h)

    face = image[y:y+height, x:x+width]

    pixels = face.reshape((-1,3))

    kmeans = KMeans(n_clusters=3)
    kmeans.fit(pixels)

    dominant_color = kmeans.cluster_centers_[0]

    r, g, b = dominant_color

    if r > 200:
        tone = "Fair"
    elif r > 160:
        tone = "Medium"
    else:
        tone = "Deep"

    if r > b:
        undertone = "Warm"
    elif b > r:
        undertone = "Cool"
    else:
        undertone = "Neutral"

    ratio = width / height

    if ratio > 1.3:
        face_shape = "Round"
    elif ratio < 0.9:
        face_shape = "Long"
    else:
        face_shape = "Oval"

    return {
        "skinTone": tone,
        "undertone": undertone,
        "faceShape": face_shape
    }