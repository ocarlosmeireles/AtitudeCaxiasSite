
import React, { useState, useEffect, useRef } from 'react';
import { HashRouter } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Layout } from './components/Layout';
import { NavigationTab, DevotionalResponse, Ministry, Event, NewsItem, Sermon, Notice, AdminView, DiscipleshipTrack, Cell, WelcomeSectionData, StepContent, TenYearsData, HomeConfig, PrayerRequest, AboutPageData, PhotoFrame } from './types';
import { generateDailyDevotional, improveAdminText } from './services/gemini';
import { subscribeToData, saveData, deleteData, uploadImage } from './services/firebase';
import { 
  ArrowRight, Sparkles, MapPin, Clock, Calendar, Send, ChevronRight, ChevronLeft, ChevronDown, ChevronUp,
  MessageCircle, HeartHandshake, Users, PlayCircle, FileText, Lock, Plus, Trash2, CheckCircle, Wand2, Home, ShieldCheck, BookOpen, GraduationCap, ArrowUpRight, Heart, Quote, CreditCard, Smartphone, Map, Search, Edit2, Save, X, LogOut, Video, Globe, Mic2, Smile, LayoutDashboard, Image as ImageIcon, List, User, Phone, Copy, Check, Hammer, TrendingUp, Gift, Footprints, Droplets, ExternalLink, Paperclip, Monitor, Star, Music, Target, Layers, Lightbulb, UserPlus, Award, Info, Play, DollarSign, Camera, SmilePlus, UploadCloud, Crown, LayoutTemplate, Ticket, Image, CalendarCheck
} from 'lucide-react';

// --- UTILS ---
const getYoutubeId = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|live\/|shorts\/|e\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const getThumbnailUrl = (url: string) => {
  const id = getYoutubeId(url);
  if (id) return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  return url;
};

// --- DADOS INICIAIS (FALLBACK) ---

const INITIAL_HOME_CONFIG: HomeConfig = {
  heroTitle: "VIVENDO O EXTRAORDINÁRIO",
  heroSubtitle: "O LUGAR DOS NOVOS COMEÇOS",
  heroImage1: "https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=2070&auto=format&fit=crop",
  heroImage2: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=2070",
  heroImage3: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070",
  kidsImage: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=2038",
  socialTitle: "FÉ QUE SE MOSTRA EM OBRAS.",
  socialDescription: "Não somos apenas uma igreja dentro de quatro paredes. Atuamos na comunidade levando cestas básicas, apoio psicológico e o amor de Jesus para quem mais precisa.",
  socialImage1: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070",
  socialImage2: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2070",
  familySystemUrl: "https://www.google.com",
  businessSystemUrl: "https://www.google.com",
  enableCellSearch: false, // Default hidden
  sectionOrder: [
    'hero', 'ticker', 'tenyears', 'pastoral', 'servicetimes', 'values', 'growthpath', 
    'highlights', 'kids', 'testimonies', 'volunteer_parallax', 'mps', 'cellvision', 'social', 'expansion', 
    'faq', 'cells'
  ]
};

const INITIAL_WELCOME_DATA: WelcomeSectionData = {
  titleLine1: 'UMA FAMÍLIA',
  titleLine2: 'PARA PERTENCER.',
  text: 'Somos uma igreja apaixonada por Jesus e pelas pessoas. Acreditamos que Deus tem um propósito extraordinário para a sua vida, aqui em Duque de Caxias.',
  imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2149&auto=format&fit=crop',
  imageUrl2: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2069&auto=format&fit=crop',
  pastorName: 'Pr. Joubert Curti',
  pastorName2: 'Pra. Susana Curti',
  pastorRole: 'Pastores Presidentes',
  mpsTitle: 'VISÃO MPS',
  mpsDescription: 'O Modelo de Pastoreio Simplificado é a estratégia que Deus nos deu para cuidar de cada vida.',
  spotifyPlaylistId: '0s4nRYuSoAboY2LugNY6TI' 
};

