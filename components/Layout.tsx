
import React, { useState, useEffect } from 'react';
import { NavigationTab } from '../types';
import { 
  Menu, X, Home, FileText, PlayCircle, Calendar, ShieldCheck, 
  BookOpen, Sun, Moon, Heart, Mail, MapPin, Phone, 
  ChevronDown, Instagram, Youtube, Facebook, Sparkles, LayoutGrid, ArrowRight
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
  onDonate: () => void;
  config?: any;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, onNavigate, onDonate, config }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false); 

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', newTheme);
    setIsDark(!isDark);
  };

  const navItems = [
    { id: NavigationTab.HOME, label: 'Início', icon: <Home size={18} /> },
    { id: NavigationTab.NEWS, label: 'Avisos', icon: <FileText size={18} /> },
    { id: NavigationTab.SERMONS, label: 'Mensagens', icon: <PlayCircle size={18} /> },
    { id: NavigationTab.DISCIPLESHIP, label: 'Academia', icon: <BookOpen size={18} /> },
    { id: NavigationTab.EVENTS, label: 'Agenda', icon: <Calendar size={18} /> },
    { id: NavigationTab.GENERATOR, label: 'Criativo', icon: <Sparkles size={18} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500">
      
      <header className={`fixed left-0 right-0 z-50 transition-all duration-700 ${scrolled ? 'top-2 px-4' : 'top-0 px-0'}`}>
        <div className={`max-w-7xl mx-auto transition-all duration-700 ${scrolled ? 'bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl rounded-full shadow-2xl py-2 px-6 border border-white/20 dark:border-white/10' : 'bg-transparent py-4 px-8'}`}>
          <div className="flex justify-between items-center">
            
            <div className="flex items-center cursor-pointer group" onClick={() => onNavigate(NavigationTab.HOME)}>
              <div className="font-black text-2xl tracking-tighter text-zinc-900 dark:text-white">
                ATITUDE<span className="text-brand-orange">.</span>
              </div>
              <div className="hidden sm:block ml-3 pl-3 border-l border-zinc-200 dark:border-white/10">
                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-400 block leading-none">Caxias</span>
              </div>
            </div>

            <nav className="hidden lg:flex items-center gap-1 bg-zinc-100/50 dark:bg-black/20 p-1 rounded-full border border-zinc-200/20 dark:border-white/5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2.5 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${activeTab === item.id ? 'bg-white dark:bg-zinc-800 text-brand-orange shadow-md' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button onClick={toggleTheme} className="hidden sm:flex p-2.5 rounded-full bg-white/10 dark:bg-black/20 text-zinc-500 hover:scale-110 transition-transform">
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button onClick={onDonate} className="bg-zinc-900 dark:bg-brand-orange text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-xl flex items-center gap-2 transform active:scale-95">
                <Heart size={14} /> Doar
              </button>
              <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2.5 rounded-full bg-zinc-950 dark:bg-white text-white dark:text-zinc-900 shadow-lg">
                <LayoutGrid size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[110] transition-all duration-700 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-xl" onClick={() => setIsMobileMenuOpen(false)}></div>
        <div className={`absolute bottom-0 left-0 right-0 max-h-[85vh] bg-white dark:bg-zinc-900 rounded-t-[3rem] shadow-2xl transition-transform duration-700 ${isMobileMenuOpen ? 'translate-y-0' : 'translate-y-full'}`}>
           <div className="p-8 flex flex-col h-full max-w-2xl mx-auto">
              <div className="w-12 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full mx-auto mb-8 cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}></div>
              
              <div className="grid grid-cols-2 gap-4 mb-10">
                 {navItems.map((item) => (
                    <button key={item.id} onClick={() => { onNavigate(item.id); setIsMobileMenuOpen(false); }} className={`flex flex-col items-center justify-center gap-3 p-6 rounded-3xl transition-all border ${activeTab === item.id ? 'bg-brand-orange border-brand-orange text-white shadow-xl' : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-100 dark:border-white/5 text-zinc-900 dark:text-zinc-300'}`}>
                       <div className={`${activeTab === item.id ? 'text-white' : 'text-brand-orange'}`}>{item.icon}</div>
                       <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                    </button>
                 ))}
                 <button onClick={() => { onNavigate(NavigationTab.ADMIN); setIsMobileMenuOpen(false); }} className="flex flex-col items-center justify-center gap-3 p-6 rounded-3xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-900 border border-zinc-800 dark:border-zinc-200 col-span-2 shadow-2xl">
                    <ShieldCheck size={20} className="text-brand-orange"/>
                    <span className="text-[10px] font-black uppercase tracking-widest">Portal do Líder / Login</span>
                 </button>
              </div>
           </div>
        </div>
      </div>

      <main className="flex-grow">{children}</main>

      {/* Footer Modernizado - Estética High-End */}
      <footer className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white border-t border-zinc-100 dark:border-white/5 pt-24 pb-12 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
            {/* Branding Column */}
            <div className="lg:col-span-4 space-y-10">
               <div className="space-y-4">
                 <div className="font-black text-4xl tracking-tighter text-zinc-900 dark:text-white">
                   ATITUDE<span className="text-brand-orange">.</span>
                 </div>
                 <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-orange leading-none">Duque de Caxias</p>
               </div>
               
               <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm max-w-sm font-medium">
                  Somos uma igreja relevante que ama a Deus acima de tudo e ao próximo como a si mesmo. Nossa missão é conectar você ao seu propósito extraordinário através do Evangelho.
               </p>

               <div className="flex gap-3">
                  {[
                    { icon: <Instagram size={20}/>, label: 'Instagram' },
                    { icon: <Youtube size={20}/>, label: 'Youtube' },
                    { icon: <Facebook size={20}/>, label: 'Facebook' }
                  ].map((social, i) => (
                    <a 
                      key={i} 
                      href="#" 
                      className="w-12 h-12 rounded-2xl bg-zinc-50 dark:bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-brand-orange hover:text-white hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-500 border border-zinc-100 dark:border-white/5"
                    >
                       {social.icon}
                    </a>
                  ))}
               </div>
            </div>

            {/* Links Column */}
            <div className="lg:col-span-2 space-y-8">
               <h4 className="font-black uppercase text-[10px] tracking-[0.3em] text-zinc-400 dark:text-zinc-600 mb-8">Navegação</h4>
               <ul className="space-y-5">
                 {navItems.map(item => (
                    <li key={item.id}>
                       <button onClick={() => onNavigate(item.id)} className="text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-brand-orange transition-colors flex items-center gap-2 group text-left">
                          <span className="w-1 h-1 bg-brand-orange rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                          {item.label}
                       </button>
                    </li>
                 ))}
               </ul>
            </div>

            {/* Location Column */}
            <div className="lg:col-span-3 space-y-8">
               <h4 className="font-black uppercase text-[10px] tracking-[0.3em] text-zinc-400 dark:text-zinc-600 mb-8">Onde Estamos</h4>
               <div className="space-y-6">
                  <div className="flex items-start gap-4">
                     <div className="w-10 h-10 rounded-xl bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/5 flex items-center justify-center shrink-0 text-brand-orange">
                        <MapPin size={18}/>
                     </div>
                     <div>
                        <p className="text-xs font-bold text-zinc-600 dark:text-zinc-300 leading-relaxed">
                           Av. Expedicionário José Amaro, 848 <br/> 
                           Vila São Luis - Duque de Caxias, RJ
                        </p>
                        <a href="#" className="text-[9px] font-black uppercase tracking-widest text-brand-orange mt-2 inline-block hover:underline">Ver no Maps</a>
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-xl bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/5 flex items-center justify-center shrink-0 text-brand-orange">
                        <Mail size={18}/>
                     </div>
                     <p className="text-xs font-bold text-zinc-600 dark:text-zinc-300">contato@ibatitudecaxias.com.br</p>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-xl bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/5 flex items-center justify-center shrink-0 text-brand-orange">
                        <Phone size={18}/>
                     </div>
                     <p className="text-xs font-bold text-zinc-600 dark:text-zinc-300">(21) 96456-4689</p>
                  </div>
               </div>
            </div>

            {/* Admin Action Column */}
            <div className="lg:col-span-3">
               <div className="bg-zinc-50 dark:bg-zinc-900 p-10 rounded-[3rem] border border-zinc-100 dark:border-white/5 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-bl-full group-hover:scale-150 transition-transform duration-1000"></div>
                  <h4 className="font-black uppercase text-[11px] tracking-[0.2em] text-zinc-900 dark:text-white mb-4">Área Administrativa</h4>
                  <p className="text-xs font-medium text-zinc-500 mb-8 leading-relaxed">Acesso restrito para pastores e líderes da IBA-DC.</p>
                  <button onClick={() => onNavigate(NavigationTab.ADMIN)} className="w-full bg-zinc-900 dark:bg-brand-orange text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-brand-orange dark:hover:bg-white dark:hover:text-brand-orange transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 group">
                    Painel de Controle <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                  </button>
               </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-10 border-t border-zinc-200/50 dark:border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
             <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-400 dark:text-zinc-700 text-center sm:text-left">
               © 2025 ATITUDE CAXIAS • VIVENDO O EXTRAORDINÁRIO
             </p>
             <div className="flex gap-10">
                {['Privacidade', 'Termos', 'Cookies'].map(link => (
                  <a key={link} href="#" className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-300 dark:text-zinc-800 hover:text-brand-orange transition-colors">{link}</a>
                ))}
             </div>
          </div>

        </div>
      </footer>
    </div>
  );
};
