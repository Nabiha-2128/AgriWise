import { useWallet } from '@txnlab/use-wallet-react'
import { useState } from 'react'
import ConnectWallet from './components/ConnectWallet'
import PremiumIntelligence from './components/PremiumIntelligence'

const Home = () => {
  const [openWalletModal, setOpenWalletModal] = useState(false)
  const { activeAddress } = useWallet()

  const toggleWalletModal = () => {
    setOpenWalletModal(!openWalletModal)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-800 to-teal-700 p-4 md:p-8">
      <main className="mx-auto max-w-6xl">
        <header className="mb-6 flex flex-col gap-4 rounded-3xl border border-white/20 bg-white/10 p-5 text-white shadow-xl backdrop-blur md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold tracking-widest text-emerald-200">
              AGRICULTURE MARKET INTELLIGENCE
            </p>
            <h1 className="mt-1 text-4xl font-bold md:text-5xl">AgriWise</h1>
            <p className="mt-2 text-emerald-100">
              Source reliable produce. Trade with confidence.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium">
              English | हिंदी | मराठी
            </span>
            <span className="rounded-full bg-emerald-300 px-4 py-2 text-sm font-bold text-emerald-950">
              Trader Portal
            </span>
          </div>
        </header>

        <section className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-lg">
            <p className="text-sm font-semibold text-slate-500">Verified farmers</p>
            <p className="mt-2 text-3xl font-bold text-emerald-800">128</p>
            <p className="mt-1 text-sm text-slate-500">Across 6 farming regions</p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-lg">
            <p className="text-sm font-semibold text-slate-500">Active matches</p>
            <p className="mt-2 text-3xl font-bold text-emerald-800">24</p>
            <p className="mt-1 text-sm text-slate-500">AI-ranked for your demand</p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-lg">
            <p className="text-sm font-semibold text-slate-500">Premium insight</p>
            <p className="mt-2 text-xl font-bold text-emerald-800">0.005 USDC</p>
            <p className="mt-1 text-sm text-slate-500">Pay only when you need detail</p>
          </div>
        </section>

        <section className="grid items-start gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-3xl bg-white p-6 shadow-xl">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-emerald-700">
                    Secure trader access
                  </p>
                  <h2 className="text-2xl font-bold text-slate-900">Connect your wallet</h2>
                  <p className="mt-1 text-slate-600">
                    Use your Algorand TestNet wallet to unlock premium farmer intelligence.
                  </p>
                </div>

                <span className="w-fit rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800">
                  Algorand TestNet
                </span>
              </div>

              <button
                className="btn mt-5 w-full border-0 bg-emerald-700 text-white hover:bg-emerald-800"
                onClick={toggleWalletModal}
                data-test-id="connect-wallet"
              >
                {activeAddress
                  ? `Wallet connected: ${activeAddress.slice(0, 12)}...`
                  : 'Connect Pera Wallet'}
              </button>

              {activeAddress && (
                <div className="mt-4 rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-emerald-900">
                  <span className="font-semibold">✓ Wallet connected successfully.</span>
                  <span className="ml-2 text-sm">
                    You can now unlock premium farmer data.
                  </span>
                </div>
              )}
            </div>

            {activeAddress ? (
              <div className="rounded-3xl bg-white p-3 shadow-xl">
                <div className="rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 p-5">
                  <p className="text-sm font-bold uppercase tracking-wider text-emerald-700">
                    Recommended farmer
                  </p>
                  <h2 className="mt-1 text-2xl font-bold text-slate-900">
                    Premium Farmer Intelligence
                  </h2>
                  <p className="mt-2 text-slate-600">
                    Unlock verified quality, harvest confidence, supply reliability, and logistics readiness.
                  </p>
                </div>

                <div className="p-3">
                  <PremiumIntelligence />
                </div>
              </div>
            ) : (
              <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center shadow-lg">
                <div className="mb-3 text-4xl">🔐</div>
                <h2 className="text-xl font-bold text-emerald-950">
                  Connect your wallet to view premium intelligence
                </h2>
                <p className="mx-auto mt-2 max-w-lg text-slate-600">
                  Connect Pera Wallet to unlock verified farmer quality, harvest timing,
                  supply reliability, and logistics data.
                </p>
              </div>
            )}
          </div>

          <aside className="self-start">
            <div className="h-fit rounded-[2.5rem] border-8 border-slate-900 bg-slate-950 p-3 shadow-2xl">
              <div className="overflow-hidden rounded-[2rem] bg-stone-50">
                <div className="bg-emerald-800 px-5 pb-5 pt-8 text-white">
                  <div className="mb-3 h-1.5 w-20 rounded-full bg-white/60" />
                  <p className="text-xs font-semibold tracking-widest text-emerald-200">
                    TRADER GUIDE
                  </p>
                  <h2 className="mt-1 text-2xl font-bold">Unlock premium data</h2>
                  <p className="mt-2 text-sm text-emerald-100">
                    Four simple steps to trade confidently.
                  </p>
                </div>

                <div className="space-y-4 p-5">
                  <div className="flex gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-800">
                      1
                    </span>
                    <div>
                      <p className="font-bold text-slate-900">Choose a farmer</p>
                      <p className="text-sm text-slate-600">
                        Review crop, location, quantity, and basic AI match score.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-800">
                      2
                    </span>
                    <div>
                      <p className="font-bold text-slate-900">Tap unlock</p>
                      <p className="text-sm text-slate-600">
                        Select Unlock Premium Intelligence for the chosen farmer.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-800">
                      3
                    </span>
                    <div>
                      <p className="font-bold text-slate-900">Approve in Pera Wallet</p>
                      <p className="text-sm text-slate-600">
                        Confirm the 0.005 USDC Algorand TestNet payment.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-800">
                      4
                    </span>
                    <div>
                      <p className="font-bold text-slate-900">Make a better decision</p>
                      <p className="text-sm text-slate-600">
                        View quality, harvest, reliability, logistics, and the upgraded match score.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-amber-50 p-4 text-sm text-amber-900">
                    <p className="font-bold">✓ Safe hackathon demo</p>
                    <p className="mt-1">This uses TestNet USDC, not real money.</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <ConnectWallet openModal={openWalletModal} closeModal={toggleWalletModal} />
      </main>
    </div>
  )
}

export default Home