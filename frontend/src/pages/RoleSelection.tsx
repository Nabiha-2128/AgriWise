export type UserRole = 'farmer' | 'trader'

type RoleSelectionProps = {
  onSelectRole: (role: UserRole) => void
}

const RoleSelection = ({ onSelectRole }: RoleSelectionProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-800 to-teal-700 p-4 md:p-8">
      <main className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-5 text-white md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold tracking-[0.22em] text-emerald-200">
              SMART AGRICULTURE PLATFORM
            </p>

            <h1 className="mt-2 text-5xl font-bold md:text-6xl">
              🌿 AgriWise
            </h1>

            <p className="mt-2 text-lg text-emerald-100">
              Better decisions from farm to market.
            </p>
          </div>

          <div className="rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold">
            English | हिंदी | मराठी 🎙️
          </div>
        </header>

        <section className="rounded-[2rem] bg-white/95 p-6 shadow-2xl md:p-10">
          <div className="mx-auto max-w-2xl text-center">
            <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-800">
              WELCOME TO AGRIWISE
            </span>

            <h2 className="mt-6 text-3xl font-bold text-slate-900 md:text-5xl">
              How will you use AgriWise today?
            </h2>

            <p className="mt-4 text-lg text-slate-600">
              Choose your role for a simple, personalised agriculture experience.
            </p>
          </div>

          <div className="mt-10 grid gap-7 md:grid-cols-2">
            <button
              onClick={() => onSelectRole('farmer')}
              className="group overflow-hidden rounded-3xl border-2 border-emerald-200 bg-emerald-50 text-left transition duration-300 hover:-translate-y-2 hover:border-emerald-600 hover:shadow-2xl"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src="/images/farmer-portrait.png"
                  alt="Farmer holding tomatoes in a field"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  style={{ objectPosition: 'center 20%' }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-emerald-900/15 to-transparent" />

                <span className="absolute bottom-5 left-5 rounded-full bg-emerald-500 px-4 py-2 text-sm font-bold text-white shadow-lg">
                  FARMER PORTAL
                </span>
              </div>

              <div className="p-7">
                <h3 className="text-3xl font-bold text-slate-900">
                  I am a Farmer
                </h3>

                <p className="mt-3 text-lg leading-relaxed text-slate-600">
                  Plan irrigation, predict harvest timing, monitor crop health,
                  and buy wholesale materials at better prices.
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <span className="font-bold text-emerald-700">
                    Open farmer dashboard
                  </span>

                  <span className="rounded-full bg-emerald-600 px-4 py-2 font-bold text-white">
                    →
                  </span>
                </div>
              </div>
            </button>

            <button
              onClick={() => onSelectRole('trader')}
              className="group overflow-hidden rounded-3xl border-2 border-teal-200 bg-teal-50 text-left transition duration-300 hover:-translate-y-2 hover:border-teal-600 hover:shadow-2xl"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src="/images/trader-portrait.png"
                  alt="Produce trader in a wholesale market"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  style={{ objectPosition: 'center 20%' }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-teal-950/80 via-teal-900/15 to-transparent" />

                <span className="absolute bottom-5 left-5 rounded-full bg-teal-500 px-4 py-2 text-sm font-bold text-white shadow-lg">
                  TRADER PORTAL
                </span>
              </div>

              <div className="p-7">
                <h3 className="text-3xl font-bold text-slate-900">
                  I am a Trader
                </h3>

                <p className="mt-3 text-lg leading-relaxed text-slate-600">
                  Find verified farmers, compare supply options, monitor
                  logistics, and unlock premium market intelligence.
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <span className="font-bold text-teal-700">
                    Open trader dashboard
                  </span>

                  <span className="rounded-full bg-teal-600 px-4 py-2 font-bold text-white">
                    →
                  </span>
                </div>
              </div>
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-slate-500">
            Built for accessible, multilingual agricultural decision-making.
          </p>
        </section>
      </main>
    </div>
  )
}

export default RoleSelection