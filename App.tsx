
import React, { useState, useEffect, useRef } from 'react';
import { NavigationTab, Sermon, Notice, Ministry, Event, NewsItem, DiscipleshipTrack, Cell, WelcomeSectionData, TenYearsData, HomeConfig, PhotoFrame, AboutPageData, SermonNote } from './types';
import { subscribeToData, saveData } from './services/firebase';
import { Layout } from './components/Layout';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import { 
  ArrowUp, PlayCircle, Calendar, FileText, GraduationCap, ArrowUpRight, 
  User, Heart, Send, CheckCircle, ChevronLeft, ChevronRight, ArrowRight, Star, Clock, Ticket,
  Bot, MessageSquare, X, Sparkles, Activity
} from 'lucide-react';

// Views
import { AdminView as AdminScreen } from './views/AdminView';
import { MinistriesView } from './views/MinistriesView';
import { DiscipleshipView } from './views/DiscipleshipView';
import { PrayerView } from './views/PrayerView';
import { SermonsView } from './views/SermonsView';
import { EventsView } from './views/EventsView';
import { NewsView } from './views/NewsView';
import { BaptismView } from './views/BaptismView'; 
import { AboutView } from './views/AboutView';
import { PhotoGeneratorView } from './views/PhotoGeneratorView';
import { CommunityView } from './views/CommunityView';

// Components
import { HeroSection } from './components/sections/HeroSection';
import { PastoralSection } from './components/sections/PastoralSection';
import { CellsSection } from './components/sections/CellsSection';
import { 
  TickerSection, TenYearsSection, ServiceTimesSection, ValuesSection, 
  GrowthPath, KidsSection, TestimoniesSection, ParallaxVolunteerSection, 
  MPSSection, SocialActionSection, ExpansionSection, FAQSection, 
  InstagramSection, CellVisionSection, UrgentNoticePopup, PrayerSection
} from './components/sections/HomeComponents';
import { StepModal, DonationModal, KidsCheckinModal } from './components/modals/GeneralModals';
import { getThumbnailUrl } from './utils';

// Added missing required properties to match HomeConfig interface
const INITIAL_HOME_CONFIG: HomeConfig = {
  heroTitle: "VIVENDO O EXTRAORDINÁRIO",
  heroSubtitle: "O LUGAR DOS NOVOS COMEÇOS",
  socialTitle: "FÉ QUE SE MOSTRA EM OBRAS.",
  socialDescription: "Atuamos na comunidade levando o amor de Jesus para quem mais precisa através de ações sociais e acolhimento.",
  socialImage1: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070",
  socialImage2: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2070",
  sectionOrder: [
    'hero', 'ticker', 'tenyears', 'pastoral', 'servicetimes', 'values', 'growthpath', 
    'highlights', 'prayer_request', 'kids', 'testimonies', 'volunteer_parallax', 'mps', 'cellvision', 'social', 'expansion', 
    'faq', 'cells', 'instagram'
  ]
};

