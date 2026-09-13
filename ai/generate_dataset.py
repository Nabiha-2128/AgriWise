import pandas as pd
import random

random.seed(42)

rows = []

for _ in range(500):

    # -----------------------------
    # TRADER REQUIREMENT
    # -----------------------------

    quantity_required = random.choice([2, 3, 5, 8, 10])

    quality_required = random.choice(["A", "B"])

    target_price = random.randint(20, 40)

    days_required = random.randint(4, 12)


    # -----------------------------
    # FARMER INFORMATION
    # -----------------------------

    quantity_available = round(
        quantity_required * random.uniform(0.4, 1.5),
        1
    )

    quality_available = random.choice(["A", "B"])

    farmer_price = random.randint(
        max(15, target_price - 8),
        target_price + 8
    )

    days_to_harvest = random.randint(2, 15)

    distance_km = random.randint(2, 60)


    # -----------------------------
    # QUALITY COMPATIBILITY
    # -----------------------------

    quality_map = {
        "A": 1,
        "B": 0.5
    }

    required_quality = quality_map[quality_required]
    available_quality = quality_map[quality_available]

    quality_compatibility = int(
        available_quality >= required_quality
    )


    # -----------------------------
    # QUANTITY COMPATIBILITY
    # -----------------------------

    quantity_ratio = min(
        quantity_available / quantity_required,
        1
    )


    # -----------------------------
    # PRICE COMPATIBILITY
    # -----------------------------

    price_difference = abs(
        target_price - farmer_price
    )

    price_compatibility = max(
        1 - price_difference / target_price,
        0
    )


    # -----------------------------
    # HARVEST COMPATIBILITY
    # -----------------------------
    #
    # If farmer can harvest ON or BEFORE
    # the trader's deadline, it is excellent.
    #

    if days_to_harvest <= days_required:

        harvest_compatibility = 1

    else:

        delay = days_to_harvest - days_required

        harvest_compatibility = max(
            1 - delay / days_required,
            0
        )


    # -----------------------------
    # LOCATION / LOGISTICS
    # -----------------------------

    location_compatibility = max(
        1 - distance_km / 50,
        0
    )


    # -----------------------------
    # SYNTHETIC MATCH SCORE
    # -----------------------------
    #
    # Total = 100 points
    #
    # Quantity  = 30%
    # Quality   = 25%
    # Price     = 20%
    # Harvest   = 15%
    # Location  = 10%
    #

    match_score = (
        quantity_ratio * 30
        + quality_compatibility * 25
        + price_compatibility * 20
        + harvest_compatibility * 15
        + location_compatibility * 10
    )


    # Small variation so the model
    # does not see every score as perfectly deterministic.

    match_score += random.uniform(-2, 2)

    match_score = round(
        max(0, min(100, match_score)),
        2
    )


    # -----------------------------
    # SAVE ROW
    # -----------------------------

    rows.append({
        "quantity_required": quantity_required,
        "quantity_available": quantity_available,
        "quality_required": quality_required,
        "quality_available": quality_available,
        "target_price": target_price,
        "farmer_price": farmer_price,
        "days_required": days_required,
        "days_to_harvest": days_to_harvest,
        "distance_km": distance_km,
        "match_score": match_score
    })


# -----------------------------
# CREATE DATAFRAME
# -----------------------------

data = pd.DataFrame(rows)


# -----------------------------
# SAVE DATASET
# -----------------------------

data.to_csv(
    "ai/data/matching_dataset.csv",
    index=False
)


print("Dataset generated successfully!")
print(f"Number of examples: {len(data)}")
print("Saved to: ai/data/matching_dataset.csv")