import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# NOTE: this will only actually connect once DATABASE_URL
# is replaced with a real Supabase connection string.
engine = create_engine(DATABASE_URL) if DATABASE_URL and "placeholder" not in DATABASE_URL else None

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine) if engine else None

def get_db():
    if SessionLocal is None:
        raise RuntimeError("Database not connected yet — waiting on real Supabase credentials in .env")
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()