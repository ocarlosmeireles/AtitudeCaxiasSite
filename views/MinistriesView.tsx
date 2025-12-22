
import React, { useState } from 'react';
import { Ministry } from '../types';
import { MinistryModal } from '../components/modals/MinistryModal';
import { ChevronRight, Users, HeartHandshake, Sparkles, UserCheck } from 'lucide-react';

export const MinistriesView = ({ ministries }: { ministries: Ministry[] }) => {
  const [selectedMinistry, setSelectedMinistry] = useState<Ministry | null>(null);
  
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black pb-20 animate-fade-in">
       <MinistryModal ministry={selectedMinistry!} onClose={() => setSelectedMinistry(null)} />
       
       {/* Hero */}
       <div className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-zinc-900">
          <img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 dark:from-black via-transparent to-transparent"></div>
          <div className="relative z-10 text-center px-4">
             <div className="inline-flex items-center gap-2 bg-brand-orange/20 border border-brand-orange/30 text-brand-orange text-xs font-black uppercase px-4 py-2 rounded-full tracking-widest mb-6 backdrop-blur-md">
                <HeartHandshake size={14}/> Voluntariado
             </div>
             <h2 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter mb-6 drop-shadow-2xl">
               Sirva no <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-red-500">Reino</span>
             </h2>
             <p className="text-zinc-300 max-w-xl mx-auto text-lg md:text-xl font-light leading-relaxed">
               Cada talento importa. Descubra onde Deus quer te usar para impactar vidas.
             </p>
          </div>
       </div>

       {/* Fluid Masonry Grid */}
       <div className="max-w-7xl mx-auto px-4 -mt-24 relative z-20">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {ministries.map((min, idx) => (
             <div 
               key={min.id} 
               onClick={() => setSelectedMinistry(min)} 
               className="group relative bg-white dark:bg-zinc-900 rounded-[2rem] overflow-hidden border border-zinc-200 dark:border-white/5 shadow-xl hover:shadow-2xl hover:shadow-brand-orange/20 transition-all duration-500 cursor-pointer hover:-translate-y-2 flex flex-col"
             >
               {/* Image Area */}
               <div className="h-72 overflow-hidden relative">
                 <img src={min.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                 
                 {/* Floating Badge */}
                 <div className="absolute top-4 right-4">
                    <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                      {min.category || 'Geral'}
                    </span>
                 </div>

                 {/* Content Overlay */}
                 <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                   <h3 className="text-3xl font-black text-white uppercase leading-none mb-3 group-hover:text-brand-orange transition-colors">
                     {min.name}
                   </h3>
                   <div className="flex items-center gap-3 text-zinc-300 text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      <UserCheck size={14} className="text-brand-orange"/> Líder: {min.leader || 'Equipe'}
                   </div>
                 </div>
               </div>

               {/* Description Area - Expands on mobile/tablet visually */}
               <div className="p-8 flex-grow flex flex-col justify-between bg-white dark:bg-zinc-900 relative z-10">
                 <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3 group-hover:line-clamp-none transition-all">
                   {min.description}
                 </p>
                 
                 <div className="pt-6 border-t border-zinc-100 dark:border-white/5 flex justify-between items-center">
                    <div className="flex items-center text-zinc-400 text-[10px] font-bold uppercase tracking-widest">
                       <Sparkles size={12} className="mr-2 text-brand-orange"/> {min.meetingTime || 'Escala Rotativa'}
                    </div>
                    <span className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-zinc-400 group-hover:bg-brand-orange group-hover:text-white transition-all duration-300">
                      <ChevronRight size={18}/>
                    </span>
                 </div>
               </div>
             </div>
           ))}
         </div>
       </div>
    </div>
  );
};
