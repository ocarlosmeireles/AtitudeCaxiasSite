
import React, { useState, useEffect } from 'react';
import { Sermon } from '../types';
import { Play, X, Sparkles, BookOpen, Share2, PlayCircle, Clock, Calendar, Search, Filter, Headphones, ChevronRight } from 'lucide-react';
import { getThumbnailUrl, getYoutubeId } from '../utils';
import { GoogleGenAI } from "@google/genai";

const MOOD_TAGS = [
  { label: 'Esperança', color: 'bg-blue-500' },
  { label: 'Cura', color: 'bg-emerald-500' },
  { label: 'Família', color: 'bg-purple-500' },
  { label: 'Propósito', color: 'bg-orange-500' },
  { label: 'Fé', color: 'bg-red-500' }
];

export const SermonsView = ({ sermons }: { sermons: Sermon[] }) => {
  const [activeVideo, setActiveVideo] = useState<Sermon | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isGeneratingGuide, setIsGeneratingGuide] = useState(false);
  const [studyGuide, setStudyGuide] = useState<string | null>(null);

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
        contents: `Analise a pregação "${sermon.title}" de ${sermon.preacher}. Gere um guia de estudo profundo com: 1. Resumo Teológico. 2. 3 Pontos Chave com versículos NVI. 3. Aplicação para a vida cotidiana. Use Markdown.`,
      });
      setStudyGuide(response.text);
    } catch (e) {
      alert("A IA pastoral está ocupada. Tente em instantes.");
    } finally {
      setIsGeneratingGuide(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-700 pb-32">
      
      {/* Featured Sermon (Cinema Hero) */}
      {sermons[0] && (
        <div className="relative h-[85vh] w-full flex items-end pb-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src={getThumbnailUrl(sermons[0].youtubeUrl)} 
              className="w-full h-full object-cover scale-105 blur-[2px] opacity-40 dark:opacity-20" 
              alt="Background"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-zinc-950 via-white/50 dark:via-zinc-950/80 to-transparent"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div className="space-y-8 animate-slide-up">
              <div className="inline-flex items-center gap-2 bg-brand-orange/10 dark:bg-brand-orange/20 border border-brand-orange/30 text-brand-orange px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl backdrop-blur-md">
                <Sparkles size={12}/> Mensagem em Destaque
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-zinc-900 dark:text-white leading-[0.85] tracking-tighter uppercase">
                {sermons[0].title.split(' ')[0]}<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-red-600">
                  {sermons[0].title.split(' ').slice(1).join(' ')}
                </span>
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400 text-lg md:text-xl font-light max-w-xl line-clamp-3 italic border-l-4 border-zinc-200 dark:border-zinc-800 pl-6">
                {sermons[0].description}
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button 
                  onClick={() => setActiveVideo(sermons[0])}
                  className="bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-10 py-5 rounded-2xl font-black uppercase tracking-widest flex items-center hover:bg-brand-orange dark:hover:bg-brand-orange dark:hover:text-white transition-all gap-4 shadow-2xl hover:-translate-y-1 active:scale-95"
                >
                  <PlayCircle size={28}/> Assistir Agora
                </button>
                <button 
                  onClick={() => handleGenerateGuide(sermons[0])}
                  className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 px-8 py-5 rounded-2xl font-black uppercase tracking-widest flex items-center hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all gap-3"
                >
                  {isGeneratingGuide ? <Sparkles className="animate-spin text-brand-orange"/> : <BookOpen size={24} className="text-zinc-400"/>} 
                  {isGeneratingGuide ? 'Estudando...' : 'Guia de Estudo IA'}
                </button>
              </div>
            </div>

            <div className="hidden lg:block relative group">
              <div className="aspect-video rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-8 border-white dark:border-zinc-900 transform rotate-2 hover:rotate-0 transition-transform duration-700">
                <img src={getThumbnailUrl(sermons[0].youtubeUrl)} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Explorer Section */}
      <div className="max-w-7xl mx-auto px-6 mt-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
          <div>
            <h2 className="text-4xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter">Biblioteca <span className="text-zinc-300 dark:text-zinc-700">de Fé</span></h2>
            <p className="text-zinc-400 font-bold uppercase text-[10px] tracking-widest mt-2">{filteredSermons.length} pregações catalogadas</p>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-grow md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input 
                type="text" 
                placeholder="Buscar por título ou pastor..."
                className="w-full pl-12 pr-4 py-4 bg-zinc-100 dark:bg-zinc-900 border-none rounded-2xl outline-none focus:ring-2 focus:ring-brand-orange/20 text-sm font-medium"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {filteredSermons.map((s, idx) => (
            <div key={s.id} className="group flex flex-col h-full animate-fade-in" style={{ animationDelay: `${idx * 50}ms` }}>
              <div className="relative aspect-video rounded-3xl overflow-hidden mb-6 shadow-lg group-hover:shadow-2xl group-hover:shadow-brand-orange/10 transition-all duration-500 hover:-translate-y-2">
                <img src={getThumbnailUrl(s.youtubeUrl)} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-zinc-950/20 group-hover:bg-zinc-950/50 transition-colors"></div>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
                  <button onClick={() => setActiveVideo(s)} className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-zinc-950 shadow-2xl">
                    <Play size={24} className="fill-current ml-1" />
                  </button>
                </div>

                <div className="absolute top-4 left-4 flex gap-2">
                   <span className="bg-black/60 backdrop-blur-md text-white text-[9px] font-black uppercase px-2 py-1 rounded-lg border border-white/10 tracking-widest">{s.duration || '45min'}</span>
                </div>
                
                <button 
                  onClick={(e) => { e.stopPropagation(); handleGenerateGuide(s); }}
                  className="absolute bottom-4 right-4 p-3 bg-brand-orange text-white rounded-2xl shadow-xl translate-y-12 group-hover:translate-y-0 transition-transform duration-500 hover:scale-110"
                >
                  <Sparkles size={16}/>
                </button>
              </div>

              <div className="space-y-3 flex-grow">
                <h4 className="text-xl font-black text-zinc-900 dark:text-white leading-tight uppercase group-hover:text-brand-orange transition-colors line-clamp-2">{s.title}</h4>
                <div className="flex items-center gap-3 text-zinc-400 text-[10px] font-black uppercase tracking-widest">
                  <span className="text-brand-orange">{s.preacher}</span>
                  <span className="w-1.5 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full"></span>
                  <span>{s.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Player Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] bg-zinc-950/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12 animate-fade-in">
           <button 
              onClick={() => setActiveVideo(null)} 
              className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors bg-white/5 p-4 rounded-full"
           >
              <X size={32}/>
           </button>
           <div className="w-full max-w-6xl aspect-video bg-black rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(255,85,0,0.1)] border border-white/10 relative">
              <iframe 
                src={`https://www.youtube.com/embed/${getYoutubeId(activeVideo.youtubeUrl)}?autoplay=1&rel=0&modestbranding=1`} 
                className="w-full h-full" 
                frameBorder="0" 
                allow="autoplay; encrypted-media" 
                allowFullScreen
              ></iframe>
           </div>
        </div>
      )}

      {/* AI Study Panel (Slide-out) */}
      <div className={`fixed inset-y-0 right-0 z-[110] w-full max-w-md bg-white dark:bg-zinc-900 shadow-[-20px_0_60px_rgba(0,0,0,0.1)] transform transition-transform duration-700 ease-in-out border-l dark:border-white/5 ${studyGuide ? 'translate-x-0' : 'translate-x-full'}`}>
         {studyGuide && (
            <div className="h-full flex flex-col relative">
               <button onClick={() => setStudyGuide(null)} className="absolute top-8 right-8 p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-500 hover:text-brand-orange transition-colors"><X size={20}/></button>
               
               <div className="p-10 pb-6 border-b dark:border-zinc-800">
                  <div className="inline-flex items-center gap-3 bg-orange-100 dark:bg-brand-orange/20 text-brand-orange px-4 py-2 rounded-xl mb-6">
                     <Sparkles size={20} className="animate-pulse"/>
                     <span className="text-xs font-black uppercase tracking-widest">Guia Gerado por IA</span>
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white">Estudo de Célula</h3>
               </div>

               <div className="flex-grow overflow-y-auto p-10 custom-scrollbar prose dark:prose-invert">
                  <div className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed whitespace-pre-line font-medium">
                     {studyGuide}
                  </div>
               </div>

               <div className="p-8 bg-zinc-50 dark:bg-black/20 border-t dark:border-white/5 grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-2 py-4 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-brand-orange transition-colors">
                     <Share2 size={16}/> Enviar Grupo
                  </button>
                  <button onClick={() => window.print()} className="flex items-center justify-center gap-2 py-4 bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-zinc-300 transition-colors">
                     Imprimir
                  </button>
               </div>
            </div>
         )}
      </div>
    </div>
  );
};
