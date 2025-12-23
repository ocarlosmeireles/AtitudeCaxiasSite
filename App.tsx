
import React, { useState, useEffect, useRef } from 'react';
import { NavigationTab, Sermon, Notice, Ministry, Event, NewsItem, DiscipleshipTrack, Cell, WelcomeSectionData, TenYearsData, HomeConfig, PhotoFrame, AboutPageData } from './types';
import { subscribeToData, saveData } from './services/firebase';
import { Layout } from './components/Layout';
import { 
  ArrowUp, PlayCircle, Calendar, FileText, GraduationCap, ArrowUpRight, 
  User, Heart, Send, CheckCircle, ChevronLeft
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
import { StepModal, DonationModal } from './components/modals/GeneralModals';

const INITIAL_HOME_CONFIG: HomeConfig = {
  heroTitle: "VIVENDO O EXTRAORDINÁRIO",
  heroSubtitle: "O LUGAR DOS NOVOS COMEÇOS",
  heroImage1: "https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=2070",
  heroImage2: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=2070",
  heroImage3: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070",
  socialTitle: "FÉ QUE SE MOSTRA EM OBRAS.",
  socialDescription: "Atuamos na comunidade levando o amor de Jesus para quem mais precisa.",
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

  const homeComponents: Record<string, React.ReactNode> = {
    'hero': <HeroSection onNavigate={setActiveTab} config={homeConfig} />,
    'ticker': <TickerSection notices={notices} />,
    'tenyears': <TenYearsSection data={tenYearsData} />,
    'pastoral': <PastoralSection data={welcomeData} />,
    'servicetimes': <ServiceTimesSection />,
    'values': <ValuesSection />,
    'growthpath': <GrowthPath onNavigate={setActiveTab} onOpenVisitor={() => setActiveStepModal('VISITOR')} onOpenDecision={() => setActiveStepModal('DECISION')} />,
    'highlights': (
      <div className="max-w-7xl mx-auto px-4 my-24 animate-fade-in">
        <div className="flex justify-between items-end mb-12">
            <h2 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tighter">DESTAQUES<span className="text-brand-orange">.</span></h2>
            <button onClick={() => setActiveTab(NavigationTab.NEWS)} className="text-zinc-500 hover:text-brand-orange text-xs font-black uppercase tracking-widest transition-colors">Ver Tudo</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-auto md:h-[500px]">
            <div onClick={() => setActiveTab(NavigationTab.SERMONS)} className="md:col-span-2 relative group rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl">
              <img src={sermons[0] ? `https://img.youtube.com/vi/${sermons[0].youtubeUrl.split('v=')[1]?.split('&')[0]}/maxresdefault.jpg` : ""} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="text-2xl font-black text-white uppercase mb-2">{sermons[0]?.title}</h3>
                  <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-4 py-2 rounded-full flex items-center gap-2 w-fit">Assistir Agora <PlayCircle size={14}/></span>
              </div>
            </div>
            <div onClick={() => setActiveTab(NavigationTab.DISCIPLESHIP)} className="md:col-span-2 bg-zinc-900 rounded-[2.5rem] p-8 flex flex-col justify-between group cursor-pointer relative overflow-hidden border border-white/5 shadow-xl">
              <div className="absolute right-0 top-0 w-32 h-32 bg-brand-orange/20 blur-[60px] rounded-full"></div>
              <GraduationCap size={40} className="text-brand-orange" />
              <div>
                 <h3 className="text-2xl font-black text-white uppercase mb-2">Academia Atitude</h3>
                 <p className="text-zinc-400 text-sm mb-4">Cursos gratuitos para seu crescimento.</p>
                 <button className="flex items-center gap-2 text-brand-orange font-bold uppercase text-[10px] tracking-widest">Acessar Cursos <ArrowUpRight size={14}/></button>
              </div>
            </div>
        </div>
      </div>
    ),
    'prayer_request': <PrayerSection onNavigate={setActiveTab} />,
    'kids': <KidsSection imageUrl={homeConfig.kidsImage} />,
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
    return <AdminScreen news={news} sermons={sermons} welcomeData={welcomeData} setWelcomeData={setWelcomeData} homeConfig={homeConfig} setHomeConfig={setHomeConfig} cells={cells} onLogout={() => setActiveTab(NavigationTab.HOME)} />;
  }

  return (
    <Layout activeTab={activeTab} onNavigate={setActiveTab} onDonate={() => setShowDonationModal(true)}>
      {activeTab === NavigationTab.HOME && (
        <div className="bg-zinc-50 dark:bg-black transition-colors duration-500 pb-20">
           <UrgentNoticePopup notices={notices} />
           {activeOrder.map(key => homeComponents[key])}
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

      {/* Persistent Back & Top Buttons */}
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

      <DonationModal isOpen={showDonationModal} onClose={() => setShowDonationModal(false)} config={homeConfig} />
      <StepModal isOpen={activeStepModal === 'VISITOR'} onClose={() => setActiveStepModal(null)} title="Boas Vindas" icon={User} colorClass="bg-blue-600">
         <div className="text-center p-4">Estamos felizes em ter você conosco!</div>
      </StepModal>
    </Layout>
  );
}
export default App;
