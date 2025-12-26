
import React, { useState } from 'react';
import { Book, Search, Sparkles, X, Activity, BookOpen, Quote, ChevronRight, Share2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';

export const BibleView = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [explanation, setExplanation] = useState<string | null>(null);
    const [isThinking, setIsThinking] = useState(false);

    // Mock data para interface (Em um app real usaria uma API de Bíblia como biblia.com.br ou similar)
    const featuredVerses = [
        { ref: "João 3:16", text: "Porque Deus tanto amou o mundo que deu o seu Filho Unigênito, para que todo o que nele crer não pereça, mas tenha a vida eterna." },
        { ref: "Salmos 23:1", text: "O Senhor é o meu pastor; de nada terei falta." },
        { ref: "Filipenses 4:13", text: "Tudo posso naquele que me fortalece." },
        { ref: "Romanos 8:28", text: "Sabemos que todas as coisas cooperam para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito." }
    ];

    const handleExplain = async (verse: string, ref: string) => {
        setIsThinking(true);
        setExplanation(null);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: `Você é um pastor e erudito bíblico. Explique de forma profunda, porém acessível, o versículo ${ref}: "${verse}". Inclua contexto histórico e uma aplicação prática para os dias de hoje. Formate em Markdown.`,
            });
            setExplanation(response.text || "Não foi possível gerar a explicação.");
        } catch (e) {
            setExplanation("Desculpe, a IA pastoral está em momento de oração. Tente novamente em instantes.");
        } finally {
            setIsThinking(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 animate-fade-in pb-32">
            {/* Hero Section */}
            <div className="bg-zinc-900 pt-32 pb-24 px-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-orange/10 rounded-full blur-[140px]"></div>
                <div className="max-w-4xl mx-auto relative z-10 text-center space-y-8">
                    <div className="inline-flex items-center gap-3 bg-white/10 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300 border border-white/10">
                        <BookOpen size={16} className="text-brand-orange"/> Bíblia Digital Atitude
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                        A PALAVRA <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-red-600">INTELIGENTE.</span>
                    </h1>
                    <div className="relative max-w-2xl mx-auto group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-brand-orange transition-colors" size={24}/>
                        <input 
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            placeholder="Buscar passagens ou temas (Ex: Amor, Fé, Salmos 91)..."
                            className="w-full bg-white dark:bg-zinc-800 p-6 pl-16 rounded-[2.5rem] border border-transparent focus:border-brand-orange outline-none shadow-2xl dark:text-white font-bold text-lg transition-all"
                        />
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-8 -mt-10 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {featuredVerses.map((v, i) => (
                        <div key={i} className="bg-white dark:bg-zinc-900 p-10 rounded-[3rem] shadow-xl border border-zinc-100 dark:border-white/5 group hover:border-brand-orange transition-all duration-500">
                            <div className="flex justify-between items-start mb-6">
                                <span className="bg-zinc-50 dark:bg-black/40 px-4 py-1.5 rounded-full text-xs font-black text-brand-orange uppercase tracking-widest">{v.ref}</span>
                                <div className="flex gap-2">
                                    <button onClick={() => handleExplain(v.text, v.ref)} className="w-10 h-10 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center hover:bg-brand-orange hover:text-white transition-all shadow-lg" title="Explicar com IA">
                                        <Sparkles size={18}/>
                                    </button>
                                    <button className="w-10 h-10 rounded-full bg-zinc-50 dark:bg-zinc-800 text-zinc-400 flex items-center justify-center hover:bg-zinc-100 transition-all">
                                        <Share2 size={18}/>
                                    </button>
                                </div>
                            </div>
                            <p className="text-2xl font-medium text-zinc-900 dark:text-zinc-100 leading-relaxed font-serif italic">"{v.text}"</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* AI Explanation Modal */}
            {(explanation || isThinking) && (
                <div className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white dark:bg-zinc-900 w-full max-w-2xl rounded-[3.5rem] overflow-hidden shadow-2xl border border-white/10 flex flex-col max-h-[85vh]">
                        <div className="p-8 bg-zinc-950 text-white flex justify-between items-center border-b border-white/10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-brand-orange rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                                    <Sparkles size={24}/>
                                </div>
                                <div>
                                    <h3 className="font-black uppercase tracking-widest text-xs opacity-50">Explicação Teológica</h3>
                                    <h4 className="text-lg font-black uppercase tracking-tight">Cérebro Atitude IA</h4>
                                </div>
                            </div>
                            <button onClick={() => setExplanation(null)} className="p-3 bg-white/10 hover:bg-red-600 rounded-full transition-all"><X size={24}/></button>
                        </div>

                        <div className="p-12 overflow-y-auto flex-grow custom-scrollbar">
                            {isThinking ? (
                                <div className="flex flex-col items-center justify-center py-20 space-y-6">
                                    <Activity className="animate-spin text-brand-orange" size={48}/>
                                    <p className="text-zinc-500 font-black uppercase tracking-[0.3em] text-xs">Consultando a Nuvem de Glória...</p>
                                </div>
                            ) : (
                                <div className="prose dark:prose-invert prose-lg max-w-none text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                                    <ReactMarkdown>{explanation || ""}</ReactMarkdown>
                                </div>
                            )}
                        </div>
                        
                        <div className="p-8 bg-zinc-50 dark:bg-black/40 border-t border-zinc-100 dark:border-white/5">
                            <p className="text-center text-[10px] font-black uppercase tracking-widest text-zinc-400">© Academia Atitude • Duque de Caxias</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
