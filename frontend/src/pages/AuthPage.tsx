import { useState } from 'react'
import type { UserRole } from './RoleSelection'

type AuthPageProps = {
  onAuthenticated: (role: UserRole) => void
}

type AuthMode = 'signin' | 'register'
type AuthStep = 'details' | 'otp'

const AuthPage = ({ onAuthenticated }: AuthPageProps) => {
  const [mode, setMode] = useState<AuthMode>('signin')
  const [step, setStep] = useState<AuthStep>('details')
  const [role, setRole] = useState<UserRole>('farmer')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')

  const isFarmer = role === 'farmer'

  const continueToOtp = () => {
    setError('')

    if (mode === 'register' && name.trim().length < 2) {
      setError('Please enter your full name.')
      return
    }

    if (!/^\d{10}$/.test(phone)) {
      setError('Enter a valid 10-digit mobile number.')
      return
    }

    setStep('otp')
  }

  const verifyOtp = () => {
    setError('')

    // Demo only — backend will replace this with real SMS OTP verification.
    if (otp !== '123456') {
      setError('Incorrect OTP. For this demo, use 123456.')
      return
    }

    onAuthenticated(role)
  }

  const resetForm = (nextMode: AuthMode) => {
    setMode(nextMode)
    setStep('details')
    setError('')
    setOtp('')
  }

  const actionColour = isFarmer
    ? 'bg-emerald-700 hover:bg-emerald-800'
    : 'bg-blue-700 hover:bg-blue-800'

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-800 to-teal-700 p-4 md:p-8">
      <main className="mx-auto flex min-h-screen max-w-6xl items-center justify-center">
        <section className="grid w-full overflow-hidden rounded-[2rem] bg-white shadow-2xl md:grid-cols-2">
          <div className="relative hidden min-h-[680px] overflow-hidden md:block">
            <img
              src="/images/india-network-hero.png"
              alt="India agriculture network"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/55 via-transparent to-emerald-950/70" />

            <div className="relative flex h-full flex-col justify-between p-10 text-white">
              <div>
                <p className="text-sm font-bold tracking-[0.22em] text-cyan-300">
                  SMART AGRICULTURE PLATFORM
                </p>

                <h1 className="mt-5 text-5xl font-bold">AgriWise</h1>

                <p className="mt-5 max-w-md text-xl leading-relaxed text-slate-100">
                  Better decisions for farmers. Better sourcing for traders.
                </p>
              </div>

              <div className="rounded-2xl border border-cyan-300/30 bg-slate-950/50 p-5 backdrop-blur-sm">
                <p className="text-lg font-bold">Built for everyone</p>
                <p className="mt-2 text-sm text-cyan-100">
                  English · हिंदी · मराठी · Voice assistance
                </p>
              </div>
            </div>
          </div>

          <div className="p-7 md:p-10">
            <div className="mb-8">
              <p className="text-sm font-bold tracking-[0.16em] text-emerald-700">
                SECURE ACCESS
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                {step === 'otp'
                  ? 'Verify your mobile number'
                  : mode === 'signin'
                    ? 'Welcome back'
                    : 'Create your account'}
              </h2>

              <p className="mt-2 text-slate-600">
                {step === 'otp'
                  ? 'Enter the verification code sent to your mobile.'
                  : 'Use your mobile number to continue with AgriWise.'}
              </p>
            </div>

            {step === 'details' ? (
              <>
                <div className="mb-6 flex rounded-xl bg-slate-100 p-1">
                  <button
                    onClick={() => resetForm('signin')}
                    className={`flex-1 rounded-lg px-4 py-3 font-bold transition ${
                      mode === 'signin'
                        ? 'bg-white text-emerald-700 shadow'
                        : 'text-slate-500'
                    }`}
                  >
                    Sign in
                  </button>

                  <button
                    onClick={() => resetForm('register')}
                    className={`flex-1 rounded-lg px-4 py-3 font-bold transition ${
                      mode === 'register'
                        ? 'bg-white text-emerald-700 shadow'
                        : 'text-slate-500'
                    }`}
                  >
                    Register
                  </button>
                </div>

                {mode === 'register' && (
                  <label className="mb-4 block">
                    <span className="mb-2 block text-sm font-bold text-slate-700">
                      Full name
                    </span>

                    <input
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Enter your name"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
                    />
                  </label>
                )}

                <label className="mb-5 block">
                  <span className="mb-2 block text-sm font-bold text-slate-700">
                    Mobile number
                  </span>

                  <input
                    value={phone}
                    onChange={(event) =>
                      setPhone(event.target.value.replace(/\D/g, '').slice(0, 10))
                    }
                    placeholder="10-digit mobile number"
                    inputMode="numeric"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
                  />
                </label>

                <div className="mb-6">
                  <span className="mb-3 block text-sm font-bold text-slate-700">
                    I am joining as a
                  </span>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setRole('farmer')}
                      className={`rounded-xl border-2 p-5 text-left transition ${
                        isFarmer
                          ? 'border-emerald-600 bg-emerald-50 shadow-sm'
                          : 'border-slate-200 bg-white hover:border-emerald-300'
                      }`}
                    >
                      <p className="text-sm font-bold tracking-wide text-emerald-700">
                        FARMER
                      </p>

                      <p className="mt-2 text-xl font-bold text-slate-900">
                        Continue as Farmer
                      </p>
                    </button>

                    <button
                      onClick={() => setRole('trader')}
                      className={`rounded-xl border-2 p-5 text-left transition ${
                        !isFarmer
                          ? 'border-blue-600 bg-blue-50 shadow-sm'
                          : 'border-slate-200 bg-white hover:border-blue-300'
                      }`}
                    >
                      <p className="text-sm font-bold tracking-wide text-blue-700">
                        TRADER
                      </p>

                      <p className="mt-2 text-xl font-bold text-slate-900">
                        Continue as Trader
                      </p>
                    </button>
                  </div>
                </div>

                {error && (
                  <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700">
                    {error}
                  </p>
                )}

                <button
                  onClick={continueToOtp}
                  className={`w-full rounded-xl px-5 py-4 text-lg font-bold text-white transition ${actionColour}`}
                >
                  {isFarmer
                    ? 'Continue as Farmer'
                    : 'Continue as Trader'}
                </button>
              </>
            ) : (
              <>
                <div className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900">
                  Verification code sent to <strong>{phone}</strong>
                  <br />
                  <span className="text-emerald-700">
                    Hackathon demo OTP: <strong>123456</strong>
                  </span>
                </div>

                <label className="mt-6 block">
                  <span className="mb-2 block text-sm font-bold text-slate-700">
                    Enter 6-digit OTP
                  </span>

                  <input
                    value={otp}
                    onChange={(event) =>
                      setOtp(event.target.value.replace(/\D/g, '').slice(0, 6))
                    }
                    placeholder="123456"
                    inputMode="numeric"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-center text-2xl font-bold tracking-[0.4em] outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
                  />
                </label>

                {error && (
                  <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700">
                    {error}
                  </p>
                )}

                <button
                  onClick={verifyOtp}
                  className={`mt-6 w-full rounded-xl px-5 py-4 text-lg font-bold text-white transition ${actionColour}`}
                >
                  {isFarmer
                    ? 'Verify and open Farmer Dashboard'
                    : 'Verify and open Trader Dashboard'}
                </button>

                <button
                  onClick={() => setStep('details')}
                  className="mt-3 w-full rounded-xl px-5 py-3 font-bold text-slate-600 hover:bg-slate-100"
                >
                  Change mobile number
                </button>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

export default AuthPage