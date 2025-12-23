
import React, { useState, useEffect, useRef } from 'react';
import { NavigationTab, Notice, TenYearsData, WelcomeSectionData, HomeConfig } from '../../types';
import { 
  Heart, BookOpen, Music, HeartHandshake, User, CheckCircle, ChevronRight, 
  TrendingUp, CreditCard, Info, UserPlus, Globe, Target, Quote, Crown, Instagram, ExternalLink, Activity, ArrowRight, Calendar, Star, Send, Briefcase, Home, Smartphone, Download, X, Mic2, Monitor, AudioWaveform, Play, Pause, Headphones, Sparkles, Clock, MapPin, ArrowUpRight, Timer, Coffee, Users, AlertTriangle, Radio, Flag, Diamond, Check
} from 'lucide-react';

// 0. URGENT NOTICE POPUP
export const UrgentNoticePopup = ({ notices }: { notices: Notice[] }) => {
    const [isOpen, setIsOpen] = useState(true);
    const urgentNotices = notices.filter(n => n.active && n.priority === 'Alta');

    if (urgentNotices.length === 0 || !isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative border-t-8 border-red-600 animate-slide-up">
                <div className="bg-red-600/10 p-6 flex items-center gap-4 border-b border-red-600/20">
                    <div className="bg-red-600 text-white p-3 rounded-full animate-pulse">
                        <AlertTriangle size={32} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-red-600 uppercase tracking-tighter leading-none">Comunicado<br/>Urgente</h3>
                    </div>
                </div>
                <div className="p-8 space-y-6">
                    {urgentNotices.map(notice => (
                        <div key={notice.id} className="bg-zinc-50 dark:bg-black/40 p-4 rounded-xl border border-zinc-200 dark:border-white/10">
                            <p className="text-lg font-bold text-zinc-800 dark:text-white leading-relaxed">
                                {notice.text}
                            </p>
                        </div>
                    ))}
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="w-full bg-zinc-900 dark:bg-white text-white dark:text-black py-4 rounded-xl font-black uppercase tracking-widest hover:scale-[1.02] transition-transform"
                    >
                        Entendido
                    </button>
                </div>
            </div>
        </div>
    );
};

