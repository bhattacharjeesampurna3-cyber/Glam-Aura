import cv2
import mediapipe as mp

mp_pose=mp.solutions.pose

def detect_pose(image):

    pose=mp_pose.Pose(static_image_mode=True)

    rgb=cv2.cvtColor(image,cv2.COLOR_BGR2RGB)

    results=pose.process(rgb)

    landmarks=[]

    if results.pose_landmarks:
        for lm in results.pose_landmarks.landmark:
            landmarks.append((lm.x,lm.y))

    return landmarks