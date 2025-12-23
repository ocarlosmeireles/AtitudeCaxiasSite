
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { DiscipleshipTrack } from '../types';
import { ChevronLeft, ArrowRight, CheckCircle, List, Award, GraduationCap, ArrowUpRight, X, PlayCircle, Printer, Download, BookOpen, Star, Share2 } from 'lucide-react';

const CertificateModal = ({ track, onClose }: { track: DiscipleshipTrack, onClose: () => void }) => {
    const [name, setName] = useState('');
    const [isGenerated, setIsGenerated] = useState(false);

    const handlePrint = () => {
        const printContent = document.getElementById('printable-certificate');
        if (printContent) {
            const win = window.open('', '_blank');
            win?.document.write(`
                <html>
                    <head>
                        <title>Certificado Academia Atitude - IBA DC</title>
                        <script src="https://cdn.tailwindcss.com"></script>
                        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Inter:wght@400;900&display=swap" rel="stylesheet">
                        <style>
                            @media print { body { -webkit-print-color-adjust: exact; } .no-print { display: none; } }
                            body { font-family: 'Inter', sans-serif; }
                            .handwriting { font-family: 'Dancing Script', cursive; }
                        </style>
                    </head>
                    <body class="bg-white p-0 m-0">
                        <div class="p-10">${printContent.innerHTML}</div>
                    </body>
                </html>
            `);
            setTimeout(() => { win?.focus(); win?.print(); win?.close(); }, 800);
        }
    };

    return (
        <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-[3rem] w-full max-w-4xl overflow-hidden relative shadow-2xl animate-slide-up flex flex-col">
                <button onClick={onClose} className="absolute top-6 right-6 p-3 bg-zinc-100 rounded-full z-20 hover:bg-red-500 hover:text-white transition-all"><X size={20}/></button>
                
                {!isGenerated ? (
                    <div className="p-16 text-center space-y-10 flex-grow flex flex-col justify-center">
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto shadow-inner"><Award size={48} className="text-green-600"/></div>
                        <div className="space-y-4">
                           <h2 className="text-5xl font-black text-zinc-900 tracking-tighter uppercase">Parabéns, Formado!</h2>
                           <p className="text-zinc-500 text-lg max-w-md mx-auto leading-relaxed">Sua dedicação é inspiradora. Digite seu nome completo para a emissão do seu certificado oficial.</p>
                        </div>
                        <div className="max-w-md mx-auto w-full">
                            <input 
                                className="w-full p-6 text-center text-3xl font-black border-4 border-zinc-100 rounded-3xl outline-none focus:border-brand-orange focus:ring-8 focus:ring-brand-orange/5 transition-all text-zinc-900" 
                                placeholder="Seu Nome Completo" 
                                value={name} 
                                onChange={e => setName(e.target.value)} 
                                autoFocus
                            />
                        </div>
                        <button 
                           onClick={() => name.length > 3 && setIsGenerated(true)} 
                           className="w-full max-w-md mx-auto bg-zinc-900 text-white py-6 rounded-3xl font-black uppercase tracking-widest shadow-2xl hover:bg-brand-orange transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50"
                           disabled={name.length < 4}
                        >
                           Emitir Meu Certificado
                        </button>
                    </div>
                ) : (
                    <div className="p-8 flex flex-col items-center animate-fade-in flex-grow overflow-y-auto custom-scrollbar">
                        {/* Certificate Canvas View */}
                        <div id="printable-certificate" className="w-full bg-white p-12 md:p-20 text-center border-[20px] border-double border-zinc-100 relative overflow-hidden shadow-sm">
                           <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-bl-full pointer-events-none"></div>
                           <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-orange/5 rounded-tr-full pointer-events-none"></div>
                           
                           <div className="space-y-10 relative z-10">
                              <div className="flex justify-center mb-6">
                                 <div className="w-20 h-20 bg-zinc-900 rounded-2xl flex items-center justify-center text-brand-orange shadow-2xl rotate-3">
                                    <GraduationCap size={40}/>
                                 </div>
                              </div>
                              
                              <h4 className="text-[10px] font-black uppercase tracking-[0.8em] text-zinc-400">Certificado de Conclusão Acadêmica</h4>
                              
                              <div className="space-y-4">
                                  <p className="text-zinc-500 font-medium italic">A Igreja Batista Atitude em Duque de Caxias certifica que</p>
                                  <h2 className="text-5xl md:text-6xl font-black text-zinc-950 uppercase border-b-8 border-brand-orange inline-block px-12 pb-4 tracking-tighter leading-none">{name}</h2>
                              </div>

                              <p className="text-zinc-600 leading-relaxed max-w-2xl mx-auto text-xl md:text-2xl font-serif mt-10 italic">
                                Concluiu com mérito o curso de formação espiritual em <br/>
                                <strong className="text-zinc-900 uppercase not-italic">"{track.title}"</strong> <br/>
                                cumprindo toda a carga horária e requisitos propostos pela Academia Atitude.
                              </p>
                              
                              <div className="pt-20 flex flex-col md:flex-row justify-between items-end gap-12 max-w-3xl mx-auto text-left">
                                 <div className="text-center w-full md:w-64">
                                    <div className="border-b-2 border-zinc-200 mb-4 pb-4 font-black uppercase text-[11px] tracking-wider text-zinc-800">Pr. Joubert Curti</div>
                                    <p className="text-[9px] text-zinc-400 uppercase tracking-widest font-bold">Presidente IBA Duque de Caxias</p>
                                 </div>
                                 
                                 <div className="w-24 h-24 bg-brand-orange/10 border-4 border-white rounded-full flex flex-col items-center justify-center shadow-xl ring-4 ring-zinc-50">
                                    <Star size={32} className="text-brand-orange fill-current" />
                                 </div>

                                 <div className="text-center w-full md:w-64">
                                    <div className="border-b-2 border-zinc-200 mb-4 pb-4 font-bold text-xl text-zinc-900">{new Date().toLocaleDateString()}</div>
                                    <p className="text-[9px] text-zinc-400 uppercase tracking-widest font-bold">Data de Formatura</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4 mt-10 w-full max-w-lg mb-4">
                           <button onClick={handlePrint} className="flex-1 bg-zinc-900 text-white py-5 rounded-3xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-4 hover:bg-brand-orange transition-all shadow-2xl active:scale-95">
                              <Printer size={18}/> Imprimir Certificado (PDF)
                           </button>
                           <button onClick={onClose} className="flex-1 bg-zinc-100 py-5 rounded-3xl font-black uppercase text-[10px] tracking-widest text-zinc-500 hover:bg-zinc-200 transition-all">
                              Fechar Portal
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

    useEffect(() => {
        if (activeTrack) {
            window.scrollTo({ top: 0, behavior: 'instant' });
        }
    }, [activeTrack]);

    return (
     <div className="min-h-screen bg-white transition-colors duration-300 pb-20 animate-fade-in">
       {showCert && activeTrack && <CertificateModal track={activeTrack} onClose={() => { setShowCert(false); setActiveTrack(null); }} />}
       
       {!activeTrack ? (
         <>
           {/* Modern Hero (Light) */}
           <div className="bg-zinc-50 pt-48 pb-32 px-8 relative overflow-hidden rounded-b-[4rem] border-b border-zinc-100">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-[140px]"></div>
              <div className="max-w-7xl mx-auto relative z-10 text-center">
                  <div className="inline-flex items-center gap-3 bg-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-10 border border-zinc-200 animate-slide-up shadow-sm">
                      <GraduationCap size={16} className="text-brand-orange"/> Academia Atitude • excelência no ensino
                  </div>
                  <h1 className="text-6xl md:text-8xl font-black text-zinc-900 tracking-tighter mb-8 leading-[0.85] animate-slide-up">
                      JORNADA DO <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-red-600">CONHECIMENTO.</span>
                  </h1>
                  <p className="text-zinc-500 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed animate-fade-in">
                     Acesso total e gratuito ao conhecimento transformador da Palavra. Escolha uma trilha e inicie seu crescimento espiritual hoje.
                  </p>
              </div>
           </div>

           {/* Animated Course Grid */}
           <div className="max-w-7xl mx-auto px-8 py-24">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  {tracks.map((track, idx) => (
                    <div 
                      key={track.id} 
                      onClick={() => { setActiveTrack(track); setCurrentStep(0); }} 
                      className={`group bg-white rounded-[3rem] overflow-hidden border border-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-500 cursor-pointer hover:-translate-y-3 hover:shadow-2xl hover:shadow-brand-orange/10`}
                    >
                        <div className="aspect-[16/10] relative overflow-hidden bg-zinc-100">
                           <img src={track.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={track.title} />
                           <div className="absolute inset-0 bg-zinc-900/10 group-hover:bg-zinc-900/5 transition-colors duration-500"></div>
                           <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
                              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-brand-orange shadow-2xl">
                                 <PlayCircle size={32} fill="currentColor"/>
                              </div>
                           </div>
                           <div className="absolute top-6 left-6">
                              <span className="bg-brand-orange text-white text-[9px] font-black uppercase px-4 py-2 rounded-xl tracking-widest shadow-xl">{track.category || 'Membresia'}</span>
                           </div>
                        </div>
                        <div className="p-10">
                           <h3 className="text-2xl font-black text-zinc-900 leading-tight mb-4 group-hover:text-brand-orange transition-colors uppercase tracking-tight">{track.title}</h3>
                           <p className="text-zinc-500 text-sm font-medium line-clamp-2 mb-10 leading-relaxed">{track.description}</p>
                           <div className="flex items-center gap-4 text-[9px] font-black text-zinc-400 uppercase tracking-widest pt-8 border-t border-zinc-50">
                              <List size={14} className="text-brand-orange"/> {track.steps?.length || 0} Módulos
                              <div className="ml-auto w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:bg-brand-orange group-hover:text-white transition-all"><ArrowUpRight size={22}/></div>
                           </div>
                        </div>
                    </div>
                  ))}
              </div>
           </div>
         </>
       ) : (
         /* Content Player View (Ultra Light & Immersive) */
         <div className="h-screen flex flex-col lg:flex-row fixed inset-0 z-[120] bg-white animate-fade-in overflow-hidden">
            
            {/* Sidebar (Navigation) */}
            <div className="w-full lg:w-96 bg-zinc-50 border-r border-zinc-100 flex flex-col shrink-0 order-2 lg:order-1 h-[40vh] lg:h-full">
               <div className="p-8 border-b border-zinc-100 bg-white">
                  <button onClick={() => setActiveTrack(null)} className="text-zinc-400 hover:text-brand-orange text-[10px] font-black uppercase tracking-widest mb-8 flex items-center gap-2 transition-colors group">
                     <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform"/> Sair do Curso
                  </button>
                  <h2 className="text-2xl font-black text-zinc-900 leading-tight uppercase tracking-tighter">{activeTrack.title}</h2>
                  
                  {/* Progress */}
                  <div className="mt-8 space-y-3">
                     <div className="flex justify-between text-[10px] font-black uppercase text-zinc-400 tracking-widest">
                        <span>Progresso</span>
                        <span>{Math.round(((currentStep + 1) / (activeTrack.steps?.length || 1)) * 100)}%</span>
                     </div>
                     <div className="w-full bg-zinc-200 h-2 rounded-full overflow-hidden shadow-inner">
                        <div className="bg-brand-orange h-full transition-all duration-1000 ease-out" style={{width: `${((currentStep + 1) / (activeTrack.steps?.length || 1)) * 100}%`}}></div>
                     </div>
                  </div>
               </div>

               <div className="flex-grow overflow-y-auto p-4 space-y-3 custom-scrollbar">
                    {activeTrack.steps?.map((step, idx) => (
                        <button 
                          key={idx} 
                          onClick={() => {
                              setCurrentStep(idx);
                              const contentArea = document.getElementById('course-player-content');
                              if(contentArea) contentArea.scrollTo({ top: 0, behavior: 'smooth' });
                          }} 
                          className={`w-full text-left p-6 rounded-[2rem] flex items-center gap-5 transition-all duration-300 ${idx === currentStep ? 'bg-white shadow-xl border border-zinc-100 scale-102 z-10' : 'opacity-60 hover:opacity-100 hover:bg-white/50 text-zinc-500'}`}
                        >
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xs font-black shadow-lg transition-all duration-500 ${idx === currentStep ? 'bg-brand-orange text-white scale-110' : idx < currentStep ? 'bg-green-500 text-white' : 'bg-zinc-200 text-zinc-500'}`}>
                               {idx < currentStep ? <CheckCircle size={20}/> : idx + 1}
                            </div>
                            <div className="flex-grow">
                               <span className={`text-sm font-black uppercase tracking-tight block ${idx === currentStep ? 'text-zinc-900' : ''}`}>{step.title}</span>
                               <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1 block">{idx < currentStep ? 'Concluído' : idx === currentStep ? 'Assistindo' : 'Pendente'}</span>
                            </div>
                        </button>
                    ))}
               </div>
            </div>

            {/* Main Content (Player) */}
            <div id="course-player-content" className="flex-grow overflow-y-auto bg-white p-8 md:p-12 lg:p-24 order-1 lg:order-2 custom-scrollbar scroll-smooth">
               <div className="max-w-4xl mx-auto">
                  <div className="space-y-6 mb-16">
                     <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange/5 text-brand-orange text-[10px] font-black uppercase tracking-[0.3em] rounded-full">
                        Módulo {currentStep + 1} de {activeTrack.steps.length}
                     </div>
                     <h1 className="text-4xl md:text-7xl font-black text-zinc-900 tracking-tighter uppercase leading-[0.9]">{activeTrack.steps[currentStep].title}</h1>
                  </div>
                  
                  <div className="prose prose-zinc prose-lg md:prose-xl max-w-none text-zinc-600 leading-relaxed font-serif pt-16 border-t border-zinc-100">
                     <ReactMarkdown>{activeTrack.steps[currentStep].content}</ReactMarkdown>
                  </div>

                  {/* Navigation / Actions */}
                  <div className="mt-24 pt-10 border-t border-zinc-100 flex flex-col sm:flex-row justify-between items-center gap-10 pb-20">
                     <button 
                       disabled={currentStep === 0} 
                       onClick={() => {
                          setCurrentStep(p => p - 1);
                          const contentArea = document.getElementById('course-player-content');
                          if(contentArea) contentArea.scrollTo({ top: 0, behavior: 'smooth' });
                       }} 
                       className="flex items-center gap-3 font-black uppercase text-[10px] tracking-[0.4em] text-zinc-400 hover:text-zinc-900 transition-all disabled:opacity-0"
                     >
                        <ChevronLeft size={20}/> Anterior
                     </button>
                     
                     {currentStep < (activeTrack.steps.length - 1) ? (
                        <button 
                          onClick={() => {
                            setCurrentStep(p => p + 1);
                            const contentArea = document.getElementById('course-player-content');
                            if(contentArea) contentArea.scrollTo({ top: 0, behavior: 'smooth' });
                          }} 
                          className="w-full sm:w-auto bg-zinc-950 text-white px-12 py-6 rounded-3xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-4 hover:bg-brand-orange transition-all shadow-2xl active:scale-95"
                        >
                           Próximo Módulo <ArrowRight size={20}/>
                        </button>
                     ) : (
                        <button 
                          onClick={() => setShowCert(true)} 
                          className="w-full sm:w-auto bg-green-600 text-white px-12 py-6 rounded-3xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-4 shadow-xl hover:bg-green-700 transition-all animate-bounce"
                        >
                           Gerar Meu Certificado <Award size={24}/>
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
