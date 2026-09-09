import { SupportedWallet, WalletId, WalletManager, WalletProvider } from '@txnlab/use-wallet-react'
import { SnackbarProvider } from 'notistack'
import { useState } from 'react'
import Home from './Home'
import AuthPage from './pages/AuthPage'
import FarmerDashboard from './pages/FarmerDashboard'
import type { UserRole } from './pages/RoleSelection'
import {
  getAlgodConfigFromViteEnvironment,
  getKmdConfigFromViteEnvironment,
} from './utils/network/getAlgoClientConfigs'

let supportedWallets: SupportedWallet[]

if (import.meta.env.VITE_ALGOD_NETWORK === 'localnet') {
  const kmdConfig = getKmdConfigFromViteEnvironment()

  supportedWallets = [
    {
      id: WalletId.KMD,
      options: {
        baseServer: kmdConfig.server,
        token: String(kmdConfig.token),
        port: String(kmdConfig.port),
      },
    },
  ]
} else {
  supportedWallets = [
    { id: WalletId.DEFLY },
    { id: WalletId.PERA },
    { id: WalletId.EXODUS },
    { id: WalletId.LUTE },
  ]
}

export default function App() {
  const algodConfig = getAlgodConfigFromViteEnvironment()

  // No user is signed in when the app first opens.
  const [role, setRole] = useState<UserRole | null>(null)

  const walletManager = new WalletManager({
    wallets: supportedWallets,
    defaultNetwork: algodConfig.network,
    networks: {
      [algodConfig.network]: {
        algod: {
          baseServer: algodConfig.server,
          port: algodConfig.port,
          token: String(algodConfig.token),
        },
      },
    },
    options: {
      resetNetwork: true,
    },
  })

  const logout = () => {
    setRole(null)
  }

  return (
    <SnackbarProvider maxSnack={3}>
      <WalletProvider manager={walletManager}>
        {!role && (
          <AuthPage
            onAuthenticated={(selectedRole) => setRole(selectedRole)}
          />
        )}

        {role === 'farmer' && (
          <FarmerDashboard onSwitchRole={logout} />
        )}

        {role === 'trader' && (
          <div className="relative">
            <button
              onClick={logout}
              className="fixed right-4 top-4 z-[100] rounded-full border border-white/40 bg-emerald-950 px-4 py-2 text-sm font-bold text-white shadow-lg transition hover:bg-emerald-800"
            >
              Sign out
            </button>

            <Home />
          </div>
        )}
      </WalletProvider>
    </SnackbarProvider>
  )
}