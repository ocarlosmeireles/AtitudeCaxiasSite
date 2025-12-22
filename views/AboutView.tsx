
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { AboutPageData, TenYearsData } from '../types';
import { Target, Star, BookOpen, UserCheck, Heart } from 'lucide-react';
import { TenYearsSection } from '../components/sections/HomeComponents';

export const AboutView = ({ data, tenYearsData }: { data: AboutPageData, tenYearsData: TenYearsData }) => {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black pb-20 animate-fade-in">
        {/* Hero */}
        <div className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-zinc-900">
            <img src={data.heroImage} className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 dark:from-black via-transparent to-transparent"></div>
            <div className="relative z-10 text-center px-6 max-w-4xl">
                <span className="bg-brand-orange/20 border border-brand-orange/30 text-brand-orange text-xs font-black uppercase px-4 py-2 rounded-full tracking-widest mb-6 inline-block backdrop-blur-md">Sobre Nós</span>
                <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6 drop-shadow-2xl">
                    Nossa História & <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-red-500">Identidade</span>
                </h1>
            </div>
        </div>

        {/* Commemorative Section */}
        <TenYearsSection data={tenYearsData} />

        <div className="max-w-6xl mx-auto px-6 mt-12 relative z-20 space-y-20">
            {/* History Card */}
            <div className="bg-white dark:bg-zinc-900 p-10 md:p-16 rounded-[3rem] shadow-2xl border border-zinc-200 dark:border-white/5">
                <div className="prose dark:prose-invert prose-lg max-w-none">
                    <ReactMarkdown>{data.history}</ReactMarkdown>
                </div>
            </div>

            {/* MVV Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-white/5 shadow-lg flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 mb-6"><Target size={32}/></div>
                    <h3 className="text-2xl font-black text-zinc-900 dark:text-white uppercase mb-4">Visão</h3>
                    <p className="text-zinc-600 dark:text-zinc-400">{data.vision}</p>
                </div>
                <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-white/5 shadow-lg flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-brand-orange mb-6"><Star size={32}/></div>
                    <h3 className="text-2xl font-black text-zinc-900 dark:text-white uppercase mb-4">Missão</h3>
                    <p className="text-zinc-600 dark:text-zinc-400">{data.mission}</p>
                </div>
                <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-white/5 shadow-lg flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 mb-6"><Heart size={32}/></div>
                    <h3 className="text-2xl font-black text-zinc-900 dark:text-white uppercase mb-4">Valores</h3>
                    <div className="text-zinc-600 dark:text-zinc-400 prose dark:prose-invert text-sm">
                        <ReactMarkdown>{data.values}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};
