import math

def detect_face_shape(landmarks):

    # Key facial landmark points from MediaPipe
    left_face = landmarks[234]
    right_face = landmarks[454]
    chin = landmarks[152]
    forehead = landmarks[10]

    left_jaw = landmarks[172]
    right_jaw = landmarks[397]

    # Calculate face width
    face_width = abs(right_face[0] - left_face[0])

    # Calculate face length
    face_length = abs(chin[1] - forehead[1])

    # Calculate jaw width
    jaw_width = abs(right_jaw[0] - left_jaw[0])

    # Ratios for classification
    ratio = face_length / face_width

    # Face shape logic
    if ratio > 1.5:
        face_shape = "Oval"

    elif ratio < 1.2:
        face_shape = "Round"

    elif abs(jaw_width - face_width) < 0.05:
        face_shape = "Square"

    else:
        face_shape = "Heart"

    return face_shape
