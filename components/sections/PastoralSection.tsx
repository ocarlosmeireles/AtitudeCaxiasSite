
import React, { useState } from 'react';
import { CalendarCheck, X, Loader2, Star, Quote, ArrowRight } from 'lucide-react';
import { WelcomeSectionData } from '../../types';
import { saveData } from '../../services/firebase';

const CabinetModal = ({ isOpen, onClose, pastorName, pastorName2 }: any) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', preferredPastor: pastorName });

  if (!isOpen) return null;

  const handleFinish = async () => {
    if(!formData.name || !formData.phone) return alert("Preencha seus dados.");
    setLoading(true);
    await saveData('cabinetRequests', { ...formData, createdAt: Date.now(), status: 'pending' });
    const msg = `*GABINETE PASTORAL*\n\nPastor: ${formData.preferredPastor}\nNome: ${formData.name}\nWhatsApp: ${formData.phone}`;
    window.open(`https://wa.me/5521964564689?text=${encodeURIComponent(msg)}`, '_blank');
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-zinc-900 rounded-[3rem] w-full max-w-md overflow-hidden shadow-2xl relative border border-zinc-100 dark:border-white/10">
        <div className="bg-zinc-950 p-10 text-white text-center">
           <button onClick={onClose} className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"><X/></button>
           <h3 className="text-2xl font-black uppercase tracking-tighter">Agendamento</h3>
           <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-2">Um tempo precioso de cuidado</p>
        </div>
        <div className="p-10 space-y-5">
           <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-2xl">
              <button onClick={() => setFormData({...formData, preferredPastor: pastorName})} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${formData.preferredPastor === pastorName ? 'bg-white dark:bg-zinc-700 text-brand-orange shadow-sm' : 'text-zinc-400'}`}>{pastorName.split(' ')[1]}</button>
              {pastorName2 && <button onClick={() => setFormData({...formData, preferredPastor: pastorName2})} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${formData.preferredPastor === pastorName2 ? 'bg-white dark:bg-zinc-700 text-brand-orange shadow-sm' : 'text-zinc-400'}`}>{pastorName2.split(' ')[1]}</button>}
           </div>
           <input className="w-full bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl outline-none border border-transparent focus:border-brand-orange transition-all text-sm font-medium" placeholder="Seu Nome" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
           <input className="w-full bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl outline-none border border-transparent focus:border-brand-orange transition-all text-sm font-medium" placeholder="WhatsApp" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
           <button onClick={handleFinish} disabled={loading} className="w-full bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-brand-orange dark:hover:bg-brand-orange dark:hover:text-white transition-all shadow-xl">
             {loading ? <Loader2 className="animate-spin mx-auto"/> : 'Solicitar Horário'}
           </button>
        </div>
      </div>
    </div>
  )
};

export const PastoralSection = ({ data }: { data: WelcomeSectionData }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="py-40 px-6 bg-white dark:bg-zinc-950 transition-colors duration-700 relative overflow-hidden">
       {/* Background Decorativo */}
       <div className="absolute top-0 right-0 w-1/3 h-full bg-zinc-50 dark:bg-zinc-900/20 -z-0"></div>
       
       <CabinetModal isOpen={modalOpen} onClose={() => setModalOpen(false)} pastorName={data.pastorName} pastorName2={data.pastorName2} />
       
       <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
             
             {/* Lado A: Imagens em Composição Artística Enxuta */}
             <div className="lg:col-span-6 relative flex justify-center">
                <div className="relative w-full max-w-sm group">
                   <div className="aspect-[3/4] rounded-[4rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.2)] dark:shadow-black border-[1px] border-zinc-100 dark:border-white/5 bg-zinc-200">
                      <img src={data.imageUrl} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000" alt={data.pastorName} />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent"></div>
                      <div className="absolute bottom-10 left-10">
                         <h4 className="text-2xl font-black text-white uppercase tracking-tighter leading-none">{data.pastorName}</h4>
                         <p className="text-brand-orange text-[9px] font-black uppercase tracking-[0.2em] mt-2">{data.pastorRole}</p>
                      </div>
                   </div>
                </div>

                {data.imageUrl2 && (
                   <div className="absolute -bottom-16 -right-4 lg:-right-12 w-2/3 max-w-[260px] group">
                      <div className="aspect-[3/4] rounded-[4rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] border-[8px] border-white dark:border-zinc-950 bg-zinc-200">
                         <img src={data.imageUrl2} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000" alt={data.pastorName2} />
                         <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent"></div>
                         <div className="absolute bottom-10 left-10">
                            <h4 className="text-xl font-black text-white uppercase tracking-tighter leading-none">{data.pastorName2}</h4>
                            <p className="text-brand-orange text-[8px] font-black uppercase tracking-[0.2em] mt-1">{data.pastorRole2 || 'Pastora'}</p>
                         </div>
                      </div>
                   </div>
                )}
             </div>

             {/* Lado B: Conteúdo Signature */}
             <div className="lg:col-span-6 space-y-12">
                <div>
                   <span className="inline-block mb-6 px-4 py-1.5 bg-zinc-100 dark:bg-zinc-900 rounded-full text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400">Paternidade Espiritual</span>
                   <h2 className="text-6xl lg:text-8xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter leading-[0.8] mb-8">
                      {data.titleLine1} <br/>
                      <span className="text-brand-orange">{data.titleLine2}</span>
                   </h2>
                   <div className="relative">
                      <Quote size={120} className="absolute -top-16 -left-12 text-zinc-50 dark:text-zinc-900/50 -z-10 opacity-50" />
                      <p className="text-xl lg:text-2xl font-light text-zinc-500 dark:text-zinc-400 leading-relaxed italic pr-12">
                         {data.text}
                      </p>
                   </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-8 pt-8 border-t border-zinc-100 dark:border-white/5">
                   <button 
                      onClick={() => setModalOpen(true)}
                      className="group bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-10 py-5 rounded-3xl font-black uppercase tracking-widest text-[11px] flex items-center gap-4 hover:bg-brand-orange dark:hover:bg-brand-orange dark:hover:text-white transition-all shadow-xl hover:-translate-y-1 active:scale-95"
                   >
                      <CalendarCheck size={20} className="group-hover:rotate-12 transition-transform" /> 
                      Solicitar Gabinete
                   </button>
                   
                   <div className="flex items-center gap-4">
                      <div className="flex -space-x-3">
                         {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-zinc-950 bg-zinc-200"></div>)}
                      </div>
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-tight">
                         Centenas de vidas <br/>
                         <span className="text-zinc-900 dark:text-white">Acompanhadas Mensalmente</span>
                      </p>
                   </div>
                </div>
             </div>

          </div>
       </div>
    </div>
  );
};