const App = () => {
  const [activeTab, setActiveTab] = useState<NavigationTab>(NavigationTab.HOME);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isBotOpen, setIsBotOpen] = useState(false);
  const [botMessage, setBotMessage] = useState('');
  const [botResponse, setBotResponse] = useState<string | null>(null);
  const [isBotThinking, setIsBotThinking] = useState(false);
  
  // Data States
  const [news, setNews] = useState<NewsItem[]>([]);
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [cells, setCells] = useState<Cell[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [welcomeData, setWelcomeData] = useState<any>({});
  const [tenYearsData, setTenYearsData] = useState<any>({ enabled: false });
  const [homeConfig, setHomeConfig] = useState<HomeConfig>(INITIAL_HOME_CONFIG);
  const [discipleshipTracks, setDiscipleshipTracks] = useState<DiscipleshipTrack[]>([]);
  const [cellSystemUrl, setCellSystemUrl] = useState<string>('');
  const [aboutData, setAboutData] = useState<any>({});
  const [photoFrames, setPhotoFrames] = useState<PhotoFrame[]>([]);
  
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [showKidsModal, setShowKidsModal] = useState(false);
  const [activeStepModal, setActiveStepModal] = useState<'VISITOR' | 'DECISION' | null>(null);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const unsubWelcome = subscribeToData('settings', (data) => {
        const welcome = data.find(d => d.id === 'welcomeData');
        if (welcome) setWelcomeData(welcome);
        const tenYears = data.find(d => d.id === 'tenYearsData');
        if (tenYears) setTenYearsData(tenYears);
        const hConfig = data.find(d => d.id === 'homeConfig');
        if (hConfig) setHomeConfig({ ...INITIAL_HOME_CONFIG, ...hConfig });
        const config = data.find(d => d.id === 'config');
        if (config?.cellSystemUrl) setCellSystemUrl(config.cellSystemUrl);
        const about = data.find(d => d.id === 'aboutData');
        if (about) setAboutData(about);
    });
    const unsubNews = subscribeToData('news', (data) => setNews(data as NewsItem[]));
    const unsubSermons = subscribeToData('sermons', (data) => setSermons(data as Sermon[]));
    const unsubNotices = subscribeToData('notices', (data) => setNotices(data as Notice[]));
    const unsubEvents = subscribeToData('events', (data) => setEvents(data as Event[]));
    const unsubMinistries = subscribeToData('ministries', (data) => setMinistries(data as Ministry[]));
    const unsubCells = subscribeToData('cells', (data) => setCells(data as Cell[]));
    const unsubTracks = subscribeToData('tracks', (data) => setDiscipleshipTracks(data as DiscipleshipTrack[]));
    const unsubFrames = subscribeToData('frames', (data) => setPhotoFrames(data as PhotoFrame[]));

    return () => {
        unsubWelcome(); unsubNews(); unsubSermons(); unsubNotices(); unsubEvents(); unsubMinistries(); unsubCells(); unsubTracks(); unsubFrames();
    };
  }, []);

  const handleBotChat = async () => {
    if (!botMessage.trim()) return;
    setIsBotThinking(true);
    setBotResponse(null);
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Você é o "PastoralBot", assistente inteligente da Igreja Batista Atitude - Duque de Caxias. 
            Responda de forma pastoral, amigável e baseada na Bíblia (NVI) à seguinte mensagem do usuário: "${botMessage}". 
            Seja breve (máximo 3 parágrafos) e termine sempre oferecendo para orar por ele.`,
        });
        setBotResponse(response.text || "Paz do Senhor! No momento estou em oração, tente falar comigo novamente em instantes.");
    } catch (e) {
        setBotResponse("Desculpe, tive uma pequena falha de conexão. Mas saiba que Deus ouve sua voz!");
    } finally {
        setIsBotThinking(false);
    }
  };

  const homeComponents: Record<string, React.ReactNode> = {
    'hero': <HeroSection onNavigate={setActiveTab} config={homeConfig} />,
    'ticker': <TickerSection notices={notices} />,
    'tenyears': <TenYearsSection data={tenYearsData} />,
    'pastoral': <PastoralSection data={welcomeData} />,
    'servicetimes': <ServiceTimesSection />,
    'values': <ValuesSection />,
    'growthpath': <GrowthPath onNavigate={setActiveTab} onOpenVisitor={() => setActiveStepModal('VISITOR')} onOpenDecision={() => setActiveStepModal('DECISION')} />,
    'highlights': (
      <div className="max-w-7xl mx-auto px-6 my-32 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
            <div className="max-w-xl">
                <span className="text-brand-orange font-black uppercase text-[10px] tracking-[0.4em] mb-4 block">Fique por dentro</span>
                <h2 className="text-5xl md:text-6xl font-black text-zinc-900 dark:text-white tracking-tighter leading-none">ÚLTIMOS <br/><span className="text-zinc-300 dark:text-zinc-700">DESTAQUES.</span></h2>
            </div>
            <button onClick={() => setActiveTab(NavigationTab.NEWS)} className="flex items-center gap-3 px-8 py-4 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-2xl text-zinc-500 hover:text-zinc-900 font-black uppercase text-[10px] tracking-widest transition-all group border border-zinc-100 dark:border-white/5">
                Ver Tudo <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[650px]">
            <div onClick={() => setActiveTab(NavigationTab.SERMONS)} className="md:col-span-2 md:row-span-2 relative group rounded-[3.5rem] overflow-hidden cursor-pointer shadow-2xl border border-zinc-100 dark:border-white/5 transition-all duration-700 hover:shadow-brand-orange/20">
              <img src={getThumbnailUrl(sermons[0]?.youtubeUrl || "")} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-10 w-full">
                  <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-none mb-6">{sermons[0]?.title || "Culto de Celebração"}</h3>
                  <div className="flex items-center gap-4">
                     <span className="flex items-center gap-3 text-white font-black uppercase text-[10px] tracking-widest bg-white/20 backdrop-blur-md px-8 py-4 rounded-2xl hover:bg-brand-orange hover:text-white transition-all">
                        <PlayCircle size={18} /> Assistir Mensagem
                     </span>
                  </div>
              </div>
            </div>

            <div onClick={() => setActiveTab(NavigationTab.DISCIPLESHIP)} className="md:col-span-2 bg-zinc-900 rounded-[3.5rem] p-10 flex flex-col justify-between group cursor-pointer relative overflow-hidden border border-white/5 shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <div className="absolute right-0 top-0 w-48 h-48 bg-brand-orange/10 blur-[80px] rounded-full group-hover:bg-brand-orange/30 transition-all duration-700"></div>
              <div className="relative z-10 flex justify-between items-start">
                 <div className="p-4 bg-white/10 rounded-2xl text-brand-orange backdrop-blur-md border border-white/5 group-hover:scale-110 transition-transform duration-500">
                    <GraduationCap size={32} />
                 </div>
                 <ArrowUpRight size={24} className="text-zinc-600 group-hover:text-white transition-colors"/>
              </div>
              <div className="relative z-10">
                 <h3 className="text-2xl font-black text-white uppercase mb-2 tracking-tight">Academia Atitude</h3>
                 <p className="text-zinc-400 text-sm font-medium mb-6 leading-relaxed">Desenvolvimento espiritual gratuito para toda a sua família.</p>
                 <div className="flex items-center gap-4 text-brand-orange font-black uppercase text-[10px] tracking-widest">
                    Iniciar Trilha <ChevronRight size={14}/>
                 </div>
              </div>
            </div>

            <div onClick={() => setActiveTab(NavigationTab.EVENTS)} className="md:col-span-1 bg-white dark:bg-zinc-800 rounded-[3rem] p-8 flex flex-col justify-center items-center text-center group cursor-pointer border border-zinc-100 dark:border-white/5 shadow-xl hover:-translate-y-2 transition-all duration-500">
               <div className="w-16 h-16 bg-zinc-50 dark:bg-zinc-900 rounded-2xl flex items-center justify-center text-brand-orange mb-6 shadow-inner group-hover:scale-110 transition-transform">
                  <Calendar size={28} />
               </div>
               <h3 className="text-lg font-black uppercase leading-tight text-zinc-900 dark:text-white">{events[0]?.title || "Agenda"}</h3>
            </div>

            <div onClick={() => setActiveTab(NavigationTab.NEWS)} className="md:col-span-1 bg-gradient-to-br from-brand-orange to-red-600 text-white rounded-[3rem] p-8 flex flex-col justify-between group cursor-pointer shadow-xl hover:shadow-orange-500/20 transition-all relative overflow-hidden duration-500 hover:-translate-y-2">
               <div className="absolute -bottom-6 -right-6 text-white/10 transform rotate-[-15deg] group-hover:scale-110 transition-transform">
                  <FileText size={100} />
               </div>
               <div className="relative z-10 mt-8">
                  <h3 className="text-xl font-black uppercase leading-[1.1] mb-2 line-clamp-3 tracking-tighter">{news[0]?.title || "Notícias"}</h3>
               </div>
            </div>
        </div>
      </div>
    ),
    'prayer_request': <PrayerSection onNavigate={setActiveTab} />,
    'kids': (
      <div onClick={() => setShowKidsModal(true)} className="cursor-pointer">
        <KidsSection imageUrl={homeConfig.kidsImage} />
      </div>
    ),
    'testimonies': <TestimoniesSection />,
    'volunteer_parallax': <ParallaxVolunteerSection onNavigate={setActiveTab} />,
    'mps': <MPSSection data={welcomeData} />,
    'cellvision': <CellVisionSection />,
    'social': <SocialActionSection config={homeConfig} />,
    'expansion': <ExpansionSection onOpenDonation={() => setShowDonationModal(true)} config={homeConfig} />,
    'faq': <FAQSection />,
    'cells': <CellsSection cells={cells} cellSystemUrl={cellSystemUrl} showSearch={homeConfig.enableCellSearch} />,
    'instagram': <InstagramSection config={homeConfig} />
  };

  const activeOrder = homeConfig.sectionOrder || INITIAL_HOME_CONFIG.sectionOrder || [];

  if (activeTab === NavigationTab.ADMIN) {
    return <AdminScreen 
        notices={notices} news={news} sermons={sermons} welcomeData={welcomeData} 
        setWelcomeData={setWelcomeData} homeConfig={homeConfig} setHomeConfig={setHomeConfig} 
        cells={cells} events={events} discipleshipTracks={discipleshipTracks}
        ministries={ministries}
        onLogout={() => setActiveTab(NavigationTab.HOME)} 
    />;
  }

  return (
    <Layout 
      activeTab={activeTab} 
      onNavigate={setActiveTab} 
      onDonate={() => setShowDonationModal(true)}
      onCheckinKids={() => setShowKidsModal(true)}
    >
      {activeTab === NavigationTab.HOME && (
        <div className="bg-zinc-50 dark:bg-black transition-colors duration-500 pb-20">
           <UrgentNoticePopup notices={notices} />
           {activeOrder.map(key => (
              <React.Fragment key={key}>
                {homeComponents[key]}
              </React.Fragment>
           ))}
        </div>
      )}
      {activeTab === NavigationTab.NEWS && <NewsView news={news} />}
      {activeTab === NavigationTab.SERMONS && <SermonsView sermons={sermons} />}
      {activeTab === NavigationTab.MINISTRIES && <MinistriesView ministries={ministries} />}
      {activeTab === NavigationTab.EVENTS && <EventsView events={events} />}
      {activeTab === NavigationTab.DISCIPLESHIP && <DiscipleshipView tracks={discipleshipTracks} />}
      {activeTab === NavigationTab.PRAYER && <PrayerView />}
      {activeTab === NavigationTab.BAPTISM && <BaptismView />}
      {activeTab === NavigationTab.ABOUT && <AboutView data={aboutData} tenYearsData={tenYearsData} />}
      {activeTab === NavigationTab.GENERATOR && <PhotoGeneratorView frames={photoFrames} />}
      {activeTab === NavigationTab.COMMUNITY && <CommunityView />}
      
      {activeTab === NavigationTab.DASHBOARD && (
          <div className="pt-32 px-8 max-w-4xl mx-auto min-h-screen">
              <div className="flex items-center gap-6 mb-12 animate-slide-up">
                  <div className="w-24 h-24 bg-brand-orange text-white rounded-3xl flex items-center justify-center text-4xl font-black shadow-2xl rotate-3">A</div>
                  <div>
                      <h2 className="text-5xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase leading-none">Meu Atitude</h2>
                      <p className="text-zinc-500 font-bold uppercase tracking-[0.4em] text-[10px] mt-2">Central do Membro • Duque de Caxias</p>
                  </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
                  <div className="bg-white dark:bg-zinc-900 p-10 rounded-[3.5rem] shadow-xl border border-zinc-100 dark:border-white/5 group hover:border-brand-orange transition-all duration-500">
                      <div className="flex justify-between items-center mb-8">
                          <h3 className="font-black uppercase tracking-widest text-zinc-900 dark:text-white">Academia Atitude</h3>
                          <div className="w-12 h-12 bg-brand-orange/10 text-brand-orange rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"><GraduationCap size={24} /></div>
                      </div>
                      <p className="text-zinc-500 font-medium mb-10 leading-relaxed">Você ainda não iniciou trilhas de conhecimento. Que tal começar um curso hoje?</p>
                      <button onClick={() => setActiveTab(NavigationTab.DISCIPLESHIP)} className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] hover:bg-brand-orange hover:text-white transition-all shadow-lg">Explorar Trilhas</button>
                  </div>
                  <div className="bg-white dark:bg-zinc-900 p-10 rounded-[3.5rem] shadow-xl border border-zinc-100 dark:border-white/5 group hover:border-brand-orange transition-all duration-500">
                      <div className="flex justify-between items-center mb-8">
                          <h3 className="font-black uppercase tracking-widest text-zinc-900 dark:text-white">Anotações</h3>
                          <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"><FileText size={24} /></div>
                      </div>
                      <p className="text-zinc-500 font-medium mb-10 leading-relaxed">Suas notas de pregação e estudos salvos aparecerão aqui para revisão futura.</p>
                      <button onClick={() => setActiveTab(NavigationTab.SERMONS)} className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] hover:bg-blue-600 hover:text-white transition-all shadow-lg">Ver Mensagens</button>
                  </div>
              </div>
          </div>
      )}

      {/* PASTORAL BOT (IA ASSISTANT) */}
      <div className="fixed bottom-8 left-8 z-[100] flex flex-col items-start gap-4">
          <button 
             onClick={() => setIsBotOpen(!isBotOpen)}
             className={`w-16 h-16 rounded-[2rem] flex items-center justify-center shadow-2xl transition-all duration-500 transform hover:scale-110 active:scale-95 group ${isBotOpen ? 'bg-zinc-900 text-white rotate-90' : 'bg-white text-brand-orange border border-zinc-200'}`}
             title="Aconselhamento IA"
          >
             {isBotOpen ? <X size={28} /> : <Bot size={28} className="group-hover:animate-bounce" />}
          </button>
          
          {isBotOpen && (
              <div className="w-[350px] md:w-[400px] bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.3)] border border-white dark:border-white/5 flex flex-col overflow-hidden animate-slide-up origin-bottom-left">
                  <div className="bg-brand-orange p-6 text-white flex items-center justify-between">
                      <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md"><Sparkles size={20}/></div>
                          <div>
                              <h4 className="font-black uppercase text-xs tracking-widest leading-none">PastoralBot IA</h4>
                              <p className="text-[9px] font-bold uppercase tracking-widest opacity-70">Aconselhamento Digital</p>
                          </div>
                      </div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_#4ade80]"></div>
                  </div>
                  
                  <div className="flex-grow p-6 overflow-y-auto max-h-[350px] space-y-6 custom-scrollbar bg-zinc-50 dark:bg-black/20">
                      {!botResponse && !isBotThinking && (
                          <div className="text-center py-8 space-y-4">
                              <Bot size={40} className="mx-auto text-zinc-300" />
                              <p className="text-sm font-medium text-zinc-500 leading-relaxed px-6">Paz do Senhor! No que posso te orientar à luz da Palavra hoje?</p>
                          </div>
                      )}
                      
                      {isBotThinking && (
                          <div className="flex flex-col items-center justify-center py-10 space-y-4">
                              <Activity className="animate-spin text-brand-orange" size={24}/>
                              <p className="text-[9px] font-black uppercase text-zinc-400 tracking-widest">Consultando as Escrituras...</p>
                          </div>
                      )}

                      {botResponse && (
                          <div className="bg-white dark:bg-zinc-800 p-6 rounded-3xl shadow-sm prose prose-sm dark:prose-invert border border-zinc-100 dark:border-white/5 animate-fade-in font-medium text-zinc-600 dark:text-zinc-300">
                             <ReactMarkdown>{botResponse}</ReactMarkdown>
                          </div>
                      )}
                  </div>

                  <div className="p-4 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-white/5 flex items-center gap-2">
                      <input 
                         className="flex-grow bg-zinc-50 dark:bg-black p-4 rounded-2xl outline-none focus:border-brand-orange border border-transparent transition-all text-sm font-bold"
                         placeholder="Escreva como você se sente..."
                         value={botMessage}
                         onChange={e => setBotMessage(e.target.value)}
                         onKeyDown={e => e.key === 'Enter' && handleBotChat()}
                      />
                      <button onClick={handleBotChat} className="p-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl hover:bg-brand-orange hover:text-white transition-all">
                          <Send size={20}/>
                      </button>
                  </div>
              </div>
          )}
      </div>

      <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4">
        {activeTab !== NavigationTab.HOME && (
          <button 
            onClick={() => setActiveTab(NavigationTab.HOME)}
            className="w-14 h-14 rounded-full bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-2xl flex items-center justify-center transition-all duration-500 transform hover:scale-110 active:scale-95 group border border-zinc-200 dark:border-white/10"
            title="Voltar para o Início"
          >
            <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </button>
        )}
        
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`w-14 h-14 rounded-full bg-brand-orange text-white shadow-2xl flex items-center justify-center transition-all duration-500 transform hover:scale-110 active:scale-95 ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'}`}
          title="Subir"
        >
          <ArrowUp size={24} />
        </button>
      </div>

      <StepModal isOpen={activeStepModal === 'VISITOR'} onClose={() => setActiveStepModal(null)} title="Boas-vindas IBA-DC" icon={User} colorClass="bg-blue-600">
         <form onSubmit={(e) => { e.preventDefault(); alert("Recebemos seus dados! Seja bem-vindo à família."); setActiveStepModal(null); }} className="space-y-6">
            <input required className="w-full p-4 rounded-2xl bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-white/10 outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nome Completo" />
            <input required className="w-full p-4 rounded-2xl bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-white/10 outline-none focus:ring-2 focus:ring-blue-500" placeholder="WhatsApp" />
            <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg hover:bg-blue-700 transition-all">Enviar Cartão</button>
         </form>
      </StepModal>

      <StepModal isOpen={activeStepModal === 'DECISION'} onClose={() => setActiveStepModal(null)} title="Nova Vida em Cristo" icon={Heart} colorClass="bg-red-600">
         <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-red-100 rounded-3xl flex items-center justify-center mx-auto text-red-600 shadow-inner"><Star size={40} fill="currentColor"/></div>
            <p className="text-zinc-500 leading-relaxed font-medium">Hoje o céu está em festa por sua decisão! Queremos caminhar ao seu lado nesta jornada de fé.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Amém! Um de nossos pastores entrará em contato em breve."); setActiveStepModal(null); }} className="space-y-4">
                <input required className="w-full p-4 rounded-2xl bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-white/10 outline-none focus:ring-2 focus:ring-red-500" placeholder="Nome" />
                <input required className="w-full p-4 rounded-2xl bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-white/10 outline-none focus:ring-2 focus:ring-red-500" placeholder="WhatsApp" />
                <button type="submit" className="w-full bg-red-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg hover:bg-red-700 transition-all">Quero ser Discipulado</button>
            </form>
         </div>
      </StepModal>

      <DonationModal isOpen={showDonationModal} onClose={() => setShowDonationModal(false)} config={homeConfig} />
      <KidsCheckinModal isOpen={showKidsModal} onClose={() => setShowKidsModal(false)} />
    </Layout>
  );
}
export default App;
