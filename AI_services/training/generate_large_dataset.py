import pandas as pd
import random

rows = []

for i in range(5000):

    shape = random.choice([
        "Hourglass",
        "Pear",
        "Apple",
        "Rectangle",
        "InvertedTriangle"
    ])

    height = random.randint(150,185)

    if shape == "Hourglass":

        bust = random.randint(34,42)
        hips = bust + random.randint(-2,2)
        waist = bust - random.randint(6,10)
        shoulder = random.randint(16,19)

    elif shape == "Pear":

        bust = random.randint(32,38)
        hips = bust + random.randint(6,12)
        waist = bust - random.randint(2,5)
        shoulder = random.randint(15,18)

    elif shape == "Apple":

        bust = random.randint(36,44)
        waist = bust - random.randint(0,2)
        hips = bust - random.randint(1,3)
        shoulder = random.randint(17,20)

    elif shape == "Rectangle":

        bust = random.randint(34,40)
        waist = bust - random.randint(1,3)
        hips = bust + random.randint(-1,2)
        shoulder = random.randint(16,19)

    else:  # Inverted Triangle

        shoulder = random.randint(20,24)
        bust = random.randint(38,46)
        waist = bust - random.randint(3,6)
        hips = bust - random.randint(5,10)

    rows.append([
        bust,
        waist,
        hips,
        shoulder,
        height,
        shape
    ])


df = pd.DataFrame(rows, columns=[
    "bust",
    "waist",
    "hips",
    "shoulder",
    "height",
    "shape"
])

df.to_csv("training/body_shape_dataset_large.csv", index=False)

print("Dataset generated with 5000 rows!")