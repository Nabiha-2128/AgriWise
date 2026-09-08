import React, { useState } from 'react'
import { useWallet } from '@txnlab/use-wallet-react'
import { fetchWeatherWithPayment } from '../utils/weatherApi'

type PremiumData = {
  farmerId: string
  farmerName: string
  crop: string
  location: string
  qualityConfidence: number
  harvestConfidence: number
  supplyReliability: number
  logisticsReadiness: string
  consentVerified: boolean
  paymentStatus: string
  paidVia: string
  recommendation: {
    initialMatchScore: number
    premiumMatchScore: number
    reason: string
  }
}

const PremiumIntelligence: React.FC = () => {
  const { activeAddress, signTransactions } = useWallet()

  const [loading, setLoading] = useState(false)
  const [premiumData, setPremiumData] = useState<PremiumData | null>(null)
  const [error, setError] = useState('')
  const [paymentStatus, setPaymentStatus] = useState('')

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4021'
  const premiumUrl = `${apiBaseUrl}/premium/farmer-a`

  const handleUnlockPremiumIntelligence = async () => {
    if (!activeAddress) {
      setError('Please connect your wallet first.')
      return
    }

    if (!signTransactions) {
      setError('This wallet does not support transaction signing.')
      return
    }

    setLoading(true)
    setError('')
    setPremiumData(null)
    setPaymentStatus('Requesting premium farmer intelligence...')

    try {
      const signer = {
        address: activeAddress,
        signTransactions,
      }

      setPaymentStatus('Waiting for approval in Pera Wallet...')
      const data = await fetchWeatherWithPayment(premiumUrl, signer)

      setPremiumData(data)
      setPaymentStatus('Payment settled on Algorand TestNet.')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to unlock premium intelligence.'
      setError(message)
      setPaymentStatus('')
      console.error('Premium intelligence request failed:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                AI RECOMMENDED
              </span>
              <span className="text-sm font-semibold text-slate-500">94% basic match</span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900">Farmer A · Asha Devi</h2>
            <p className="mt-1 text-slate-600">🍅 Tomato · Nashik, Maharashtra</p>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
              View basic crop availability free of charge, or unlock verified quality,
              harvest timing, reliability, and logistics intelligence.
            </p>
          </div>

          <div className="rounded-xl bg-emerald-50 px-4 py-3 text-left sm:text-right">
            <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">Premium access</p>
            <p className="mt-1 text-xl font-bold text-emerald-950">0.005 USDC</p>
            <p className="mt-1 text-xs text-emerald-700">Algorand TestNet</p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-xs font-semibold text-slate-500">Available quantity</p>
            <p className="mt-1 font-bold text-slate-900">12,500 kg</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-xs font-semibold text-slate-500">Crop quality</p>
            <p className="mt-1 font-bold text-slate-900">Verified</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-xs font-semibold text-slate-500">Collection point</p>
            <p className="mt-1 font-bold text-slate-900">Nashik</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-xs font-semibold text-slate-500">Farmer consent</p>
            <p className="mt-1 font-bold text-slate-900">Verified</p>
          </div>
        </div>

        <button
          className="btn mt-5 w-full border-0 bg-emerald-700 text-white hover:bg-emerald-800"
          onClick={handleUnlockPremiumIntelligence}
          disabled={loading || Boolean(premiumData)}
        >
          {loading
            ? 'Processing payment...'
            : premiumData
              ? 'Premium Intelligence Unlocked'
              : 'Unlock Premium Intelligence · 0.005 USDC'}
        </button>
      </div>

      {paymentStatus && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-900">
          <p className="font-semibold">{paymentStatus}</p>
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-red-800">
          <p className="font-semibold">Unable to complete payment</p>
          <p className="mt-1 text-sm">{error}</p>
        </div>
      )}

      {premiumData && (
        <section className="overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-lg">
          <div className="bg-gradient-to-r from-emerald-800 to-teal-700 p-5 text-white">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-emerald-100">
                  ✓ PAYMENT SUCCESSFUL
                </p>
                <h3 className="mt-1 text-2xl font-bold">Premium intelligence unlocked</h3>
                <p className="mt-1 text-sm text-emerald-100">
                  Verified farmer information is now available for this match.
                </p>
              </div>

              <div className="rounded-xl bg-white/15 px-4 py-3">
                <p className="text-xs font-semibold text-emerald-100">AI MATCH SCORE</p>
                <p className="mt-1 text-2xl font-bold">
                  {premiumData.recommendation.initialMatchScore}% →{' '}
                  {premiumData.recommendation.premiumMatchScore}%
                </p>
              </div>
            </div>
          </div>

          <div className="p-5">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-sm font-semibold text-slate-500">Quality confidence</p>
                <p className="mt-2 text-3xl font-bold text-emerald-700">
                  {premiumData.qualityConfidence}%
                </p>
                <p className="mt-2 text-xs text-slate-500">Produce quality is consistently high.</p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-sm font-semibold text-slate-500">Harvest confidence</p>
                <p className="mt-2 text-3xl font-bold text-emerald-700">
                  {premiumData.harvestConfidence}%
                </p>
                <p className="mt-2 text-xs text-slate-500">Expected harvest timing is reliable.</p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-sm font-semibold text-slate-500">Supply reliability</p>
                <p className="mt-2 text-3xl font-bold text-emerald-700">
                  {premiumData.supplyReliability}%
                </p>
                <p className="mt-2 text-xs text-slate-500">Farmer can meet the stated quantity.</p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-sm font-semibold text-slate-500">Logistics readiness</p>
                <p className="mt-2 text-2xl font-bold text-emerald-700">
                  {premiumData.logisticsReadiness}
                </p>
                <p className="mt-2 text-xs text-slate-500">Collection and delivery can be arranged.</p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-emerald-50 p-5">
              <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">
                AgriWise recommendation
              </p>
              <p className="mt-2 text-lg font-semibold text-emerald-950">
                {premiumData.recommendation.reason}
              </p>
              <p className="mt-2 text-sm text-emerald-800">
                Farmer consent: {premiumData.consentVerified ? 'Verified' : 'Pending'} · Payment: {premiumData.paidVia}
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default PremiumIntelligence