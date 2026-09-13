import { useState } from 'react'
import { useWallet } from '@txnlab/use-wallet-react'
import ConnectWallet from '../components/ConnectWallet'
import PremiumIntelligence from '../components/PremiumIntelligence'

type Props = { onSwitchRole: () => void }
type Page = 'Overview' | 'Farmers' | 'Deals' | 'Logistics' | 'Insights'

type IconName = 'grid' | 'farmers' | 'deals' | 'truck' | 'chart' | 'mic' | 'volume' | 'wallet' | 'plus' | 'arrow' | 'search'
const Icon = ({ name, size = 18 }: { name: IconName; size?: number }) => {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  const paths: Record<IconName, JSX.Element> = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    farmers: <><circle cx="9" cy="8" r="3"/><path d="M3.5 20a5.5 5.5 0 0 1 11 0"/><circle cx="17" cy="9" r="2.3"/><path d="M15 14.5a4.8 4.8 0 0 1 5.2 5.5"/></>,
    deals: <><path d="m8 12 3 3 5-6"/><path d="M20.5 13.5a5 5 0 0 1-7 7l-2-2"/><path d="M3.5 10.5a5 5 0 0 1 7-7l2 2"/><path d="M8 12H4"/><path d="M20 12h-4"/></>,
    truck: <><path d="M3 6h11v10H3z"/><path d="M14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></>,
    chart: <><path d="M4 19V5"/><path d="M4 19h16"/><path d="m7 15 3-4 3 2 5-7"/></>,
    mic: <><rect x="8" y="3" width="8" height="12" rx="4"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6"/></>,
    volume: <><path d="M4 10v4h4l5 4V6l-5 4z"/><path d="M17 9a5 5 0 0 1 0 6M19.5 6.5a9 9 0 0 1 0 11"/></>,
    wallet: <><path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6.5A2.5 2.5 0 0 1 4 16.5z"/><path d="M4 8h15"/><path d="M17 13h2"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    arrow: <><path d="M5 12h13"/><path d="m13 6 6 6-6 6"/></>,
    search: <><circle cx="10.8" cy="10.8" r="6.3"/><path d="m16 16 4.5 4.5"/></>,
  }
  return <svg {...common}>{paths[name]}</svg>
}

const Verified = () => <span className="aw-badge aw-badge-green"><span>✓</span> Verified Farmer</span>
const Trusted = () => <span className="aw-badge aw-badge-blue"><span>✓</span> Trusted Trader</span>

function Header({ onSwitchRole, onAsk }: { onSwitchRole: () => void; onAsk: () => void }) {
  return <header className="aw-header">
    <div className="aw-brand-block">
      <div className="aw-brand-kicker">AGRICULTURE MARKET INTELLIGENCE</div>
      <div className="aw-brand-title">AgriWise</div>
      <div className="aw-brand-subtitle">Source reliable produce. Trade with confidence.</div>
    </div>
    <div className="aw-header-actions">
      <span className="aw-language">English | हिंदी | मराठी</span>
      <span className="aw-role-pill">Trader Portal</span>
      <button className="aw-ghost-dark" onClick={onAsk}><Icon name="mic" size={15}/> Ask AgriWise</button>
      <button className="aw-signout" onClick={onSwitchRole}>Sign out</button>
    </div>
  </header>
}

