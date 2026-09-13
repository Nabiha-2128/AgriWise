from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

# ---------- Farmer public data ----------
class FarmerBasic(BaseModel):
    farmerId: str
    farmerName: str
    crop: str
    location: str
    availableQuantityKg: float
    qualityGrade: str
    harvestWindow: str
    verificationStatus: str
    trustLevel: str

# ---------- Premium data (paid) ----------
class PremiumFarmerData(BaseModel):
    farmerId: str
    farmerName: str
    crop: str
    location: str
    qualityConfidence: int
    harvestConfidence: int
    supplyReliability: int
    logisticsReadiness: str
    premiumMatchScore: int
    recommendation: str
    consentVerified: bool
    paymentStatus: str

# ---------- Matches ----------
class MatchItem(BaseModel):
    farmerId: str
    matchScore: int
    matchReason: str
    crop: str
    quantityKg: float
    location: str
    verificationStatus: str

class MatchResponse(BaseModel):
    traderId: str
    matches: List[MatchItem]

# ---------- Recommendation ----------
class RecommendationRequest(BaseModel):
    farmerId: str
    crop: str
    landAcres: float
    cropStage: str
    lastWateredDate: str
    location: str
    language: str = "en"

class RecommendationResponse(BaseModel):
    irrigationRecommendation: str
    harvestRecommendation: str
    materialRecommendation: str
    confidence: float
    generatedAt: str