
import React, { useState } from 'react';
import { getFinancialAdvice } from '../services/geminiService';
import { Transaction, UserWallet } from '../types';

interface GoldAIProps {
  wallet: UserWallet;
  transactions: Transaction[];
}

export const GoldAI: React.FC<GoldAIProps> = ({ wallet, transactions }) => {
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchAdvice = async () => {
    setLoading(true);
    try {
      const result = await getFinancialAdvice(wallet, transactions);
      setAdvice(result);
    } catch (err) {
      setAdvice("No se pudo obtener el análisis en este momento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-dark rounded-3xl p-8 space-y-6 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <i className="fas fa-brain text-8xl gold-text"></i>
      </div>

      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center">
          <i className="fas fa-crown text-black"></i>
        </div>
        <div>
          <h3 className="font-luxury text-xl tracking-widest text-white">AI Gold Consultant</h3>
          <p className="text-[#D4AF37] text-xs uppercase tracking-widest">Estratega Financiero Premium</p>
        </div>
      </div>

      <div className="space-y-4">
        {advice ? (
          <div className="text-white/80 leading-relaxed text-sm italic whitespace-pre-wrap animate-in fade-in slide-in-from-bottom-4 duration-700">
            {advice}
          </div>
        ) : (
          <p className="text-white/50 text-sm italic">
            "El dinero que no se analiza es dinero que no se multiplica." — Active su consultor de IA para obtener insights de su fortuna.
          </p>
        )}

        <button 
          onClick={fetchAdvice}
          disabled={loading}
          className="w-full py-4 rounded-2xl border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all font-medium tracking-widest flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <i className="fas fa-circle-notch animate-spin"></i>
              <span>ANALIZANDO PATRIMONIO...</span>
            </>
          ) : (
            <>
              <i className="fas fa-bolt"></i>
              <span>{advice ? "GENERAR NUEVO ANÁLISIS" : "OBTENER INSIGHTS DE ÉLITE"}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
