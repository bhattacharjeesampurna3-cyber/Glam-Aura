from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import cv2
import os
import uuid
import numpy as np

# ==============================
# IMPORT AI MODULES
# ==============================

from body_shape.body_shape_predict import predict_body_shape
from body_shape.dress_recommendation import get_dress_recommendations

from skin_analysis.skin_tone_detector import detect_skin_tone
from skin_analysis.undertone_detector import detect_undertone
from skin_analysis.complexion_detector import detect_complexion

from services.product_matcher import match_products

from fashion.pose_detector import detect_pose
from fashion.body_proportion import estimate_body_shape
from fashion.outfit_recommender import recommend_outfit

from virtual_tryon.body_segment import get_torso_region
from virtual_tryon.cloth_overlay import overlay_cloth


# ==============================
# APP SETUP
# ==============================

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# ==============================
# HOME ROUTE
# ==============================

@app.route("/")
def home():
    return "Glam Aura AI Service Running"


# ==============================
# BODY SHAPE PREDICTION
# ==============================

@app.route("/predict-body", methods=["POST"])
def body_shape():

    try:

        data = request.json

        if not data:
            return jsonify({"error": "No body measurements provided"}), 400

        body = predict_body_shape(data)

        dresses = get_dress_recommendations(body)

        return jsonify({
            "body_type": str(body),
            "dress_recommendation": dresses
        })

    except Exception as e:

        print("🔥 BODY ERROR:", e)

        return jsonify({"error": str(e)}), 500


# ==============================
# MAKEUP AI
# ==============================

@app.route("/makeup-ai", methods=["POST"])
def makeup_ai():

    try:

        if "image" not in request.files:
            return jsonify({"error": "No image uploaded"}), 400

        file = request.files["image"]

        file_bytes = np.frombuffer(file.read(), np.uint8)

        image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

        if image is None:
            return jsonify({"error": "Invalid image file"}), 400


        # ==========================
        # SKIN ANALYSIS
        # ==========================

        try:
            skin_tone = detect_skin_tone(image)
        except:
            skin_tone = "medium"

        try:
            undertone = detect_undertone(image)
        except:
            undertone = "neutral"

        try:
            complexion = detect_complexion(image)
        except:
            complexion = "Medium"


        # ==========================
        # PRODUCT MATCHING
        # ==========================

        try:
            products = match_products(skin_tone, undertone)
        except Exception as e:
            print("PRODUCT MATCH ERROR:", e)
            products = {
                "foundation": None,
                "lipstick": None,
                "blush": None
            }


        # ==========================
        # RESPONSE
        # ==========================

        return jsonify({

            "skin_analysis": {

                "skin_tone": skin_tone,
                "undertone": undertone,
                "complexion": complexion

            },

            "recommended_products": products

        })


    except Exception as e:

        print("🔥 MAKEUP AI ERROR:", e)

        return jsonify({"error": str(e)}), 500


# ==============================
# WARDROBE AI
# ==============================

@app.route("/wardrobe-ai", methods=["POST"])
def wardrobe_ai():

    try:

        if "image" not in request.files:
            return jsonify({"error": "No image uploaded"}), 400

        file = request.files["image"]

        occasion = request.form.get("occasion", "casual")

        filename = str(uuid.uuid4()) + ".jpg"

        path = os.path.join(UPLOAD_FOLDER, filename)

        file.save(path)

        image = cv2.imread(path)

        if image is None:
            return jsonify({"error": "Invalid image"}), 400


        landmarks = detect_pose(image)

        if not landmarks:
            return jsonify({"error": "No body detected"}), 400


        body_shape = estimate_body_shape(landmarks)

        outfit = recommend_outfit(body_shape, occasion)


        return jsonify({

            "body_shape": str(body_shape),

            "outfit": outfit

        })


    except Exception as e:

        print("🔥 WARDROBE ERROR:", e)

        return jsonify({"error": str(e)}), 500


# ==============================
# VIRTUAL TRY ON
# ==============================

@app.route("/virtual-tryon", methods=["POST"])
def virtual_tryon():

    try:

        if "user" not in request.files or "cloth" not in request.files:
            return jsonify({"error": "Images missing"}), 400


        user_image = request.files["user"]

        cloth_image = request.files["cloth"]


        user_path = os.path.join(UPLOAD_FOLDER, "user_" + str(uuid.uuid4()) + ".jpg")

        cloth_path = os.path.join(UPLOAD_FOLDER, "cloth_" + str(uuid.uuid4()) + ".jpg")


        user_image.save(user_path)

        cloth_image.save(cloth_path)


        body = cv2.imread(user_path)

        cloth = cv2.imread(cloth_path)


        if body is None or cloth is None:
            return jsonify({"error": "Invalid images"}), 400


        landmarks = detect_pose(body)

        if not landmarks:
            return jsonify({"error": "Body not detected"}), 400


        torso, coords = get_torso_region(body, landmarks)

        result = overlay_cloth(body, cloth, coords)


        output_path = os.path.join(
            UPLOAD_FOLDER,
            "result_" + str(uuid.uuid4()) + ".jpg"
        )


        cv2.imwrite(output_path, result)


        return send_file(output_path, mimetype="image/jpeg")


    except Exception as e:

        print("🔥 TRYON ERROR:", e)

        return jsonify({"error": str(e)}), 500


# ==============================
# SERVER
# ==============================

if __name__ == "__main__":

    app.run(port=5000, debug=True)