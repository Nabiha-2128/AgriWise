from app.database import engine
from sqlalchemy.orm import sessionmaker
from app.models import Farmer, Profile, Trader
from datetime import datetime

Session = sessionmaker(bind=engine)
db = Session()

farmers_seed = [
    {"id": "farmer-a", "name": "Asha Devi", "location": "Nashik, Maharashtra", "crop": "Tomato"},
    {"id": "farmer-b", "name": "Ramesh Patil", "location": "Marthandam", "crop": "Tomato"},
    {"id": "farmer-c", "name": "Savita Jadhav", "location": "Nagercoil", "crop": "Tomato"},
]

for f in farmers_seed:
    profile = Profile(
        id=f"profile-{f['id']}",
        role="farmer",
        name=f["name"],
        verification_status="verified",
        trust_level="verified"
    )
    farmer = Farmer(
        id=f["id"],
        profile_id=profile.id,
        village_or_location=f["location"],
        crops=f["crop"],
        premium_data_consent=True,
        consent_updated_at=datetime.utcnow()
    )
    db.merge(profile)
    db.merge(farmer)

db.commit()
print("Seed data (farmers) inserted successfully.")

trader_profile = Profile(
    id="profile-trader-a",
    role="trader",
    name="Demo Trader",
    verification_status="verified",
    trust_level="verified"
)
trader = Trader(
    id="trader-a",
    profile_id=trader_profile.id,
    business_name="Demo Trading Co",
    business_location="Mumbai"
)
db.merge(trader_profile)
db.merge(trader)

db.commit()
print("Trader seeded successfully.")