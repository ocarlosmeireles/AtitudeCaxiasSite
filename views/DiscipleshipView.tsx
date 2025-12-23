
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { DiscipleshipTrack } from '../types';
import { ChevronLeft, ArrowRight, CheckCircle, List, Award, GraduationCap, ArrowUpRight, X, Printer, Share2, Download, Lock, PlayCircle } from 'lucide-react';

const CertificateModal = ({ track, onClose }: { track: DiscipleshipTrack, onClose: () => void }) => {
    const [name, setName] = useState('');
    const [isGenerated, setIsGenerated] = useState(false);

    const handlePrint = () => {
        const printContent = document.getElementById('printable-certificate');
        if (printContent) {
            const win = window.open('', '_blank');
            win?.document.write(`<html><head><title>Certificado - IBA DC</title><link href="https://cdn.tailwindcss.com" rel="stylesheet"><style>@media print { body { -webkit-print-color-adjust: exact; } }</style></head><body>${printContent.innerHTML}</body></html>`);
            setTimeout(() => { win?.print(); win?.close(); }, 500);
        }
    };

    return (
        <div className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-3xl w-full max-w-4xl overflow-hidden relative shadow-2xl animate-slide-up">
                <button onClick={onClose} className="absolute top-6 right-6 p-3 bg-zinc-100 rounded-full z-20 hover:bg-red-500 hover:text-white transition-all"><X size={20}/></button>
                {!isGenerated ? (
                    <div className="p-16 text-center space-y-10">
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto shadow-inner"><Award size={48} className="text-green-600"/></div>
                        <div>
                           <h2 className="text-5xl font-black text-zinc-900 tracking-tighter mb-4">MUITO BEM!</h2>
                           <p className="text-zinc-500 text-lg">Você concluiu o curso com sucesso. Digite seu nome completo para emitir seu certificado de honra.</p>
                        </div>
                        <input 
                           className="w-full p-6 text-center text-3xl font-black border-4 border-zinc-100 rounded-3xl outline-none focus:border-brand-orange focus:ring-8 focus:ring-brand-orange/5 transition-all" 
                           placeholder="Seu Nome Completo" 
                           value={name} 
                           onChange={e => setName(e.target.value)} 
                           autoFocus
                        />
                        <button 
                           onClick={() => name.length > 3 && setIsGenerated(true)} 
                           className="w-full bg-zinc-900 text-white py-6 rounded-3xl font-black uppercase tracking-widest shadow-2xl hover:bg-brand-orange transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50"
                           disabled={name.length < 4}
                        >
                           Gerar Meu Certificado Oficial
                        </button>
                    </div>
                ) : (
                    <div className="p-10 flex flex-col items-center animate-fade-in">
                        <div id="printable-certificate" className="w-full bg-white p-16 text-center border-[15px] border-double border-zinc-200 relative overflow-hidden">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-bl-full"></div>
                           <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-orange/5 rounded-tr-full"></div>
                           
                           <div className="space-y-8">
                              <div className="flex justify-center mb-10">
                                 <GraduationCap size={64} className="text-brand-orange"/>
                              </div>
                              <h1 className="text-6xl font-serif text-zinc-800 tracking-tight">Certificado de Conclusão</h1>
                              <p className="text-zinc-400 font-black uppercase tracking-[0.4em] text-xs">A Igreja Batista Atitude em Duque de Caxias confere a:</p>
                              <h2 className="text-5xl font-black text-zinc-950 uppercase border-b-4 border-brand-orange inline-block px-10 pb-4">{name}</h2>
                              <p className="text-zinc-600 leading-relaxed max-w-2xl mx-auto text-xl italic">"Pela conclusão com êxito do curso acadêmico de <strong>{track.title}</strong>, demonstrando compromisso inabalável com o Reino e a busca contínua pelo conhecimento das Sagradas Escrituras."</p>
                              
                              <div className="pt-16 flex justify-between items-end max-w-2xl mx-auto text-left">
                                 <div className="text-center w-64">
                                    <div className="border-b border-zinc-300 mb-4 pb-4 font-black uppercase text-[10px]">Pr. Joubert Curti</div>
                                    <p className="text-[9px] text-zinc-400 uppercase tracking-widest font-bold text-center">Pastor Presidente IBA-DC</p>
                                 </div>
                                 <div className="w-24 h-24 bg-zinc-50 border-4 border-zinc-200 rounded-full flex flex-col items-center justify-center text-zinc-300 font-black">
                                    <span className="text-[8px] leading-none">SELO DE</span>
                                    <span className="text-[10px] text-zinc-800 text-center">AUTENTICIDADE</span>
                                 </div>
                                 <div className="text-center w-64">
                                    <div className="border-b border-zinc-300 mb-4 pb-4 font-bold text-lg text-center">{new Date().toLocaleDateString()}</div>
                                    <p className="text-[9px] text-zinc-400 uppercase tracking-widest font-bold text-center">Data de Emissão</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                        
                        <div className="flex gap-4 mt-12 w-full max-w-md">
                           <button onClick={handlePrint} className="flex-1 bg-zinc-900 text-white py-5 rounded-2xl font-black uppercase text-xs flex items-center justify-center gap-3 hover:bg-brand-orange transition-all shadow-xl">
                              <Printer size={20}/> Imprimir
                           </button>
                           <button onClick={onClose} className="flex-1 bg-zinc-100 py-5 rounded-2xl font-black uppercase text-xs text-zinc-500 hover:bg-zinc-200 transition-all">
                              Sair
                           </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export const DiscipleshipView = ({ tracks }: { tracks: DiscipleshipTrack[] }) => {
    const [activeTrack, setActiveTrack] = useState<DiscipleshipTrack | null>(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [showCert, setShowCert] = useState(false);

    return (
     <div className="min-h-screen bg-zinc-50 dark:bg-black transition-colors duration-700 pb-20 animate-fade-in overflow-x-hidden">
       {showCert && activeTrack && <CertificateModal track={activeTrack} onClose={() => { setShowCert(false); setActiveTrack(null); }} />}
       
       {!activeTrack ? (
         <>
           {/* Surprising Modern Hero */}
           <div className="bg-zinc-950 text-white pt-48 pb-32 px-8 relative overflow-hidden rounded-b-[4rem]">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
              <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-orange/10 rounded-full blur-[160px] animate-pulse"></div>
              <div className="max-w-7xl mx-auto relative z-10 text-center">
                  <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-10 border border-white/5 animate-slide-up shadow-2xl">
                      <GraduationCap size={16} className="text-brand-orange"/> Academia Atitude • Plataforma EAD
                  </div>
                  <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.85] animate-slide-up uppercase">
                      CONHECER PARA <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-orange-400 to-red-600">TRANSFORMAR.</span>
                  </h1>
                  <p className="text-zinc-400 text-lg md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed animate-fade-in delay-500">
                     O conhecimento da Palavra é a base para uma vida extraordinária. Escolha um curso e inicie sua jornada agora mesmo.
                  </p>
              </div>
           </div>

           {/* Animated Course Grid */}
           <div className="max-w-7xl mx-auto px-8 py-24">
              <div className="flex items-center justify-between mb-16">
                 <h2 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4">
                    <div className="w-1.5 h-10 bg-brand-orange rounded-full"></div>
                    Catálogo de Cursos
                 </h2>
                 <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400 border border-zinc-200 dark:border-white/10 px-4 py-2 rounded-lg">
                    {tracks.length} Trilhas Disponíveis
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {tracks.map((track, idx) => (
                    <div 
                      key={track.id} 
                      onClick={() => { setActiveTrack(track); setCurrentStep(0); }} 
                      className={`group bg-white dark:bg-zinc-900 rounded-[2.5rem] overflow-hidden border border-zinc-200 dark:border-white/5 shadow-xl hover:shadow-brand-orange/20 transition-all duration-700 cursor-pointer hover:-translate-y-3 animate-fade-in`}
                      style={{ transitionDelay: `${idx * 100}ms` }}
                    >
                        <div className="aspect-[16/10] relative overflow-hidden">
                           <img src={track.image} className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" alt={track.title} />
                           <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500"></div>
                           <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
                              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-brand-orange shadow-2xl">
                                 <PlayCircle size={32} fill="currentColor"/>
                              </div>
                           </div>
                           <div className="absolute top-6 left-6">
                              <span className="bg-brand-orange text-white text-[9px] font-black uppercase px-3 py-1.5 rounded-xl tracking-widest shadow-lg">{track.category || 'Membresia'}</span>
                           </div>
                        </div>
                        <div className="p-8">
                           <h3 className="text-2xl font-black text-zinc-900 dark:text-white leading-tight mb-4 group-hover:text-brand-orange transition-colors uppercase tracking-tight">{track.title}</h3>
                           <p className="text-zinc-500 dark:text-zinc-400 text-sm line-clamp-2 mb-8 leading-relaxed font-medium">Siga a trilha de aprendizado completa sobre {track.title} e receba seu certificado oficial ao final.</p>
                           <div className="flex items-center gap-4 text-[9px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest pt-6 border-t border-zinc-100 dark:border-white/5">
                              <List size={14} className="text-brand-orange"/> {track.steps?.length || 0} Módulos de Estudo
                              <div className="ml-auto w-10 h-10 rounded-2xl bg-zinc-50 dark:bg-white/5 flex items-center justify-center text-zinc-400 group-hover:bg-brand-orange group-hover:text-white transition-all"><ArrowUpRight size={18}/></div>
                           </div>
                        </div>
                    </div>
                  ))}
              </div>
           </div>
         </>
       ) : (
         /* Immersive Mobile-First Course Player */
         <div className="h-screen flex flex-col lg:flex-row overflow-hidden fixed inset-0 z-[120] bg-white dark:bg-zinc-950 animate-fade-in">
            
            {/* Sidebar Navigation - Optimized for Thumb Access */}
            <div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-r border-zinc-200 dark:border-white/5 flex flex-col shrink-0 order-2 lg:order-1">
               <div className="p-8 border-b border-zinc-200 dark:border-white/5">
                  <button onClick={() => setActiveTrack(null)} className="text-zinc-500 hover:text-brand-orange text-[10px] font-black uppercase tracking-widest mb-8 flex items-center gap-2 transition-colors group">
                     <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform"/> Voltar ao Catálogo
                  </button>
                  <h2 className="text-2xl font-black text-zinc-900 dark:text-white leading-tight uppercase tracking-tighter">{activeTrack.title}</h2>
                  
                  {/* Progress Visualization */}
                  <div className="mt-8">
                     <div className="flex justify-between text-[9px] font-black uppercase text-zinc-400 tracking-widest mb-3">
                        <span>Seu Progresso</span>
                        <span>{Math.round(((currentStep + 1) / (activeTrack.steps?.length || 1)) * 100)}%</span>
                     </div>
                     <div className="w-full bg-zinc-200 dark:bg-white/10 h-2.5 rounded-full overflow-hidden shadow-inner">
                        <div className="bg-brand-orange h-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(255,85,0,0.4)]" style={{width: `${((currentStep + 1) / (activeTrack.steps?.length || 1)) * 100}%`}}></div>
                     </div>
                  </div>
               </div>

               <div className="flex-grow overflow-y-auto p-4 space-y-3 custom-scrollbar">
                    {activeTrack.steps?.map((step, idx) => (
                        <button 
                          key={idx} 
                          onClick={() => setCurrentStep(idx)} 
                          className={`w-full text-left p-6 rounded-3xl flex items-center gap-5 transition-all duration-300 ${idx === currentStep ? 'bg-white dark:bg-zinc-800 shadow-2xl border border-brand-orange/20 scale-102 z-10' : 'opacity-60 hover:opacity-100 hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-900 dark:text-zinc-300'}`}
                        >
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xs font-black shadow-lg transition-all duration-500 ${idx === currentStep ? 'bg-brand-orange text-white scale-110' : idx < currentStep ? 'bg-green-500 text-white' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500'}`}>
                               {idx < currentStep ? <CheckCircle size={20}/> : idx + 1}
                            </div>
                            <div className="flex-grow">
                               <span className={`text-sm font-black uppercase tracking-tight block ${idx === currentStep ? 'text-zinc-900 dark:text-white' : 'text-zinc-500'}`}>{step.title}</span>
                               <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1 block">{idx < currentStep ? 'Concluído' : idx === currentStep ? 'Em Aula' : 'Bloqueado'}</span>
                            </div>
                        </button>
                    ))}
               </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-grow overflow-y-auto bg-white dark:bg-black p-8 lg:p-24 relative order-1 lg:order-2 custom-scrollbar">
               <div className="max-w-4xl mx-auto space-y-12">
                  <div className="space-y-4">
                     <span className="text-brand-orange font-black text-[10px] uppercase tracking-[0.3em]">Módulo {currentStep + 1} de {activeTrack.steps.length}</span>
                     <h1 className="text-5xl lg:text-7xl font-black text-zinc-900 dark:text-white leading-[0.9] tracking-tighter uppercase">{activeTrack.steps[currentStep].title}</h1>
                  </div>
                  
                  <div className="prose prose-zinc dark:prose-invert prose-xl max-w-none text-zinc-700 dark:text-zinc-300 leading-relaxed font-serif pt-8 border-t border-zinc-100 dark:border-white/5">
                     <ReactMarkdown>{activeTrack.steps[currentStep].content}</ReactMarkdown>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="pt-24 flex flex-col sm:flex-row justify-between items-center gap-6 sticky bottom-0 bg-white/90 dark:bg-black/90 backdrop-blur-xl py-10 border-t border-zinc-100 dark:border-white/5">
                     <button 
                       disabled={currentStep === 0} 
                       onClick={() => setCurrentStep(p => p - 1)} 
                       className="flex items-center gap-3 font-black uppercase text-[10px] tracking-widest text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all disabled:opacity-0 active:scale-95"
                     >
                        <ChevronLeft size={20}/> Anterior
                     </button>
                     
                     {currentStep < (activeTrack.steps.length - 1) ? (
                        <button 
                          onClick={() => {
                            setCurrentStep(p => p + 1);
                            const mainEl = document.querySelector('.order-1');
                            if (mainEl) mainEl.scrollTo({ top: 0, behavior: 'smooth' });
                          }} 
                          className="bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-12 py-6 rounded-[2rem] font-black uppercase tracking-widest text-[11px] flex items-center gap-4 hover:bg-brand-orange dark:hover:bg-brand-orange dark:hover:text-white transition-all shadow-[0_20px_50px_rgba(0,0,0,0.15)] transform hover:-translate-y-1 active:scale-95"
                        >
                           Próximo Módulo <ArrowRight size={20}/>
                        </button>
                     ) : (
                        <button 
                          onClick={() => setShowCert(true)} 
                          className="bg-green-600 text-white px-12 py-6 rounded-[2rem] font-black uppercase tracking-widest text-[11px] flex items-center gap-4 hover:bg-green-700 transition-all shadow-[0_20px_50px_rgba(16,185,129,0.3)] transform hover:-translate-y-1 animate-pulse"
                        >
                           Finalizar Curso & Emitir Certificado <Award size={22} className="animate-bounce"/>
                        </button>
                     )}
                  </div>
               </div>
            </div>
         </div>
       )}
     </div>
    );
 };
