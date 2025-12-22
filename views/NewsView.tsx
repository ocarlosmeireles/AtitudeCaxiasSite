
import React from 'react';
import { NewsItem } from '../types';

export const NewsView = ({ news }: { news: NewsItem[] }) => (
    <div className="max-w-6xl mx-auto px-4 py-12 animate-fade-in">
      <h2 className="text-4xl font-black text-zinc-900 dark:text-white mb-10 uppercase tracking-tighter">Avisos & Notícias</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map(item => (
          <div key={item.id} className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-200 dark:border-white/10 shadow-lg hover:-translate-y-1 transition-transform cursor-pointer group">
            <div className="h-48 overflow-hidden relative">
              <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
               <div className="absolute top-4 left-4 bg-brand-orange text-white text-[10px] font-bold px-2 py-1 rounded uppercase">{item.category}</div>
            </div>
            <div className="p-6">
              <span className="text-xs font-bold text-zinc-400 uppercase mb-2 block">{item.date}</span>
              <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-2 leading-tight">{item.title}</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-3">{item.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
);
