import { ALGORAND_TESTNET_CAIP2, USDC_TESTNET_ASA_ID } from '@x402/avm'
import { declareDiscoveryExtension } from '@x402-avm/extensions'

export interface EndpointConfig {
  [key: string]: {
    accepts: Array<{
      scheme: 'exact'
      price: string
      network: string
      payTo: string
      extra: { asset: number }
    }>
    description: string
    extensions?: Record<string, unknown>
  }
}

export function createPaymentConfig(avmAddress: string): EndpointConfig {
  return {
    'GET /premium/farmer-a': {
      accepts: [
        {
          scheme: 'exact',
          price: '$0.005',
          network: ALGORAND_TESTNET_CAIP2,
          payTo: avmAddress,
          extra: {
            asset: Number(USDC_TESTNET_ASA_ID),
          },
        },
      ],

      description:
        'Authorized premium farmer intelligence — quality, harvest, reliability, and logistics data.',

      extensions: declareDiscoveryExtension({
        output: {
          example: {
            farmerId: 'farmer-a',
            qualityConfidence: 93,
            harvestConfidence: 91,
            supplyReliability: 96,
            logisticsReadiness: 'High',
            consentVerified: true,
            paidVia: 'x402 / GoPlausible / Algorand Testnet',
          },
        },
      }),
    },
  }
}

export default createPaymentConfig