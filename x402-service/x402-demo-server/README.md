# AgriWise x402 Service

Hono resource server for paid premium farmer intelligence on Algorand TestNet.

## Protected endpoint

```text
GET /premium/farmer-a
Price: 0.005 TestNet USDC
```

After x402 payment settlement, the service fetches consented premium farmer data from the AgriWise backend.

## Run locally

```powershell
cd C:\Desktop\AgriWise\x402-service\x402-demo-server
npm install
npm start
```

The service runs on `http://localhost:4021`.

## Required local environment variables

```env
AVM_ADDRESS=your-algorand-testnet-receiver-address
FACILITATOR_URL=https://facilitator.goplausible.xyz
PORT=4021
BACKEND_BASE_URL=http://localhost:8000
INTERNAL_API_KEY=your-shared-internal-key
```

Keep `.env` private. Do not commit `INTERNAL_API_KEY` or backend/Supabase credentials.

## Integration flow

```text
Trader requests premium intelligence
→ x402 returns a 402 payment challenge
→ wallet signs TestNet USDC payment
→ facilitator settles payment
→ x402 calls the backend internal premium endpoint
→ backend checks consent and returns premium data
```
