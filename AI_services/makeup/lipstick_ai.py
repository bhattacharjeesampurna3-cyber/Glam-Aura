def recommend_lipstick(tone,undertone):

    lipstick={

        "Fair":{
            "Warm":"Peach",
            "Cool":"Rose Pink"
        },

        "Medium":{
            "Warm":"Terracotta",
            "Cool":"Plum"
        },

        "Deep":{
            "Warm":"Brick Red",
            "Cool":"Wine"
        }
    }

    return lipstick[tone][undertone]