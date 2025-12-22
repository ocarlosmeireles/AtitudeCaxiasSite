
import React, { useState, useEffect } from 'react';
import { MapPin, PlayCircle, ArrowRight, Clock } from 'lucide-react';
import { NavigationTab, HomeConfig } from '../../types';

export const HeroSection = ({ onNavigate, config }: { onNavigate: (tab: NavigationTab) => void, config: HomeConfig }) => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0])); // Always load first one
  
  // Use config images if available, otherwise fallbacks
  const backgrounds = [
    { url: config.heroImage1 || "https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=2070", label: 'Adoração' },
    { url: config.heroImage2 || "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=2070", label: 'Comunhão' },
    { url: config.heroImage3 || "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070", label: 'Oração' }
  ];

  useEffect(() => {
    // When currentBgIndex changes, ensure next image is loaded
    const nextIndex = (currentBgIndex + 1) % backgrounds.length;
    setLoadedImages(prev => {
        if (!prev.has(currentBgIndex) || !prev.has(nextIndex)) {
            const newSet = new Set(prev);
            newSet.add(currentBgIndex);
            newSet.add(nextIndex);
            return newSet;
        }
        return prev;
    });

    const timer = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [currentBgIndex, backgrounds.length]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      {backgrounds.map((bg, index) => {
        // Only render if it's in loadedImages
        if (!loadedImages.has(index)) return null;

        return (
            <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentBgIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
            <img 
                src={bg.url} 
                className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${index === currentBgIndex ? 'scale-110' : 'scale-100'}`} 
                alt="Hero Background"
                loading={index === 0 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/30"></div>
            <div className="absolute inset-0 bg-brand-orange/10 mix-blend-overlay"></div>
            </div>
        );
      })}

      <div className="relative z-10 text-center px-4 max-w-7xl mx-auto w-full flex flex-col items-center">
        <div className="inline-flex items-center gap-2 border border-white/20 bg-white/5 backdrop-blur-md px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] text-white mb-8 animate-slide-up shadow-2xl">
          <MapPin size={12} className="text-brand-orange" />
          {config.heroSubtitle}
        </div>

        <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter leading-[0.85] mb-12 animate-slide-up drop-shadow-2xl">
          {config.heroTitle?.split(' ')[0] || "UMA IGREJA"}<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-orange-400 to-red-600">
            {config.heroTitle?.split(' ').slice(1).join(' ') || "RELEVANTE"}
          </span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white text-sm font-bold uppercase tracking-widest mb-12 animate-fade-in delay-200">
            <div className="flex items-center bg-black/40 backdrop-blur px-6 py-3 rounded-xl border border-white/5"><Clock className="w-4 h-4 mr-3 text-brand-orange"/> Dom 10h e 19h</div>
            <div className="flex items-center bg-black/40 backdrop-blur px-6 py-3 rounded-xl border border-white/5"><Clock className="w-4 h-4 mr-3 text-brand-orange"/> Qua 20h</div>
            <div className="flex items-center bg-black/40 backdrop-blur px-6 py-3 rounded-xl border border-white/5"><MapPin className="w-4 h-4 mr-3 text-brand-orange"/> Vila São Luis</div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center w-full max-w-lg animate-fade-in delay-300">
          <button onClick={() => onNavigate(NavigationTab.SERMONS)} className="bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-brand-orange hover:text-white transition-all duration-300 w-full shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-brand-orange/50 flex items-center justify-center gap-2 group">
            <PlayCircle size={20} className="group-hover:fill-current"/> Assistir Culto
          </button>
          <button onClick={() => onNavigate(NavigationTab.DISCIPLESHIP)} className="bg-white/10 backdrop-blur text-white px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-white/20 border border-white/20 transition-all duration-300 w-full flex items-center justify-center gap-2">
            Comece Aqui <ArrowRight size={20}/>
          </button>
        </div>
      </div>
    </div>
  );
};
