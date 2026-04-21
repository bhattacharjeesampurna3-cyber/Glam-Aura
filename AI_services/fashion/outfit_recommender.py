def recommend_outfit(body_shape,occasion):

    outfits={

        "Pear":{
            "casual":[
                "Off shoulder top",
                "A line skirt",
                "Sneakers"
            ],

            "party":[
                "Fit and flare dress",
                "Block heels"
            ]
        }
    }

    return outfits[body_shape][occasion]