import cv2

def apply_blush(image, landmarks):

    h, w, _ = image.shape

    # Cheek landmarks from MediaPipe FaceMesh
    left_cheek = landmarks[234]
    right_cheek = landmarks[454]

    # Convert normalized coordinates to pixel coordinates
    x1 = int(left_cheek[0] * w)
    y1 = int(left_cheek[1] * h)

    x2 = int(right_cheek[0] * w)
    y2 = int(right_cheek[1] * h)

    # Blush color (pink)
    blush_color = (180, 105, 255)

    # Draw blush circles on cheeks
    cv2.circle(image, (x1, y1), 30, blush_color, 2)
    cv2.circle(image, (x2, y2), 30, blush_color, 2)

    return image
