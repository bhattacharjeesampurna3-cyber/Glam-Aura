import cv2
import numpy as np
from sklearn.cluster import KMeans

def detect_skin_tone(image):
    try:
        # Resize for speed
        image = cv2.resize(image, (200, 200))

        # Convert to HSV (better skin detection)
        hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

        # Skin mask (basic range)
        lower = np.array([0, 40, 50])
        upper = np.array([25, 255, 255])

        mask = cv2.inRange(hsv, lower, upper)

        # Extract skin pixels only
        skin_pixels = image[mask != 0]

        # If no skin detected
        if len(skin_pixels) == 0:
            skin_pixels = image.reshape((-1, 3))

        # KMeans clustering
        kmeans = KMeans(n_clusters=3, n_init=10)
        kmeans.fit(skin_pixels)

        colors = kmeans.cluster_centers_

        # 👉 Take brightest cluster (important fix)
        brightness_values = [sum(c)/3 for c in colors]
        dominant_color = colors[np.argmax(brightness_values)]

        b, g, r = dominant_color

        brightness = (r + g + b) / 3

        if brightness > 200:
            return "Fair"
        elif brightness > 160:
            return "Light"
        elif brightness > 120:
            return "Medium"
        else:
            return "Deep"

    except Exception as e:
        print("🔥 SKIN TONE ERROR:", e)
        return "Medium"