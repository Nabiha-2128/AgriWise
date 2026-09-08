import { config } from 'dotenv'
import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { paymentMiddleware } from '@x402/hono'
import { x402ResourceServer, HTTPFacilitatorClient } from '@x402/core/server'
import type { ResourceServerExtension } from '@x402/core/types'
import { ExactAvmScheme } from '@x402/avm/exact/server'
import { ALGORAND_TESTNET_CAIP2 } from '@x402/avm'
import { bazaarResourceServerExtension } from '@x402-avm/extensions'

import { handlePremiumIntelligenceRequest } from './handlers/premium-intelligence'
import createPaymentConfig, { EndpointConfig } from './endpoints.config'

config()

const avmAddress = process.env.AVM_ADDRESS
const facilitatorUrl = process.env.FACILITATOR_URL
const port = parseInt(process.env.PORT || '4021', 10)

if (!avmAddress || !facilitatorUrl) {
  console.error(
    'Missing required environment variables:\n' +
      '- AVM_ADDRESS\n' +
      '- FACILITATOR_URL'
  )
  process.exit(1)
}

console.log('\n' + '═'.repeat(60))
console.log('AGRIWISE x402 PREMIUM INTELLIGENCE SERVICE')
console.log('═'.repeat(60))
console.log(`Receiver Address: ${avmAddress}`)
console.log(`Facilitator: ${facilitatorUrl}`)
console.log(`Port: ${port}`)
console.log('═'.repeat(60) + '\n')

const facilitatorClient = new HTTPFacilitatorClient({
  url: facilitatorUrl,
})

const x402Server = new x402ResourceServer(facilitatorClient)
  .register(ALGORAND_TESTNET_CAIP2, new ExactAvmScheme())
  .registerExtension(
    bazaarResourceServerExtension as unknown as ResourceServerExtension
  )

const app = new Hono()

app.use('*', async (c, next) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE, HEAD',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Expose-Headers': '*',
    'Access-Control-Max-Age': '86400',
  }

  if (c.req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    })
  }

  Object.entries(corsHeaders).forEach(([key, value]) => {
    c.header(key, value)
  })

  await next()
})

app.use('*', async (c, next) => {
  const timestamp = new Date().toISOString()

  console.log(`\n[${timestamp}] ${c.req.method.toUpperCase()} ${c.req.path}`)

  if (c.req.header('payment-signature')) {
    console.log('Payment-Signature header detected')
  }

  await next()

  console.log(`Response: ${c.res.status}`)
})

const paymentConfig: EndpointConfig = createPaymentConfig(avmAddress)

console.log('Registered Payment-Protected Endpoints:')

Object.entries(paymentConfig).forEach(([route, endpoint]) => {
  const price = endpoint.accepts[0]?.price || 'unknown'
  console.log(`${route} — ${price} USDC — ${endpoint.description}`)
})

console.log()

app.use(paymentMiddleware(paymentConfig as any, x402Server))

// x402-protected AgriWise endpoint.
app.get('/premium/farmer-a', handlePremiumIntelligenceRequest)

app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    service: 'agriwise-x402-service',
    uptime: process.uptime(),
  })
})

app.get('/info', (c) => {
  return c.json({
    service: 'agriwise-x402-service',
    version: '1.0.0',
    network: 'Algorand Testnet',
    facilitator: 'GoPlausible',
    receiver: avmAddress,
    endpoints: Object.keys(paymentConfig),
  })
})

app.notFound((c) => {
  return c.json(
    {
      error: 'Endpoint not found',
      path: c.req.path,
      hint: 'Try GET /health, GET /info, or GET /premium/farmer-a.',
    },
    404
  )
})

serve({ fetch: app.fetch, port }, () => {
  console.log('\nAgriWise x402 service is running.\n')
  console.log(`API: http://localhost:${port}`)
  console.log(`Health: http://localhost:${port}/health`)
  console.log(`Premium endpoint: http://localhost:${port}/premium/farmer-a`)
  console.log()
})