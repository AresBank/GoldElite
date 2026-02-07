
import React, { useState } from 'react';

interface PlaidConnectionProps {
  onSuccess: (publicToken: string) => void;
  onCancel: () => void;
}

export const PlaidConnection: React.FC<PlaidConnectionProps> = ({ onSuccess, onCancel }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const simulateProgress = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(prev => prev + 1);
    }, 1500);
  };

  const finalize = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Simulate a public token from Plaid
      const mockPublicToken = `public-sandbox-${Math.random().toString(36).substr(2, 15)}`;
      onSuccess(mockPublicToken);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-[60] p-4">
      <div className="bg-[#111] border border-[#D4AF37]/30 rounded-3xl w-full max-w-lg p-8 space-y-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#D4AF37]/10">
          <div 
            className="h-full bg-[#D4AF37] transition-all duration-500" 
            style={{ width: `${(step / 3) * 100}%` }} 
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-[#D4AF37] font-bold text-xl">PLAID</span>
            <span className="text-white/30">|</span>
            <span className="text-white/70 font-luxury text-sm tracking-widest">GOLDPAYMENTS</span>
          </div>
          <button onClick={onCancel} className="text-white/50 hover:text-white">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        {step === 1 && (
          <div className="space-y-6 text-center">
            <div className="w-20 h-20 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto">
              <i className="fas fa-university text-blue-400 text-3xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-white">Vincule su cuenta bancaria</h2>
            <p className="text-white/60 leading-relaxed">
              GoldPayments utiliza Plaid para conectarse de forma segura a más de 12,000 instituciones financieras en todo el mundo.
            </p>
            <button 
              onClick={simulateProgress}
              disabled={loading}
              className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all"
            >
              {loading ? <i className="fas fa-circle-notch animate-spin"></i> : "Continuar"}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white text-center">Seleccione su Institución</h2>
            <div className="grid grid-cols-2 gap-4">
              {['Chase', 'Wells Fargo', 'Citibank', 'HSBC', 'BBVA', 'Santander'].map(bank => (
                <button 
                  key={bank}
                  onClick={simulateProgress}
                  className="p-4 rounded-xl border border-white/10 hover:border-[#D4AF37]/50 hover:bg-white/5 transition-all text-white/80 text-left font-medium"
                >
                  {bank}
                </button>
              ))}
            </div>
            <input 
              type="text" 
              placeholder="Buscar otros bancos..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 text-center">
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
              <i className="fas fa-shield-alt text-green-400 text-3xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-white">Conexión Exitosa</h2>
            <p className="text-white/60">
              Su cuenta bancaria ha sido vinculada correctamente. GoldPayments ahora puede sincronizar sus balances de élite.
            </p>
            <button 
              onClick={finalize}
              disabled={loading}
              className="w-full py-4 rounded-xl gold-bg text-black font-bold tracking-widest transition-all"
            >
              {loading ? <i className="fas fa-circle-notch animate-spin"></i> : "FINALIZAR"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
