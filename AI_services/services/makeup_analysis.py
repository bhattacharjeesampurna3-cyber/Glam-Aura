from skin_analysis.skin_tone_detector import detect_skin_tone
from skin_analysis.undertone_detector import detect_undertone
from services.product_matcher import match_products


def analyze_makeup(image_path):

    skin_tone = detect_skin_tone(image_path)
    undertone = detect_undertone(image_path)

    if skin_tone == "Light":
        complexion = "Fair"
    elif skin_tone == "Medium":
        complexion = "Medium"
    else:
        complexion = "Deep"

    products = match_products(skin_tone, undertone)

    return {
        "skin_analysis": {
            "skin_tone": skin_tone,
            "undertone": undertone,
            "complexion": complexion
        },
        "recommended_products": products
    }