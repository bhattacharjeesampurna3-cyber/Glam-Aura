def recommend_foundation_brand(tone,undertone):

    db={

        "Medium":{
            "Warm":{
                "MAC":"NC35",
                "Maybelline":"220 Natural Beige",
                "Huda":"310G Amaretti"
            }
        }
    }

    return db[tone][undertone]