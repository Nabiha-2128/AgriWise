farmers = [
    {
        "farmerId": "farmer-a",
        "farmerName": "Asha Devi",
        "crop": "Tomato",
        "location": "Nashik, Maharashtra",
        "availableQuantityKg": 12500,
        "qualityGrade": "A",
        "harvestWindow": "4-6 days",
        "verificationStatus": "verified",
        "trustLevel": "verified",
        "premiumData": {
            "qualityConfidence": 93,
            "harvestConfidence": 91,
            "supplyReliability": 96,
            "logisticsReadiness": "High",
            "premiumMatchScore": 97,
            "recommendation": "High-quality tomato supply with reliable harvest timing and ready logistics.",
            "consentVerified": True
        }
    },
    {
        "farmerId": "farmer-b",
        "farmerName": "Ramesh Patil",
        "crop": "Tomato",
        "location": "Marthandam",
        "availableQuantityKg": 3000,
        "qualityGrade": "B",
        "harvestWindow": "5-8 days",
        "verificationStatus": "verified",
        "trustLevel": "profile_complete",
        "premiumData": {
            "qualityConfidence": 82,
            "harvestConfidence": 78,
            "supplyReliability": 85,
            "logisticsReadiness": "Medium",
            "premiumMatchScore": 80,
            "recommendation": "Reasonable supply, moderate logistics readiness.",
            "consentVerified": True
        }
    },
    {
        "farmerId": "farmer-c",
        "farmerName": "Savita Jadhav",
        "crop": "Tomato",
        "location": "Nagercoil",
        "availableQuantityKg": 7200,
        "qualityGrade": "A",
        "harvestWindow": "3-6 days",
        "verificationStatus": "verified",
        "trustLevel": "trusted",
        "premiumData": {
            "qualityConfidence": 90,
            "harvestConfidence": 88,
            "supplyReliability": 94,
            "logisticsReadiness": "High",
            "premiumMatchScore": 92,
            "recommendation": "Strong supply reliability with good harvest timing.",
            "consentVerified": True
        }
    }
]

trader_requests = [
    {
        "traderId": "trader-a",
        "crop": "Tomato",
        "requiredQuantityKg": 5000,
        "qualityGrade": "A",
        "targetPricePerKg": 30,
        "deliveryDays": 7,
        "location": "Nashik, Maharashtra"
    }
]