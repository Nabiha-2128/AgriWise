import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
import joblib

# 1. Load our dataset
data = pd.read_csv("ai/data/matching_dataset.csv")

# 2. Convert quality grades into numbers
quality_map = {
    "A": 1,
    "B": 0.5
}

data["quality_required"] = data["quality_required"].map(quality_map)
data["quality_available"] = data["quality_available"].map(quality_map)

# 3. Create useful matching features

data["quantity_ratio"] = (
    data["quantity_available"] / data["quantity_required"]
).clip(upper=1)

data["price_difference"] = abs(
    data["target_price"] - data["farmer_price"]
)

data["price_compatibility"] = (
    1 - data["price_difference"] / data["target_price"]
).clip(lower=0)

data["harvest_difference"] = abs(
    data["days_required"] - data["days_to_harvest"]
)

data["harvest_compatibility"] = (
    1 - data["harvest_difference"] / data["days_required"]
).clip(lower=0)

data["location_compatibility"] = (
    1 - data["distance_km"] / 50
).clip(lower=0)

data["quality_compatibility"] = (
    data["quality_available"] >= data["quality_required"]
).astype(int)

# 4. Select the features our model will learn from
features = [
    "quantity_ratio",
    "price_compatibility",
    "harvest_compatibility",
    "location_compatibility",
    "quality_compatibility"
]

X = data[features]
y = data["match_score"]

# 5. Split the data into training and testing data
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# 6. Create the Random Forest model
model = RandomForestRegressor(
    n_estimators=100,
    random_state=42
)

# 7. Train the model
model.fit(X_train, y_train)

# 8. Test the model
predictions = model.predict(X_test)

error = mean_absolute_error(y_test, predictions)

print("Model trained successfully!")
print(f"Average prediction error: {error:.2f}")

# 9. Save the trained model
joblib.dump(model, "ai/matching_model.pkl")

print("Model saved as ai/matching_model.pkl")