// 1. FADING TICKER
export const TickerSection = ({ notices }: { notices: Notice[] }) => {
  const activeNotices = notices.filter((n) => n.active && n.priority !== 'Alta');
  
  const itemsToDisplay = activeNotices.length > 0 ? activeNotices : [
      { id: 'def1', text: 'Seja bem-vindo à Igreja Batista Atitude em Duque de Caxias' },
      { id: 'def2', text: 'Cultos aos Domingos 10h e 19h' },
      { id: 'def3', text: 'Escola Bíblica Dominical às 8:30h' }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
      if (itemsToDisplay.length <= 1) return;
      const interval = setInterval(() => {
          setCurrentIndex((prev) => (prev + 1) % itemsToDisplay.length);
      }, 5000); 
      return () => clearInterval(interval);
  }, [itemsToDisplay.length]);

  return (
    <div className="bg-zinc-950 text-white border-y border-white/5 relative z-20 overflow-hidden h-14 flex items-center">
        <div className="absolute left-0 top-0 bottom-0 bg-brand-orange z-20 px-6 flex items-center skew-x-[-10deg] -ml-4 shadow-lg shadow-orange-500/20">
            <span className="font-black text-xs uppercase tracking-widest skew-x-[10deg] ml-2">Avisos</span>
        </div>
        
        <div className="w-full h-full relative ml-32 flex items-center">
            {itemsToDisplay.map((n, idx) => (
                <div 
                    key={`${n.id}-${idx}`} 
                    className={`absolute inset-0 flex items-center transition-all duration-700 ease-in-out px-4 ${idx === currentIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
                >
                    <Star size={10} className="text-brand-orange mr-4 fill-current shrink-0"/>
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 line-clamp-1">{n.text}</span>
                </div>
            ))}
        </div>
    </div>
  );
};

// 2. JOINT SECTION: FAMILY & BUSINESS
export const FamilyBusinessSection = ({ config }: { config: HomeConfig }) => {
    const [openSystem, setOpenSystem] = useState<'FAMILY' | 'BUSINESS' | null>(null);

    return (
        <div className="py-0 relative bg-zinc-900 overflow-hidden">
            {openSystem && (
                <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
                    <div className="w-full h-full md:w-[90vw] md:h-[90vh] bg-white rounded-3xl overflow-hidden flex flex-col relative shadow-2xl animate-slide-up">
                        <div className={`p-4 flex justify-between items-center text-white ${openSystem === 'FAMILY' ? 'bg-indigo-600' : 'bg-slate-800'}`}>
                            <span className="font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                                {openSystem === 'FAMILY' ? <Home size={18}/> : <Briefcase size={18}/>} 
                                {openSystem === 'FAMILY' ? 'Portal da Família' : 'Portal Mentes Brilhantes'}
                            </span>
                            <button onClick={() => setOpenSystem(null)} className="hover:bg-white/20 p-2 rounded-full transition-colors"><X size={20}/></button>
                        </div>
                        <div className="flex-grow bg-zinc-100 relative">
                            <div className="absolute inset-0 flex items-center justify-center text-zinc-400 font-bold uppercase tracking-widest flex-col gap-4">
                                <Activity className="animate-spin text-zinc-300" size={32}/>
                                <span>Carregando Sistema Externo...</span>
                            </div>
                            <iframe 
                                src={openSystem === 'FAMILY' ? (config.familySystemUrl || 'https://www.google.com') : (config.businessSystemUrl || 'https://www.google.com')} 
                                className="w-full h-full relative z-10" 
                                frameBorder="0"
                                allow="camera; microphone; fullscreen; payment"
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
                <div className="relative group overflow-hidden h-[500px] lg:h-auto">
                    <img src="https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2070" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"/>
                    <div className="absolute inset-0 bg-indigo-900/80 mix-blend-multiply transition-colors group-hover:bg-indigo-900/70"></div>
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-12 text-white z-10">
                        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6 backdrop-blur-md border border-white/20 group-hover:scale-110 transition-transform">
                            <Home size={32} />
                        </div>
                        <h3 className="text-4xl font-black uppercase mb-4 tracking-tighter">Ministério da Família</h3>
                        <p className="max-w-md text-indigo-100 text-lg mb-8 leading-relaxed">Cursos, restauração de casamentos e fortalecimento de lares. Sua família é o nosso maior projeto.</p>
                        <button onClick={() => setOpenSystem('FAMILY')} className="px-8 py-4 bg-white text-indigo-900 rounded-full font-black uppercase tracking-widest hover:bg-brand-orange hover:text-white transition-all shadow-xl flex items-center gap-3 hover:-translate-y-1">
                            Acessar Plataforma <ArrowRight size={18}/>
                        </button>
                    </div>
                </div>

                <div className="relative group overflow-hidden h-[500px] lg:h-auto">
                    <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"/>
                    <div className="absolute inset-0 bg-slate-900/80 mix-blend-multiply transition-colors group-hover:bg-slate-900/70"></div>
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-12 text-white z-10">
                        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6 backdrop-blur-md border border-white/20 group-hover:scale-110 transition-transform">
                            <Briefcase size={32} />
                        </div>
                        <h3 className="text-4xl font-black uppercase mb-4 tracking-tighter">Mentes Brilhantes</h3>
                        <p className="max-w-md text-slate-300 text-lg mb-8 leading-relaxed">Empreendedorismo cristão, networking e capacitação profissional com princípios do Reino.</p>
                        <button onClick={() => setOpenSystem('BUSINESS')} className="px-8 py-4 bg-white text-slate-900 rounded-full font-black uppercase tracking-widest hover:bg-brand-orange hover:text-white transition-all shadow-xl flex items-center gap-3 hover:-translate-y-1">
                            Área do Empreendedor <ArrowRight size={18}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 3. APP DOWNLOAD
export const AppDownloadSection = () => (
    <div className="py-24 px-4 bg-zinc-50 dark:bg-white overflow-hidden relative border-y border-zinc-200 dark:border-zinc-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2 relative z-10">
                <span className="text-brand-orange font-black uppercase tracking-widest text-xs mb-2 block">Igreja na palma da mão</span>
                <h2 className="text-5xl md:text-6xl font-black text-zinc-900 mb-6 tracking-tighter">BAIXE O NOSSO<br/>APP OFICIAL.</h2>
                <p className="text-zinc-500 text-xl mb-8 leading-relaxed">
                    Acompanhe os cultos, faça pedidos de oração, inscreva-se em eventos e oferte com facilidade. Tudo em um só lugar.
                </p>
                <div className="flex flex-wrap gap-4">
                    <button className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-zinc-800 transition-colors shadow-lg hover:-translate-y-1">
                        <Smartphone size={24}/>
                        <div className="text-left">
                            <p className="text-[10px] uppercase font-bold text-zinc-400">Disponível na</p>
                            <p className="font-bold text-sm leading-none">Apple Store</p>
                        </div>
                    </button>
                    <button className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-zinc-800 transition-colors shadow-lg hover:-translate-y-1">
                        <Monitor size={24}/>
                        <div className="text-left">
                            <p className="text-[10px] uppercase font-bold text-zinc-400">Baixe no</p>
                            <p className="font-bold text-sm leading-none">Google Play</p>
                        </div>
                    </button>
                </div>
            </div>
            <div className="md:w-1/2 relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/20 to-purple-500/20 rounded-full blur-[100px]"></div>
                <img 
                    src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070" 
                    className="relative z-10 rounded-[2.5rem] shadow-2xl border-8 border-white transform rotate-3 hover:rotate-0 transition-transform duration-500 max-w-sm mx-auto"
                    alt="App Mobile"
                />
            </div>
        </div>
    </div>
);

// 4. WORSHIP
export const WorshipSection = () => (
    <div className="py-32 px-4 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-40">
            <img src="https://images.unsplash.com/photo-1525268323446-0505b6fe7778?q=80&w=2072" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"/>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto">
            <Mic2 size={48} className="text-brand-orange mx-auto mb-6 animate-pulse"/>
            <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter mb-8 drop-shadow-2xl">
                Adoração <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-red-600">Extravagante</span>
            </h2>
            <p className="text-zinc-300 text-xl md:text-2xl font-light mb-12 max-w-2xl mx-auto">
                Não cantamos apenas músicas. Criamos um ambiente onde o Céu toca a Terra. Junte-se ao Atitude Worship.
            </p>
            <div className="flex justify-center gap-6">
                <button className="px-8 py-4 rounded-full bg-white text-black font-black uppercase tracking-widest hover:bg-brand-orange hover:text-white transition-all hover:scale-105">
                    Ouvir no Spotify
                </button>
            </div>
        </div>
    </div>
);

// 5. SERIES
export const SeriesSection = () => (
    <div className="py-20 bg-zinc-100 dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4">
            <div className="rounded-[3rem] overflow-hidden relative h-[400px] shadow-2xl group cursor-pointer border border-white/10">
                <img src="https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=2069" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"/>
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col justify-center px-12 md:px-24">
                    <span className="bg-brand-orange text-white px-4 py-1 rounded text-xs font-bold uppercase w-fit mb-6 tracking-widest shadow-lg">Série Atual</span>
                    <h2 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-4 drop-shadow-lg">Vencendo<br/>Gigantes</h2>
                    <p className="text-zinc-300 text-lg font-medium max-w-lg mb-8 leading-relaxed">Descubra como a fé pode derrubar as muralhas que impedem o seu avanço. Uma jornada bíblica de coragem.</p>
                    <div className="flex items-center text-white font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                        Assistir Agora <ChevronRight className="ml-2 text-brand-orange"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// 6. VOLUNTEER
export const VolunteerSection = () => (
    <div className="py-24 px-4 bg-white dark:bg-black border-t border-zinc-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2074" className="rounded-3xl shadow-lg mt-12 hover:-translate-y-2 transition-transform duration-500"/>
                <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070" className="rounded-3xl shadow-lg hover:-translate-y-2 transition-transform duration-500"/>
            </div>
            <div className="md:w-1/2">
                <div className="inline-flex items-center gap-2 text-brand-orange font-bold uppercase tracking-widest text-xs mb-4 border border-brand-orange/20 px-4 py-2 rounded-full">
                    <HeartHandshake size={14}/> Voluntariado
                </div>
                <h2 className="text-5xl font-black text-zinc-900 dark:text-white mb-6 tracking-tighter">AME.<br/>SIRVA.<br/>LIDERE.</h2>
                <p className="text-zinc-500 text-xl mb-8 leading-relaxed">
                    A igreja não é um lugar para assistir, é uma família para pertencer. Descubra o seu propósito servindo em um de nossos ministérios.
                </p>
                <ul className="space-y-4 mb-10">
                    <li className="flex items-center text-zinc-700 dark:text-zinc-300 font-bold"><CheckCircle size={20} className="text-green-500 mr-3"/> Recepção e Acolhimento</li>
                    <li className="flex items-center text-zinc-700 dark:text-zinc-300 font-bold"><CheckCircle size={20} className="text-green-500 mr-3"/> Mídia e Tecnologia</li>
                    <li className="flex items-center text-zinc-700 dark:text-zinc-300 font-bold"><CheckCircle size={20} className="text-green-500 mr-3"/> Atitude Kids</li>
                </ul>
                <button className="bg-zinc-900 dark:bg-white text-white dark:text-black px-10 py-4 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-xl">
                    Quero ser Voluntário
                </button>
            </div>
        </div>
    </div>
);

// 7. CELL VISION
export const CellVisionSection = () => (
    <div className="py-24 bg-white dark:bg-zinc-900 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row gap-16 items-center mb-16">
                <div className="lg:w-1/2">
                    <div className="inline-flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-xs font-bold uppercase px-4 py-2 rounded-full tracking-widest mb-6">
                        <Users size={14}/> DNA da Igreja
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter mb-6 leading-tight">
                        Não somos uma igreja <span className="text-zinc-400 dark:text-zinc-600">com</span> células.<br/>
                        Somos uma igreja <span className="text-brand-orange">EM</span> células.
                    </h2>
                    <p className="text-lg text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed mb-8 border-l-4 border-brand-orange pl-6">
                        Acreditamos que o cuidado acontece no relacionamento. Na grande celebração de domingo, nós adoramos juntos. Na célula, nós somos família.
                    </p>
                </div>
                <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-zinc-950 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl hover:-translate-y-2 transition-transform duration-300 group">
                        <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center text-brand-orange mb-6 group-hover:scale-110 transition-transform">
                            <Coffee size={28}/>
                        </div>
                        <h4 className="text-xl font-black text-zinc-900 dark:text-white mb-3">Comunhão Real</h4>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">Não caminhe sozinho. Encontre amigos que vão orar por você e celebrar suas vitórias.</p>
                    </div>
                    <div className="bg-white dark:bg-zinc-950 p-8 rounded-3xl border border-zinc-200 dark:border-white/5 shadow-xl hover:-translate-y-2 transition-transform duration-300 group mt-0 md:mt-12">
                        <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                            <HeartHandshake size={28}/>
                        </div>
                        <h4 className="text-xl font-black text-zinc-900 dark:text-white mb-3">Cuidado Pastoral</h4>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">Em cada célula há líderes capacitados para cuidar, aconselhar e caminhar com você.</p>
                    </div>
                    <div className="bg-white dark:bg-zinc-950 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl hover:-translate-y-2 transition-transform duration-300 group">
                        <div className="w-14 h-14 bg-green-100 dark:bg-green-900/20 rounded-2xl flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform">
                            <TrendingUp size={28}/>
                        </div>
                        <h4 className="text-xl font-black text-zinc-900 dark:text-white mb-3">Crescimento</h4>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">É no pequeno grupo que desenvolvemos nossos dons e aprendemos a servir.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// 8. PRAYER REQUEST SECTION
export const PrayerSection = ({ onNavigate }: { onNavigate: (tab: NavigationTab) => void }) => (
    <div className="py-24 relative overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070')] opacity-10 bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
                <div className="lg:w-1/2">
                    <span className="text-brand-orange font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Intercessão & Cuidado</span>
                    <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8">
                        PODEMOS ORAR <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-red-500">POR VOCÊ?</span>
                    </h2>
                    <p className="text-zinc-400 text-lg md:text-xl font-medium leading-relaxed mb-10 max-w-lg">
                        Acreditamos no poder da oração. Não importa qual seja a sua dor ou necessidade, nossa equipe de intercessores está pronta para clamar pela sua vitória.
                    </p>
                    <button 
                        onClick={() => onNavigate(NavigationTab.PRAYER)}
                        className="bg-white text-zinc-950 hover:bg-brand-orange hover:text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-[10px] shadow-2xl transition-all flex items-center gap-3 transform hover:scale-105"
                    >
                        <Send size={18} /> Entregar meu Pedido
                    </button>
                </div>
                
                <div className="lg:w-1/2">
                    <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-10 rounded-[3rem] shadow-2xl">
                        <div className="flex items-center gap-6 mb-8">
                            <div className="w-16 h-16 bg-brand-orange/20 rounded-2xl flex items-center justify-center text-brand-orange">
                                <Activity size={32} />
                            </div>
                            <div>
                                <h4 className="text-white font-black uppercase text-xl">Atendimento 24h</h4>
                                <p className="text-zinc-500 text-sm">Sua oração chega diretamente ao nosso altar digital.</p>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="flex gap-4 items-start">
                                <div className="w-6 h-6 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0"><Check size={12} className="text-brand-orange"/></div>
                                <p className="text-zinc-400 text-sm">Pedidos lidos por pastores e intercessores treinados.</p>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="w-6 h-6 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0"><Check size={12} className="text-brand-orange"/></div>
                                <p className="text-zinc-400 text-sm">Confidencialidade total e respeito à sua privacidade.</p>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="w-6 h-6 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0"><Check size={12} className="text-brand-orange"/></div>
                                <p className="text-zinc-400 text-sm">Apoio emocional e espiritual em momentos de crise.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export const TenYearsSection = ({ data }: { data: TenYearsData }) => {
  if (!data.enabled) return null;
  return (
    <div className="relative py-24 px-4 overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-yellow-600/20 rounded-full blur-[150px]"></div>
      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-yellow-500/30 rounded-full bg-yellow-900/10 text-yellow-500 font-bold uppercase text-xs tracking-widest">
            <Crown size={14} /> Edição Comemorativa
          </div>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 drop-shadow-sm">
            {data.title}<br/>{data.subtitle}
          </h2>
          <p className="text-zinc-300 text-xl leading-relaxed border-l-4 border-yellow-600 pl-6">
            {data.description}
          </p>
          <div className="grid grid-cols-2 gap-8 pt-8">
            <div><p className="text-5xl font-black text-white mb-2">{data.stats_lives}</p><p className="text-yellow-500 text-xs font-bold uppercase tracking-widest">Vidas Alcançadas</p></div>
            <div><p className="text-5xl font-black text-white mb-2">{data.stats_baptisms}</p><p className="text-yellow-500 text-xs font-bold uppercase tracking-widest">Batismos</p></div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-[2.5rem] opacity-30 blur-lg rotate-3"></div>
          <img src={data.imageUrl} alt="10 Anos" className="relative rounded-[2rem] shadow-2xl border border-white/10 w-full object-cover transform hover:-translate-y-2 transition-transform duration-700" />
        </div>
      </div>
    </div>
  );
};

export const ServiceTimesSection = () => {
    // Defines exact structure of weekly services
    const services = [
        { id: 1, day: 0, hour: 8, min: 30, name: "Escola do Avivamento", type: "EBD", desc: "Aprendizado Bíblico" },
        { id: 2, day: 0, hour: 10, min: 0, name: "Culto de Celebração", type: "Domingo Manhã", desc: "Adoração e Palavra" },
        { id: 3, day: 0, hour: 19, min: 0, name: "Culto de Celebração", type: "Domingo Noite", desc: "Culto da Família" },
        { id: 4, day: 3, hour: 20, min: 0, name: "Culto da Resposta", type: "Quarta-Feira", desc: "Milagres e Oração" }
    ];

    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [nextService, setNextService] = useState<any>(null);

    useEffect(() => {
        const calculateTime = () => {
            const now = new Date();
            const currentDay = now.getDay();
            const currentHour = now.getHours();
            const currentMin = now.getMinutes();

            let upcoming = null;
            let minDiff = Infinity;

            for (const s of services) {
                let target = new Date();
                target.setHours(s.hour, s.min, 0, 0);
                const dayDiff = s.day - currentDay;
                if (dayDiff > 0) {
                    target.setDate(now.getDate() + dayDiff);
                } else if (dayDiff < 0) {
                    target.setDate(now.getDate() + (7 + dayDiff));
                } else {
                    if (now > target) {
                        target.setDate(now.getDate() + 7);
                    }
                }

                const diff = target.getTime() - now.getTime();
                if (diff < minDiff && diff > 0) {
                    minDiff = diff;
                    upcoming = { ...s, targetDate: target };
                }
            }

            setNextService(upcoming);

            if (minDiff !== Infinity) {
                const days = Math.floor(minDiff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((minDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((minDiff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((minDiff % (1000 * 60)) / 1000);
                setTimeLeft({ days, hours, minutes, seconds });
            }
        };

        const timer = setInterval(calculateTime, 1000);
        calculateTime();
        return () => clearInterval(timer);
    }, []);

    const formatNum = (n: number) => n < 10 ? `0${n}` : n;

    return (
        <div className="relative py-24 bg-white dark:bg-zinc-100 overflow-hidden text-zinc-900 border-t border-zinc-100 transition-colors duration-500">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30 mix-blend-multiply"></div>
            <div className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-gradient-to-br from-brand-orange/10 to-yellow-500/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col xl:flex-row gap-16 items-center">
                    
                    <div className="w-full xl:w-1/2">
                        <div className="inline-flex items-center gap-2 mb-6 text-brand-orange font-bold uppercase tracking-[0.3em] text-xs animate-pulse">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
                            </span>
                            Em Tempo Real
                        </div>
                        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4 leading-[0.9] text-zinc-900">
                            Próximo<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-red-600">Encontro</span>
                        </h2>
                        <p className="text-zinc-500 text-lg mb-10 font-medium border-l-4 border-brand-orange pl-6 leading-relaxed max-w-md">
                            As portas da casa do Pai estarão abertas em breve. Prepare seu coração.
                        </p>

                        <div className="grid grid-cols-4 gap-4 mb-12">
                            {[
                                { val: timeLeft.days, label: 'Dias' },
                                { val: timeLeft.hours, label: 'Horas' },
                                { val: timeLeft.minutes, label: 'Min' },
                                { val: timeLeft.seconds, label: 'Seg' }
                            ].map((t, i) => (
                                <div key={i} className="bg-white border border-zinc-200 rounded-3xl p-4 text-center shadow-xl shadow-zinc-200/50 flex flex-col justify-center aspect-square">
                                    <span className="block text-3xl md:text-5xl font-black font-sans text-zinc-900 tracking-tighter">{formatNum(t.val)}</span>
                                    <span className="text-[10px] text-zinc-400 uppercase font-black tracking-widest">{t.label}</span>
                                </div>
                            ))}
                        </div>

                        {nextService && (
                            <div className="group cursor-pointer">
                                <div className="bg-zinc-900 text-white rounded-3xl p-8 flex items-center justify-between shadow-2xl relative overflow-hidden transform transition-transform hover:scale-[1.02]">
                                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 to-black"></div>
                                    <div className="absolute right-0 top-0 opacity-10">
                                        <Clock size={120} />
                                    </div>
                                    <div className="relative z-10">
                                        <p className="text-brand-orange text-xs font-bold uppercase tracking-widest mb-2">Estamos aguardando você para:</p>
                                        <h3 className="text-3xl font-black uppercase text-white leading-none mb-1">{nextService.name}</h3>
                                        <p className="text-zinc-400 font-medium text-sm">{nextService.type} • <span className="text-white">{formatNum(nextService.hour)}:{formatNum(nextService.min)}h</span></p>
                                    </div>
                                    <div className="relative z-10 w-14 h-14 bg-brand-orange rounded-full flex items-center justify-center text-white shadow-lg group-hover:rotate-45 transition-transform duration-500">
                                        <ArrowUpRight size={28} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="w-full xl:w-1/2 grid gap-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-zinc-900 font-black uppercase tracking-tighter text-xl">Programação Semanal</h3>
                            <div className="h-px bg-zinc-200 flex-grow ml-6"></div>
                        </div>
                        
                        {services.map((s) => (
                            <div key={s.id} className="group relative bg-white hover:bg-zinc-50 border border-zinc-200 hover:border-brand-orange rounded-2xl p-6 transition-all duration-300 shadow-sm hover:shadow-lg cursor-default overflow-hidden">
                                <div className="flex items-center gap-6 relative z-10">
                                    <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center transition-colors shadow-inner ${s.day === 0 ? 'bg-orange-50 text-brand-orange' : 'bg-blue-50 text-blue-600'}`}>
                                        <span className="text-xl font-black leading-none">{formatNum(s.hour)}</span>
                                        <span className="text-[10px] font-bold uppercase leading-none mt-1">:{formatNum(s.min) === '00' ? '00' : s.min}</span>
                                    </div>
                                    
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-center mb-1">
                                            <h4 className="text-lg font-black uppercase text-zinc-800 leading-none group-hover:text-brand-orange transition-colors">{s.name}</h4>
                                            {s.day === 0 ? 
                                                <span className="text-[9px] font-black bg-zinc-100 text-zinc-500 px-2 py-1 rounded uppercase tracking-wider">Domingo</span> : 
                                                <span className="text-[9px] font-black bg-zinc-100 text-zinc-500 px-2 py-1 rounded uppercase tracking-wider">Quarta</span>
                                            }
                                        </div>
                                        <p className="text-zinc-500 text-sm font-medium">{s.desc}</p>
                                    </div>
                                    
                                    <div className="w-1 h-8 bg-zinc-100 rounded-full group-hover:bg-brand-orange transition-colors"></div>
                                </div>
                            </div>
                        ))}
                        
                        <div className="mt-4 p-5 bg-zinc-100/80 border border-zinc-200 rounded-2xl flex gap-4 items-start">
                             <div className="bg-white p-2 rounded-full shadow-sm text-zinc-400"><Info size={16} /></div>
                             <div>
                                 <h5 className="font-bold text-zinc-800 text-xs uppercase mb-1">Dica Importante</h5>
                                 <p className="text-xs text-zinc-500 leading-relaxed">Chegue 15 minutos antes para fazer o check-in das crianças no Atitude Kids e garantir seu lugar. O estacionamento é gratuito.</p>
                             </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export const ValuesSection = () => (
  <div className="py-20 px-4 bg-white dark:bg-black">
     <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter mb-12">Nossos Valores</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
           {[{t: 'Amor Intenso', i: Heart}, {t: 'Palavra Viva', i: BookOpen}, {t: 'Adoração Real', i: Music}, {t: 'Serviço', i: HeartHandshake}].map((v, idx) => (
             <div key={idx} className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center text-zinc-400 group-hover:bg-brand-orange group-hover:text-white transition-all duration-500 mb-4 shadow-lg"><v.i size={32} /></div>
                <h4 className="font-bold text-zinc-800 dark:text-white uppercase">{v.t}</h4>
             </div>
           ))}
        </div>
     </div>
  </div>
);

export const GrowthPath = ({ onNavigate, onOpenVisitor, onOpenDecision }: { onNavigate: (tab: NavigationTab) => void, onOpenVisitor: () => void, onOpenDecision: () => void }) => {
  const steps = [
    { id: 1, title: 'Sou Visitante', desc: 'Queremos conhecer você.', icon: <User size={24} />, action: 'Preencher Cartão', color: 'bg-blue-500', onClick: onOpenVisitor },
    { id: 2, title: 'Decidi por Jesus', desc: 'O início de uma nova vida.', icon: <CheckCircle size={24} />, action: 'Começar Discipulado', color: 'bg-green-500', onClick: onOpenDecision },
    { id: 3, title: 'Batismo', desc: 'Sua confissão pública de fé.', icon: <TrendingUp size={24} />, action: 'Saiba Mais', color: 'bg-cyan-500', onClick: () => onNavigate(NavigationTab.BAPTISM) },
    { id: 4, title: 'Voluntariado', desc: 'Descubra seu propósito.', icon: <Heart size={24} />, action: 'Servir', color: 'bg-brand-orange', onClick: () => onNavigate(NavigationTab.MINISTRIES) },
  ];
  return (
    <div className="py-20 px-4 bg-zinc-50 dark:bg-black border-y border-zinc-200 dark:border-white/10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12"><h2 className="text-brand-orange font-bold uppercase tracking-widest text-sm mb-4">Caminho do Discipulado</h2><h3 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tighter">PRÓXIMOS PASSOS</h3></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {steps.map((step, idx) => (
             <div key={step.id} onClick={step.onClick} className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-white/10 relative overflow-hidden group hover:-translate-y-2 transition-transform cursor-pointer shadow-lg dark:shadow-none">
                <div className={`w-14 h-14 ${step.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-${step.color}/30`}>{step.icon}</div>
                <h4 className="text-xl font-black text-zinc-900 dark:text-white mb-2">{step.title}</h4>
                <p className="text-zinc-500 dark:text-brand-gray text-sm mb-6">{step.desc}</p>
                <div className="flex items-center text-zinc-400 dark:text-zinc-500 text-xs font-bold uppercase tracking-widest group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">{step.action} <ChevronRight size={14} className="ml-1" /></div>
                <div className="absolute -right-6 -bottom-6 opacity-5 dark:opacity-10 text-9xl font-black text-zinc-900 dark:text-white select-none">{idx + 1}</div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export const KidsSection = ({ imageUrl }: { imageUrl?: string }) => (
  <div className="py-20 px-4 bg-gradient-to-br from-yellow-400 to-orange-500 relative overflow-hidden">
     <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
     <div className="max-w-5xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2 text-white">
           <span className="bg-white text-orange-500 font-bold px-4 py-1 rounded-full text-xs uppercase tracking-widest mb-4 inline-block">Atitude Kids</span>
           <h2 className="text-5xl font-black uppercase leading-none mb-6">Uma Igreja para <br/>Toda a Família</h2>
           <p className="text-lg font-medium opacity-90 mb-8">Enquanto você é ministrado no culto, seus filhos aprendem sobre Jesus de uma forma divertida, segura e adequada para cada idade.</p>
           <ul className="space-y-2 mb-8 font-bold text-sm">
              <li className="flex items-center"><CheckCircle size={16} className="mr-2"/> Berçário Completo</li>
              <li className="flex items-center"><CheckCircle size={16} className="mr-2"/> Servos Treinados</li>
              <li className="flex items-center"><CheckCircle size={16} className="mr-2"/> Segurança no Check-in</li>
           </ul>
        </div>
        <div className="md:w-1/2"><img src={imageUrl || "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=2038"} className="rounded-[2rem] shadow-2xl rotate-3 border-4 border-white w-full" alt="Kids" /></div>
     </div>
  </div>
);

export const TestimoniesSection = () => (
    <div className="py-20 px-4 bg-zinc-5 dark:bg-zinc-900 border-y border-zinc-200 dark:border-white/5">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-black text-center text-zinc-900 dark:text-white mb-12 uppercase tracking-tighter">Histórias de Transformação</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[{ name: "Maria Silva", text: "Cheguei na igreja sem esperança e fui acolhida com tanto amor. Hoje minha família serve ao Senhor aqui.", role: "Membro há 2 anos" }, { name: "João Santos", text: "O discipulado mudou minha visão de vida. Aprendi a ser um pai melhor e um líder na minha casa.", role: "Líder de Célula" }, { name: "Ana Clara", text: "O ministério infantil cuidou dos meus filhos enquanto eu era ministrada. Isso não tem preço!", role: "Mãe e Voluntária" }].map((t, idx) => (
            <div key={idx} className="bg-white dark:bg-black p-8 rounded-3xl shadow-lg border border-zinc-100 dark:border-white/5 relative hover:-translate-y-2 transition-transform">
              <Quote className="text-brand-orange w-8 h-8 mb-4 opacity-50" />
              <p className="text-zinc-600 dark:text-zinc-300 italic mb-6">"{t.text}"</p>
              <div><p className="font-bold text-zinc-900 dark:text-white">{t.name}</p><p className="text-xs text-brand-orange uppercase font-bold">{t.role}</p></div>
            </div>
          ))}
        </div>
      </div>
    </div>
);

