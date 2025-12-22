
import React, { useState } from 'react';
import { X, User, Clock, HeartHandshake, FileText, CheckSquare, Info } from 'lucide-react';
import { Ministry } from '../../types';
import ReactMarkdown from 'react-markdown';

export const MinistryModal = ({ ministry, onClose }: { ministry: Ministry, onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState<'ABOUT' | 'REQUIREMENTS'>('ABOUT');
  
  if (!ministry) return null;
  
  const handleServe = () => {
    // Logic: Use specific ministry contact if available, otherwise use general church number
    const phone = ministry.whatsappContact ? ministry.whatsappContact.replace(/\D/g, '') : "5521964564689"; 
    const msg = `Olá! Tenho interesse em servir no ministério: *${ministry.name}*. Li os requisitos e gostaria de me voluntariar!`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in">
       <div className="bg-white dark:bg-zinc-900 w-full max-w-5xl h-[85vh] rounded-[2.5rem] overflow-hidden shadow-2xl relative flex flex-col md:flex-row animate-slide-up border border-white/10">
          
          {/* Left: Hero Image */}
          <div className="md:w-2/5 h-64 md:h-auto relative">
             <img src={ministry.image} className="absolute inset-0 w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent"></div>
             
             {/* Mobile Close */}
             <button onClick={onClose} className="absolute top-4 left-4 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-sm transition-colors md:hidden"><X size={20}/></button>
             
             <div className="absolute bottom-0 left-0 p-8 w-full text-white">
                <span className="bg-brand-orange text-xs font-black px-3 py-1 rounded-full mb-4 inline-block uppercase tracking-widest shadow-lg border border-white/10">{ministry.category || 'Voluntariado'}</span>
                <h3 className="text-4xl md:text-5xl font-black uppercase leading-[0.9] drop-shadow-xl mb-2">{ministry.name}</h3>
                <div className="flex items-center gap-2 mt-4 text-zinc-300 text-sm font-bold">
                   <User size={16} className="text-brand-orange"/> Líder: {ministry.leader || 'Equipe Pastoral'}
                </div>
             </div>
          </div>

          {/* Right: Content */}
          <div className="md:w-3/5 flex flex-col bg-white dark:bg-zinc-900 relative">
             <button onClick={onClose} className="absolute top-6 right-6 text-zinc-400 hover:text-brand-orange p-2 rounded-full bg-zinc-100 dark:bg-white/5 transition-colors hidden md:block"><X size={24}/></button>

             {/* Tabs */}
             <div className="flex items-center border-b border-zinc-200 dark:border-white/10 px-8 pt-8">
                <button 
                  onClick={() => setActiveTab('ABOUT')}
                  className={`pb-4 px-4 text-sm font-bold uppercase tracking-widest transition-colors border-b-2 ${activeTab === 'ABOUT' ? 'border-brand-orange text-brand-orange' : 'border-transparent text-zinc-400 hover:text-zinc-600'}`}
                >
                  Sobre
                </button>
                <button 
                  onClick={() => setActiveTab('REQUIREMENTS')}
                  className={`pb-4 px-4 text-sm font-bold uppercase tracking-widest transition-colors border-b-2 ${activeTab === 'REQUIREMENTS' ? 'border-brand-orange text-brand-orange' : 'border-transparent text-zinc-400 hover:text-zinc-600'}`}
                >
                  Requisitos
                </button>
             </div>

             {/* Scrollable Content */}
             <div className="flex-grow overflow-y-auto p-8 custom-scrollbar">
                {activeTab === 'ABOUT' && (
                  <div className="space-y-6 animate-fade-in">
                     <div className="prose dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-300 text-lg leading-relaxed">
                        <ReactMarkdown>{ministry.fullDescription || ministry.description || "Nenhuma descrição detalhada disponível."}</ReactMarkdown>
                     </div>
                     
                     <div className="bg-zinc-50 dark:bg-white/5 p-6 rounded-2xl border border-zinc-200 dark:border-white/5 flex items-start gap-4">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl text-blue-600 dark:text-blue-400"><Clock size={24}/></div>
                        <div>
                           <h5 className="font-bold text-zinc-900 dark:text-white uppercase text-sm mb-1">Agenda & Encontros</h5>
                           <p className="text-zinc-500 text-sm">{ministry.meetingTime || "A definir com a liderança."}</p>
                        </div>
                     </div>
                  </div>
                )}

                {activeTab === 'REQUIREMENTS' && (
                  <div className="space-y-6 animate-fade-in">
                     <div className="bg-orange-50 dark:bg-orange-900/10 p-6 rounded-2xl border border-orange-100 dark:border-orange-500/20 mb-6">
                        <h5 className="font-bold text-orange-700 dark:text-orange-400 flex items-center gap-2 mb-2"><Info size={18}/> Importante</h5>
                        <p className="text-orange-600 dark:text-orange-300/80 text-sm">Servir é um privilégio e uma responsabilidade. Leia atentamente o que esperamos de você.</p>
                     </div>
                     
                     <div className="prose dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-300">
                        <ReactMarkdown>{ministry.requirements || "1. Ser membro batizado da igreja.\n2. Ter concluído o curso de membresia.\n3. Ter coração ensinável."}</ReactMarkdown>
                     </div>
                  </div>
                )}
             </div>

             {/* Footer Action */}
             <div className="p-8 border-t border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-black/20">
                <button onClick={handleServe} className="w-full bg-zinc-900 dark:bg-white text-white dark:text-black py-4 rounded-xl font-black uppercase tracking-widest hover:bg-brand-orange dark:hover:bg-brand-orange hover:text-white dark:hover:text-white transition-all shadow-xl flex items-center justify-center gap-3 transform hover:scale-[1.01]">
                   <HeartHandshake size={20}/> Quero Servir Neste Ministério
                </button>
                <p className="text-center text-zinc-400 text-[10px] mt-3 uppercase tracking-wider">
                   {ministry.whatsappContact ? "Ao clicar, você falará diretamente com o líder." : "Ao clicar, você falará com a secretaria da igreja."}
                </p>
             </div>
          </div>
       </div>
    </div>
  );
}
