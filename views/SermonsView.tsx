
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Sermon } from '../types';
import { Play, X, Sparkles, Share2, PlayCircle, Clock, Calendar, Search, Activity, TrendingUp, User, LayoutGrid, Layers, ChevronRight } from 'lucide-react';
import { getThumbnailUrl, getYoutubeId } from '../utils';
import { GoogleGenAI } from "@google/genai";

export const SermonsView = ({ sermons }: { sermons: Sermon[] }) => {
  const [activeVideo, setActiveVideo] = useState<Sermon | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isGeneratingGuide, setIsGeneratingGuide] = useState(false);
  const [studyGuide, setStudyGuide] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const filteredSermons = sermons.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.preacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGenerateGuide = async (sermon: Sermon) => {
    setIsGeneratingGuide(true);
    setStudyGuide(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Gere um guia de estudo bíblico profundo para pequenos grupos (Células) baseado na pregação "${sermon.title}" de ${sermon.preacher}. Use Markdown estruturado com: 1. Resumo Teológico. 2. Pontos Chave. 3. Aplicação Prática.`,
      });
      setStudyGuide(response.text);
    } catch (e) {
      alert("A IA pastoral está ocupada. Tente em breve.");
    } finally {
      setIsGeneratingGuide(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-700 overflow-x-hidden">
      
      {/* Cinematic Netflix-style Hero */}
      {sermons[0] && (
        <section className={`relative h-[85vh] w-full flex items-center transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img 
              src={getThumbnailUrl(sermons[0].youtubeUrl)} 
              className="w-full h-full object-cover opacity-20 dark:opacity-30 blur-[1px] scale-105" 
              alt="Feature Background"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 dark:from-zinc-950 via-zinc-50/80 dark:via-zinc-950/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-50 dark:from-zinc-950 via-zinc-50/20 dark:via-zinc-950/20 to-transparent"></div>
          </div>

          <div className="max-w-7xl mx-auto px-8 w-full relative z-10 pt-20">
            <div className="max-w-3xl space-y-6">
              <div className={`flex items-center gap-4 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                <div className="bg-brand-orange text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.25em] shadow-xl shadow-orange-500/20 animate-pulse">
                   Última Mensagem
                </div>
                <div className="text-zinc-400 dark:text-zinc-500 font-black uppercase text-[10px] tracking-widest flex items-center gap-2">
                   <Calendar size={12} className="text-brand-orange"/> {sermons[0].date}
                </div>
              </div>
              
              <h1 className={`text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter uppercase drop-shadow-sm transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                {sermons[0].title.split(' ')[0]}<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-red-600">
                  {sermons[0].title.split(' ').slice(1).join(' ')}
                </span>
              </h1>
              
              <p className={`text-zinc-500 dark:text-zinc-400 text-lg md:text-xl font-medium leading-relaxed max-w-2xl border-l-4 border-brand-orange/30 pl-8 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {sermons[0].description}
              </p>

              <div className={`flex flex-wrap gap-4 pt-6 transition-all duration-1000 delay-[900ms] ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <button 
                  onClick={() => setActiveVideo(sermons[0])}
                  className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 px-10 py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-[11px] flex items-center gap-4 hover:bg-brand-orange dark:hover:bg-brand-orange dark:hover:text-white transition-all shadow-2xl hover:-translate-y-1 active:scale-95 group"
                >
                  <PlayCircle size={22}/> Assistir Agora
                </button>
                <button 
                  onClick={() => handleGenerateGuide(sermons[0])}
                  className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 px-10 py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-[11px] flex items-center gap-3 hover:border-brand-orange hover:text-brand-orange transition-all group"
                >
                  {isGeneratingGuide ? <Activity className="animate-spin text-brand-orange"/> : <Sparkles size={20} className="text-brand-orange group-hover:scale-110"/>} 
                  {isGeneratingGuide ? 'Analisando...' : 'Estudo de Célula IA'}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Message Explorer Section */}
      <section className="max-w-[1440px] mx-auto px-8 -mt-16 relative z-20 pb-40">
        
        {/* Navigation & Search Sub-bar */}
        <div className={`flex flex-col lg:flex-row items-center justify-between gap-10 mb-20 transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center gap-12">
            <h2 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4">
               <div className="w-1.5 h-10 bg-brand-orange rounded-full shadow-lg"></div>
               Mensagens Recentes
            </h2>
            <div className="hidden md:flex items-center gap-8 border-l border-zinc-200 dark:border-white/10 pl-12 text-zinc-400 font-black uppercase text-[10px] tracking-[0.25em]">
               {['Populares', 'Séries', 'Visitantes'].map(tab => (
                 <button key={tab} className="hover:text-brand-orange transition-colors">{tab}</button>
               ))}
            </div>
          </div>
          
          <div className="relative w-full lg:w-[450px] group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-brand-orange transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Pesquisar por título ou pastor..."
              className="w-full pl-16 pr-8 py-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-[2rem] outline-none focus:border-brand-orange/50 focus:ring-4 focus:ring-brand-orange/5 text-sm font-bold transition-all shadow-xl"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Video Grid - Staggered Cascading Animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {filteredSermons.map((s, idx) => (
            <div 
              key={s.id} 
              className={`group flex flex-col h-full transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'}`}
              style={{ transitionDelay: `${(idx + 1) * 150}ms` }}
            >
              {/* Card Thumbnail */}
              <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-6 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-white/5 shadow-2xl transition-all duration-500 group-hover:-translate-y-4">
                <img src={getThumbnailUrl(s.youtubeUrl)} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={s.title} />
                <div className="absolute inset-0 bg-zinc-950/10 group-hover:bg-zinc-950/60 transition-colors duration-500"></div>
                
                {/* Visual Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
                  <button onClick={() => setActiveVideo(s)} className="w-20 h-20 bg-brand-orange rounded-full flex items-center justify-center text-white shadow-2xl transform hover:scale-110 transition-transform">
                    <PlayCircle size={40} className="fill-current" />
                  </button>
                </div>

                {/* Duration Badge */}
                <div className="absolute top-6 left-6 flex gap-2">
                   <span className="bg-zinc-900/90 backdrop-blur-xl text-white text-[8px] font-black uppercase px-3 py-2 rounded-xl border border-white/10 tracking-widest shadow-lg">{s.duration || '48 MIN'}</span>
                   <span className="bg-white text-zinc-900 text-[8px] font-black uppercase px-3 py-2 rounded-xl tracking-widest shadow-lg">4K</span>
                </div>
                
                {/* AI Study Button */}
                <button 
                  onClick={(e) => { e.stopPropagation(); handleGenerateGuide(s); }}
                  className="absolute bottom-6 right-6 w-14 h-14 bg-white dark:bg-zinc-800 text-brand-orange rounded-2xl shadow-2xl translate-y-20 group-hover:translate-y-0 transition-all duration-500 hover:bg-brand-orange hover:text-white border border-zinc-100 dark:border-white/10 flex items-center justify-center"
                  title="Gerar Estudo IA"
                >
                  <Sparkles size={24}/>
                </button>
              </div>

              {/* Card Meta Content */}
              <div className="space-y-4 px-4">
                <div className="flex items-center gap-3 text-brand-orange text-[9px] font-black uppercase tracking-[0.3em]">
                   <TrendingUp size={12}/> Palavra de Vida
                </div>
                <h4 className="text-xl font-black text-zinc-900 dark:text-white leading-tight uppercase group-hover:text-brand-orange transition-colors line-clamp-2 min-h-[3.5rem] tracking-tighter">{s.title}</h4>
                <div className="flex items-center justify-between text-zinc-400 dark:text-zinc-500 text-[10px] font-black uppercase tracking-widest pt-4 border-t border-zinc-100 dark:border-white/5">
                  <span className="flex items-center gap-2"><User size={12}/> {s.preacher}</span>
                  <div className="flex items-center gap-2">
                    <Calendar size={12}/> {s.date.split(' ')[0]}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSermons.length === 0 && (
           <div className="text-center py-48 border-4 border-dashed border-zinc-200 dark:border-white/5 rounded-[4rem] animate-fade-in">
              <PlayCircle size={80} className="text-zinc-200 dark:text-zinc-800 mx-auto mb-8"/>
              <h3 className="text-2xl font-black text-zinc-400 uppercase tracking-widest">Nenhum resultado encontrado</h3>
              <button onClick={() => setSearchTerm('')} className="mt-8 bg-zinc-100 dark:bg-white/5 px-8 py-3 rounded-xl text-brand-orange font-black uppercase text-[10px] tracking-widest hover:bg-brand-orange hover:text-white transition-all shadow-md">Limpar Pesquisa</button>
           </div>
        )}
      </section>

      {/* Fullscreen Video Player */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] bg-zinc-950/98 backdrop-blur-3xl flex items-center justify-center p-4 md:p-12 animate-fade-in">
           <div className="absolute top-10 right-10 flex items-center gap-8">
              <button className="flex items-center gap-3 text-white/50 hover:text-white font-black uppercase text-[10px] tracking-widest transition-colors group">
                 <Share2 size={20} className="group-hover:scale-110 transition-transform"/> Compartilhar
              </button>
              <button 
                onClick={() => setActiveVideo(null)} 
                className="w-16 h-16 flex items-center justify-center bg-white/5 hover:bg-red-600 text-white transition-all rounded-full hover:rotate-90 group"
              >
                <X size={32}/>
              </button>
           </div>
           
           <div className="w-full max-w-6xl aspect-video bg-black rounded-[3.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/10 relative group animate-slide-up">
              <iframe 
                src={`https://www.youtube.com/embed/${getYoutubeId(activeVideo.youtubeUrl)}?autoplay=1&rel=0&modestbranding=1&color=white&showinfo=0`} 
                className="w-full h-full" 
                frameBorder="0" 
                allow="autoplay; encrypted-media" 
                allowFullScreen
              ></iframe>
           </div>
        </div>
      )}

      {/* AI Study Guide Sidebar */}
      <div className={`fixed inset-y-0 right-0 z-[110] w-full max-w-lg bg-white dark:bg-zinc-900 shadow-[-40px_0_100px_rgba(0,0,0,0.2)] transform transition-transform duration-700 ease-in-out border-l border-zinc-100 dark:border-white/5 ${studyGuide ? 'translate-x-0' : 'translate-x-full'}`}>
         {studyGuide && (
            <div className="h-full flex flex-col relative">
               <button onClick={() => setStudyGuide(null)} className="absolute top-10 right-10 p-3 bg-zinc-100 dark:bg-white/5 hover:bg-brand-orange text-zinc-400 hover:text-white rounded-full transition-all shadow-sm"><X size={24}/></button>
               
               <div className="p-12 pb-10 border-b border-zinc-100 dark:border-white/5 bg-zinc-50 dark:bg-black/20">
                  <div className="inline-flex items-center gap-3 bg-brand-orange/10 text-brand-orange px-5 py-2.5 rounded-full mb-10 border border-brand-orange/20 shadow-inner">
                     <Sparkles size={20} className="animate-pulse"/>
                     <span className="text-[10px] font-black uppercase tracking-[0.3em]">Cérebro Atitude IA</span>
                  </div>
                  <h3 className="text-4xl font-black uppercase tracking-tighter leading-none mb-4 text-zinc-900 dark:text-white">Roteiro de Célula</h3>
                  <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">Baseado em: <span className="text-brand-orange underline">{activeVideo?.title}</span></p>
               </div>

               <div className="flex-grow overflow-y-auto p-12 custom-scrollbar">
                  <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed font-medium">
                     <ReactMarkdown>
                        {studyGuide}
                     </ReactMarkdown>
                  </div>
               </div>

               <div className="p-10 bg-white dark:bg-zinc-950/80 backdrop-blur-xl border-t border-zinc-100 dark:border-white/5 flex gap-6">
                  <button className="flex-1 flex items-center justify-center gap-3 py-5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-brand-orange hover:text-white dark:hover:bg-brand-orange dark:hover:text-white transition-all shadow-xl">
                     <Share2 size={18}/> Compartilhar
                  </button>
               </div>
            </div>
         )}
      </div>
    </div>
  );
};
