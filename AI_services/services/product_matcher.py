from database.products_db import products

def match_products(skin_tone, undertone):

    skin_tone = str(skin_tone).lower()

    foundation = None
    lipstick = None
    blush = None

    for product in products:

        # FOUNDATION
        if product["category"] == "foundation":

            for shade in product["shades"]:

                if shade["tone"].lower() == skin_tone:

                    foundation = {
                        "name": product["name"],
                        "shade": shade["shade"],
                        "image": product["image"],
                        "link": product["link"]
                    }
                    break


        # LIPSTICK
        if product["category"] == "lipstick":

            for shade in product["shades"]:

                if shade["tone"].lower() == skin_tone:

                    lipstick = {
                        "name": product["name"],
                        "shade": shade["shade"],
                        "image": product["image"],
                        "link": product["link"]
                    }
                    break


        # BLUSH
        if product["category"] == "blush":

            for shade in product["shades"]:

                if shade["tone"].lower() == skin_tone:

                    blush = {
                        "name": product["name"],
                        "shade": shade["shade"],
                        "image": product["image"],
                        "link": product["link"]
                    }
                    break


    return {
        "foundation": foundation,
        "lipstick": lipstick,
        "blush": blush
    }