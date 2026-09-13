# Premium intelligence re-scoring for AgriWise

# Initial match score from the basic matching engine
initial_score = 94.47


# --------------------------------------------------
# PREMIUM FARMER INTELLIGENCE
# --------------------------------------------------

premium_data = {
    "quality_confidence": 93,
    "harvest_confidence": 91,
    "supply_reliability": 96,
    "logistics_readiness": "High"
}


# --------------------------------------------------
# CONVERT PREMIUM DATA TO NORMALIZED VALUES
# --------------------------------------------------

quality_confidence = premium_data["quality_confidence"] / 100
harvest_confidence = premium_data["harvest_confidence"] / 100
supply_reliability = premium_data["supply_reliability"] / 100

logistics_map = {
    "High": 1.0,
    "Medium": 0.7,
    "Low": 0.4
}

logistics_confidence = logistics_map[
    premium_data["logistics_readiness"]
]


# --------------------------------------------------
# CALCULATE PREMIUM CONFIDENCE
# --------------------------------------------------

premium_confidence = (
    quality_confidence * 0.25
    + harvest_confidence * 0.25
    + supply_reliability * 0.30
    + logistics_confidence * 0.20
)


premium_confidence_percentage = premium_confidence * 100


# --------------------------------------------------
# AI CONFIDENCE ADJUSTMENT
# --------------------------------------------------

# The premium information does not replace the
# original match score.
#
# Instead, it adjusts the score depending on how
# strong the newly obtained intelligence is.

confidence_difference = (
    premium_confidence_percentage - initial_score
)


# Maximum adjustment is intentionally limited so
# premium information cannot completely change the
# original matching decision.

adjustment = confidence_difference * 0.60


updated_score = initial_score + adjustment


updated_score = max(
    0,
    min(100, updated_score)
)


# --------------------------------------------------
# DISPLAY RESULTS
# --------------------------------------------------

print()
print("======================================")
print("       AGRIWISE PREMIUM INTELLIGENCE")
print("======================================")

print()
print("Initial Match")
print("-------------")

print(
    f"Match Score: {initial_score:.2f}%"
)

print()
print("Premium Intelligence")
print("--------------------")

print(
    f"Quality Confidence   : "
    f"{premium_data['quality_confidence']}%"
)

print(
    f"Harvest Confidence   : "
    f"{premium_data['harvest_confidence']}%"
)

print(
    f"Supply Reliability   : "
    f"{premium_data['supply_reliability']}%"
)

print(
    f"Logistics Readiness  : "
    f"{premium_data['logistics_readiness']}"
)

print()
print(
    f"Premium Confidence   : "
    f"{premium_confidence_percentage:.2f}%"
)

print()
print("AI Updated Decision")
print("-------------------")

print(
    f"Initial Match : {initial_score:.2f}%"
)

print(
    f"Updated Match : {updated_score:.2f}%"
)

print(
    f"Score Change  : "
    f"{updated_score - initial_score:+.2f}%"
)

print()

if updated_score >= 90:

    print(
        "Recommendation: PROCEED WITH FARMER"
    )

elif updated_score >= 75:

    print(
        "Recommendation: CONSIDER FARMER"
    )

else:

    print(
        "Recommendation: LOW CONFIDENCE"
    )

print()