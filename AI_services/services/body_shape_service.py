import joblib
import os

MODEL_PATH = os.path.join("models", "body_shape_model.pkl")
model = joblib.load(MODEL_PATH)

def predict_body_shape(bust, waist, hips):

    prediction = model.predict([[bust, waist, hips]])
    shape = prediction[0]

    recommendations = {
        "Hourglass": ["Bodycon Dress", "Wrap Dress"],
        "Pear": ["A-line Dress", "Off-Shoulder Dress"],
        "Apple": ["Empire Waist Dress", "V-neck Dress"],
        "Rectangle": ["Layered Dress", "Ruffled Dress"]
    }
    return {
        "bodyShape": shape,
        "recommendedStyles": recommendations.get(shape, [])
    }