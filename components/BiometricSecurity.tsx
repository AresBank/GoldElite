
import React, { useState, useEffect, useRef } from 'react';

interface BiometricSecurityProps {
  onUnlock: () => void;
}

export const BiometricSecurity: React.FC<BiometricSecurityProps> = ({ onUnlock }) => {
  const [scanning, setScanning] = useState(false);
  const [success, setSuccess] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access denied", err);
      }
    }
    startCamera();
    
    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setSuccess(true);
      setTimeout(onUnlock, 1000);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 bg-[#050505] flex flex-col items-center justify-center z-50 p-6">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="relative w-48 h-48 rounded-full border-4 border-[#D4AF37]/30 overflow-hidden gold-glow">
            <video 
              ref={videoRef} 
              autoPlay 
              muted 
              playsInline 
              className="w-full h-full object-cover scale-x-[-1]"
            />
            {scanning && (
              <div className="absolute inset-0 bg-[#D4AF37]/20 flex flex-col items-center justify-start">
                <div className="w-full h-1 bg-[#D4AF37] animate-bounce shadow-[0_0_15px_rgba(212,175,55,1)]" />
              </div>
            )}
            {success && (
              <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                <i className="fas fa-check-circle text-6xl text-green-400"></i>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="font-luxury text-3xl tracking-widest text-white">BIOMETRIC LOGIN</h1>
          <p className="text-[#D4AF37]/70 text-sm tracking-widest uppercase">
            {scanning ? "Autenticando Identidad..." : success ? "Acceso Concedido" : "Reconocimiento Facial Requerido"}
          </p>
        </div>

        <button
          onClick={handleScan}
          disabled={scanning || success}
          className="w-full py-4 rounded-full gold-bg text-black font-bold tracking-widest hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {scanning ? "ESCANEANDO..." : "INICIAR ESCANEO"}
        </button>

        <p className="text-white/30 text-xs italic">
          Protegido por GoldPayments™ Advanced Cryptography
        </p>
      </div>
    </div>
  );
};
