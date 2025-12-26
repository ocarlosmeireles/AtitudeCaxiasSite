
import React, { useState, useEffect } from 'react';
import { NavigationTab } from '../types';
import { 
  Menu, X, Home, PlayCircle, Calendar, ShieldCheck, 
  BookOpen, Sun, Moon, Heart, Mail, MapPin, Phone, 
  Instagram, Youtube, Facebook, LayoutGrid, ArrowRight,
  Baby, Users, User, Globe, Zap, Radio, Send
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
  onDonate: () => void;
  onCheckinKids?: () => void;
  config?: any;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, onNavigate, onDonate, onCheckinKids, config }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false); 
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const checkLive = () => {
        const now = new Date();
        const day = now.getDay();
        const hour = now.getHours();
        const sundayLive = day === 0 && ((hour >= 10 && hour <= 12) || (hour >= 19 && hour <= 21));
        const wednesdayLive = day === 3 && (hour >= 20 && hour <= 22);
        setIsLive(sundayLive || wednesdayLive);
    };
    
    window.addEventListener('scroll', handleScroll);
    const liveTimer = setInterval(checkLive, 60000);
    checkLive();

    return () => {
        window.removeEventListener('scroll', handleScroll);
        clearInterval(liveTimer);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab]);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  const navItems = [
    { id: NavigationTab.HOME, label: 'Início', icon: <Home size={18} /> },
    { id: NavigationTab.SERMONS, label: 'Mensagens', icon: <PlayCircle size={18} /> },
    { id: NavigationTab.COMMUNITY, label: 'Mural', icon: <Users size={18} /> },
    { id: NavigationTab.DISCIPLESHIP, label: 'Academia', icon: <BookOpen size={18} /> },
    { id: NavigationTab.EVENTS, label: 'Agenda', icon: <Calendar size={18} /> },
    { id: NavigationTab.MINISTRIES, label: 'Servir', icon: <Zap size={18} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500 pt-[80px]">
      
      {/* HEADER: DYNAMIC ISLAND STYLE */}
      <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 flex justify-center ${scrolled ? 'py-4' : 'py-8'}`}>
        <div className={`transition-all duration-700 flex items-center gap-6 ${scrolled ? 'bg-white/80 dark:bg-zinc-900/80 backdrop-blur-3xl rounded-full shadow-2xl border border-white/20 dark:border-white/5 py-2 px-3 pl-8' : 'bg-transparent w-full max-w-7xl px-8'}`}>
          
          {/* Logo */}
          <div className="flex items-center cursor-pointer group" onClick={() => onNavigate(NavigationTab.HOME)}>
            <div className={`font-black text-2xl tracking-tighter transition-all duration-500 ${!scrolled && activeTab === NavigationTab.HOME ? 'text-white' : 'text-zinc-900 dark:text-white'}`}>
              ATITUDE<span className="text-brand-orange">.</span>
            </div>
            {(!scrolled || !isLive) && (
                <div className={`hidden sm:block ml-3 pl-3 border-l transition-colors duration-500 ${!scrolled && activeTab === NavigationTab.HOME ? 'border-white/20' : 'border-zinc-200 dark:border-white/10'}`}>
                    <span className={`text-[8px] font-black uppercase tracking-[0.5em] block leading-none transition-colors duration-500 ${!scrolled && activeTab === NavigationTab.HOME ? 'text-white/60' : 'text-zinc-400'}`}>Caxias</span>
                </div>
            )}
          </div>

          {/* Nav Links */}
          <nav className={`hidden lg:flex items-center gap-1 p-1 rounded-full transition-all duration-500 ${scrolled ? 'bg-zinc-100/50 dark:bg-black/20' : 'bg-white/5 backdrop-blur-md border border-white/10'}`}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-2.5 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.1em] transition-all duration-500 ${activeTab === item.id ? 'bg-white dark:bg-zinc-800 text-brand-orange shadow-lg scale-105' : !scrolled && activeTab === NavigationTab.HOME ? 'text-white/70 hover:text-white' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`}
              >
                {item.id === NavigationTab.SERMONS && isLive ? <Radio size={14} className="text-red-500 animate-pulse"/> : item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {isLive && (
                <div onClick={() => onNavigate(NavigationTab.SERMONS)} className="cursor-pointer bg-red-600 text-white text-[8px] font-black uppercase px-3 py-2 rounded-full hidden md:flex items-center gap-2 animate-pulse shadow-lg shadow-red-500/20">
                   <div className="w-1.5 h-1.5 bg-white rounded-full"></div> AO VIVO AGORA
                </div>
            )}
            <button onClick={() => onNavigate(NavigationTab.DASHBOARD)} className={`p-2.5 rounded-full transition-all duration-500 hover:scale-110 ${activeTab === NavigationTab.DASHBOARD ? 'bg-brand-orange text-white shadow-lg' : !scrolled && activeTab === NavigationTab.HOME ? 'bg-white/10 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'}`}>
                 <User size={18} />
            </button>
            <button 
              onClick={onDonate} 
              className="bg-brand-orange text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-orange-500/30 hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Heart size={14} fill="currentColor"/> Doar
            </button>
            <button onClick={() => setIsMobileMenuOpen(true)} className={`lg:hidden p-2.5 rounded-full transition-all ${!scrolled && activeTab === NavigationTab.HOME ? 'bg-white text-zinc-950' : 'bg-zinc-950 dark:bg-white text-white dark:text-zinc-900'}`}>
              <LayoutGrid size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <div className={`fixed inset-0 z-[110] transition-all duration-700 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-zinc-950/95 backdrop-blur-2xl" onClick={() => setIsMobileMenuOpen(false)}></div>
        <div className={`absolute bottom-0 left-0 right-0 max-h-[90vh] bg-white dark:bg-zinc-900 rounded-t-[4rem] shadow-2xl transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${isMobileMenuOpen ? 'translate-y-0' : 'translate-y-full'}`}>
           <div className="p-12 flex flex-col h-full max-w-2xl mx-auto">
              <div className="w-16 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full mx-auto mb-16" onClick={() => setIsMobileMenuOpen(false)}></div>
              <div className="grid grid-cols-2 gap-4 mb-12">
                 {navItems.map((item) => (
                    <button key={item.id} onClick={() => { onNavigate(item.id); setIsMobileMenuOpen(false); }} className={`flex flex-col items-center justify-center gap-4 p-10 rounded-[3rem] transition-all border ${activeTab === item.id ? 'bg-brand-orange border-brand-orange text-white shadow-2xl scale-105' : 'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-100 dark:border-white/5 text-zinc-900 dark:text-zinc-300'}`}>
                       <div className={`p-4 rounded-2xl ${activeTab === item.id ? 'bg-white/20' : 'bg-brand-orange/10 text-brand-orange'}`}>{item.icon}</div>
                       <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                    </button>
                 ))}
                 <button onClick={() => { onNavigate(NavigationTab.ADMIN); setIsMobileMenuOpen(false); }} className="col-span-2 p-8 rounded-[2.5rem] bg-zinc-950 dark:bg-white text-white dark:text-zinc-900 font-black uppercase text-[11px] tracking-widest flex items-center justify-center gap-4 shadow-xl mt-4">
                    <ShieldCheck size={20} className="text-brand-orange"/> Área de Liderança
                 </button>
              </div>
           </div>
        </div>
      </div>

      <main className="flex-grow">{children}</main>

      {/* FOOTER: CINEMATIC REDESIGN */}
      <footer className="bg-zinc-950 text-white pt-48 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[1000px] h-[1000px] bg-brand-orange/[0.03] rounded-full blur-[180px] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          
          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-32">
            
            {/* Brand Block */}
            <div className="lg:col-span-5 space-y-12">
               <div className="space-y-6">
                 <div className="font-black text-7xl tracking-tighter cursor-default">
                   ATITUDE<span className="text-brand-orange">.</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <div className="h-[2px] w-12 bg-brand-orange"></div>
                    <p className="text-[11px] font-black uppercase tracking-[0.8em] text-brand-orange leading-none">Duque de Caxias</p>
                 </div>
               </div>
               <p className="text-zinc-400 leading-relaxed text-xl max-w-md font-medium">
                  Uma igreja apaixonada por Jesus e focada em pessoas. O extraordinário de Deus começa aqui.
               </p>
               
               {/* Newsletter Capture */}
               <div className="pt-8">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-6">Receba novidades por e-mail</p>
                  <form className="flex max-w-sm" onSubmit={e => e.preventDefault()}>
                     <input type="email" placeholder="seu@email.com" className="flex-grow bg-white/5 border border-white/10 p-5 rounded-l-2xl outline-none focus:border-brand-orange transition-all font-bold text-sm" />
                     <button className="bg-white text-zinc-950 px-6 rounded-r-2xl hover:bg-brand-orange hover:text-white transition-all flex items-center justify-center">
                        <Send size={20}/>
                     </button>
                  </form>
               </div>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-3">
               <h4 className="font-black uppercase text-xs tracking-[0.5em] text-zinc-700 border-b border-white/5 pb-8 mb-10">Explorar</h4>
               <ul className="grid grid-cols-1 gap-8">
                 {navItems.map(item => (
                    <li key={item.id}>
                       <button onClick={() => onNavigate(item.id)} className="text-base font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-all flex items-center gap-6 group">
                          <span className="w-2 h-2 bg-brand-orange rounded-full scale-0 group-hover:scale-100 transition-all shadow-[0_0_15px_rgba(255,85,0,0.5)]"></span>
                          {item.label}
                       </button>
                    </li>
                 ))}
               </ul>
            </div>

            {/* Contact Block */}
            <div className="lg:col-span-4">
               <h4 className="font-black uppercase text-xs tracking-[0.5em] text-zinc-700 border-b border-white/5 pb-8 mb-10">Conecte-se</h4>
               <div className="space-y-10">
                  <div className="flex items-center gap-8 group cursor-pointer" onClick={() => window.open('https://instagram.com/atitudecaxias')}>
                     <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-zinc-400 group-hover:bg-brand-orange group-hover:text-white transition-all duration-500 border border-white/5 shadow-xl">
                        <Instagram size={24}/>
                     </div>
                     <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Instagram Oficial</p>
                        <p className="text-zinc-200 font-bold text-lg group-hover:text-brand-orange transition-colors">@atitudecaxias</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-8 group cursor-pointer" onClick={() => window.open('https://wa.me/5521964564689')}>
                     <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-zinc-400 group-hover:bg-green-500 group-hover:text-white transition-all duration-500 border border-white/5 shadow-xl">
                        <Phone size={24}/>
                     </div>
                     <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Central de Atendimento</p>
                        <p className="text-zinc-200 font-bold text-lg group-hover:text-green-500 transition-colors">(21) 96456-4689</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-8 group cursor-pointer" onClick={() => window.open('mailto:contato@ibatitudecaxias.com.br')}>
                     <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-zinc-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500 border border-white/5 shadow-xl">
                        <Mail size={24}/>
                     </div>
                     <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">E-mail</p>
                        <p className="text-zinc-200 font-bold text-lg group-hover:text-blue-500 transition-colors">contato@ibatitudecaxias.com.br</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12">
             <div className="text-center md:text-left space-y-4">
                <p className="text-[11px] font-black uppercase tracking-[0.6em] text-zinc-600">
                  © 2025 IGREJA BATISTA ATITUDE • DUQUE DE CAXIAS
                </p>
                <div className="flex items-center justify-center md:justify-start gap-4 text-zinc-800">
                   <Globe size={14}/>
                   <p className="text-[9px] font-bold uppercase tracking-[0.4em]">Inovação e Fé para a Glória de Deus.</p>
                </div>
             </div>
             <div className="flex flex-wrap justify-center gap-12">
                {['Termos', 'Privacidade', 'Cookies', 'Segurança'].map(link => (
                  <a key={link} href="#" className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-600 hover:text-brand-orange transition-all hover:scale-110">{link}</a>
                ))}
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
