import { x402Client, wrapFetchWithPayment } from '@x402-avm/fetch'
import { ALGORAND_TESTNET_CAIP2 } from '@x402-avm/avm'
import type { ClientAvmSigner } from '@x402-avm/avm'
import { ExactAvmScheme } from '@x402-avm/avm/exact/client'

/** Creates a fetch function that responds to an x402 payment challenge. */
export async function createX402Fetch(walletSigner: any) {
  const client = new x402Client()
  let originalTransactions: Uint8Array[] = []

  const x402Signer: ClientAvmSigner = {
    address: walletSigner.address,
    signTransactions: async (transactions: Uint8Array[]) => {
      originalTransactions = transactions
      const signedTransactions = await walletSigner.signTransactions(transactions)

      if (!Array.isArray(signedTransactions)) {
        return signedTransactions
      }

      return signedTransactions.map((transaction: any, index: number) => {
        if (transaction === null || transaction === undefined) {
          return originalTransactions[index]
        }

        if (transaction instanceof Uint8Array) {
          return transaction
        }

        if (typeof transaction === 'string') {
          const binary = atob(transaction)
          return Uint8Array.from(binary, (character) => character.charCodeAt(0))
        }

        return originalTransactions[index]
      })
    },
  }

  client.register(ALGORAND_TESTNET_CAIP2, new ExactAvmScheme(x402Signer))
  return wrapFetchWithPayment(fetch, client)
}

/** Requests a paid AgriWise resource and returns the unlocked JSON response. */
export async function fetchPremiumWithPayment(url: string, walletSigner: any): Promise<any> {
  try {
    const fetchWithPayment = await createX402Fetch(walletSigner)
    const response = await fetchWithPayment(url)

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Premium intelligence request: ${error.message}`)
    }

    throw error
  }
}
