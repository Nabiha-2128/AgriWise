import joblib
import pandas as pd

from explanation import explain_match


# Load trained model
model = joblib.load("ai/matching_model.pkl")


# --------------------------------------------------
# TRADER REQUIREMENT
# --------------------------------------------------

trader = {
    "quantity_required": 5,
    "quality_required": "A",
    "target_price": 30,
    "days_required": 7
}


# --------------------------------------------------
# FARMER DATA
# --------------------------------------------------

farmers = [
    {
        "name": "Farmer A",
        "quantity_available": 5.4,
        "quality_available": "A",
        "farmer_price": 29,
        "days_to_harvest": 5,
        "distance_km": 8
    },
    {
        "name": "Farmer B",
        "quantity_available": 6.0,
        "quality_available": "A",
        "farmer_price": 32,
        "days_to_harvest": 6,
        "distance_km": 15
    },
    {
        "name": "Farmer C",
        "quantity_available": 4.0,
        "quality_available": "A",
        "farmer_price": 28,
        "days_to_harvest": 4,
        "distance_km": 5
    },
    {
        "name": "Farmer D",
        "quantity_available": 5.5,
        "quality_available": "B",
        "farmer_price": 27,
        "days_to_harvest": 8,
        "distance_km": 20
    },
    {
        "name": "Farmer E",
        "quantity_available": 7.0,
        "quality_available": "B",
        "farmer_price": 25,
        "days_to_harvest": 5,
        "distance_km": 35
    }
]


# --------------------------------------------------
# QUALITY MAPPING
# --------------------------------------------------

quality_map = {
    "A": 1,
    "B": 0.5
}


# --------------------------------------------------
# MATCHING FUNCTION
# --------------------------------------------------

def calculate_match(farmer):

    quantity_required = trader["quantity_required"]
    quality_required = trader["quality_required"]
    target_price = trader["target_price"]
    days_required = trader["days_required"]

    quantity_available = farmer["quantity_available"]
    quality_available = farmer["quality_available"]
    farmer_price = farmer["farmer_price"]
    days_to_harvest = farmer["days_to_harvest"]
    distance_km = farmer["distance_km"]

    # -----------------------------
    # Quantity compatibility
    # -----------------------------

    quantity_ratio = min(
        quantity_available / quantity_required,
        1
    )

    # -----------------------------
    # Quality compatibility
    # -----------------------------

    quality_required_num = quality_map[quality_required]
    quality_available_num = quality_map[quality_available]

    quality_compatibility = int(
        quality_available_num >= quality_required_num
    )

    # -----------------------------
    # Price compatibility
    # -----------------------------

    price_difference = abs(
        target_price - farmer_price
    )

    price_compatibility = max(
        1 - price_difference / target_price,
        0
    )

    # -----------------------------
    # Harvest compatibility
    # -----------------------------

    if days_to_harvest <= days_required:

        harvest_compatibility = 1

    else:

        delay = days_to_harvest - days_required

        harvest_compatibility = max(
            1 - delay / days_required,
            0
        )

    # -----------------------------
    # Location / logistics
    # -----------------------------

    location_compatibility = max(
        1 - distance_km / 50,
        0
    )

    # -----------------------------
    # Prepare model input
    # -----------------------------

    features = pd.DataFrame([{
        "quantity_ratio": quantity_ratio,
        "price_compatibility": price_compatibility,
        "harvest_compatibility": harvest_compatibility,
        "location_compatibility": location_compatibility,
        "quality_compatibility": quality_compatibility
    }])

    # -----------------------------
    # Predict match score
    # -----------------------------

    predicted_score = model.predict(features)[0]

    predicted_score = max(
        0,
        min(100, predicted_score)
    )

    # -----------------------------
    # Generate explanation
    # -----------------------------

    explanation = explain_match(
        quantity_ratio,
        quality_compatibility,
        price_compatibility,
        harvest_compatibility,
        location_compatibility
    )

    return {
        "name": farmer["name"],
        "score": predicted_score,
        "explanation": explanation
    }


# --------------------------------------------------
# CALCULATE ALL FARMER MATCHES
# --------------------------------------------------

results = []

for farmer in farmers:

    result = calculate_match(farmer)

    results.append(result)


# --------------------------------------------------
# RANK FARMERS
# --------------------------------------------------

results.sort(
    key=lambda x: x["score"],
    reverse=True
)


# --------------------------------------------------
# DISPLAY RESULTS
# --------------------------------------------------

print()
print("======================================")
print("       AGRIWISE FARMER MATCHING")
print("======================================")

print()
print("Trader Requirement")
print("------------------")

print(
    f"Quantity : {trader['quantity_required']} tonnes"
)

print(
    f"Quality  : Grade {trader['quality_required']}"
)

print(
    f"Price    : ₹{trader['target_price']}/kg"
)

print(
    f"Deadline : {trader['days_required']} days"
)

print()
print("Ranked Farmer Matches")
print("=====================")


for index, result in enumerate(results, start=1):

    print()
    print(
        f"{index}. {result['name']} "
        f"— {result['score']:.2f}%"
    )

    print(
        f"   Quantity : {result['explanation']['quantity']}"
    )

    print(
        f"   Quality  : {result['explanation']['quality']}"
    )

    print(
        f"   Price    : {result['explanation']['price']}"
    )

    print(
        f"   Harvest  : {result['explanation']['harvest']}"
    )

    print(
        f"   Logistics: {result['explanation']['logistics']}"
    )


# --------------------------------------------------
# BEST FARMER
# --------------------------------------------------

best_farmer = results[0]

print()
print("======================================")
print("        AGRIWISE RECOMMENDATION")
print("======================================")

print(
    f"Recommended Farmer: {best_farmer['name']}"
)

print(
    f"Match Score: {best_farmer['score']:.2f}%"
)

print(
    "Reason: Highest overall compatibility "
    "with the trader's requirements."
)

print()
# Save the best farmer's score for the premium intelligence stage
with open("ai/initial_match.txt", "w") as file:
    file.write(f"{best_farmer['score']:.2f}")

print()
print("Initial match saved for premium analysis.")