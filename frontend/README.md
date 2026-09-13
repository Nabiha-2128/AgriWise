# AgriWise Frontend

React and Vite frontend for AgriWise, an agriculture market-intelligence platform for farmers and traders.

## Current features

- Farmer and trader demo access flow
- Algorand TestNet wallet connection
- x402 payment flow for premium farmer intelligence
- Farmer and trader dashboard foundations

## Run locally

```powershell
cd C:\Desktop\AgriWise\frontend
npm install
npm run dev -- --port 5180
```

Open `http://localhost:5180`.

## Local configuration

Create `frontend/.env.local` from the existing TestNet configuration. Do not commit it.

```env
VITE_ENVIRONMENT=testnet
VITE_ALGOD_SERVER=https://testnet-api.algonode.cloud
VITE_ALGOD_NETWORK=testnet
VITE_INDEXER_SERVER=https://testnet-idx.algonode.cloud
VITE_API_BASE_URL=http://localhost:4021
VITE_FACILITATOR_URL=https://facilitator.goplausible.xyz
```

## Important

- Premium intelligence is a trader feature and uses x402 TestNet USDC payment.
- Never place Supabase secret keys, database URLs, or internal API keys in this frontend.
