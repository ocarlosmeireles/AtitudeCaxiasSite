
import React, { useState } from 'react';
import { HeartHandshake, Sparkles, Send, CheckCircle, ChevronLeft, ArrowRight, Sun, CloudRain, Heart, Shield, Lock, Moon, PenTool, AlertTriangle } from 'lucide-react';
import { saveData } from '../services/firebase';

const MOODS = [
  { id: 'ansiedade', label: 'Ansiedade', icon: <CloudRain size={28}/>, bg: 'from-blue-950 via-slate-900 to-black', color: 'text-blue-400' },
  { id: 'gratidao', label: 'Gratidão', icon: <Sun size={28}/>, bg: 'from-amber-900/40 via-orange-950 to-black', color: 'text-amber-400' },
  { id: 'saude', label: 'Saúde', icon: <Heart size={28}/>, bg: 'from-rose-950 via-red-950 to-black', color: 'text-rose-400' },
  { id: 'familia', label: 'Família', icon: <HeartHandshake size={28}/>, bg: 'from-indigo-950 via-slate-950 to-black', color: 'text-indigo-400' },
  { id: 'protecao', label: 'Proteção', icon: <Shield size={28}/>, bg: 'from-emerald-950 via-green-950 to-black', color: 'text-emerald-400' },
  { id: 'espirito', label: 'Espiritual', icon: <Moon size={28}/>, bg: 'from-violet-950 via-purple-950 to-black', color: 'text-violet-400' },
];

export const PrayerView = () => {
    const [step, setStep] = useState(1);
    const [selectedMood, setSelectedMood] = useState<any>(null);
    const [request, setRequest] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
  
    const handlePray = async () => {
      if (!request.trim()) {
          setError("Por favor, escreva seu pedido.");
          return;
      }
      setLoading(true);
      setError('');
      
      try {
          await saveData('prayerRequests', {
            text: request,
            mood: selectedMood?.label || 'Geral',
            name: name || 'Anônimo',
            createdAt: Date.now(),
            status: 'pending',
            read: false
          });

          // Simulate slight delay for UX
          setTimeout(() => {
              setStep(3);
              setLoading(false);
          }, 1500);
      } catch (e) {
          console.error(e);
          setError("Erro ao enviar. Tente novamente.");
          setLoading(false);
      }
    };
  
    return (
      <div className={`relative min-h-screen w-full flex items-center justify-center overflow-hidden transition-all duration-1000 ${selectedMood ? `bg-gradient-to-b ${selectedMood.bg}` : 'bg-black'}`}>
        
        {/* Cinematic Background Elements */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-pulse-slow pointer-events-none"></div>
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-white/5 rounded-full blur-[180px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="relative z-10 w-full max-w-5xl px-6 py-20">
           
           {/* Step 1: Mood Selection */}
           {step === 1 && (
             <div className="animate-slide-up text-center">
                <div className="mb-12">
                   <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/50 text-[10px] font-bold uppercase tracking-[0.3em] backdrop-blur-md mb-8">
                      <Lock size={10}/> Ambiente Seguro & Confidencial
                   </div>
                   <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter drop-shadow-2xl">Sala de Oração</h2>
                   <p className="text-white/60 text-lg md:text-2xl font-light max-w-2xl mx-auto leading-relaxed">
                     O que pesa no seu coração hoje? Escolha um tema para começarmos.
                   </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                   {MOODS.map(m => (
                     <button 
                       key={m.id}
                       onClick={() => { setSelectedMood(m); setStep(2); }}
                       className="group relative bg-white/5 hover:bg-white/10 p-8 rounded-[2.5rem] border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-white/20 overflow-hidden"
                     >
                       <div className="relative z-10 flex flex-col items-center gap-4">
                         <div className={`opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 ${m.color}`}>{m.icon}</div>
                         <span className="font-bold text-white text-xs tracking-[0.2em] uppercase">{m.label}</span>
                       </div>
                     </button>
                   ))}
                </div>
             </div>
           )}

           {/* Step 2: The Prayer */}
           {step === 2 && (
             <div className="animate-fade-in w-full max-w-xl mx-auto">
                <button onClick={() => setStep(1)} className="absolute top-0 left-0 md:-left-20 text-white/30 hover:text-white transition-colors p-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest"><ChevronLeft size={16}/> Voltar</button>
                
                <div className="text-center mb-8">
                    <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center border border-white/10 bg-white/5 mb-4 shadow-[0_0_40px_rgba(255,255,255,0.1)] ${selectedMood.color}`}>
                        {selectedMood.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white">Escreva sua Oração</h3>
                </div>

                <div className="bg-white/5 backdrop-blur-xl p-2 rounded-[2.5rem] border border-white/10 shadow-2xl relative">
                   <div className="bg-black/40 rounded-[2rem] p-8 space-y-6">
                     <div>
                        <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-4 mb-2 block">Seu Nome (Opcional)</label>
                        <input 
                            className="w-full bg-transparent border-b border-white/10 py-3 px-4 text-white placeholder-white/10 focus:border-white/40 outline-none transition-all text-lg font-medium"
                            placeholder="Como gostaria de ser chamado?"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                     </div>
                     <div>
                        <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-4 mb-2 block flex items-center gap-2"><PenTool size={12}/> Seu Pedido</label>
                        <textarea 
                            className="w-full bg-transparent border-b border-white/10 py-3 px-4 text-white placeholder-white/10 focus:border-white/40 outline-none resize-none h-48 transition-all text-xl leading-relaxed custom-scrollbar font-light" 
                            placeholder="Senhor, coloco diante de Ti..." 
                            value={request} 
                            onChange={(e) => { setRequest(e.target.value); setError(''); }}
                            autoFocus
                        ></textarea>
                     </div>
                     {error && (
                         <div className="flex items-center gap-2 text-red-400 text-xs font-bold px-4">
                             <AlertTriangle size={14}/> {error}
                         </div>
                     )}
                   </div>
                   
                   <div className="p-4">
                        <button 
                            onClick={handlePray} 
                            disabled={loading} 
                            className="w-full bg-white text-black hover:bg-brand-orange hover:text-white py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-brand-orange/20"
                        >
                            {loading ? <Sparkles className="animate-spin" /> : <Send size={18} />} 
                            {loading ? 'Enviando ao Altar...' : 'Entregar Oração'}
                        </button>
                   </div>
                </div>
             </div>
           )}

           {/* Step 3: Confirmation */}
           {step === 3 && (
             <div className="animate-slide-up max-w-xl mx-auto text-center flex flex-col items-center justify-center min-h-[50vh]">
                <div className="w-32 h-32 bg-emerald-500/10 rounded-full flex items-center justify-center mb-8 animate-pulse border border-emerald-500/20 shadow-[0_0_80px_rgba(16,185,129,0.2)]">
                   <CheckCircle size={64} className="text-emerald-400" />
                </div>
                <h3 className="text-5xl font-black text-white mb-6 tracking-tighter">Recebido.</h3>
                <p className="text-white/60 mb-12 text-xl font-light leading-relaxed max-w-md">
                  Sua oração foi entregue ao altar. Nossa equipe de intercessão estará clamando por sua vida.
                </p>
                <button onClick={() => { setStep(1); setRequest(''); setSelectedMood(null); setName(''); }} className="px-10 py-4 rounded-full border border-white/20 text-white font-bold uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-all">
                  Nova Oração
                </button>
             </div>
           )}

        </div>
      </div>
    );
};
