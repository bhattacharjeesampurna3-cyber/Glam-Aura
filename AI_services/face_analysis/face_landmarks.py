
import cv2
import mediapipe as mp

# Initialize MediaPipe FaceMesh
mp_face_mesh = mp.solutions.face_mesh

def detect_face_landmarks(image):

    face_mesh = mp_face_mesh.FaceMesh(
        static_image_mode=True,
        max_num_faces=1,
        refine_landmarks=True
    )

    # Convert image to RGB
    rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    # Process the image
    results = face_mesh.process(rgb_image)

    landmarks = []

    if results.multi_face_landmarks:

        for face_landmarks in results.multi_face_landmarks:

            for lm in face_landmarks.landmark:

                # Save normalized coordinates
                landmarks.append((lm.x, lm.y))

    return landmarks
