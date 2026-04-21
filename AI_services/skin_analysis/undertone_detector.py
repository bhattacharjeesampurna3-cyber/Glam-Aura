import cv2
import numpy as np

def detect_undertone(image):
    try:
        if image is None:
            return "Unknown"

        image = cv2.resize(image, (200, 200))

        # Convert to LAB (better for undertone)
        lab = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)

        # Focus on center region (face approx)
        h, w, _ = lab.shape
        center = lab[h//3:2*h//3, w//3:2*w//3]

        avg = np.mean(center, axis=(0,1))
        l, a, b = avg

        # 👉 Better undertone logic
        if a > 135:
            return "Warm"
        elif b > 135:
            return "Cool"
        else:
            return "Neutral"

    except Exception as e:
        print("🔥 UNDERTONE ERROR:", e)
        return "Neutral"