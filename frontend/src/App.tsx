import { SnackbarProvider } from 'notistack'
import { WalletProvider, WalletManager, WalletId, type SupportedWallet } from '@txnlab/use-wallet-react'
import { useState } from 'react'
import { getAlgodConfigFromViteEnvironment, getKmdConfigFromViteEnvironment } from './utils/network/getAlgoClientConfigs'
import AuthPage from './pages/AuthPage'
import FarmerDashboard from './pages/FarmerDashboard'
import TraderDashboard from './pages/TraderDashboard'
import type { UserRole } from './pages/RoleSelection'

const supportedWallets: SupportedWallet[] = import.meta.env.VITE_ALGOD_NETWORK === 'localnet'
  ? [{ id: WalletId.KMD, options: (() => { const k = getKmdConfigFromViteEnvironment(); return { baseServer:k.server, token:String(k.token), port:String(k.port) } })() }]
  : [{ id: WalletId.DEFLY }, { id: WalletId.PERA }, { id: WalletId.EXODUS }, { id: WalletId.LUTE }]

export default function App() {
  const algodConfig = getAlgodConfigFromViteEnvironment()
  const [role, setRole] = useState<UserRole | null>(null)
  const walletManager = new WalletManager({
    wallets: supportedWallets,
    defaultNetwork: algodConfig.network,
    networks: { [algodConfig.network]: { algod: { baseServer: algodConfig.server, port: algodConfig.port, token: String(algodConfig.token) } } },
    options: { resetNetwork: true },
  })

  return <SnackbarProvider maxSnack={3}>
    <WalletProvider manager={walletManager}>
      {!role && <AuthPage onAuthenticated={setRole} />}
      {role === 'farmer' && <FarmerDashboard onSwitchRole={() => setRole(null)} />}
      {role === 'trader' && <TraderDashboard onSwitchRole={() => setRole(null)} />}
    </WalletProvider>
  </SnackbarProvider>
}
