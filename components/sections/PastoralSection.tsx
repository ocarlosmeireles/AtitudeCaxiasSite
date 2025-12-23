
import React, { useState } from 'react';
import { CalendarCheck, X, Loader2, Quote, ArrowRight, User, MessageSquare, CheckCircle2, ChevronRight, Heart, Star, Calendar, PlayCircle, Smartphone } from 'lucide-react';
import { WelcomeSectionData } from '../../types';
import { saveData } from '../../services/firebase';

const CabinetWizard = ({ isOpen, onClose, pastorName, pastorName2 }: any) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    preferredPastor: pastorName,
    reason: '',
  });

  if (!isOpen) return null;

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleFinish = async () => {
    setLoading(true);
    try {
      await saveData('cabinetRequests', { 
        ...formData, 
        createdAt: Date.now(), 
        status: 'pending' 
      });
      setStep(4);
    } catch (e) {
      alert("Houve um erro na conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { title: 'Liderança', icon: <User size={18} /> },
    { title: 'Motivo', icon: <MessageSquare size={18} /> },
    { title: 'Contato', icon: <Smartphone size={18} /> },
    { title: 'Concluído', icon: <CheckCircle2 size={18} /> },
  ];

  return (
    <div className="fixed inset-0 z-[70] bg-zinc-950/90 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-[3.5rem] w-full max-w-xl overflow-hidden shadow-2xl relative border border-zinc-100 animate-slide-up">
        
        {/* Barra de Progresso Visual */}
        <div className="bg-zinc-50 p-10 border-b border-zinc-100 relative">
           <button onClick={onClose} className="absolute top-8 right-8 text-zinc-400 hover:text-brand-orange transition-colors p-2 bg-white rounded-full shadow-sm border border-zinc-100"><X size={20}/></button>
           <div className="flex items-center gap-3 mb-8">
              {steps.map((s, idx) => (
                <div key={idx} className="flex-grow flex flex-col gap-2">
                   <div className={`h-1.5 rounded-full transition-all duration-700 ${idx + 1 <= step ? 'bg-brand-orange shadow-[0_0_15px_rgba(255,85,0,0.3)]' : 'bg-zinc-200'}`}></div>
                </div>
              ))}
           </div>
           <h3 className="text-2xl font-black uppercase tracking-tighter text-zinc-900 flex items-center gap-3">
              {steps[step-1].icon} {steps[step-1].title}
           </h3>
        </div>

        <div className="p-12 min-h-[400px] flex flex-col">
           {step === 1 && (
             <div className="space-y-6 animate-fade-in">
                <p className="text-zinc-500 text-sm font-medium">Nossos pastores estão prontos para te ouvir. Com quem você gostaria de falar?</p>
                <div className="grid grid-cols-1 gap-4">
                   <button 
                      onClick={() => { setFormData({...formData, preferredPastor: pastorName}); nextStep(); }}
                      className={`group p-8 rounded-3xl border-2 text-left transition-all ${formData.preferredPastor === pastorName ? 'border-brand-orange bg-orange-50/30' : 'border-zinc-100 hover:border-zinc-200 hover:bg-zinc-50'}`}
                   >
                      <h4 className="text-xl font-black uppercase text-zinc-900 group-hover:text-brand-orange transition-colors">{pastorName}</h4>
                      <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">Pastor Presidente</p>
                   </button>
                   {pastorName2 && (
                     <button 
                        onClick={() => { setFormData({...formData, preferredPastor: pastorName2}); nextStep(); }}
                        className={`group p-8 rounded-3xl border-2 text-left transition-all ${formData.preferredPastor === pastorName2 ? 'border-brand-orange bg-orange-50/30' : 'border-zinc-100 hover:border-zinc-200 hover:bg-zinc-50'}`}
                     >
                        <h4 className="text-xl font-black uppercase text-zinc-900 group-hover:text-brand-orange transition-colors">{pastorName2}</h4>
                        <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">Pastora Presidente</p>
                     </button>
                   )}
                </div>
             </div>
           )}

           {step === 2 && (
              <div className="space-y-6 animate-fade-in flex flex-col h-full">
                 <p className="text-zinc-500 text-sm font-medium">Isso nos ajuda a preparar melhor o tempo com você.</p>
                 <div className="grid grid-cols-1 gap-3">
                    {['Oração e Libertação', 'Casamento e Família', 'Dúvidas e Aconselhamento', 'Apresentação de Crianças'].map((r) => (
                       <button 
                          key={r}
                          onClick={() => { setFormData({...formData, reason: r}); nextStep(); }}
                          className={`p-6 rounded-2xl border-2 text-left transition-all text-sm font-bold uppercase tracking-wider ${formData.reason === r ? 'border-brand-orange bg-orange-50/30 text-brand-orange' : 'border-zinc-50 hover:border-zinc-100 text-zinc-600'}`}
                       >
                          {r}
                       </button>
                    ))}
                 </div>
                 <button onClick={prevStep} className="text-zinc-400 text-[10px] font-black uppercase tracking-widest mt-10 hover:text-brand-orange transition-colors flex items-center gap-2">← Voltar para escolha</button>
              </div>
           )}

           {step === 3 && (
              <div className="space-y-8 animate-fade-in flex-grow flex flex-col">
                 <div className="space-y-6">
                    <div className="relative group">
                       <label className="absolute -top-3 left-6 bg-white px-2 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 group-focus-within:text-brand-orange transition-colors">Nome Completo</label>
                       <input 
                          className="w-full bg-transparent border-2 border-zinc-100 p-5 rounded-2xl outline-none focus:border-brand-orange transition-all font-bold text-zinc-900"
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                          placeholder="Ex: Pedro Henrique"
                       />
                    </div>
                    <div className="relative group">
                       <label className="absolute -top-3 left-6 bg-white px-2 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 group-focus-within:text-brand-orange transition-colors">WhatsApp para Agendamento</label>
                       <input 
                          className="w-full bg-transparent border-2 border-zinc-100 p-5 rounded-2xl outline-none focus:border-brand-orange transition-all font-bold text-zinc-900"
                          value={formData.phone}
                          onChange={e => setFormData({...formData, phone: e.target.value})}
                          placeholder="(21) 99999-9999"
                       />
                    </div>
                 </div>
                 <div className="pt-6 mt-auto">
                    <button 
                       onClick={handleFinish} 
                       disabled={!formData.name || !formData.phone || loading}
                       className="w-full bg-zinc-950 text-white py-6 rounded-3xl font-black uppercase text-xs tracking-[0.2em] hover:bg-brand-orange transition-all shadow-2xl disabled:opacity-50 flex items-center justify-center gap-3"
                    >
                       {loading ? <Loader2 className="animate-spin"/> : 'Confirmar Solicitação'}
                    </button>
                    <button onClick={prevStep} className="w-full text-zinc-400 text-[10px] font-black uppercase tracking-widest mt-6">Ajustar Detalhes</button>
                 </div>
              </div>
           )}

           {step === 4 && (
              <div className="text-center py-12 animate-fade-in flex flex-col items-center justify-center flex-grow">
                 <div className="w-28 h-28 bg-green-50 rounded-full flex items-center justify-center mb-8 text-green-500 shadow-inner border border-green-100">
                    <CheckCircle2 size={56}/>
                 </div>
                 <h4 className="text-3xl font-black text-zinc-900 uppercase tracking-tighter mb-6">Pedido Confirmado!</h4>
                 <div className="bg-zinc-50 p-8 rounded-[2rem] border border-zinc-100 mb-10 max-w-sm">
                    <p className="text-zinc-500 text-sm font-medium leading-relaxed">
                       Sua mensagem para o(a) **{formData.preferredPastor}** foi enviada com sucesso! <br/><br/>
                       A nossa **secretaria paroquial** entrará em contato com você via WhatsApp para confirmar o horário disponível na agenda oficial.
                    </p>
                 </div>
                 <button onClick={onClose} className="bg-brand-orange text-white px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform shadow-xl">Entendido</button>
              </div>
           )}
        </div>
      </div>
    </div>
  )
};

export const PastoralSection = ({ data }: { data: WelcomeSectionData }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="py-40 px-8 bg-white transition-colors duration-1000 relative overflow-hidden">
       {/* Elementos Decorativos */}
       <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-zinc-50 to-transparent opacity-60 -z-10"></div>
       <div className="absolute top-1/4 right-[-10%] w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[140px] pointer-events-none"></div>
       
       <CabinetWizard isOpen={modalOpen} onClose={() => setModalOpen(false)} pastorName={data.pastorName} pastorName2={data.pastorName2} />
       
       <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-32 items-center">
             
             {/* Esquerda: Fotos Editoriais Simétricas */}
             <div className="lg:col-span-6 order-2 lg:order-1 relative">
                <div className="flex flex-col md:flex-row gap-8 items-center lg:items-start relative z-10">
                   {/* Pastor Principal */}
                   <div className="w-full md:w-1/2 group animate-reveal">
                      <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border-[16px] border-white transition-all duration-1000 group-hover:scale-[1.03] group-hover:rotate-1 relative bg-zinc-100">
                         <img src={data.imageUrl} className="w-full h-full object-cover transition-all duration-[2000ms] group-hover:scale-110" alt={data.pastorName} />
                         <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                         <div className="absolute bottom-8 left-8 opacity-0 group-hover:opacity-100 transition-all translate-y-6 group-hover:translate-y-0 duration-700">
                            <h4 className="text-white font-black text-xl uppercase tracking-tighter">{data.pastorName}</h4>
                            <p className="text-brand-orange text-[9px] font-black uppercase tracking-[0.2em] mt-1">Titular</p>
                         </div>
                      </div>
                   </div>

                   {/* Pastora Cônjuge */}
                   {data.imageUrl2 && (
                     <div className="w-full md:w-1/2 group animate-reveal md:mt-24" style={{animationDelay: '0.4s'}}>
                        <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border-[16px] border-white transition-all duration-1000 group-hover:scale-[1.03] group-hover:-rotate-1 relative bg-zinc-100">
                           <img src={data.imageUrl2} className="w-full h-full object-cover transition-all duration-[2000ms] group-hover:scale-110" alt={data.pastorName2} />
                           <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                           <div className="absolute bottom-8 left-8 opacity-0 group-hover:opacity-100 transition-all translate-y-6 group-hover:translate-y-0 duration-700">
                              <h4 className="text-white font-black text-xl uppercase tracking-tighter">{data.pastorName2}</h4>
                              <p className="text-brand-orange text-[9px] font-black uppercase tracking-[0.2em] mt-1">Pastora</p>
                           </div>
                        </div>
                     </div>
                   )}
                </div>
                
                {/* Carimbo de Autenticidade/Família */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-brand-orange/10 rounded-full flex items-center justify-center animate-pulse-slow -z-10">
                   <div className="w-32 h-32 border-2 border-brand-orange/5 rounded-full"></div>
                </div>
                
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-white px-10 py-5 rounded-[2.5rem] shadow-2xl border border-zinc-50 flex items-center gap-4 z-20 animate-bounce-slow">
                   <div className="w-3 h-3 bg-brand-orange rounded-full shadow-[0_0_10px_#FF5500]"></div>
                   <span className="text-[11px] font-black uppercase tracking-[0.25em] text-zinc-900">Nossos Pastores</span>
                </div>
             </div>

             {/* Direita: Conteúdo Editorial */}
             <div className="lg:col-span-6 space-y-12 order-1 lg:order-2">
                <div className="animate-reveal">
                   <div className="inline-flex items-center gap-3 mb-10 px-6 py-2.5 bg-zinc-50 rounded-full border border-zinc-100 shadow-sm">
                      <Star size={14} className="text-brand-orange fill-current"/>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Curadoria Pastoral</span>
                   </div>
                   
                   <h2 className="text-6xl lg:text-8xl font-black text-zinc-900 uppercase tracking-tighter leading-[0.85] mb-12">
                      {data.titleLine1} <br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-red-600">{data.titleLine2}</span>
                   </h2>
                   
                   <div className="relative group">
                      <Quote size={120} className="absolute -top-16 -left-16 text-zinc-50 -z-10 group-hover:text-brand-orange/5 transition-colors duration-1000" />
                      <p className="text-2xl lg:text-3xl font-light text-zinc-500 leading-snug italic border-l-4 border-brand-orange/20 pl-12 py-4">
                         {data.text}
                      </p>
                   </div>
                </div>

                <div className="bg-zinc-50/50 p-12 rounded-[3.5rem] border border-zinc-100 shadow-sm animate-slide-up relative overflow-hidden group" style={{animationDelay: '0.6s'}}>
                   <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-bl-full pointer-events-none group-hover:scale-150 transition-transform duration-1000"></div>
                   
                   <h5 className="font-black uppercase text-[10px] tracking-[0.3em] text-zinc-400 mb-8 flex items-center gap-2">
                      <Heart size={16} className="text-brand-orange"/> Mensagem aos Novos Visitantes
                   </h5>
                   <p className="text-zinc-600 text-base font-medium mb-12 leading-relaxed">
                      Sua presença aqui não é por acaso. Queremos caminhar ao seu lado, oferecendo cuidado pastoral, oração e uma comunidade que se tornou família. Agende um tempo conosco agora mesmo.
                   </p>
                   
                   <div className="flex flex-col sm:flex-row gap-5">
                      <button 
                         onClick={() => setModalOpen(true)}
                         className="flex-1 bg-zinc-950 text-white px-10 py-6 rounded-3xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-4 hover:bg-brand-orange transition-all shadow-2xl hover:-translate-y-1 active:scale-95 group"
                      >
                         <CalendarCheck size={20} className="group-hover:rotate-12 transition-transform" />
                         Agendar Gabinete
                      </button>
                      <button 
                         className="flex-1 bg-white border-2 border-zinc-100 text-zinc-900 px-10 py-6 rounded-3xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-4 hover:border-brand-orange hover:text-brand-orange transition-all group"
                      >
                         <PlayCircle size={20} className="group-hover:scale-110 transition-transform" />
                         Vídeo de Boas-Vindas
                      </button>
                   </div>
                </div>
             </div>

          </div>
       </div>
    </section>
  );
};
