
import React, { useState, useEffect } from 'react';
import { NavigationTab } from '../types';
import { 
  Menu, X, Home, FileText, PlayCircle, Calendar, ShieldCheck, 
  BookOpen, Sun, Moon, Heart, Mail, MapPin, Phone, 
  ChevronDown, Instagram, Youtube, Facebook, Sparkles, LayoutGrid, ArrowRight,
  Baby
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Garantir que sempre inicie do topo ao mudar de tab
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab]);

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
    <div className="min-h-screen flex flex-col font-sans bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500 pt-[72px]">
      
      {/* HEADER FIXO ULTRA-MODERNO */}
      <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'py-2 px-4' : 'py-4 px-0'}`}>
        <div className={`max-w-7xl mx-auto transition-all duration-500 ${scrolled ? 'bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl rounded-full shadow-2xl border border-white/20 dark:border-white/10 py-2 px-6' : 'bg-transparent py-2 px-8'}`}>
          <div className="flex justify-between items-center">
            
            {/* Logo Group */}
            <div className="flex items-center cursor-pointer group" onClick={() => onNavigate(NavigationTab.HOME)}>
              <div className={`font-black text-2xl tracking-tighter transition-colors duration-500 ${!scrolled && activeTab === NavigationTab.HOME ? 'text-white' : 'text-zinc-900 dark:text-white'}`}>
                ATITUDE<span className="text-brand-orange">.</span>
              </div>
              <div className="hidden sm:block ml-3 pl-3 border-l border-zinc-200 dark:border-white/10">
                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-400 block leading-none">Caxias</span>
              </div>
            </div>

            {/* Desktop Navigation - Pill Style */}
            <nav className="hidden lg:flex items-center gap-1 bg-zinc-100/50 dark:bg-black/20 p-1 rounded-full border border-zinc-200/20 dark:border-white/5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${activeTab === item.id ? 'bg-white dark:bg-zinc-800 text-brand-orange shadow-md scale-105' : scrolled || activeTab !== NavigationTab.HOME ? 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white' : 'text-white/70 hover:text-white'}`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button onClick={toggleTheme} className={`hidden sm:flex p-2.5 rounded-full transition-colors duration-500 ${!scrolled && activeTab === NavigationTab.HOME ? 'bg-white/10 text-white' : 'bg-zinc-100 dark:bg-black/20 text-zinc-500'}`}>
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button 
                onClick={onDonate} 
                className="bg-brand-orange text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-orange-500/20 hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <Heart size={14} fill="currentColor"/> Doar
              </button>
              <button 
                onClick={() => setIsMobileMenuOpen(true)} 
                className={`lg:hidden p-2.5 rounded-full shadow-lg transition-all duration-500 ${!scrolled && activeTab === NavigationTab.HOME ? 'bg-white text-zinc-950' : 'bg-zinc-950 dark:bg-white text-white dark:text-zinc-900'}`}
              >
                <LayoutGrid size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* NOVO MENU MOBILE - GLASS DRAWER */}
      <div className={`fixed inset-0 z-[110] transition-all duration-700 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-xl" onClick={() => setIsMobileMenuOpen(false)}></div>
        <div className={`absolute bottom-0 left-0 right-0 max-h-[90vh] bg-white dark:bg-zinc-900 rounded-t-[3.5rem] shadow-[0_-20px_80px_rgba(0,0,0,0.4)] transition-transform duration-700 ease-out ${isMobileMenuOpen ? 'translate-y-0' : 'translate-y-full'}`}>
           <div className="p-10 flex flex-col h-full max-w-2xl mx-auto">
              {/* Drag Handle Indicator */}
              <div className="w-12 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full mx-auto mb-12 cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}></div>
              
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-orange mb-8 text-center">Navegação Principal</h3>

              <div className="grid grid-cols-2 gap-4 mb-12">
                 {navItems.map((item) => (
                    <button 
                      key={item.id} 
                      onClick={() => { onNavigate(item.id); setIsMobileMenuOpen(false); }} 
                      className={`flex flex-col items-center justify-center gap-4 p-8 rounded-[2.5rem] transition-all duration-500 border ${activeTab === item.id ? 'bg-brand-orange border-brand-orange text-white shadow-2xl scale-105 z-10' : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-100 dark:border-white/5 text-zinc-900 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-700'}`}
                    >
                       <div className={`${activeTab === item.id ? 'text-white' : 'text-brand-orange'}`}>{item.icon}</div>
                       <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                    </button>
                 ))}
                 
                 {/* Admin Access in Mobile */}
                 <button 
                    onClick={() => { onNavigate(NavigationTab.ADMIN); setIsMobileMenuOpen(false); }} 
                    className="flex items-center justify-center gap-3 p-6 rounded-[2rem] bg-zinc-950 dark:bg-white text-white dark:text-zinc-900 border border-zinc-800 dark:border-zinc-200 col-span-2 shadow-2xl mt-4 active:scale-95 transition-transform"
                 >
                    <ShieldCheck size={20} className="text-brand-orange"/>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Área de Liderança</span>
                 </button>
              </div>

              {/* Bottom Social Support in Mobile */}
              <div className="mt-auto pt-8 border-t border-zinc-100 dark:border-white/5 flex justify-center gap-8">
                 <Instagram size={20} className="text-zinc-400"/>
                 <Youtube size={20} className="text-zinc-400"/>
                 <Facebook size={20} className="text-zinc-400"/>
              </div>
           </div>
        </div>
      </div>

      <main className="flex-grow">{children}</main>

      {/* O Footer foi atualizado na rodada anterior e permanece funcional aqui */}
      <footer className="bg-zinc-950 text-white pt-32 pb-12 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-orange/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
             <div className="bg-white/5 backdrop-blur-xl p-10 rounded-[3rem] border border-white/10 group hover:bg-brand-orange transition-all duration-500 cursor-pointer" onClick={onDonate}>
                <div className="w-14 h-14 bg-brand-orange text-white rounded-2xl flex items-center justify-center mb-8 group-hover:bg-white group-hover:text-brand-orange transition-colors shadow-xl">
                   <Heart size={28} fill="currentColor"/>
                </div>
                <h4 className="text-2xl font-black uppercase tracking-tight mb-4 leading-none">Generosidade <br/>que Transforma</h4>
                <p className="text-zinc-400 group-hover:text-white/80 mb-8 font-medium">Financie projetos sociais e a expansão do Reino através do seu dízimo e oferta.</p>
                <div className="flex items-center gap-3 font-black uppercase text-[10px] tracking-widest group-hover:translate-x-2 transition-transform">
                   Quero Contribuir <ArrowRight size={16}/>
                </div>
             </div>

             <div className="bg-white/5 backdrop-blur-xl p-10 rounded-[3rem] border border-white/10 group hover:bg-blue-600 transition-all duration-500 cursor-pointer" onClick={onCheckinKids}>
                <div className="w-14 h-14 bg-blue-500 text-white rounded-2xl flex items-center justify-center mb-8 group-hover:bg-white group-hover:text-blue-600 transition-colors shadow-xl">
                   <Baby size={28}/>
                </div>
                <h4 className="text-2xl font-black uppercase tracking-tight mb-4 leading-none">Check-in Kids <br/>Digital</h4>
                <p className="text-zinc-400 group-hover:text-white/80 mb-8 font-medium">Agilize a entrada dos seus filhos no ministério infantil de forma digital e segura.</p>
                <div className="flex items-center gap-3 font-black uppercase text-[10px] tracking-widest group-hover:translate-x-2 transition-transform">
                   Fazer Check-in <ArrowRight size={16}/>
                </div>
             </div>

             <div className="bg-white/5 backdrop-blur-xl p-10 rounded-[3rem] border border-white/10 group hover:bg-zinc-100 hover:text-zinc-900 transition-all duration-500 cursor-pointer">
                <div className="w-14 h-14 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-8 group-hover:bg-zinc-950 transition-colors shadow-xl">
                   <MapPin size={28}/>
                </div>
                <h4 className="text-2xl font-black uppercase tracking-tight mb-4 leading-none">Visite a nossa <br/>Casa Hoje</h4>
                <p className="text-zinc-400 group-hover:text-zinc-600 mb-8 font-medium">Av. Expedicionário José Amaro, 848 - Vila São Luis, Duque de Caxias - RJ.</p>
                <a href="https://maps.google.com" target="_blank" className="flex items-center gap-3 font-black uppercase text-[10px] tracking-widest group-hover:translate-x-2 transition-transform">
                   Como Chegar <ArrowRight size={16}/>
                </a>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24 border-t border-white/5 pt-24">
            <div className="lg:col-span-5 space-y-10">
               <div className="space-y-4">
                 <div className="font-black text-5xl tracking-tighter">
                   ATITUDE<span className="text-brand-orange">.</span>
                 </div>
                 <p className="text-[10px] font-black uppercase tracking-[0.6em] text-brand-orange leading-none">Duque de Caxias</p>
               </div>
               <p className="text-zinc-400 leading-relaxed text-lg max-w-md font-medium">
                  Uma igreja apaixonada por Jesus e focada em pessoas. Acreditamos que o extraordinário de Deus está disponível para você agora mesmo.
               </p>
               <div className="flex gap-4">
                  {[
                    { icon: <Instagram size={24}/>, label: 'Instagram', url: 'https://instagram.com/atitudecaxias' },
                    { icon: <Youtube size={24}/>, label: 'Youtube', url: 'https://youtube.com' },
                    { icon: <Facebook size={24}/>, label: 'Facebook', url: 'https://facebook.com' }
                  ].map((social, i) => (
                    <a key={i} href={social.url} target="_blank" className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-brand-orange hover:text-white transition-all duration-500 border border-white/5">
                       {social.icon}
                    </a>
                  ))}
               </div>
            </div>

            <div className="lg:col-span-3 space-y-10">
               <h4 className="font-black uppercase text-[11px] tracking-[0.4em] text-zinc-600 border-b border-white/5 pb-4">Navegação</h4>
               <ul className="grid grid-cols-1 gap-6">
                 {navItems.map(item => (
                    <li key={item.id}>
                       <button onClick={() => onNavigate(item.id)} className="text-sm font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-all flex items-center gap-4 group">
                          <span className="w-1.5 h-1.5 bg-brand-orange rounded-full scale-0 group-hover:scale-100 transition-transform"></span>
                          {item.label}
                       </button>
                    </li>
                 ))}
               </ul>
            </div>

            <div className="lg:col-span-4 space-y-10">
               <h4 className="font-black uppercase text-[11px] tracking-[0.4em] text-zinc-600 border-b border-white/5 pb-4">Atendimento</h4>
               <div className="space-y-8">
                  <div className="flex items-center gap-6 group cursor-pointer" onClick={() => window.open('mailto:contato@ibatitudecaxias.com.br')}>
                     <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-brand-orange group-hover:scale-110 transition-transform">
                        <Mail size={22}/>
                     </div>
                     <p className="text-zinc-300 font-bold hover:text-white transition-colors">contato@ibatitudecaxias.com.br</p>
                  </div>
                  <div className="flex items-center gap-6 group cursor-pointer" onClick={() => window.open('https://wa.me/5521964564689')}>
                     <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-brand-orange group-hover:scale-110 transition-transform">
                        <Phone size={22}/>
                     </div>
                     <p className="text-zinc-300 font-bold hover:text-white transition-colors">(21) 96456-4689</p>
                  </div>
                  <div className="pt-6">
                     <button onClick={() => onNavigate(NavigationTab.ADMIN)} className="w-full bg-white text-zinc-950 py-5 rounded-[2rem] font-black uppercase text-[10px] tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-brand-orange hover:text-white transition-all shadow-2xl active:scale-95">
                        <ShieldCheck size={20}/> Portal da Liderança
                     </button>
                  </div>
               </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
             <div className="text-center md:text-left">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500 mb-2">
                  © 2025 IGREJA BATISTA ATITUDE • DUQUE DE CAXIAS
                </p>
                <p className="text-[9px] text-zinc-700 font-bold uppercase tracking-widest">
                  Tecnologia e Fé conectadas para o Reino de Deus.
                </p>
             </div>
             <div className="flex gap-10">
                {['Privacidade', 'Termos de Uso', 'Cookies'].map(link => (
                  <a key={link} href="#" className="text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-brand-orange transition-colors">{link}</a>
                ))}
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
