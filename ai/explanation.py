def get_rating(score):
    if score >= 90:
        return "Excellent"
    elif score >= 75:
        return "Good"
    elif score >= 60:
        return "Fair"
    else:
        return "Poor"


def explain_match(
    quantity_ratio,
    quality_compatibility,
    price_compatibility,
    harvest_compatibility,
    location_compatibility
):

    quantity_score = quantity_ratio * 100
    quality_score = quality_compatibility * 100
    price_score = price_compatibility * 100
    harvest_score = harvest_compatibility * 100
    location_score = location_compatibility * 100

    explanation = {
        "quantity": get_rating(quantity_score),
        "quality": get_rating(quality_score),
        "price": get_rating(price_score),
        "harvest": get_rating(harvest_score),
        "logistics": get_rating(location_score)
    }

    return explanation