const INITIAL_TEN_YEARS: TenYearsData = {
  enabled: true,
  title: "UMA DÉCADA DE",
  subtitle: "MILAGRES E AVANÇO",
  description: "Em 10 anos, vimos o deserto florescer. De um pequeno grupo em uma sala, para uma multidão de adoradores transformados pelo poder do Evangelho em Duque de Caxias.",
  imageUrl: "https://images.unsplash.com/photo-1511553677255-b93b269a8bf0?q=80&w=2070",
  stats_lives: "5.000+",
  stats_baptisms: "1.200+"
};

const INITIAL_ABOUT_DATA: AboutPageData = {
  heroImage: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073',
  history: '# Nossa História\n\nComeçamos em uma pequena sala com apenas 12 pessoas sonhando os sonhos de Deus. Ao longo de 10 anos, vimos o sobrenatural acontecer. Hoje, somos milhares de vidas transformadas pelo poder do Evangelho.',
  vision: 'Ser uma igreja relevante, que ama a Deus acima de tudo e ao próximo como a si mesmo, influenciando a sociedade com os princípios do Reino.',
  mission: 'Ganhar, Cuidar, Treinar e Enviar líderes para cumprir o Ide de Jesus.',
  values: '- Amor Intenso\n- Palavra Viva\n- Adoração Real\n- Serviço\n- Excelência'
};

// --- IMPORTS ---
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

import { HeroSection } from './components/sections/HeroSection';
import { PastoralSection } from './components/sections/PastoralSection';
import { CellsSection } from './components/sections/CellsSection';
import { 
  TickerSection, TenYearsSection, ServiceTimesSection, ValuesSection, 
  GrowthPath, KidsSection, TestimoniesSection, ParallaxSection, 
  MPSSection, SocialActionSection, ExpansionSection, FAQSection, 
  FamilyBusinessSection, AppDownloadSection, WorshipSection, SeriesSection, VolunteerSection, ParallaxVolunteerSection, NotebookLMPodcastSection, CellVisionSection, UrgentNoticePopup
} from './components/sections/HomeComponents';

import { StepModal, DonationModal } from './components/modals/GeneralModals';

// --- MAIN APP ---

