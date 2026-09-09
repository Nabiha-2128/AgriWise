type FarmerDashboardProps = {
  onSwitchRole: () => void
}

const FarmerDashboard = ({ onSwitchRole }: FarmerDashboardProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 via-emerald-50 to-teal-100 p-4 md:p-8">
      <main className="mx-auto max-w-7xl">
        <header className="mb-6 flex flex-col gap-4 rounded-3xl bg-emerald-900 p-6 text-white shadow-xl md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold tracking-widest text-emerald-200">
              FARMER DASHBOARD
            </p>
            <h1 className="mt-1 text-3xl font-bold">🌿 Hello, Asha</h1>
            <p className="mt-2 text-emerald-100">
              Here are the best actions for your farm today.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button className="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
              English | हिंदी | मराठी
            </button>
            <button className="rounded-full bg-emerald-300 px-4 py-2 text-sm font-bold text-emerald-950">
              🎙️ Ask by voice
            </button>
            <button
              onClick={onSwitchRole}
              className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold hover:bg-white/10"
            >
              Switch role
            </button>
          </div>
        </header>

        <section className="mb-6">
          <p className="text-sm font-bold uppercase tracking-wider text-emerald-700">
            AI action plan
          </p>
          <h2 className="mt-1 text-3xl font-bold text-slate-900">Today&apos;s Farm Actions</h2>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          <article className="rounded-3xl border border-sky-200 bg-white p-6 shadow-lg">
            <div className="flex items-start justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 text-3xl">
                💧
              </div>
              <span className="rounded-full bg-sky-100 px-3 py-1 text-sm font-bold text-sky-800">
                High priority
              </span>
            </div>

            <h3 className="mt-5 text-2xl font-bold text-slate-900">Irrigate tomato plot</h3>
            <p className="mt-2 text-slate-600">
              Recommended at 6:00 AM tomorrow. Soil moisture is low and rainfall is unlikely.
            </p>

            <div className="mt-5 flex gap-3">
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs font-semibold text-slate-500">Water needed</p>
                <p className="mt-1 font-bold text-slate-900">1,200 L</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs font-semibold text-slate-500">AI confidence</p>
                <p className="mt-1 font-bold text-emerald-700">89%</p>
              </div>
            </div>
          </article>

          <article className="rounded-3xl border border-lime-200 bg-white p-6 shadow-lg">
            <div className="flex items-start justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-100 text-3xl">
                🌾
              </div>
              <span className="rounded-full bg-lime-100 px-3 py-1 text-sm font-bold text-lime-800">
                Recommended
              </span>
            </div>

            <h3 className="mt-5 text-2xl font-bold text-slate-900">Harvest tomatoes in 2 days</h3>
            <p className="mt-2 text-slate-600">
              Crop maturity is high and the local market price trend is favourable.
            </p>

            <div className="mt-5 flex gap-3">
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs font-semibold text-slate-500">Expected price</p>
                <p className="mt-1 font-bold text-slate-900">₹22.40 / kg</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs font-semibold text-slate-500">AI confidence</p>
                <p className="mt-1 font-bold text-emerald-700">91%</p>
              </div>
            </div>
          </article>
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-3">
          <article className="rounded-3xl bg-white p-6 shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-2xl">
              🌱
            </div>
            <h3 className="mt-4 text-xl font-bold text-slate-900">Crop Health</h3>
            <p className="mt-2 text-slate-600">
              Tomato crop is healthy. Continue regular pest monitoring.
            </p>
            <p className="mt-4 font-bold text-emerald-700">Healthy ✓</p>
          </article>

          <article className="rounded-3xl bg-white p-6 shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-2xl">
              🛒
            </div>
            <h3 className="mt-4 text-xl font-bold text-slate-900">Buy Wholesale Materials</h3>
            <p className="mt-2 text-slate-600">
              Compare verified suppliers for seeds, fertiliser, and equipment.
            </p>
            <button className="mt-4 rounded-xl bg-amber-500 px-4 py-2 font-bold text-white hover:bg-amber-600">
              Compare suppliers
            </button>
          </article>

          <article className="rounded-3xl bg-white p-6 shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-2xl">
              ☁️
            </div>
            <h3 className="mt-4 text-xl font-bold text-slate-900">Weather Alert</h3>
            <p className="mt-2 text-slate-600">
              70% chance of rain in the next 48 hours. Plan irrigation accordingly.
            </p>
            <p className="mt-4 font-bold text-purple-700">Rain expected</p>
          </article>
        </section>
      </main>
    </div>
  )
}

export default FarmerDashboard