function SideNav({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  const items: [Page, IconName][] = [['Overview','grid'],['Farmers','farmers'],['Deals','deals'],['Logistics','truck'],['Insights','chart']]
  return <aside className="aw-side-nav"><div className="aw-nav-label">TRADER WORKSPACE</div>{items.map(([name, icon]) => <button key={name} className={page === name ? 'active' : ''} onClick={() => setPage(name)}><Icon name={icon}/><span>{name}</span></button>)}</aside>
}

function Guide() {
  return <aside className="aw-guide-wrap"><div className="aw-phone"><div className="aw-phone-screen"><div className="aw-phone-head"><div className="aw-phone-line"/><div className="aw-guide-kicker">TRADER GUIDE</div><h3>Unlock premium data</h3><p>Four simple steps to trade confidently.</p></div><div className="aw-guide-body">{[['Choose a farmer','Review crop, location, quantity, and basic AI match score.'],['Tap unlock','Select Unlock Premium Intelligence for the chosen farmer.'],['Approve in Pera Wallet','Confirm the 0.005 USDC Algorand TestNet payment.'],['Make a better decision','View quality, harvest, reliability, logistics, and the upgraded match score.']].map((x,i)=><div className="aw-guide-step" key={x[0]}><span>{i+1}</span><div><b>{x[0]}</b><p>{x[1]}</p></div></div>)}<div className="aw-safe-note"><b>✓ Safe hackathon demo</b><span>This uses TestNet USDC, not real money.</span></div></div></div></div></aside>
}

function Overview({ openWallet, onPremium }: { openWallet: () => void; onPremium: () => void }) {
  const { activeAddress } = useWallet()
  return <div className="aw-page">
    <div className="aw-page-top"><div><div className="aw-eyebrow">TRADER DASHBOARD</div><h1>Good morning, Sharma Traders</h1><p>Track supply, deals and market intelligence in one place.</p></div><button className="aw-light-button" onClick={onPremium}>Unlock Premium Intelligence</button></div>
    <div className="aw-stat-grid"><div className="aw-stat"><small>Verified farmers</small><strong>128</strong><span>Across 6 farming regions</span></div><div className="aw-stat"><small>Active matches</small><strong>24</strong><span>AI-ranked for your demand</span></div><div className="aw-stat"><small>Premium insight</small><strong>0.005 USDC</strong><span>Pay only when you need detail</span></div></div>
    <div className="aw-main-grid"><div className="aw-main-column">
      <section className="aw-card aw-wallet-card"><div className="aw-card-head"><div><div className="aw-eyebrow">SECURE TRADER ACCESS</div><h2>Connect your wallet</h2><p>Use your Algorand TestNet wallet to unlock premium farmer intelligence.</p></div><span className="aw-network-pill">Algorand TestNet</span></div><button className="aw-primary" onClick={openWallet}><Icon name="wallet" size={16}/>{activeAddress ? `Wallet connected: ${activeAddress.slice(0, 12)}...` : 'Connect Pera Wallet'}</button>{activeAddress && <div className="aw-success">✓ Wallet connected successfully. <span>You can now unlock premium farmer data.</span></div>}</section>
      {activeAddress ? <section className="aw-card aw-premium-shell"><div className="aw-premium-intro"><div className="aw-eyebrow">RECOMMENDED FARMER</div><h2>Premium Farmer Intelligence</h2><p>Unlock verified quality, harvest confidence, supply reliability, and logistics readiness.</p></div><PremiumIntelligence/></section> : <section className="aw-card aw-locked"><div className="aw-lock-mark"><Icon name="wallet" size={22}/></div><h3>Connect your wallet to view premium intelligence</h3><p>Connect your Algorand wallet to unlock verified farmer quality, harvest timing, supply reliability, and logistics data.</p><button className="aw-outline-button" onClick={openWallet}>Connect wallet</button></section>}
      <section className="aw-section"><div className="aw-section-head"><h2>Recommended Farmers</h2><button className="aw-listen" onClick={() => window.speechSynthesis?.speak(new SpeechSynthesisUtterance('Recommended farmers. Asha Devi, tomato, twelve thousand five hundred kilograms, verified farmer.'))}><Icon name="volume" size={15}/> Listen</button></div><div className="aw-table-wrap"><table><thead><tr><th>Farmer</th><th>Crop</th><th>Quantity</th><th>Verification</th></tr></thead><tbody>{[['Asha Devi','Tomato','12,500 kg'],['Ravi Kumar','Onion','8,200 kg'],['Meena Patil','Grapes','5,600 kg']].map(x=><tr key={x[0]}><td><b>{x[0]}</b></td><td>{x[1]}</td><td>{x[2]}</td><td><Verified/></td></tr>)}</tbody></table></div></section>
    </div><Guide/></div>
  </div>
}

function Farmers() { const [q,setQ]=useState(''); const farmers=[['Asha Devi','AD','Tomato · Nashik · 12,500 kg'],['Ravi Kumar','RK','Onion · Pune · 8,200 kg'],['Meena Patil','MP','Grapes · Nashik · 5,600 kg'],['Suresh Jadhav','SJ','Potato · Satara · 7,400 kg'],['Priya More','PM','Tomato · Ahmednagar · 4,900 kg'],['Ganesh Pawar','GP','Onion · Nashik · 6,300 kg']]; const shown=farmers.filter(f=>f.join(' ').toLowerCase().includes(q.toLowerCase())); return <div className="aw-page"><div className="aw-eyebrow">FARMERS</div><h1>Verified farmer network</h1><p className="aw-lead">Find reliable growers and explore available produce.</p><div className="aw-toolbar"><div className="aw-search"><Icon name="search" size={17}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search farmers or crops"/></div><button className="aw-primary"><Icon name="plus" size={16}/> New request</button></div><div className="aw-farmer-grid">{shown.map(f=><div className="aw-farmer-card" key={f[0]}><div className="aw-farmer-top"><img src="/images/farmer-portrait.png" alt=""/><div><h3>{f[0]}</h3><Verified/><p>{f[2]}</p></div></div><div className="aw-match-row"><span>Verification status</span><b>Verified</b></div><button className="aw-outline-button full">View farmer profile <Icon name="arrow" size={15}/></button></div>)}</div></div> }

function Deals(){return <div className="aw-page"><div className="aw-page-top"><div><div className="aw-eyebrow">DEALS</div><h1>Active deals</h1><p>Manage negotiated produce purchases and fulfillment.</p></div><button className="aw-primary"><Icon name="plus" size={16}/> Create deal</button></div><div className="aw-deal-list">{[['Asha Devi','5,000 kg Tomato · ₹24/kg','Delivery · 18 Sep 2026'],['Ravi Kumar','3,000 kg Onion · ₹19/kg','Delivery · 20 Sep 2026'],['Meena Patil','2,500 kg Grapes · ₹68/kg','Delivery · 22 Sep 2026']].map(d=><div className="aw-card aw-deal-card" key={d[0]}><h3>Deal with {d[0]}</h3><Verified/><p>{d[1]}</p><small>{d[2]} <span className="aw-status">In progress</span></small></div>)}</div></div>}

function Logistics(){return <div className="aw-page"><div className="aw-eyebrow">LOGISTICS</div><h1>Supply in motion</h1><p className="aw-lead">Monitor pickups, transport and delivery milestones.</p><div className="aw-card aw-timeline">{[['Pickup scheduled','Asha Devi · Nashik','18 Sep · 08:00'],['Vehicle assigned','MH 15 AB 2048 · Rajesh Logistics','18 Sep · 09:30'],['In transit','5,000 kg Tomato','18 Sep · 12:00'],['Expected delivery','Sharma Traders warehouse · Pune','18 Sep · 17:30']].map(x=><div className="aw-timeline-row" key={x[0]}><span className="aw-timeline-dot"/><div><b>{x[0]}</b><p>{x[1]} · {x[2]}</p></div><span className="aw-status">On track</span></div>)}</div></div>}

function Insights(){return <div className="aw-page"><div className="aw-page-top"><div><div className="aw-eyebrow">INSIGHTS</div><h1>Market intelligence</h1><p>Use market signals and AI recommendations to plan purchases.</p></div><button className="aw-light-button">Unlock Premium Intelligence</button></div><div className="aw-card aw-chart-card"><div className="aw-section-head"><div><h2>Tomato market price</h2><span>₹ / kg · last 7 days</span></div><strong>₹24</strong></div><div className="aw-chart"><svg viewBox="0 0 800 220" preserveAspectRatio="none"><polyline points="0,170 100,155 200,162 300,125 400,140 500,95 600,105 700,65 800,78" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/><line x1="0" y1="190" x2="800" y2="190" stroke="currentColor" opacity=".15"/></svg></div></div><div className="aw-two-col"><div className="aw-card aw-ai-card"><div className="aw-eyebrow">AI RECOMMENDATION</div><h3>Buy tomatoes within the next 3 days</h3><p>Demand is rising while Nashik arrivals are expected to soften.</p></div><div className="aw-card"><h3>Premium Intelligence</h3><p className="aw-muted">Unlock deeper price forecasts, demand alerts and supplier matching.</p><button className="aw-primary full">Unlock Premium Intelligence</button></div></div></div>}

export default function TraderDashboard({ onSwitchRole }: Props) {
  const [page,setPage]=useState<Page>('Overview'); const [walletOpen,setWalletOpen]=useState(false)
  const content = page==='Overview' ? <Overview openWallet={()=>setWalletOpen(true)} onPremium={()=>{setPage('Overview');setWalletOpen(true)}}/> : page==='Farmers'?<Farmers/>:page==='Deals'?<Deals/>:page==='Logistics'?<Logistics/>:<Insights/>
  return <div className="aw-app"><main className="aw-container"><Header onSwitchRole={onSwitchRole} onAsk={()=>setPage('Overview')}/><div className="aw-workspace"><SideNav page={page} setPage={setPage}/><div className="aw-content">{content}</div></div></main>{walletOpen && <ConnectWallet openModal={walletOpen} closeModal={()=>setWalletOpen(false)}/>}<div className="aw-mobile-nav">{(['Overview','Farmers','Deals','Logistics','Insights'] as Page[]).map((x,i)=><button key={x} className={page===x?'active':''} onClick={()=>setPage(x)}><Icon name={(['grid','farmers','deals','truck','chart'] as IconName[])[i]} size={16}/><span>{x}</span></button>)}</div></div>
}
