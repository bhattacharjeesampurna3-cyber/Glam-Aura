import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib

# Sample dataset
data = {
    "shoulder": [36,38,40,42,35,39,41,37],
    "bust": [88,92,96,100,85,94,98,90],
    "waist": [70,72,74,80,68,73,78,71],
    "hip": [98,102,104,108,100,103,107,101],
    "height": [160,165,170,168,158,166,172,162],
    "body_type": [
        "Pear",
        "Pear",
        "Hourglass",
        "Apple",
        "Pear",
        "Hourglass",
        "Apple",
        "Pear"
    ]
}

df = pd.DataFrame(data)

X = df[["shoulder","bust","waist","hip","height"]]
y = df["body_type"]

# Train model
model = RandomForestClassifier()

model.fit(X,y)

# Save model
joblib.dump(model,"models/body_shape_model.pkl")

print("Model trained and saved successfully!")