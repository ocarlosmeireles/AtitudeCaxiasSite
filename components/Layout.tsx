
import React, { useState, useEffect } from 'react';
import { NavigationTab } from '../types';
import { Menu, X, Home, FileText, PlayCircle, Calendar, HeartHandshake, ShieldCheck, Instagram, Youtube, Facebook, BookOpen, Sun, Moon, MessageCircle, Heart, CreditCard, Mail, MapPin, Phone, ArrowRight, Droplets, Clock, ExternalLink, Info, Camera } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
  onDonate: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, onNavigate, onDonate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false); 

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const navItems = [
    { id: NavigationTab.HOME, label: 'INÍCIO', icon: <Home size={18} /> },
    { id: NavigationTab.ABOUT, label: 'SOBRE', icon: <Info size={18} /> },
    { id: NavigationTab.NEWS, label: 'AVISOS', icon: <FileText size={18} /> },
    { id: NavigationTab.SERMONS, label: 'PREGAÇÕES', icon: <PlayCircle size={18} /> },
    { id: NavigationTab.DISCIPLESHIP, label: 'ACADEMIA', icon: <BookOpen size={18} /> },
    { id: NavigationTab.EVENTS, label: 'AGENDA', icon: <Calendar size={18} /> },
    { id: NavigationTab.GENERATOR, label: 'EFEITOS', icon: <Camera size={18} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-brand-orange selection:text-white overflow-x-hidden transition-colors duration-300">
      
      {/* Top Bar Minimalista */}
      <div className="bg-zinc-100 dark:bg-black text-brand-textLight dark:text-brand-gray text-[10px] uppercase tracking-widest font-bold py-2 px-4 border-b border-zinc-200 dark:border-white/5 flex justify-between items-center z-50 relative">
        <span className="hidden md:inline">Av. Expedicionário José Amaro, 848 - Vila São Luis, Duque de Caxias</span>
        <span className="md:hidden">IBA Duque de Caxias</span>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline hover:text-brand-orange dark:hover:text-white cursor-pointer transition-colors">(21) 96456-4689</span>
          <button 
            onClick={() => onNavigate(NavigationTab.ADMIN)}
            className="hover:text-brand-orange dark:hover:text-white transition-colors flex items-center gap-1"
          >
            <ShieldCheck size={10} /> AREA DO LÍDER
          </button>
        </div>
      </div>

      {/* Navbar Glass */}
      <nav className={`fixed top-8 left-0 right-0 z-40 transition-all duration-500 ${scrolled ? 'py-2 glass-nav' : 'py-6 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center">
            
            <div 
              className="flex items-center cursor-pointer group" 
              onClick={() => onNavigate(NavigationTab.HOME)}
            >
              <div className="font-black text-2xl tracking-tighter leading-none text-zinc-900 dark:text-white group-hover:text-brand-orange transition-colors">
                ATITUDE<span className="text-brand-orange">.</span>
              </div>
              <div className="hidden md:block ml-3 h-8 w-[1px] bg-zinc-300 dark:bg-white/20"></div>
              <div className="hidden md:block ml-3 text-xs font-medium text-zinc-500 dark:text-brand-gray leading-tight">
                IGREJA BATISTA<br/>DUQUE DE CAXIAS
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`relative text-xs font-bold tracking-widest hover:text-brand-orange dark:hover:text-white transition-all duration-300 py-2 group ${
                    activeTab === item.id 
                      ? 'text-brand-orange' 
                      : 'text-zinc-600 dark:text-brand-gray'
                  }`}
                >
                  {item.label}
                  <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-brand-orange transform transition-transform duration-300 origin-left ${
                    activeTab === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'
                  }`}></span>
                </button>
              ))}
              
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-white/10 text-zinc-800 dark:text-white transition-colors"
                title={isDark ? "Modo Claro" : "Modo Escuro"}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <button 
                onClick={onDonate}
                className="bg-brand-orange text-white hover:bg-orange-600 px-6 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-brand-orange/50 flex items-center gap-2 transform hover:scale-105"
              >
                <Heart size={12} fill="currentColor" /> DOAR
              </button>
            </div>

            <div className="flex items-center gap-4 lg:hidden">
                <button 
                  onClick={onDonate}
                  className="bg-brand-orange text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg"
                >
                  DOAR
                </button>
               <button 
                  onClick={toggleTheme}
                  className="p-2 rounded-full bg-zinc-100 dark:bg-white/10 text-zinc-800 dark:text-white transition-colors"
                >
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-zinc-900 dark:text-white hover:text-brand-orange transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-30 bg-white/95 dark:bg-black/95 backdrop-blur-xl transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`text-2xl font-black tracking-tight uppercase ${
                activeTab === item.id ? 'text-brand-orange' : 'text-zinc-900 dark:text-white hover:text-brand-orange'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => { onDonate(); setIsMobileMenuOpen(false); }}
            className="text-2xl font-black tracking-tight uppercase text-brand-orange flex items-center gap-2"
          >
            <Heart fill="currentColor" /> Contribuir
          </button>
        </div>
      </div>

      <main className="flex-grow pt-20">
        {children}
      </main>

      {/* MEGA FOOTER DARK */}
      <footer className="bg-zinc-950 text-white border-t border-white/5 py-24">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 mb-20">
            
            {/* Column 1: Identity */}
            <div className="space-y-8">
               <div className="flex flex-col gap-2">
                  <div className="font-black text-3xl tracking-tighter leading-none text-white">
                    ATITUDE<span className="text-brand-orange">.</span>
                  </div>
                  <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Duque de Caxias</p>
               </div>
               <p className="text-zinc-400 text-sm leading-relaxed">
                  Uma igreja de vencedores, apaixonada por Jesus e pelas pessoas. Levando o avivamento para a Baixada Fluminense.
               </p>
               <div className="flex gap-4">
                  {[Instagram, Facebook, Youtube].map((Icon, i) => (
                     <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-brand-orange flex items-center justify-center transition-all duration-300 text-zinc-400 hover:text-white">
                        <Icon size={18}/>
                     </a>
                  ))}
               </div>
            </div>

            {/* Column 2: Explore */}
            <div>
               <h4 className="font-bold text-white uppercase text-xs tracking-[0.2em] mb-8 flex items-center gap-2"><ArrowRight size={12} className="text-brand-orange"/> Explorar</h4>
               <ul className="space-y-4 text-sm font-medium text-zinc-400">
                  <li><button onClick={() => onNavigate(NavigationTab.MINISTRIES)} className="hover:text-brand-orange transition-colors flex items-center gap-2 hover:translate-x-1 duration-300">Ministérios</button></li>
                  <li><button onClick={() => onNavigate(NavigationTab.DISCIPLESHIP)} className="hover:text-brand-orange transition-colors flex items-center gap-2 hover:translate-x-1 duration-300">Academia</button></li>
                  <li><button onClick={() => onNavigate(NavigationTab.EVENTS)} className="hover:text-brand-orange transition-colors flex items-center gap-2 hover:translate-x-1 duration-300">Eventos</button></li>
                  <li><button onClick={() => onNavigate(NavigationTab.NEWS)} className="hover:text-brand-orange transition-colors flex items-center gap-2 hover:translate-x-1 duration-300">Notícias</button></li>
                  <li><button onClick={() => onNavigate(NavigationTab.SERMONS)} className="hover:text-brand-orange transition-colors flex items-center gap-2 hover:translate-x-1 duration-300">Pregações</button></li>
               </ul>
            </div>

            {/* Column 3: Service Times */}
            <div>
               <h4 className="font-bold text-white uppercase text-xs tracking-[0.2em] mb-8 flex items-center gap-2"><Clock size={12} className="text-brand-orange"/> Cultos</h4>
               <div className="space-y-6">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-brand-orange/30 transition-colors">
                     <p className="text-brand-orange font-bold text-xs uppercase mb-1">Domingo</p>
                     <p className="text-xl font-black text-white">10H <span className="text-zinc-500 text-sm font-normal">e</span> 19H</p>
                     <p className="text-zinc-500 text-xs mt-1">EBD e Celebração</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-brand-orange/30 transition-colors">
                     <p className="text-brand-orange font-bold text-xs uppercase mb-1">Quarta-Feira</p>
                     <p className="text-xl font-black text-white">20H</p>
                     <p className="text-zinc-500 text-xs mt-1">Culto da Resposta</p>
                  </div>
               </div>
            </div>

            {/* Column 4: Contact & Giving */}
            <div className="space-y-8">
               <h4 className="font-bold text-white uppercase text-xs tracking-[0.2em] mb-8 flex items-center gap-2"><MapPin size={12} className="text-brand-orange"/> Contato</h4>
               <div className="text-sm text-zinc-400 space-y-4">
                  <p className="flex items-start gap-3"><MapPin size={16} className="mt-1 text-zinc-600 shrink-0"/> Av. Expedicionário José Amaro, 848<br/>Vila São Luis, Duque de Caxias</p>
                  <p className="flex items-center gap-3"><Phone size={16} className="text-zinc-600 shrink-0"/> (21) 96456-4689</p>
                  <p className="flex items-center gap-3"><Mail size={16} className="text-zinc-600 shrink-0"/> contato@ibatitudecaxias.com.br</p>
               </div>
               <button onClick={onDonate} className="w-full bg-brand-orange hover:bg-orange-600 text-white font-bold py-4 rounded-xl uppercase tracking-widest text-xs transition-all shadow-lg hover:shadow-orange-500/20 flex items-center justify-center gap-2">
                  <Heart size={14} fill="currentColor"/> Faça uma Doação
               </button>
            </div>

          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-600 gap-4">
             <p>&copy; 2025 Igreja Batista Atitude - Duque de Caxias. Todos os direitos reservados.</p>
             <div className="flex gap-6">
                <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
                <a href="#" className="hover:text-white transition-colors">Privacidade</a>
             </div>
          </div>

        </div>
      </footer>
    </div>
  );
};