const App = () => {
  const [activeTab, setActiveTab] = useState<NavigationTab>(NavigationTab.HOME);
  
  // Data States
  const [news, setNews] = useState<NewsItem[]>([]);
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [cells, setCells] = useState<Cell[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [welcomeData, setWelcomeData] = useState<WelcomeSectionData>(INITIAL_WELCOME_DATA);
  const [tenYearsData, setTenYearsData] = useState<TenYearsData>(INITIAL_TEN_YEARS);
  const [homeConfig, setHomeConfig] = useState<HomeConfig>(INITIAL_HOME_CONFIG);
  const [discipleshipTracks, setDiscipleshipTracks] = useState<DiscipleshipTrack[]>([]);
  const [cellSystemUrl, setCellSystemUrl] = useState<string>('');
  const [aboutData, setAboutData] = useState<AboutPageData>(INITIAL_ABOUT_DATA);
  const [photoFrames, setPhotoFrames] = useState<PhotoFrame[]>([]);
  
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [activeStepModal, setActiveStepModal] = useState<'VISITOR' | 'DECISION' | 'BAPTISM' | null>(null);

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  // --- FIREBASE SUBSCRIPTIONS ---
  useEffect(() => {
    const unsubWelcome = subscribeToData('settings', (data) => {
        const welcome = data.find(d => d.id === 'welcomeData');
        if (welcome) setWelcomeData(welcome as WelcomeSectionData);

        const tenYears = data.find(d => d.id === 'tenYearsData');
        if (tenYears) setTenYearsData(tenYears as TenYearsData);

        const hConfig = data.find(d => d.id === 'homeConfig');
        if (hConfig) {
           const defaultConfig = { ...INITIAL_HOME_CONFIG, ...hConfig };
           
           // Ensure sections order
           const savedOrder = defaultConfig.sectionOrder || [];
           const defaultOrder = INITIAL_HOME_CONFIG.sectionOrder || [];
           const missingSections = defaultOrder.filter(s => !savedOrder.includes(s));
           
           if (missingSections.length > 0) {
               defaultConfig.sectionOrder = [...savedOrder, ...missingSections];
           }

           setHomeConfig(defaultConfig);
        }

        const config = data.find(d => d.id === 'config');
        if (config?.cellSystemUrl) setCellSystemUrl(config.cellSystemUrl);

        const about = data.find(d => d.id === 'aboutData');
        if (about) setAboutData(about as AboutPageData);
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

  const handleLogout = () => setActiveTab(NavigationTab.HOME);

  // Component Map for Dynamic Home
  const homeComponents: Record<string, React.ReactNode> = {
    'hero': <HeroSection onNavigate={setActiveTab} config={homeConfig} />,
    'ticker': <TickerSection notices={notices} />,
    'tenyears': <TenYearsSection data={tenYearsData} />,
    'pastoral': <PastoralSection data={welcomeData} />,
    'servicetimes': <ServiceTimesSection />,
    'values': <ValuesSection />,
    'growthpath': <GrowthPath onNavigate={setActiveTab} onOpenVisitor={() => setActiveStepModal('VISITOR')} onOpenDecision={() => setActiveStepModal('DECISION')} />,
    'highlights': (
      <div className="max-w-7xl mx-auto px-4 my-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
                <span className="text-brand-orange font-bold uppercase tracking-widest text-xs mb-2 block">O que está acontecendo</span>
                <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tighter">DESTAQUES<span className="text-brand-orange">.</span></h2>
            </div>
            <button onClick={() => setActiveTab(NavigationTab.NEWS)} className="text-zinc-500 hover:text-brand-orange dark:text-zinc-400 dark:hover:text-white text-sm font-bold uppercase tracking-widest flex items-center gap-2 transition-colors group">
                Ver Todas as Novidades <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
            
            {/* 1. SERMON CARD (BIG LEFT) */}
            <div onClick={() => setActiveTab(NavigationTab.SERMONS)} className="md:col-span-2 md:row-span-2 relative group rounded-[2.5rem] overflow-hidden cursor-pointer h-[400px] md:h-auto border border-zinc-200 dark:border-white/10 shadow-2xl transition-all duration-500 hover:shadow-brand-orange/20">
              <img src={getThumbnailUrl(sermons[0]?.youtubeUrl)} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 transition-opacity"></div>
              <div className="absolute inset-0 bg-brand-orange/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="absolute top-6 left-6">
                 <div className="bg-red-600 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full flex items-center gap-2 shadow-lg animate-pulse">
                    <span className="w-2 h-2 bg-white rounded-full"></span> Última Mensagem
                 </div>
              </div>

              <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-zinc-300 text-xs font-bold uppercase tracking-widest mb-2 block">{sermons[0]?.date || 'Domingo Passado'}</span>
                  <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-none mb-4 drop-shadow-lg">{sermons[0]?.title}</h3>
                  <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                     <span className="flex items-center gap-2 text-white font-bold uppercase text-xs tracking-widest bg-white/20 backdrop-blur-md px-6 py-3 rounded-xl hover:bg-brand-orange hover:text-white transition-colors">
                        <PlayCircle size={16} /> Assistir Agora
                     </span>
                  </div>
              </div>
            </div>

            {/* 2. DISCIPLESHIP (TOP RIGHT) */}
            <div onClick={() => setActiveTab(NavigationTab.DISCIPLESHIP)} className="md:col-span-2 bg-zinc-900 dark:bg-zinc-900 rounded-[2.5rem] p-8 flex flex-col justify-between group cursor-pointer relative overflow-hidden border border-zinc-200 dark:border-white/10 shadow-xl">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
              <div className="absolute right-0 top-0 w-32 h-32 bg-brand-orange/20 blur-[60px] rounded-full group-hover:bg-brand-orange/40 transition-colors"></div>
              
              <div className="relative z-10 flex justify-between items-start">
                 <div className="p-3 bg-white/10 rounded-2xl text-brand-orange backdrop-blur-md border border-white/10 group-hover:scale-110 transition-transform duration-500">
                    <GraduationCap size={28} />
                 </div>
                 <ArrowUpRight size={24} className="text-zinc-600 group-hover:text-white transition-colors"/>
              </div>
              
              <div className="relative z-10 mt-8">
                 <h3 className="text-2xl font-black text-white uppercase mb-1">Academia Atitude</h3>
                 <p className="text-zinc-400 text-sm font-medium mb-4 group-hover:text-zinc-300 transition-colors">Cursos gratuitos para seu crescimento.</p>
                 <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-brand-orange h-full w-1/3 group-hover:w-2/3 transition-all duration-1000 ease-out"></div>
                 </div>
                 <p className="text-right text-[10px] text-brand-orange font-bold uppercase mt-2">Comece Agora</p>
              </div>
            </div>

            {/* 3. NEXT EVENT (BOTTOM RIGHT 1) */}
            <div onClick={() => setActiveTab(NavigationTab.EVENTS)} className="md:col-span-1 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-[2.5rem] p-6 flex flex-col justify-center items-center text-center group cursor-pointer border border-zinc-200 dark:border-white/10 shadow-xl hover:-translate-y-1 transition-transform relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-zinc-200 dark:from-white/5 dark:to-transparent opacity-50"></div>
               <Calendar size={32} className="text-brand-orange mb-4 relative z-10 group-hover:scale-110 transition-transform" />
               <div className="relative z-10">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">Próximo Evento</p>
                  <h3 className="text-xl font-black uppercase leading-tight mb-2">{events[0]?.title || "Agenda"}</h3>
                  <span className="inline-block bg-zinc-900 dark:bg-white text-white dark:text-black text-[10px] font-bold px-3 py-1 rounded-lg uppercase">
                     {events[0]?.date || "Em breve"}
                  </span>
               </div>
            </div>

            {/* 4. NEWS/FEATURE (BOTTOM RIGHT 2) */}
            <div onClick={() => setActiveTab(NavigationTab.NEWS)} className="md:col-span-1 bg-gradient-to-br from-brand-orange to-red-600 text-white rounded-[2.5rem] p-6 flex flex-col justify-between group cursor-pointer shadow-xl hover:shadow-orange-500/30 transition-all relative overflow-hidden">
               <div className="absolute -bottom-4 -right-4 text-white/10 group-hover:text-white/20 transition-colors transform rotate-[-15deg]">
                  <FileText size={80} />
               </div>
               <div className="relative z-10">
                  <span className="bg-white/20 backdrop-blur border border-white/20 px-3 py-1 rounded-lg text-[10px] font-bold uppercase">News</span>
               </div>
               <div className="relative z-10 mt-4">
                  <h3 className="text-lg font-black uppercase leading-tight mb-1 line-clamp-2">{news[0]?.title || "Fique por dentro"}</h3>
                  <p className="text-xs text-white/80 line-clamp-2">Novidades e avisos importantes.</p>
               </div>
            </div>

        </div>
      </div>
    ),
    'kids': <KidsSection imageUrl={homeConfig.kidsImage} />,
    'testimonies': <TestimoniesSection />,
    'volunteer_parallax': <ParallaxVolunteerSection onNavigate={setActiveTab} />,
    'mps': <MPSSection data={welcomeData} />,
    'cellvision': <CellVisionSection />,
    'social': <SocialActionSection config={homeConfig} />,
    'expansion': <ExpansionSection onOpenDonation={() => setShowDonationModal(true)} config={homeConfig} />,
    'faq': <FAQSection />,
    'cells': <CellsSection cells={cells} cellSystemUrl={cellSystemUrl} showSearch={homeConfig.enableCellSearch} />,
  };

  // Determine order (use default if config is missing)
  const activeOrder = homeConfig.sectionOrder && homeConfig.sectionOrder.length > 0 
    ? homeConfig.sectionOrder 
    : INITIAL_HOME_CONFIG.sectionOrder || [];

  if (activeTab === NavigationTab.ADMIN) {
    return (
      <AdminScreen 
        notices={notices} setNotices={setNotices} news={news} setNews={setNews} sermons={sermons} setSermons={setSermons}
        welcomeData={welcomeData} setWelcomeData={setWelcomeData} 
        tenYearsData={tenYearsData} setTenYearsData={setTenYearsData}
        homeConfig={homeConfig} setHomeConfig={setHomeConfig}
        ministries={ministries} setMinistries={setMinistries}
        cells={cells} setCells={setCells} events={events} setEvents={setEvents} discipleshipTracks={discipleshipTracks} setDiscipleshipTracks={setDiscipleshipTracks}
        cellSystemUrl={cellSystemUrl} setCellSystemUrl={setCellSystemUrl} 
        aboutData={aboutData} setAboutData={setAboutData}
        photoFrames={photoFrames} setPhotoFrames={setPhotoFrames}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <Layout activeTab={activeTab} onNavigate={setActiveTab} onDonate={() => setShowDonationModal(true)}>
      {activeTab === NavigationTab.HOME && (
        <div className="bg-zinc-50 dark:bg-black transition-colors duration-500">
           <UrgentNoticePopup notices={notices} />
           
           {/* Render Dynamic Sections */}
           {activeOrder.map(sectionKey => {
             const component = homeComponents[sectionKey];
             return component && React.isValidElement(component) 
               ? React.cloneElement(component as React.ReactElement<any>, { key: sectionKey }) 
               : null;
           })}
           
           <StepModal isOpen={activeStepModal === 'VISITOR'} onClose={() => setActiveStepModal(null)} title="Cartão de Visita Digital" icon={User} colorClass="bg-blue-600">
             <form onSubmit={(e) => { e.preventDefault(); alert("Enviado!"); setActiveStepModal(null); }} className="space-y-4">
               <div><label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Nome Completo</label><input required className="w-full bg-zinc-100 dark:bg-black border border-zinc-200 dark:border-white/10 p-3 rounded-xl text-zinc-900 dark:text-white focus:border-brand-orange outline-none" placeholder="Seu nome" /></div>
               <div><label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">WhatsApp</label><input required className="w-full bg-zinc-100 dark:bg-black border border-zinc-200 dark:border-white/10 p-3 rounded-xl text-zinc-900 dark:text-white focus:border-brand-orange outline-none" placeholder="(21) 99999-9999" /></div>
               <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-blue-700 transition-colors shadow-lg">Enviar</button>
             </form>
           </StepModal>
           <StepModal isOpen={activeStepModal === 'DECISION'} onClose={() => setActiveStepModal(null)} title="Decisão" icon={Heart} colorClass="bg-green-600">
             <div className="text-center">
               <p className="text-zinc-500 mb-6">Que alegria! Preencha seus dados para iniciarmos o seu discipulado.</p>
               <form onSubmit={(e) => { e.preventDefault(); alert("Enviado! Entraremos em contato."); setActiveStepModal(null); }} className="space-y-4 text-left">
                  <input required className="w-full bg-zinc-100 dark:bg-black border border-zinc-200 dark:border-white/10 p-3 rounded-xl outline-none" placeholder="Nome Completo" />
                  <input required className="w-full bg-zinc-100 dark:bg-black border border-zinc-200 dark:border-white/10 p-3 rounded-xl outline-none" placeholder="WhatsApp" />
                  <button className="w-full bg-green-600 text-white py-3 rounded-xl font-bold uppercase hover:bg-green-700 transition-colors">Quero ser Discipulado</button>
               </form>
             </div>
           </StepModal>
           <DonationModal isOpen={showDonationModal} onClose={() => setShowDonationModal(false)} config={homeConfig} />
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
    </Layout>
  );
}
export default App;
