# AgriWise Backend

FastAPI backend for AgriWise — AI-Powered Sustainable Farm & Market Intelligence.

## Setup

1. Create a virtual environment and activate it:
   python -m venv venv
   venv\Scripts\activate

2. Install dependencies:
   pip install -r requirements.txt

3. Copy .env.example to .env and fill in real values (get these from the team lead):
   SUPABASE_URL=
   SUPABASE_ANON_KEY=
   SUPABASE_SERVICE_ROLE_KEY=
   DATABASE_URL=
   INTERNAL_API_KEY=
   CORS_ORIGINS=http://localhost:5180,http://localhost:5173

## Running the server

uvicorn app.main:app --reload

Server runs at http://127.0.0.1:8000
Interactive docs at http://127.0.0.1:8000/docs

## Current status

- Endpoints are built and tested using in-memory placeholder data (app/data.py).
- Database table structures are defined in app/models.py (SQLAlchemy), matching the Supabase schema, but not yet connected to a live Supabase project.
- Authentication (Supabase Auth / JWT) is not yet implemented.
- The /internal/premium/farmer/{farmer_id} endpoint is protected by a header key (X-AgriWise-Internal-Key), matching INTERNAL_API_KEY in .env. This endpoint should only ever be called by the x402 service, never the frontend.

## Files

- app/main.py — all API endpoints
- app/data.py — seeded farmer/trader placeholder data
- app/models.py — SQLAlchemy database table definitions
- app/schemas.py — Pydantic request/response shapes
- app/database.py — database connection setup (inactive until real Supabase credentials are added)

## x402 Integration Guide

The x402 service should call this endpoint only after payment is confirmed settled:

**Endpoint:** `GET /internal/premium/farmer/{farmer_id}`
**Example:** `GET http://127.0.0.1:8000/internal/premium/farmer/farmer-a`

**Required header:**

(This value matches `INTERNAL_API_KEY` in backend/.env — ask the backend member if this changes.)

**Responses:**
- `401` — header missing or incorrect
- `403` — farmer has not given premium data consent
- `404` — farmer does not exist
- `200` — returns full premium farmer JSON (see docs/api-contract.md for exact shape)

Every successful call is automatically logged in the `premium_access_logs` table (farmer ID, payment status, timestamp).
X-AgriWise-Internal-Key: devkey123