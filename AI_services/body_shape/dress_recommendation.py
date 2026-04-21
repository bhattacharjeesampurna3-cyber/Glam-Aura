def get_dress_recommendations(body_type):

    recommendations={

        "Pear":[
            "A-line dress",
            "Off shoulder top",
            "Wide neck dress"
        ],

        "Hourglass":[
            "Wrap dress",
            "Bodycon dress",
            "High waist skirt"
        ],

        "Rectangle":[
            "Peplum top",
            "Layered dress"
        ],

        "Apple":[
            "Empire waist dress",
            "V neck dress"
        ],

        "Inverted Triangle":[
            "Flared skirt",
            "Wide leg pants"
        ]
    }

    return recommendations.get(body_type,[])