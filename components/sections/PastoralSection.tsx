
import React from 'react';
import { CalendarCheck, PlayCircle, Star, Quote, Heart, ArrowRight } from 'lucide-react';
import { WelcomeSectionData } from '../../types';

export const PastoralSection = ({ data }: { data: WelcomeSectionData }) => {
  if (!data.pastorName) return null;

  return (
    <section className="py-40 px-8 bg-white dark:bg-zinc-950 transition-colors duration-1000 relative overflow-hidden text-left">
       {/* High-End Ambient Lighting */}
       <div className="absolute top-1/4 right-[-10%] w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-[140px] pointer-events-none animate-pulse-slow"></div>
       <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>
       
       <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-32 items-center">
             
             {/* Asymmetric Photo Grid (Editorial Style) */}
             <div className="lg:col-span-6 order-2 lg:order-1 relative">
                <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
                   {/* Primary Image */}
                   <div className="w-full md:w-3/5 group">
                      <div className="aspect-[3/4] rounded-[3.5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.12)] border-[18px] border-white dark:border-zinc-900 transition-all duration-1000 group-hover:scale-[1.03] group-hover:rotate-2 relative bg-zinc-100 dark:bg-zinc-800">
                         <img 
                           src={data.imageUrl} 
                           className="w-full h-full object-cover transition-all duration-[4000ms] group-hover:scale-110" 
                           alt={data.pastorName} 
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                   </div>
                   
                   {/* Offset Secondary Image */}
                   {data.imageUrl2 && (
                     <div className="w-full md:w-1/2 group md:mt-32 md:-ml-24">
                        <div className="aspect-[3/4] rounded-[3rem] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.08)] border-[15px] border-white dark:border-zinc-900 transition-all duration-1000 group-hover:scale-[1.05] group-hover:-rotate-3 relative bg-zinc-100 dark:bg-zinc-800">
                           <img 
                             src={data.imageUrl2} 
                             className="w-full h-full object-cover transition-all duration-[4000ms] group-hover:scale-110" 
                             alt={data.pastorName2} 
                           />
                        </div>
                     </div>
                   )}
                </div>
                
                {/* Float Badge */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-zinc-900 dark:bg-white px-14 py-7 rounded-[3rem] shadow-2xl flex items-center gap-6 z-20 border border-white/10 group cursor-default">
                   <div className="w-4 h-4 bg-brand-orange rounded-full shadow-[0_0_20px_rgba(255,85,0,0.8)] animate-pulse"></div>
                   <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white dark:text-zinc-900">Cobertura Pastoral Atitude</span>
                </div>
             </div>

             {/* Editorial Content */}
             <div className="lg:col-span-6 space-y-16 order-1 lg:order-2">
                <div className="space-y-10">
                   <div className="inline-flex items-center gap-5 mb-4 px-8 py-3.5 bg-zinc-50 dark:bg-white/5 rounded-full border border-zinc-100 dark:border-white/5 shadow-inner">
                      <Star size={18} className="text-brand-orange fill-current animate-spin-slow"/>
                      <span className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-500 dark:text-zinc-400">Pastoreio com Intencionalidade</span>
                   </div>
                   
                   <h2 className="text-6xl lg:text-9xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter leading-[0.8] mb-12">
                      {data.titleLine1 || "UMA FAMÍLIA"} <br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-orange-400 to-red-600">
                         {data.titleLine2 || "PARA PERTENCER"}
                      </span>
                   </h2>

                   <div className="relative group">
                      <Quote size={140} className="absolute -top-20 -left-20 text-zinc-50 dark:text-white/5 -z-10 transition-transform duration-1000 group-hover:rotate-12 group-hover:scale-110" />
                      <p className="text-3xl lg:text-5xl font-light text-zinc-500 dark:text-zinc-400 leading-tight italic border-l-8 border-brand-orange/30 pl-14 py-4 font-serif">
                         "{data.text}"
                      </p>
                   </div>
                </div>

                {/* Interactive CTA Card */}
                <div className="bg-zinc-50 dark:bg-zinc-900/50 p-14 lg:p-20 rounded-[4.5rem] border border-zinc-100 dark:border-white/5 shadow-sm relative overflow-hidden group/card">
                   <div className="absolute top-0 right-0 w-48 h-48 bg-brand-orange/5 rounded-bl-full group-hover/card:scale-150 transition-transform duration-1000"></div>
                   
                   <h5 className="font-black uppercase text-[11px] tracking-[0.4em] text-brand-orange mb-10 flex items-center gap-4">
                      <Heart size={20} fill="currentColor" className="animate-bounce" /> Caminhe Conosco
                   </h5>
                   
                   <p className="text-zinc-600 dark:text-zinc-300 text-xl font-medium mb-14 leading-relaxed max-w-lg">
                      Não acreditamos em igreja de multidões, mas em igreja de indivíduos cuidados um a um. Venha viver o pastoreio Atitude.
                   </p>
                   
                   <div className="flex flex-col sm:flex-row gap-8">
                      <button className="flex-1 bg-zinc-950 dark:bg-white text-white dark:text-zinc-900 px-12 py-8 rounded-[2.5rem] font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-5 hover:bg-brand-orange dark:hover:bg-brand-orange dark:hover:text-white transition-all shadow-2xl transform hover:-translate-y-1.5 active:scale-95">
                         <CalendarCheck size={24} /> Agendar Gabinete
                      </button>
                      <button className="flex-1 bg-white dark:bg-zinc-800 border-2 border-zinc-100 dark:border-white/5 text-zinc-900 dark:text-white px-12 py-8 rounded-[2.5rem] font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-5 hover:border-brand-orange dark:hover:border-brand-orange transition-all group active:scale-95">
                         <PlayCircle size={24} className="group-hover:scale-110 transition-transform" /> Boas-Vindas
                      </button>
                   </div>
                </div>
                
                {/* Signature Block */}
                <div className="flex items-center gap-8 pt-10">
                   <div className="h-px bg-zinc-200 dark:bg-white/10 flex-grow"></div>
                   <div className="text-right">
                      <p className="font-black uppercase tracking-widest text-zinc-900 dark:text-white text-base leading-none mb-2">{data.pastorName}</p>
                      <p className="text-[10px] font-bold text-brand-orange uppercase tracking-[0.4em]">{data.pastorRole}</p>
                   </div>
                </div>
             </div>

          </div>
       </div>
    </section>
  );
};
