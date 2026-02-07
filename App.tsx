
import React, { useState, useEffect } from 'react';
import { AppState, Transaction, UserWallet } from './types';
import { BiometricSecurity } from './components/BiometricSecurity';
import { PlaidConnection } from './components/PlaidConnection';
import { GoldAI } from './components/GoldAI';
import { encryptToken } from './utils/crypto';

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: `GOLD-TX-WELCOME`,
    amount: 1000000.00,
    currency: 'MXN',
    timestamp: new Date().toISOString(),
    concept: 'Bono de Bienvenida Gold Elite',
    type: 'credit',
    status: 'completed'
  },
  {
    id: `GOLD-TX-782`,
    amount: 15000.00,
    currency: 'MXN',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    concept: 'Membresía Founder Anual',
    type: 'debit',
    status: 'completed'
  }
];

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.BIOMETRIC_LOCK);
  const [wallet, setWallet] = useState<UserWallet>({
    balance: 1000000.00,
    currency: 'MXN',
    address: '0xG0LD...88FF',
    tier: 'Elite'
  });
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [showPlaidModal, setShowPlaidModal] = useState(false);
  const [securityToast, setSecurityToast] = useState<string | null>(null);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(val);
  };

  const handlePlaidSuccess = async (publicToken: string) => {
    setShowPlaidModal(false);
    
    // Phase 2 logic: In a real app, you send publicToken to backend.
    // Here we simulate the exchange and the subsequent SECURE storage of the access token.
    const mockAccessToken = `access-sandbox-${Math.random().toString(36).substr(2, 20)}`;
    
    try {
      // SECURE STEP: Encrypting the access token with AES-256 before "storing" it
      const encryptedData = await encryptToken(mockAccessToken);
      console.log("🔒 Access Token Secured with AES-256-GCM:", encryptedData);
      
      // Store in localStorage for demonstration (simulating a secure DB session)
      localStorage.setItem('gold_secure_plaid_token', JSON.stringify(encryptedData));
      
      setSecurityToast("Tokens Bancarios Encriptados con AES-256");
      setTimeout(() => setSecurityToast(null), 4000);

      // Add a simulated sync transaction
      const newTx: Transaction = {
        id: `PLAID-SYNC-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        amount: 450000.00,
        currency: 'MXN',
        timestamp: new Date().toISOString(),
        concept: 'Sincronización Segura (Vault Access)',
        type: 'credit',
        status: 'completed'
      };
      setTransactions(prev => [newTx, ...prev]);
      setWallet(prev => ({ ...prev, balance: prev.balance + 450000.00 }));
    } catch (error) {
      console.error("Encryption failed:", error);
    }
  };

  if (appState === AppState.BIOMETRIC_LOCK) {
    return <BiometricSecurity onUnlock={() => setAppState(AppState.DASHBOARD)} />;
  }

  return (
    <div className="min-h-screen pb-20 md:pb-0 relative">
      {/* Security Toast */}
      {securityToast && (
        <div className="fixed top-24 right-6 z-[100] animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="glass-dark border border-green-500/30 px-6 py-3 rounded-xl flex items-center space-x-3 shadow-2xl">
            <i className="fas fa-shield-check text-green-400"></i>
            <span className="text-xs font-bold text-white tracking-widest uppercase">{securityToast}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="px-6 py-8 flex justify-between items-center border-b border-white/5 glass-dark sticky top-0 z-40">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 gold-gradient rounded-lg flex items-center justify-center shadow-lg">
            <i className="fas fa-gem text-black text-xl"></i>
          </div>
          <div>
            <h1 className="font-luxury text-xl tracking-[0.2em] text-white">GOLDPAYMENTS</h1>
            <p className="text-[10px] text-[#D4AF37] uppercase tracking-[0.3em] font-bold">Elite Digital Assets</p>
          </div>
        </div>
        
        <div className="hidden md:flex space-x-8 text-xs font-medium tracking-widest text-white/50 uppercase">
          <a href="#" className="text-[#D4AF37] hover:text-white transition-colors">Dashboard</a>
          <a href="#" className="hover:text-white transition-colors">Patrimonio</a>
          <a href="#" className="hover:text-white transition-colors">Mercados</a>
          <a href="#" className="hover:text-white transition-colors">Concierge</a>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2 text-[10px] text-[#D4AF37]/60 font-bold uppercase tracking-widest border border-[#D4AF37]/20 px-3 py-1.5 rounded-full bg-[#D4AF37]/5">
            <i className="fas fa-shield-alt"></i>
            <span>AES-256 ACTIVE</span>
          </div>
          <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#D4AF37]/50 transition-all">
            <i className="fas fa-user text-white/70"></i>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Balance & Wealth */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Card: Main Balance */}
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0d0d0d] border border-[#D4AF37]/20 p-10 gold-glow group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="space-y-4">
                <span className="text-[#D4AF37] text-xs uppercase tracking-[0.4em] font-bold flex items-center">
                  Patrimonio Neto Total
                  <i className="fas fa-lock ml-2 text-[10px] opacity-40"></i>
                </span>
                <div className="flex items-baseline space-x-4">
                  <h2 className="text-5xl md:text-7xl font-luxury text-white tracking-tight">
                    {formatCurrency(wallet.balance)}
                  </h2>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 flex items-center space-x-2">
                    <i className="fas fa-arrow-up text-[10px]"></i>
                    <span className="font-bold">+12.4%</span>
                  </span>
                  <span className="text-white/30 uppercase tracking-widest text-[10px]">Actualizado hace 2 min</span>
                </div>
              </div>

              <div className="flex space-x-4">
                <button className="px-6 py-4 rounded-2xl bg-white text-black font-bold tracking-widest text-xs hover:bg-[#D4AF37] transition-all">
                  ENVIAR FONDOS
                </button>
                <button 
                  onClick={() => setShowPlaidModal(true)}
                  className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold tracking-widest text-xs hover:border-[#D4AF37]/50 transition-all group/plaid"
                >
                  <i className="fas fa-link mr-2 group-hover/plaid:text-[#D4AF37] transition-colors"></i>
                  SINCRONIZAR BANCO
                </button>
              </div>
            </div>

            <div className="mt-12 pt-10 border-t border-white/5 grid grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <p className="text-white/30 text-[10px] uppercase tracking-widest mb-1">Activos Digitales</p>
                <p className="text-white font-medium">8.42 BTC / 120.5 ETH</p>
              </div>
              <div>
                <p className="text-white/30 text-[10px] uppercase tracking-widest mb-1">Cuentas Vinculadas</p>
                <p className="text-white font-medium">Vault Sync Enabled</p>
              </div>
              <div className="hidden md:block">
                <p className="text-white/30 text-[10px] uppercase tracking-widest mb-1">Vault Address</p>
                <p className="text-[#D4AF37] font-mono text-xs">{wallet.address}</p>
              </div>
            </div>
          </div>

          {/* AI Consultant Module */}
          <GoldAI wallet={wallet} transactions={transactions} />

          {/* Transactions List */}
          <div className="glass-dark rounded-[2rem] p-8 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-luxury text-xl tracking-widest text-white">Actividad de Élite</h3>
              <button className="text-[#D4AF37] text-xs uppercase tracking-widest hover:underline">Ver Historial Completo</button>
            </div>

            <div className="space-y-1">
              {transactions.map(tx => (
                <div key={tx.id} className="group flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${tx.type === 'credit' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                      <i className={`fas ${tx.type === 'credit' ? 'fa-arrow-down' : 'fa-arrow-up'}`}></i>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{tx.concept}</p>
                      <p className="text-white/40 text-[10px] uppercase tracking-widest">{new Date(tx.timestamp).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${tx.type === 'credit' ? 'text-white' : 'text-white/60'}`}>
                      {tx.type === 'credit' ? '+' : '-'}{formatCurrency(tx.amount)}
                    </p>
                    <p className="text-[10px] text-green-500 uppercase font-bold tracking-tighter flex items-center justify-end">
                      <i className="fas fa-check-circle mr-1 text-[8px]"></i>
                      Liquidado
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Status & Cards */}
        <div className="lg:col-span-4 space-y-8">
          {/* Physical Gold Card Status */}
          <div className="glass-dark rounded-[2rem] p-8 space-y-6 animate-shimmer">
            <div className="flex items-center justify-between">
              <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">Estado de Tarjeta</span>
              <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
            </div>
            
            <div className="aspect-[1.586/1] w-full rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#D4AF37]/40 p-6 flex flex-col justify-between shadow-2xl relative">
               <div className="flex justify-between items-start">
                 <div className="w-12 h-10 bg-[#D4AF37]/20 rounded-md border border-[#D4AF37]/30"></div>
                 <i className="fab fa-cc-mastercard text-white/20 text-4xl"></i>
               </div>
               <div className="space-y-4">
                 <p className="font-mono text-xl text-white tracking-[0.2em] shadow-sm">**** **** **** 8842</p>
                 <div className="flex justify-between items-end">
                   <div>
                     <p className="text-[8px] text-white/30 uppercase tracking-widest">Titular</p>
                     <p className="font-luxury text-sm text-white uppercase tracking-widest">GOLD USER ELITE</p>
                   </div>
                   <p className="text-[10px] text-white/50 font-mono">12/30</p>
                 </div>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <button className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/70 text-[10px] uppercase tracking-widest font-bold hover:border-[#D4AF37]/40 transition-all">
                CONGELAR
              </button>
              <button className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/70 text-[10px] uppercase tracking-widest font-bold hover:border-[#D4AF37]/40 transition-all">
                PIN
              </button>
            </div>
          </div>

          {/* Security Status Panel */}
          <div className="glass-dark rounded-2xl p-6 space-y-4 border-l-4 border-[#D4AF37]">
            <div className="flex items-center space-x-3">
              <i className="fas fa-user-shield text-[#D4AF37] text-lg"></i>
              <h4 className="text-white text-xs font-bold uppercase tracking-widest">Protocolo de Seguridad</h4>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center justify-between text-[10px]">
                <span className="text-white/40 uppercase tracking-widest">Encryption</span>
                <span className="text-green-400 font-bold uppercase">AES-256-GCM</span>
              </li>
              <li className="flex items-center justify-between text-[10px]">
                <span className="text-white/40 uppercase tracking-widest">Biometrics</span>
                <span className="text-green-400 font-bold uppercase">Active</span>
              </li>
              <li className="flex items-center justify-between text-[10px]">
                <span className="text-white/40 uppercase tracking-widest">Session Vault</span>
                <span className="text-green-400 font-bold uppercase">Locked</span>
              </li>
            </ul>
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            <h4 className="text-white/30 text-xs uppercase tracking-[0.3em] font-bold px-2">Análisis de Cartera</h4>
            <div className="grid grid-cols-1 gap-4">
              <div className="glass-dark p-6 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest">Liquidez Inmediata</p>
                  <p className="text-xl font-bold text-white mt-1">94.2%</p>
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37]/20 flex items-center justify-center">
                  <i className="fas fa-chart-pie text-[#D4AF37]"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Concierge Promo */}
          <div className="rounded-[2rem] bg-gradient-to-br from-[#B38728] to-[#BF953F] p-8 text-black space-y-4">
            <h3 className="font-luxury text-2xl font-bold">VIP CONCIERGE</h3>
            <p className="text-sm font-medium leading-tight opacity-80">
              Su estatus Elite le otorga acceso a eventos privados y reservas exclusivas en todo el mundo.
            </p>
            <button className="w-full py-3 rounded-xl bg-black text-white text-xs font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-all">
              SOLICITAR ASISTENTE
            </button>
          </div>
        </div>
      </main>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 glass-dark border-t border-white/10 flex justify-around items-center px-6 z-50">
        <button className="flex flex-col items-center text-[#D4AF37]">
          <i className="fas fa-th-large text-xl"></i>
          <span className="text-[8px] uppercase tracking-tighter mt-1 font-bold">Home</span>
        </button>
        <button className="flex flex-col items-center text-white/40">
          <i className="fas fa-wallet text-xl"></i>
          <span className="text-[8px] uppercase tracking-tighter mt-1">Wallet</span>
        </button>
        <button className="flex flex-col items-center text-white/40">
          <i className="fas fa-shield-halved text-xl"></i>
          <span className="text-[8px] uppercase tracking-tighter mt-1">Safe</span>
        </button>
        <button className="flex flex-col items-center text-white/40">
          <i className="fas fa-cog text-xl"></i>
          <span className="text-[8px] uppercase tracking-tighter mt-1">Config</span>
        </button>
      </nav>

      {/* Modals */}
      {showPlaidModal && (
        <PlaidConnection 
          onSuccess={handlePlaidSuccess} 
          onCancel={() => setShowPlaidModal(false)} 
        />
      )}
    </div>
  );
};

export default App;
