
import React, { useState } from 'react';
import { X, Gift, Copy, Check, User, Heart, Baby, ShieldCheck, Calendar, Phone, AlertCircle, Sparkles, Download, Share2 } from 'lucide-react';

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

export const KidsCheckinModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    childName: '',
    childAge: '',
    allergies: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const reset = () => {
    setStep(1);
    setFormData({ parentName: '', phone: '', childName: '', childAge: '', allergies: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-xl rounded-[3.5rem] overflow-hidden shadow-2xl relative animate-slide-up border border-white/10">
        
        {step === 1 ? (
          <div className="flex flex-col">
            <div className="bg-blue-600 p-10 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-bl-full pointer-events-none"></div>
               <button onClick={onClose} className="absolute top-8 right-8 p-2 bg-black/20 hover:bg-black/40 rounded-full transition-colors z-20"><X size={20}/></button>
               
               <div className="relative z-10 space-y-4">
                  <div className="bg-white/20 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest w-fit border border-white/10">
                     Check-in Digital • Atitude Kids
                  </div>
                  <h3 className="text-4xl font-black uppercase tracking-tighter leading-tight">
                     Prepare a Chegada <br/>dos Pequenos
                  </h3>
                  <p className="text-blue-100 text-sm font-medium">Ganhe tempo no domingo. Preencha os dados e apresente o voucher na recepção kids.</p>
               </div>
            </div>

            <form onSubmit={handleSubmit} className="p-10 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Nome do Responsável</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18}/>
                    <input required className="w-full pl-12 pr-4 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-bold" value={formData.parentName} onChange={e => setFormData({...formData, parentName: e.target.value})} placeholder="Seu nome completo" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">WhatsApp de Contato</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18}/>
                    <input required className="w-full pl-12 pr-4 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-bold" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="(21) 99999-9999" />
                  </div>
                </div>
              </div>

              <div className="h-px bg-zinc-100 dark:bg-zinc-800"></div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-3 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Nome da Criança</label>
                  <div className="relative">
                    <Baby className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" size={18}/>
                    <input required className="w-full pl-12 pr-4 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-bold" value={formData.childName} onChange={e => setFormData({...formData, childName: e.target.value})} placeholder="Nome do pequeno(a)" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Idade</label>
                  <input required className="w-full px-4 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-bold text-center" value={formData.childAge} onChange={e => setFormData({...formData, childAge: e.target.value})} placeholder="Ex: 5" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1 flex items-center gap-2"><AlertCircle size={12} className="text-red-500"/> Alergias ou Observações</label>
                <textarea className="w-full p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium resize-none h-24" value={formData.allergies} onChange={e => setFormData({...formData, allergies: e.target.value})} placeholder="Caso não possua, deixe em branco." />
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                 <ShieldCheck size={18}/> Finalizar Check-in
              </button>
            </form>
          </div>
        ) : (
          <div className="p-10 flex flex-col items-center text-center animate-fade-in">
             <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-8 text-green-600 border border-green-200">
                <Check size={40}/>
             </div>
             <h3 className="text-4xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter mb-2">Check-in Realizado!</h3>
             <p className="text-zinc-500 dark:text-zinc-400 font-medium mb-10 max-w-sm">Tudo pronto! Apresente o voucher abaixo no totem do Atitude Kids para retirar sua etiqueta física.</p>
             
             {/* VOUCHER DIGITAL */}
             <div className="w-full bg-zinc-50 dark:bg-zinc-800 rounded-[2.5rem] border-4 border-dashed border-zinc-200 dark:border-zinc-700 p-8 relative mb-8 overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10"><Baby size={80}/></div>
                
                <div className="flex justify-between items-start mb-8">
                   <div className="text-left">
                      <p className="text-[10px] font-black uppercase text-blue-500 tracking-[0.3em] mb-1">Voucher Atitude Kids</p>
                      <h4 className="text-2xl font-black text-zinc-900 dark:text-white uppercase">{formData.childName}</h4>
                   </div>
                   <div className="w-12 h-12 bg-white dark:bg-zinc-900 rounded-xl flex items-center justify-center shadow-md">
                      <span className="text-xl font-black text-blue-600">{formData.childAge}</span>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-6 text-left border-t border-zinc-200 dark:border-zinc-700 pt-6">
                   <div>
                      <p className="text-[9px] font-black uppercase text-zinc-400 tracking-widest">Responsável</p>
                      <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300">{formData.parentName}</p>
                   </div>
                   <div>
                      <p className="text-[9px] font-black uppercase text-zinc-400 tracking-widest">Data</p>
                      <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300">{new Date().toLocaleDateString()}</p>
                   </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-700 flex justify-center">
                   <div className="bg-white p-4 rounded-2xl shadow-inner">
                      <div className="w-24 h-24 bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=CHECKIN_KIDS_IBA')] bg-cover"></div>
                   </div>
                </div>
             </div>

             <div className="flex flex-col sm:flex-row gap-4 w-full">
                <button onClick={() => window.print()} className="flex-1 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3">
                   <Download size={16}/> Baixar Voucher
                </button>
                <button onClick={reset} className="flex-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-300 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest">
                   Concluído
                </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
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
