from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import declarative_base
from datetime import datetime

Base = declarative_base()

class Profile(Base):
    __tablename__ = "profiles"
    id = Column(String, primary_key=True)
    auth_user_id = Column(String)
    role = Column(String)  # farmer | trader | admin
    name = Column(String)
    phone_number = Column(String)
    email = Column(String)
    verification_status = Column(String, default="pending")  # pending | verified | rejected
    trust_level = Column(String, default="new")  # new | profile_complete | verified | trusted
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Farmer(Base):
    __tablename__ = "farmers"
    id = Column(String, primary_key=True)  # e.g. farmer-a
    profile_id = Column(String, ForeignKey("profiles.id"))
    village_or_location = Column(String)
    district = Column(String)
    state = Column(String)
    land_acres = Column(Float)
    crops = Column(String)
    premium_data_consent = Column(Boolean, default=False)
    consent_updated_at = Column(DateTime)
    verification_notes = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Trader(Base):
    __tablename__ = "traders"
    id = Column(String, primary_key=True)
    profile_id = Column(String, ForeignKey("profiles.id"))
    business_name = Column(String)
    business_location = Column(String)
    gst_or_business_reference = Column(String, nullable=True)
    wallet_address = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Product(Base):
    __tablename__ = "products"
    id = Column(String, primary_key=True)
    farmer_id = Column(String, ForeignKey("farmers.id"))
    crop = Column(String)
    quantity_kg = Column(Float)
    quality_grade = Column(String)
    expected_harvest_date = Column(DateTime)
    price_per_kg = Column(Float)
    location = Column(String)
    photo_url = Column(String, nullable=True)
    status = Column(String, default="available")  # available | reserved | sold
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class TraderRequest(Base):
    __tablename__ = "trader_requests"
    id = Column(String, primary_key=True)
    trader_id = Column(String, ForeignKey("traders.id"))
    farmer_id = Column(String, ForeignKey("farmers.id"))
    product_id = Column(String, ForeignKey("products.id"))
    quantity_kg = Column(Float)
    offered_price_per_kg = Column(Float)
    delivery_location = Column(String)
    delivery_date = Column(DateTime)
    status = Column(String, default="pending")  # pending | accepted | rejected | fulfilled | cancelled
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class PremiumAccessLog(Base):
    __tablename__ = "premium_access_logs"
    id = Column(String, primary_key=True)
    farmer_id = Column(String, ForeignKey("farmers.id"))
    trader_id = Column(String, nullable=True)
    x402_transaction_reference = Column(String, nullable=True)
    payment_status = Column(String)
    accessed_at = Column(DateTime, default=datetime.utcnow)

class VerificationEvidence(Base):
    __tablename__ = "verification_evidence"
    id = Column(String, primary_key=True)
    profile_id = Column(String, ForeignKey("profiles.id"))
    evidence_type = Column(String)  # location | crop_photo | document | partner_review
    file_url = Column(String)
    review_status = Column(String, default="pending")  # pending | approved | rejected
    reviewer_notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)