from fastapi import FastAPI, HTTPException, Header, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.data import farmers, trader_requests
from app.models import Product, Farmer, TraderRequest, VerificationEvidence, Profile, PremiumAccessLog
from datetime import datetime
import uuid

app = FastAPI()

INTERNAL_API_KEY = "devkey123"  # matches .env for now — will read from env later

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/farmers")
def get_all_farmers():
    return [
        {k: v for k, v in f.items() if k != "premiumData"}
        for f in farmers
    ]

@app.get("/farmers/{farmer_id}/basic")
def get_farmer_basic(farmer_id: str):
    for f in farmers:
        if f["farmerId"] == farmer_id:
            return {k: v for k, v in f.items() if k != "premiumData"}
    raise HTTPException(status_code=404, detail="Farmer not found")

@app.post("/trader/requests")
def add_trader_request(trader: dict):
    trader_requests.append(trader)
    return {"message": "Trader request added successfully", "trader": trader}

@app.get("/trader/requests")
def get_trader_requests():
    return trader_requests

@app.get("/matches/{trader_id}")
def get_matches(trader_id: str):
    matches = []
    for f in farmers:
        matches.append({
            "farmerId": f["farmerId"],
            "matchScore": f["premiumData"]["premiumMatchScore"] - 3,
            "matchReason": "Matching crop, quantity, location, and quality requirements.",
            "crop": f["crop"],
            "quantityKg": f["availableQuantityKg"],
            "location": f["location"],
            "verificationStatus": f["verificationStatus"]
        })
    return {"traderId": trader_id, "matches": matches}

@app.post("/recommendation")
def get_recommendation(data: dict):
    return {
        "irrigationRecommendation": "Irrigate early morning to reduce evaporation loss.",
        "harvestRecommendation": "Harvest window is optimal within the next 4-6 days.",
        "materialRecommendation": "Consider potassium-rich fertilizer for fruit development.",
        "confidence": 0.85,
        "generatedAt": datetime.utcnow().isoformat()
    }

@app.get("/internal/premium/farmer/{farmer_id}")
def get_premium_farmer_data(farmer_id: str, x_agriwise_internal_key: str = Header(None), db: Session = Depends(get_db)):
    if x_agriwise_internal_key != INTERNAL_API_KEY:
        raise HTTPException(status_code=401, detail="Invalid or missing internal key")

    for f in farmers:
        if f["farmerId"] == farmer_id:
            if not f["premiumData"]["consentVerified"]:
                raise HTTPException(status_code=403, detail="Farmer has not given premium data consent")

            log_entry = PremiumAccessLog(
                id=str(uuid.uuid4()),
                farmer_id=farmer_id,
                payment_status="settled",
                accessed_at=datetime.utcnow()
            )
            db.add(log_entry)
            db.commit()

            return {
                "farmerId": f["farmerId"],
                "farmerName": f["farmerName"],
                "crop": f["crop"],
                "location": f["location"],
                **f["premiumData"],
                "paymentStatus": "settled"
            }
    raise HTTPException(status_code=404, detail="Farmer not found")

@app.post("/products")
def create_product(product: dict, db: Session = Depends(get_db)):
    new_product = Product(
        id=str(uuid.uuid4()),
        farmer_id=product.get("farmerId"),
        crop=product.get("crop"),
        quantity_kg=product.get("quantityKg"),
        quality_grade=product.get("qualityGrade"),
        price_per_kg=product.get("pricePerKg"),
        location=product.get("location"),
        status="available"
    )
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return {"message": "Product created", "productId": new_product.id}

@app.get("/products")
def get_products(db: Session = Depends(get_db)):
    return db.query(Product).all()

@app.get("/products/{product_id}")
def get_product(product_id: str, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@app.get("/farmers/{farmer_id}/products")
def get_farmer_products(farmer_id: str, db: Session = Depends(get_db)):
    return db.query(Product).filter(Product.farmer_id == farmer_id).all()

@app.put("/products/{product_id}")
def update_product(product_id: str, updates: dict, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    for key, value in updates.items():
        if hasattr(product, key):
            setattr(product, key, value)
    db.commit()
    return {"message": "Product updated"}

@app.delete("/products/{product_id}")
def delete_product(product_id: str, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(product)
    db.commit()
    return {"message": "Product deleted"}

@app.post("/trader/requests/db")
def create_trader_request_db(request: dict, db: Session = Depends(get_db)):
    new_request = TraderRequest(
        id=str(uuid.uuid4()),
        trader_id=request.get("traderId"),
        farmer_id=request.get("farmerId"),
        product_id=request.get("productId"),
        quantity_kg=request.get("quantityKg"),
        offered_price_per_kg=request.get("offeredPricePerKg"),
        delivery_location=request.get("deliveryLocation"),
        status="pending"
    )
    db.add(new_request)
    db.commit()
    db.refresh(new_request)
    return {"message": "Trader request created", "requestId": new_request.id}

@app.get("/farmers/{farmer_id}/requests")
def get_farmer_requests(farmer_id: str, db: Session = Depends(get_db)):
    return db.query(TraderRequest).filter(TraderRequest.farmer_id == farmer_id).all()

@app.post("/trader/requests/{request_id}/accept")
def accept_request(request_id: str, db: Session = Depends(get_db)):
    req = db.query(TraderRequest).filter(TraderRequest.id == request_id).first()
    if not req:
        raise HTTPException(status_code=404, detail="Request not found")
    req.status = "accepted"
    db.commit()
    return {"message": "Request accepted", "requestId": request_id}

@app.post("/trader/requests/{request_id}/reject")
def reject_request(request_id: str, db: Session = Depends(get_db)):
    req = db.query(TraderRequest).filter(TraderRequest.id == request_id).first()
    if not req:
        raise HTTPException(status_code=404, detail="Request not found")
    req.status = "rejected"
    db.commit()
    return {"message": "Request rejected", "requestId": request_id}

@app.get("/deals")
def get_deals(db: Session = Depends(get_db)):
    return db.query(TraderRequest).filter(TraderRequest.status == "accepted").all()

@app.post("/verification/evidence")
def submit_evidence(evidence: dict, db: Session = Depends(get_db)):
    new_evidence = VerificationEvidence(
        id=str(uuid.uuid4()),
        profile_id=evidence.get("profileId"),
        evidence_type=evidence.get("evidenceType"),
        file_url=evidence.get("fileUrl"),
        review_status="pending"
    )
    db.add(new_evidence)
    db.commit()
    db.refresh(new_evidence)
    return {"message": "Evidence submitted", "evidenceId": new_evidence.id}

@app.get("/verification/status")
def get_verification_status(profile_id: str, db: Session = Depends(get_db)):
    profile = db.query(Profile).filter(Profile.id == profile_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return {
        "profileId": profile.id,
        "verificationStatus": profile.verification_status,
        "trustLevel": profile.trust_level
    }

@app.put("/admin/verification/{profile_id}")
def update_verification(profile_id: str, updates: dict, db: Session = Depends(get_db)):
    profile = db.query(Profile).filter(Profile.id == profile_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    if "verificationStatus" in updates:
        profile.verification_status = updates["verificationStatus"]
    if "trustLevel" in updates:
        profile.trust_level = updates["trustLevel"]
    db.commit()
    return {"message": "Verification updated", "profileId": profile_id}