export const ParallaxSection = () => (
    <div className="relative h-[600px] flex items-center justify-center overflow-hidden bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=2070')" }}>
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <h2 className="text-white text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 drop-shadow-2xl">Uma Igreja de <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-red-500">Vencedores</span></h2>
        <p className="text-zinc-200 text-lg md:text-2xl font-medium leading-relaxed drop-shadow-md">"Em todas estas coisas, porém, somos mais que vencedores, por meio daquele que nos amou."</p>
        <div className="mt-8"><span className="inline-block px-4 py-2 bg-white/10 backdrop-blur rounded-lg text-white font-bold uppercase tracking-widest text-sm border border-white/20">Romanos 8:37</span></div>
      </div>
    </div>
);

// NEW PARALLAX VOLUNTEER SECTION
export const ParallaxVolunteerSection = ({ onNavigate }: { onNavigate: (tab: NavigationTab) => void }) => (
    <div className="relative h-[600px] flex items-center justify-center overflow-hidden bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070')" }}>
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
      <div className="relative z-10 w-full max-w-7xl px-6 flex items-center">
        <div className="max-w-2xl">
            <span className="bg-brand-orange text-white text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-6 inline-block shadow-lg">Chamado para Servir</span>
            <h2 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter mb-6 drop-shadow-2xl leading-none">
              TRANSFORME<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-red-500">VIDAS</span>
            </h2>
            <p className="text-zinc-200 text-lg md:text-2xl font-light leading-relaxed mb-10 border-l-4 border-brand-orange pl-6">
              O maior privilégio de um cristão é servir. Descubra o seu propósito e faça a diferença em nossa comunidade.
            </p>
            <button onClick={() => onNavigate(NavigationTab.MINISTRIES)} className="bg-white text-black hover:bg-brand-orange hover:text-white px-10 py-5 rounded-full font-black uppercase tracking-widest transition-all transform hover:scale-105 shadow-2xl flex items-center gap-3">
               Quero ser Voluntário <ArrowRight size={20}/>
            </button>
        </div>
      </div>
    </div>
);

