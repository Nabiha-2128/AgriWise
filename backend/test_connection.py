from app.database import engine
from sqlalchemy import text

try:
    with engine.connect() as conn:
        result = conn.execute(text("SELECT 1"))
        print("SUCCESS: Connected to Supabase database!")
except Exception as e:
    print("FAILED to connect:")
    print(e)