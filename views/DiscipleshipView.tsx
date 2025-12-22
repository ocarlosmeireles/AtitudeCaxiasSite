
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { DiscipleshipTrack } from '../types';
import { ChevronLeft, ArrowRight, CheckCircle, List, Award, BookOpen, Clock, PlayCircle, Lock, GraduationCap, ArrowUpRight, ImageOff, Printer, Share2, X, Download } from 'lucide-react';

const CertificateModal = ({ track, onClose }: { track: DiscipleshipTrack, onClose: () => void }) => {
    const [name, setName] = useState('');
    const [isGenerated, setIsGenerated] = useState(false);

    const handleGenerate = () => {
        if (!name.trim()) {
            alert("Por favor, digite seu nome completo para o certificado.");
            return;
        }
        setIsGenerated(true);
    };

    const handlePrint = () => {
        const printContent = document.getElementById('printable-certificate');
        if (printContent) {
            const originalContents = document.body.innerHTML;
            document.body.innerHTML = printContent.outerHTML;
            window.print();
            document.body.innerHTML = originalContents;
            window.location.reload(); // Reload to restore React state/events
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `Certificado - ${track.title}`,
                    text: `Acabei de concluir o curso ${track.title} na Academia Atitude!`,
                    url: window.location.href,
                });
            } catch (err) {
                console.log('Error sharing', err);
            }
        } else {
            alert("Compartilhamento não suportado neste navegador. Tire um print da tela!");
        }
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
            <div className="relative w-full max-w-5xl bg-zinc-50 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
                <button onClick={onClose} className="absolute top-4 right-4 bg-zinc-200 hover:bg-red-100 text-zinc-500 hover:text-red-500 p-2 rounded-full transition-colors z-50"><X size={24}/></button>
                
                {!isGenerated ? (
                    <div className="flex flex-col items-center justify-center p-12 text-center h-full min-h-[400px]">
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                            <Award size={48} className="text-green-600"/>
                        </div>
                        <h2 className="text-3xl font-black text-zinc-900 mb-4">Parabéns pela Conclusão!</h2>
                        <p className="text-zinc-500 mb-8 max-w-md">Você finalizou a trilha <strong>{track.title}</strong>. Para gerar seu certificado oficial, digite seu nome abaixo como deseja que apareça.</p>
                        
                        <div className="w-full max-w-md space-y-4">
                            <input 
                                autoFocus
                                className="w-full p-4 text-center text-xl font-bold border-2 border-zinc-300 rounded-xl focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 outline-none uppercase placeholder:normal-case"
                                placeholder="Seu Nome Completo"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                            <button 
                                onClick={handleGenerate}
                                className="w-full bg-brand-orange text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg flex items-center justify-center gap-2"
                            >
                                <Award size={20}/> Gerar Certificado
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col h-full">
                        {/* Certificate Area - Printable */}
                        <div id="printable-certificate" className="bg-white p-8 md:p-12 relative flex-grow min-h-[600px] flex flex-col justify-center text-center border-[20px] border-double border-[#C5A059]/20 shadow-inner">
                            {/* Background Watermark/Texture */}
                            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] pointer-events-none"></div>
                            
                            {/* Decorative Corners */}
                            <div className="absolute top-6 left-6 w-16 h-16 border-t-4 border-l-4 border-[#C5A059]"></div>
                            <div className="absolute top-6 right-6 w-16 h-16 border-t-4 border-r-4 border-[#C5A059]"></div>
                            <div className="absolute bottom-6 left-6 w-16 h-16 border-b-4 border-l-4 border-[#C5A059]"></div>
                            <div className="absolute bottom-6 right-6 w-16 h-16 border-b-4 border-r-4 border-[#C5A059]"></div>

                            <div className="relative z-10 space-y-6">
                                {/* Header */}
                                <div>
                                    <div className="flex justify-center items-center gap-3 mb-4 text-brand-orange">
                                        <GraduationCap size={40} />
                                        <span className="font-black text-xl tracking-widest uppercase">Academia Atitude</span>
                                    </div>
                                    <h1 className="text-5xl md:text-7xl font-serif text-zinc-800 tracking-tight text-[#C5A059]">Certificado</h1>
                                    <p className="text-sm font-bold uppercase tracking-[0.4em] text-zinc-400 mt-2">de Conclusão de Curso</p>
                                </div>

                                {/* Content */}
                                <div className="py-8">
                                    <p className="text-zinc-500 text-lg italic mb-2">Certificamos que</p>
                                    <h2 className="text-3xl md:text-5xl font-handwriting text-zinc-900 border-b-2 border-zinc-200 pb-2 inline-block px-12 min-w-[300px] capitalize">
                                        {name.toLowerCase()}
                                    </h2>
                                    <p className="text-zinc-500 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
                                        Concluiu com êxito o curso <strong className="text-brand-orange font-bold uppercase">{track.title}</strong> ministrado pela Igreja Batista Atitude em Duque de Caxias, demonstrando dedicação e compromisso com o aprendizado da Palavra.
                                    </p>
                                </div>

                                {/* Footer / Signatures */}
                                <div className="flex flex-col md:flex-row justify-center items-end gap-16 mt-12">
                                    <div className="text-center">
                                        <div className="w-48 border-b border-zinc-400 mb-2"></div>
                                        <p className="font-bold text-zinc-800 text-sm uppercase">Pr. Joubert Curti</p>
                                        <p className="text-zinc-500 text-[10px] uppercase tracking-wider">Pastor Presidente</p>
                                    </div>
                                    
                                    {/* Gold Seal */}
                                    <div className="w-24 h-24 bg-gradient-to-br from-[#F4E285] to-[#C5A059] rounded-full flex items-center justify-center shadow-lg text-white font-serif font-bold text-xs text-center border-4 border-white transform rotate-12">
                                        SELO<br/>OFICIAL<br/>IBA-DC
                                    </div>

                                    <div className="text-center">
                                        <p className="font-bold text-zinc-800 text-lg">{new Date().toLocaleDateString()}</p>
                                        <div className="w-48 border-t border-zinc-400 mt-2"></div>
                                        <p className="text-zinc-500 text-[10px] uppercase tracking-wider pt-1">Data de Emissão</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions Bar */}
                        <div className="bg-zinc-100 p-6 flex justify-center gap-4 border-t border-zinc-200 print:hidden">
                            <button onClick={handlePrint} className="flex items-center gap-2 bg-zinc-900 text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-zinc-800 transition-colors shadow-lg">
                                <Printer size={18}/> Imprimir
                            </button>
                            <button onClick={handleShare} className="flex items-center gap-2 bg-white border border-zinc-300 text-zinc-700 px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-zinc-50 transition-colors shadow-sm">
                                <Share2 size={18}/> Compartilhar
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
    const [filter, setFilter] = useState('Todos');
    const [showCert, setShowCert] = useState(false);

    // Categorias Únicas
    const categories = ['Todos', ...Array.from(new Set(tracks.map(t => t.category || 'Geral')))];
    const filteredTracks = filter === 'Todos' ? tracks : tracks.filter(t => t.category === filter);

    return (
     <div className="min-h-screen bg-zinc-50 dark:bg-black pb-20 animate-fade-in">
       {showCert && activeTrack && <CertificateModal track={activeTrack} onClose={() => { setShowCert(false); setActiveTrack(null); }} />}
       
       {!activeTrack ? (
         <>
           {/* LMS Header */}
           <div className="relative bg-zinc-900 text-white overflow-hidden pt-32 pb-24">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-orange/20 rounded-full blur-[150px]"></div>
              
              <div className="max-w-7xl mx-auto px-6 relative z-10">
                 <div className="flex flex-col md:flex-row items-end justify-between gap-8">
                    <div>
                        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                            <GraduationCap size={14} className="text-brand-orange"/> Academia Atitude
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
                            Sua Jornada de <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-red-500">Crescimento.</span>
                        </h1>
                        <p className="text-zinc-400 text-lg max-w-xl">
                            Cursos gratuitos, teologia prática e trilhas de liderança. Prepare-se para viver o seu propósito.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <div className="text-right">
                            <p className="text-3xl font-black">{tracks.length}</p>
                            <p className="text-xs text-zinc-500 uppercase font-bold">Cursos Disponíveis</p>
                        </div>
                        <div className="w-px h-12 bg-white/10"></div>
                        <div className="text-right">
                            <p className="text-3xl font-black">100%</p>
                            <p className="text-xs text-zinc-500 uppercase font-bold">Online & Gratuito</p>
                        </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Filter Bar */}
           <div className="border-b border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950 sticky top-20 z-30">
               <div className="max-w-7xl mx-auto px-6 overflow-x-auto">
                   <div className="flex gap-8">
                       {categories.map(cat => (
                           <button 
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`py-6 text-sm font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${filter === cat ? 'border-brand-orange text-brand-orange' : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`}
                           >
                               {cat}
                           </button>
                       ))}
                   </div>
               </div>
           </div>

           {/* Course Grid */}
           <div className="max-w-7xl mx-auto px-6 py-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredTracks.map(track => (
                    <div key={track.id} onClick={() => { setActiveTrack(track); setCurrentStep(0); }} className="group bg-white dark:bg-zinc-900 rounded-[2rem] overflow-hidden border border-zinc-200 dark:border-white/5 shadow-lg hover:shadow-2xl hover:shadow-brand-orange/10 transition-all hover:-translate-y-2 cursor-pointer flex flex-col h-full relative">
                        {/* Thumbnail */}
                        <div className="aspect-[4/3] relative overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                           <img 
                              src={track.image} 
                              alt={track.title} 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              onError={(e) => {
                                // Fallback image if the original fails
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=2070"; 
                              }}
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                           
                           {/* Play Button Overlay */}
                           <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                               <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                                   <PlayCircle size={32} className="text-white fill-white"/>
                               </div>
                           </div>

                           <div className="absolute top-4 left-4">
                               <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur border border-white/20 text-white text-[10px] font-bold uppercase rounded-full shadow-lg">
                                 {track.category || 'Geral'}
                               </span>
                           </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-grow">
                           <h3 className="text-xl font-black text-zinc-900 dark:text-white leading-tight mb-3 line-clamp-2 group-hover:text-brand-orange transition-colors">{track.title}</h3>
                           <p className="text-zinc-500 dark:text-zinc-400 text-xs line-clamp-3 mb-6 flex-grow">{track.description}</p>
                           
                           {/* Meta & Action */}
                           <div className="pt-4 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between">
                              <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase">
                                 <List size={14}/> {track.steps?.length || 0} Aulas
                              </div>
                              <span className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-zinc-400 group-hover:bg-brand-orange group-hover:text-white transition-all">
                                 <ArrowUpRight size={16}/>
                              </span>
                           </div>
                        </div>
                    </div>
                  ))}
              </div>
           </div>
         </>
       ) : (
         /* PLAYER MODE */
         <div className="h-screen flex flex-col lg:flex-row overflow-hidden bg-white dark:bg-zinc-950 fixed inset-0 z-[60]">
            
            {/* Sidebar (Navigation) */}
            <div className="w-full lg:w-96 bg-zinc-50 dark:bg-zinc-900 border-r border-zinc-200 dark:border-white/5 flex flex-col h-full shrink-0">
               <div className="p-6 border-b border-zinc-200 dark:border-white/5 bg-white dark:bg-black/20">
                  <button onClick={() => setActiveTrack(null)} className="flex items-center text-zinc-500 hover:text-brand-orange text-xs font-bold uppercase tracking-widest mb-6 transition-colors group">
                     <ChevronLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform"/> Voltar para Academia
                  </button>
                  <span className="text-[10px] font-black uppercase text-brand-orange mb-2 block tracking-widest">Curso em Andamento</span>
                  <h2 className="text-xl font-black text-zinc-900 dark:text-white leading-tight mb-4">{activeTrack.title}</h2>
                  
                  {/* Progress Bar */}
                  <div className="flex items-center justify-between text-xs font-bold text-zinc-500 mb-2">
                     <span>Progresso</span>
                     <span>{Math.round(((currentStep) / (activeTrack.steps?.length || 1)) * 100)}%</span>
                  </div>
                  <div className="w-full bg-zinc-200 dark:bg-white/10 h-2 rounded-full overflow-hidden">
                     <div className="bg-gradient-to-r from-brand-orange to-red-500 h-full transition-all duration-500" style={{width: `${((currentStep) / (activeTrack.steps?.length || 1)) * 100}%`}}></div>
                  </div>
               </div>
               
               <div className="flex-grow overflow-y-auto custom-scrollbar p-2">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest px-4 py-4">Conteúdo do Curso</h4>
                  <div className="space-y-1">
                    {activeTrack.steps?.map((step, idx) => (
                        <button 
                            key={idx}
                            onClick={() => setCurrentStep(idx)}
                            className={`w-full text-left p-4 rounded-xl flex items-center gap-4 transition-all border ${
                            idx === currentStep 
                            ? 'bg-white dark:bg-white/5 border-brand-orange/30 shadow-lg' 
                            : 'hover:bg-zinc-100 dark:hover:bg-white/5 border-transparent opacity-70 hover:opacity-100'
                            }`}
                        >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                            idx === currentStep ? 'bg-brand-orange text-white' : idx < currentStep ? 'bg-green-500 text-white' : 'bg-zinc-200 dark:bg-white/10 text-zinc-500'
                            }`}>
                            {idx < currentStep ? <CheckCircle size={14}/> : idx + 1}
                            </div>
                            <div className="flex-grow">
                                <h4 className={`text-sm font-bold leading-tight ${idx === currentStep ? 'text-zinc-900 dark:text-white' : 'text-zinc-600 dark:text-zinc-400'}`}>{step.title}</h4>
                                <span className="text-[10px] text-zinc-400 font-medium">Leitura • 5 min</span>
                            </div>
                            {idx > currentStep && idx !== 0 && <Lock size={14} className="text-zinc-300"/>}
                        </button>
                    ))}
                  </div>
               </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-grow overflow-y-auto custom-scrollbar relative bg-white dark:bg-black">
               {activeTrack.steps && activeTrack.steps[currentStep] ? (
                  <div className="max-w-4xl mx-auto p-8 lg:p-16">
                     <div className="mb-12">
                        <span className="text-brand-orange font-bold uppercase tracking-widest text-xs mb-4 block">Aula {currentStep + 1}/{activeTrack.steps.length}</span>
                        <h1 className="text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white leading-tight">{activeTrack.steps[currentStep].title}</h1>
                     </div>
                     
                     <div className="prose dark:prose-invert prose-lg max-w-none text-zinc-700 dark:text-zinc-300 leading-relaxed font-serif">
                        <ReactMarkdown>{activeTrack.steps[currentStep].content}</ReactMarkdown>
                     </div>

                     {/* Navigation Footer */}
                     <div className="mt-20 pt-10 border-t border-zinc-100 dark:border-white/10 flex justify-between items-center sticky bottom-0 bg-white/90 dark:bg-black/90 backdrop-blur p-6 -mx-6 rounded-t-3xl border-t-2">
                        <button 
                           disabled={currentStep === 0}
                           onClick={() => setCurrentStep(p => p - 1)}
                           className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10 disabled:opacity-30 transition-all"
                        >
                           <ChevronLeft size={18}/> Aula Anterior
                        </button>

                        {currentStep < (activeTrack.steps.length - 1) ? (
                           <button 
                              onClick={() => { setCurrentStep(p => p + 1); window.scrollTo({top:0, behavior:'smooth'}); }}
                              className="bg-zinc-900 dark:bg-white text-white dark:text-black px-8 py-4 rounded-xl font-black uppercase tracking-wider hover:bg-brand-orange hover:text-white dark:hover:bg-brand-orange dark:hover:text-white transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center gap-3"
                           >
                              Próxima Aula <ArrowRight size={18}/>
                           </button>
                        ) : (
                           <button 
                              onClick={() => setShowCert(true)}
                              className="bg-green-600 text-white px-8 py-4 rounded-xl font-black uppercase tracking-wider hover:bg-green-700 transition-all shadow-xl hover:shadow-green-500/30 flex items-center gap-3"
                           >
                              Concluir & Certificado <Award size={18}/>
                           </button>
                        )}
                     </div>
                  </div>
               ) : (
                  <div className="flex flex-col items-center justify-center h-full text-zinc-400">
                     <BookOpen size={64} className="mb-4 opacity-20"/>
                     <p>Selecione uma aula para começar.</p>
                  </div>
               )}
            </div>
         </div>
       )}
     </div>
    );
 };
