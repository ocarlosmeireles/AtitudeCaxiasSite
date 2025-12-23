
import React, { useState } from 'react';
import { CalendarCheck, Quote, Heart, Sparkles, UserCheck, MessageSquare, ChevronRight, GraduationCap, Star } from 'lucide-react';
import { WelcomeSectionData } from '../../types';
import { CabinetModal } from '../modals/CabinetModal';

export const PastoralSection = ({ data }: { data: WelcomeSectionData }) => {
  const [isCabinetOpen, setIsCabinetOpen] = useState(false);
  const [selectedPastorForCabinet, setSelectedPastorForCabinet] = useState<string>('');

  if (!data.pastorName) return null;

  const handleOpenCabinet = (name: string) => {
    setSelectedPastorForCabinet(name);
    setIsCabinetOpen(true);
  };

  const pastors = [
    { name: data.pastorName, role: data.pastorRole, img: data.imageUrl, primary: true },
    { name: data.pastorName2, role: data.pastorRole2 || data.pastorRole, img: data.imageUrl2, primary: false }
  ].filter(p => p.name);

  return (
    <section className="py-32 md:py-48 px-6 bg-white transition-colors duration-1000 relative overflow-hidden">
       <CabinetModal 
          isOpen={isCabinetOpen} 
          onClose={() => setIsCabinetOpen(false)} 
          pastorName={selectedPastorForCabinet} 
       />
       
       {/* Background Aesthetics */}
       <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none"></div>
       <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-[140px] pointer-events-none"></div>
       <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

       <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
             
             {/* Text Side */}
             <div className="lg:col-span-5 space-y-12 animate-fade-in">
                <div className="space-y-6">
                   <div className="inline-flex items-center gap-3 px-5 py-2 bg-zinc-50 border border-zinc-100 rounded-full shadow-sm">
                      <Sparkles size={16} className="text-brand-orange animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Cobertura Pastoral Atitude</span>
                   </div>
                   
                   <h2 className="text-5xl md:text-7xl font-black text-zinc-900 uppercase tracking-tighter leading-[0.85]">
                      {data.titleLine1 || "UMA FAMÍLIA"} <br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-red-600">
                         {data.titleLine2 || "PARA PERTENCER"}
                      </span>
                   </h2>

                   <p className="text-2xl font-medium text-zinc-500 leading-relaxed italic border-l-4 border-brand-orange pl-8">
                      "{data.text}"
                   </p>
                </div>

                <div className="space-y-6">
                   <p className="text-zinc-600 text-lg leading-relaxed font-medium">
                      Acreditamos que ninguém deve caminhar sozinho. Nossos pastores estão aqui para cuidar, ouvir e interceder por você.
                   </p>
                   <div className="flex flex-wrap gap-4">
                      <button 
                        onClick={() => window.open('https://wa.me/5521964564689', '_blank')}
                        className="flex items-center gap-3 px-8 py-5 bg-zinc-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl hover:bg-brand-orange transition-all active:scale-95 group"
                      >
                         <MessageSquare size={18} className="group-hover:rotate-12 transition-transform" /> Falar com Boas-vindas
                      </button>
                   </div>
                </div>
             </div>

             {/* Gallery Side */}
             <div className="lg:col-span-7">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {pastors.map((pastor, idx) => (
                      <div key={idx} className="group relative flex flex-col items-center">
                         {/* Card de Destaque */}
                         <div className="relative w-full aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-700 group-hover:-translate-y-4 group-hover:rotate-1 border-8 border-zinc-50">
                            <img 
                               src={pastor.img} 
                               className="w-full h-full object-cover transition-transform duration-[4000ms] group-hover:scale-110" 
                               alt={pastor.name} 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60"></div>
                            
                            {/* Overlay Info */}
                            <div className="absolute bottom-8 left-8 right-8 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                               <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-orange mb-1">{pastor.role}</p>
                               <h3 className="text-2xl font-black uppercase tracking-tight">{pastor.name}</h3>
                            </div>

                            {/* Badge de Destaque */}
                            <div className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                               <Star size={20} fill="currentColor" />
                            </div>
                         </div>

                         {/* Action Below Card */}
                         <button 
                            onClick={() => handleOpenCabinet(pastor.name!)}
                            className="mt-6 flex items-center gap-3 px-6 py-3 bg-white border border-zinc-200 rounded-full shadow-lg hover:shadow-brand-orange/20 hover:border-brand-orange text-zinc-900 hover:text-brand-orange font-black uppercase text-[10px] tracking-widest transition-all scale-95 group-hover:scale-100"
                         >
                            <CalendarCheck size={16} /> Agendar com {pastor.name?.split(' ')[1]}
                         </button>
                      </div>
                   ))}
                </div>
             </div>

          </div>
       </div>
    </section>
  );
};
