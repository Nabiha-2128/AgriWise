import joblib
import pandas as pd

from explanation import explain_match


# ============================================
# LOAD TRAINED MODEL
# ============================================

model = joblib.load("ai/matching_model.pkl")


# ============================================
# TRADER REQUIREMENT
# ============================================

quantity_required = 5
quality_required = "A"
target_price = 30
days_required = 7


# ============================================
# FARMER INFORMATION
# ============================================

quantity_available = 5.4
quality_available = "A"
farmer_price = 29
days_to_harvest = 5
distance_km = 8


# ============================================
# QUALITY CONVERSION
# ============================================

quality_map = {
    "A": 1,
    "B": 0.5
}

quality_required_num = quality_map[quality_required]
quality_available_num = quality_map[quality_available]


# ============================================
# QUANTITY COMPATIBILITY
# ============================================

quantity_ratio = min(
    quantity_available / quantity_required,
    1
)


# ============================================
# PRICE COMPATIBILITY
# ============================================

price_difference = abs(
    target_price - farmer_price
)

price_compatibility = max(
    1 - price_difference / target_price,
    0
)


# ============================================
# HARVEST COMPATIBILITY
# ============================================

# If the farmer can harvest on or before
# the trader's deadline, the timing is excellent.

if days_to_harvest <= days_required:

    harvest_compatibility = 1

else:

    delay = days_to_harvest - days_required

    harvest_compatibility = max(
        1 - delay / days_required,
        0
    )


# ============================================
# LOCATION COMPATIBILITY
# ============================================

location_compatibility = max(
    1 - distance_km / 50,
    0
)


# ============================================
# QUALITY COMPATIBILITY
# ============================================

quality_compatibility = int(
    quality_available_num >= quality_required_num
)


# ============================================
# CREATE MODEL INPUT
# ============================================

features = pd.DataFrame([{
    "quantity_ratio": quantity_ratio,
    "price_compatibility": price_compatibility,
    "harvest_compatibility": harvest_compatibility,
    "location_compatibility": location_compatibility,
    "quality_compatibility": quality_compatibility
}])


# ============================================
# PREDICT MATCH SCORE
# ============================================

predicted_score = model.predict(features)[0]

predicted_score = max(
    0,
    min(100, predicted_score)
)


# ============================================
# DISPLAY MATCH RESULT
# ============================================

print("Farmer-Trader Matching Result")
print("-----------------------------")

print(
    f"Predicted Match Score: {predicted_score:.2f}%"
)


# ============================================
# GENERATE EXPLANATION
# ============================================

explanation = explain_match(
    quantity_ratio,
    quality_compatibility,
    price_compatibility,
    harvest_compatibility,
    location_compatibility
)


print("\nMatch Explanation")
print("-----------------")

print(f"Quantity:  {explanation['quantity']}")
print(f"Quality:   {explanation['quality']}")
print(f"Price:     {explanation['price']}")
print(f"Harvest:   {explanation['harvest']}")
print(f"Logistics: {explanation['logistics']}")