export const SocialActionSection = ({ config }: { config: HomeConfig }) => (
  <div className="py-24 px-4 bg-zinc-100 dark:bg-zinc-800">
     <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2 grid grid-cols-2 gap-4"><img src={config.socialImage1} className="rounded-2xl shadow-lg mt-8" /><img src={config.socialImage2} className="rounded-2xl shadow-lg" /></div>
        <div className="md:w-1/2"><h2 className="text-brand-orange font-bold uppercase tracking-widest text-sm mb-4">Amar ao Próximo</h2><h3 className="text-4xl font-black text-zinc-900 dark:text-white mb-6 leading-tight">{config.socialTitle}</h3><p className="text-zinc-600 dark:text-zinc-300 text-lg mb-6">{config.socialDescription}</p><button className="bg-zinc-900 dark:bg-white text-white dark:text-black px-8 py-3 rounded-full font-bold uppercase text-xs hover:scale-105 transition-transform shadow-lg">Quero Doar Alimentos</button></div></div></div>
);

export const ExpansionSection = ({ onOpenDonation, config }: { onOpenDonation?: () => void, config: HomeConfig }) => {
    // Fallback data if no projects are configured
    const projects = config.avancaProjects && config.avancaProjects.length > 0 ? config.avancaProjects : [
        { id: 'p1', title: 'Novo Templo', description: 'Capacidade para 500 pessoas.', progress: 75, image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070' },
        { id: 'p2', title: 'Atitude Pilar', description: 'Plantando igrejas.', progress: 30, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070' }
    ];

    return (
    <div className="py-20 px-4 bg-white dark:bg-zinc-950 transition-colors duration-500">
       <div className="max-w-7xl mx-auto">
           <div className="flex flex-col lg:flex-row gap-12 mb-12">
               <div className="lg:w-1/3">
                   <h2 className="text-brand-orange font-bold uppercase tracking-widest text-sm mb-4 flex items-center"><TrendingUp className="w-4 h-4 mr-2"/> Projeto Avança</h2>
                   <h3 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tighter leading-tight mb-6">EXPANSÃO<br/>DO REINO.</h3>
                   <p className="text-zinc-600 dark:text-brand-gray text-lg leading-relaxed mb-8">Deus tem alargado as nossas tendas. Participe da construção e reforma de nossas igrejas filhas.</p>
                   <button onClick={onOpenDonation} className="bg-zinc-900 dark:bg-white text-white dark:text-black px-8 py-3 rounded-full font-bold uppercase text-xs hover:scale-105 transition-transform shadow-lg flex items-center gap-2"><CreditCard size={16}/> Quero Contribuir</button>
               </div>
               <div className={`lg:w-2/3 grid grid-cols-1 ${projects.length > 1 ? 'md:grid-cols-2' : ''} gap-6`}>
                   {projects.map((proj) => (
                       <div key={proj.id} className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl group border border-zinc-200 dark:border-white/5">
                           <img src={proj.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                           <div className="absolute bottom-0 left-0 p-8 w-full">
                               <h4 className="text-2xl font-black text-white mb-2">{proj.title}</h4>
                               <p className="text-white/80 text-sm mb-4">{proj.description}</p>
                               <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                                   <div className="bg-brand-orange h-2 rounded-full" style={{width: `${proj.progress}%`}}></div>
                               </div>
                               <div className="flex justify-between text-[10px] font-bold text-white uppercase tracking-widest">
                                   <span>Progresso</span>
                                   <span>{proj.progress}%</span>
                               </div>
                           </div>
                       </div>
                   ))}
               </div>
           </div>
       </div>
    </div>
    );
};

export const FAQSection = () => (
    <div className="py-20 px-4 bg-white dark:bg-zinc-950">
      <div className="max-w-3xl mx-auto"><h2 className="text-3xl font-black text-center text-zinc-900 dark:text-white mb-10 uppercase tracking-tighter">Dúvidas Frequentes</h2><div className="space-y-4">{[{ q: "Qual o horário dos cultos?", a: "Domingos às 10h e 19h. Quartas às 20h." }, { q: "Tem estacionamento?", a: "Sim, temos estacionamento gratuito e seguro no local." }, { q: "Como funciona o ministério infantil?", a: "Recebemos crianças a partir de 0 a 11 anos em salas climatizadas e divididas por idade em todos os cultos." }].map((faq, idx) => (<div key={idx} className="border border-zinc-200 dark:border-white/10 rounded-2xl p-6 hover:border-brand-orange transition-colors cursor-help"><h4 className="font-bold text-lg text-zinc-900 dark:text-white mb-2 flex items-center"><Info size={18} className="mr-2 text-brand-orange"/> {faq.q}</h4><p className="text-zinc-600 dark:text-zinc-400 text-sm ml-6">{faq.a}</p></div>))}</div></div></div>
);

// 11. MPS SECTION - REDESIGNED: THE DIAMOND STRATEGY
export const MPSSection = ({ data }: { data: WelcomeSectionData }) => {
    const steps = [
        { id: 1, title: 'Ganhar', icon: <UserPlus size={28}/>, color: 'text-green-400', border: 'border-green-500/30', glow: 'shadow-green-500/20', desc: 'Tudo começa no evangelismo. É o nosso chamado para alcançar vidas através de células e cultos.' },
        { id: 2, title: 'Cuidar', icon: <Heart size={28}/>, color: 'text-red-400', border: 'border-red-500/30', glow: 'shadow-red-500/20', desc: 'Ninguém fica para trás. Através do Consolida e das Células, oferecemos cuidado pastoral e paternidade.' },
        { id: 3, title: 'Treinar', icon: <BookOpen size={28}/>, color: 'text-blue-400', border: 'border-blue-500/30', glow: 'shadow-blue-500/20', desc: 'O discipulado é intencional. Na Academia de Líderes, capacitamos você para exercer seu propósito.' },
        { id: 4, title: 'Enviar', icon: <Send size={28}/>, color: 'text-brand-orange', border: 'border-brand-orange/30', glow: 'shadow-orange-500/20', desc: 'O ciclo se completa quando você lidera. Enviamos novos líderes para abrir células e ministérios.' }
    ];

    return (
        <div className="py-24 bg-black relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-brand-orange/10 blur-[120px] rounded-full"></div>
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                    <div className="max-w-2xl">
                        <span className="text-brand-orange font-bold uppercase tracking-[0.3em] text-xs mb-4 flex items-center gap-2">
                             <Diamond size={12}/> Nossa Estratégia
                        </span>
                        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                            Visão <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-red-500">MPS</span>
                        </h2>
                    </div>
                    <p className="text-zinc-400 text-sm md:text-base max-w-sm border-l-2 border-zinc-800 pl-6">
                        {data.mpsDescription || "Modelo de Pastoreio Simplificado. Um caminho claro para você sair da multidão e se tornar um líder influente no Reino de Deus."}
                    </p>
                </div>

                {/* The Process Line */}
                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent -translate-y-1/2 hidden md:block"></div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <div key={step.id} className="group relative">
                                {/* Vertical Line (Mobile) */}
                                {index !== steps.length - 1 && (
                                    <div className="absolute left-8 top-16 bottom-[-32px] w-px bg-zinc-800 md:hidden"></div>
                                )}

                                <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 hover:border-zinc-600 rounded-3xl p-8 relative transition-all duration-500 hover:-translate-y-2 group-hover:bg-zinc-900 h-full flex flex-col">
                                    {/* Icon Box */}
                                    <div className={`w-16 h-16 rounded-2xl bg-black border ${step.border} flex items-center justify-center mb-6 shadow-xl ${step.glow} group-hover:scale-110 transition-transform duration-500 relative z-10`}>
                                        <div className={`${step.color}`}>{step.icon}</div>
                                    </div>
                                    
                                    {/* Step Number */}
                                    <div className="absolute top-4 right-6 text-5xl font-black text-white/5 select-none transition-colors group-hover:text-white/10">0{index + 1}</div>

                                    <h3 className="text-2xl font-black text-white uppercase mb-4">{step.title}</h3>
                                    <p className="text-zinc-500 text-sm font-medium leading-relaxed group-hover:text-zinc-300 transition-colors flex-grow">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// 7. NEW SECTION: NOTEBOOKLM PODCAST AI
export const NotebookLMPodcastSection = ({ audioUrl }: { audioUrl?: string }) => {
    // Removed per request, but keeping empty shell if needed for compilation safety, though not used in App.tsx
    return null;
};

// 12. INSTAGRAM SECTION
export const InstagramSection = ({ config }: { config: HomeConfig }) => {
    const images = (config.instagramImages && config.instagramImages.length > 0) ? config.instagramImages : [
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070",
        "https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=2070",
        "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070",
        "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=2070",
        "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=2038",
        "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070"
    ];

    return (
        <div className="py-20 bg-white dark:bg-zinc-950 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                     <div>
                        <div className="inline-flex items-center gap-2 text-brand-orange font-bold uppercase tracking-widest text-xs mb-4 border border-brand-orange/20 px-4 py-2 rounded-full">
                            <Instagram size={14}/> Siga-nos
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter leading-none">
                            @ATITUDE<span className="text-zinc-400">CAXIAS</span>
                        </h2>
                     </div>
                     <a 
                        href={config.instagramProfileUrl || "https://instagram.com/atitudecaxias"} 
                        target="_blank" 
                        rel="noreferrer"
                        className="bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-lg flex items-center gap-2"
                     >
                        <Instagram size={20}/> Seguir no Instagram
                     </a>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {images.slice(0, 6).map((img, idx) => (
                        <a 
                            key={idx} 
                            href={config.instagramProfileUrl || "https://instagram.com/atitudecaxias"}
                            target="_blank"
                            rel="noreferrer"
                            className="aspect-square relative group overflow-hidden rounded-2xl cursor-pointer"
                        >
                            <img src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={`Instagram ${idx}`} />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Instagram className="text-white w-8 h-8"/>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};
