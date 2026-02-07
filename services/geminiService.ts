
import { GoogleGenAI } from "@google/genai";
import { Transaction, UserWallet } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getFinancialAdvice = async (wallet: UserWallet, transactions: Transaction[]) => {
  const model = 'gemini-3-flash-preview';
  
  const prompt = `
    Eres el Consultor de IA de GoldPayments Premium. 
    Analiza el siguiente perfil financiero de un cliente de alto valor y proporciona 3 consejos estratégicos en español con un tono extremadamente sofisticado y exclusivo.
    
    Perfil del Cliente:
    - Saldo Actual: ${wallet.balance} ${wallet.currency}
    - Nivel de Membresía: ${wallet.tier}
    - Transacciones Recientes: ${JSON.stringify(transactions.slice(0, 5))}
    
    Formato de respuesta:
    1. Una breve bienvenida personalizada.
    2. Tres "Insights de Oro" accionables.
    3. Una recomendación de inversión acorde a su estatus.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        temperature: 0.8,
        topP: 0.9,
      }
    });
    return response.text || "Lo siento, mi análisis de élite no está disponible en este momento.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error al conectar con el motor de IA. Por favor, intente más tarde.";
  }
};
