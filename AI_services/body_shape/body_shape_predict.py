import joblib
import numpy as np

# Load trained model
model = joblib.load("models/body_shape_model.pkl")

def predict_body_shape(data):

    # Extract values sent from frontend
    bust = float(data.get("bust", 0))
    waist = float(data.get("waist", 0))
    hips = float(data.get("hips", 0))

    # Model only uses these three features
    features = np.array([[bust, waist, hips]])

    prediction = model.predict(features)

    return prediction[0]


