
import React, { useState } from 'react';
import { X, Gift, Copy, Check, User, Heart } from 'lucide-react';

export const StepModal = ({ isOpen, onClose, title, children, icon: Icon, colorClass }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl relative animate-slide-up">
         <div className={`h-24 ${colorClass} relative flex items-center justify-center`}>
            <Icon size={48} className="text-white/80" />
            <button onClick={onClose} className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 p-2 rounded-full text-white transition-colors"><X size={20}/></button>
         </div>
         <div className="p-8">
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white uppercase mb-4 text-center">{title}</h3>
            {children}
         </div>
      </div>
    </div>
  )
};

export const DonationModal = ({ isOpen, onClose, config }: any) => {
  const [copied, setCopied] = useState(false);
  const pixKey = config?.pixKey || "CNPJ: 12.345.678/0001-90"; 

  const handleCopy = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-[2rem] overflow-hidden shadow-2xl relative animate-slide-up border border-zinc-200 dark:border-white/10">
         <div className="h-40 bg-gradient-to-br from-brand-orange to-red-600 relative flex flex-col items-center justify-center text-white">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-3 backdrop-blur-md">
                <Gift size={32} />
            </div>
            <h3 className="text-3xl font-black uppercase tracking-tight">Dízimos e Ofertas</h3>
            <button onClick={onClose} className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 p-2 rounded-full text-white transition-colors"><X size={20}/></button>
         </div>
         <div className="p-10">
            <p className="text-center text-zinc-600 dark:text-brand-gray mb-8 leading-relaxed">
                "Cada um contribua segundo propôs no seu coração; não com tristeza, ou por necessidade; porque Deus ama ao que dá com alegria." (2 Co 9:7)
            </p>
            
            {config?.qrCodeUrl && (
                <div className="flex justify-center mb-8">
                    <div className="p-2 bg-white rounded-xl shadow-lg border border-zinc-100">
                        <img src={config.qrCodeUrl} alt="QR Code PIX" className="w-40 h-40 object-contain" />
                    </div>
                </div>
            )}

            <div className="bg-zinc-50 dark:bg-black p-5 rounded-2xl border border-zinc-200 dark:border-white/10 mb-2 text-center group cursor-pointer" onClick={handleCopy}>
               <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Chave PIX (Clique para copiar)</p>
               <div className="flex items-center justify-center gap-3">
                  <code className="text-lg font-mono font-bold text-zinc-900 dark:text-white group-hover:text-brand-orange transition-colors">{pixKey}</code>
                  <div className={`p-2 rounded-full transition-all ${copied ? 'bg-green-500 text-white' : 'bg-zinc-200 dark:bg-white/10 text-zinc-500'}`}>
                     {copied ? <Check size={16}/> : <Copy size={16}/>}
                  </div>
               </div>
            </div>
            <p className="text-center text-[10px] text-zinc-400 mt-4 uppercase tracking-widest">Igreja Batista Atitude - DC</p>
         </div>
      </div>
    </div>
  )
};
