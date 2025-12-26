
export interface Ministry {
  id: string;
  name: string;
  description: string;
  image: string;
  leader?: string;
  category?: string;
  fullDescription?: string;
  requirements?: string;
  meetingTime?: string;
  whatsappContact?: string;
}

export interface Cell {
  id: string;
  network: 'Amarela' | 'Azul' | 'Laranja' | 'Verde';
  leader: string;
  host?: string;
  address: string;
  district: string;
  day: string;
  time: string;
  phoneNumber?: string;
  mapLink?: string;
}

export interface WelcomeSectionData {
  titleLine1: string;
  titleLine2: string;
  text: string;
  imageUrl: string;
  imageUrl2?: string;
  pastorName: string;
  pastorName2?: string;
  pastorRole: string;
  pastorRole2?: string;
  mpsTitle: string;
  mpsDescription: string;
  spotifyPlaylistId: string;
  notebookLMAudioUrl?: string;
}

export interface Sermon {
  id: string;
  title: string;
  preacher: string;
  date: string;
  youtubeUrl: string;
  series?: string;
  description: string;
  moods?: string[];
  duration?: string;
  views?: number;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  author: string;
  category: 'Igreja' | 'Mundo' | 'Social' | 'Artigo' | 'Kids' | 'Ensino';
}

export interface StepContent {
  title: string;
  content: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: 'Geral' | 'Jovens' | 'Kids' | 'Mulheres' | 'Homens';
  image?: string;
  description?: string;
  price: number;
  pixKey?: string;
}

export interface ProjectAvanca {
  id: string;
  title: string;
  description: string;
  image: string;
  progress: number;
  targetAmount?: string;
  pixKey?: string;
}

export interface GratitudePost {
  id: string;
  userName: string;
  text: string;
  createdAt: number;
  category: string;
  reactions?: {
    amem: number;
    gloria: number;
    love: number;
  };
}

export interface SermonNote {
  id: string;
  sermonId: string;
  text: string;
  updatedAt: number;
}

export enum NavigationTab {
  HOME = 'HOME',
  NEWS = 'NEWS',
  SERMONS = 'SERMONS',
  MINISTRIES = 'MINISTRIES',
  DISCIPLESHIP = 'DISCIPLESHIP',
  EVENTS = 'EVENTS',
  PRAYER = 'PRAYER',
  ADMIN = 'ADMIN',
  BAPTISM = 'BAPTISM',
  ABOUT = 'ABOUT',
  GENERATOR = 'GENERATOR',
  COMMUNITY = 'COMMUNITY',
  DASHBOARD = 'DASHBOARD'
}

export type AdminView = 'DASHBOARD' | 'NEWS' | 'SERMONS' | 'NOTICES' | 'MINISTRIES' | 'CELLS' | 'WELCOME' | 'EVENTS' | 'TENYEARS' | 'DISCIPLESHIP' | 'PRAYER_ADMIN' | 'BAPTISM_ADMIN' | 'AVANCA_ADMIN' | 'ABOUT_EDIT' | 'FRAMES_ADMIN' | 'CABINET';

export interface HomeConfig {
  heroTitle: string;
  heroSubtitle: string;
  heroImage1?: string;
  heroImage2?: string;
  heroImage3?: string;
  socialTitle: string;
  socialDescription: string;
  socialImage1: string;
  socialImage2: string;
  kidsImage?: string;
  pixKey?: string;
  qrCodeUrl?: string;
  familySystemUrl?: string; 
  businessSystemUrl?: string;
  sectionOrder?: string[];
  enableCellSearch?: boolean; 
  avancaProjects?: ProjectAvanca[];
  instagramProfileUrl?: string;
  instagramImages?: string[];
}

export interface TenYearsData {
  enabled: boolean;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  stats_lives: string;
  stats_baptisms: string;
}

export interface BaptismConfig {
  backgroundUrl: string;
  nextDate: string;
  documents: { title: string; url: string }[];
}

export interface Notice {
  id: string;
  text: string;
  priority: 'Alta' | 'Normal';
  active: boolean;
}

export interface PhotoFrame {
  id: string;
  title: string;
  frameUrl: string;
  active: boolean;
}

export interface AboutPageData {
  heroImage: string;
  history: string;
  vision: string;
  mission: string;
  values: string;
}

export interface DiscipleshipTrack {
  id: string;
  title: string;
  description: string;
  image: string;
  category?: string;
  steps: StepContent[];
}

export interface CabinetRequest {
  id: string;
  name: string;
  phone: string;
  preferredPastor: string;
  datePreference: string;
  shift: string;
  createdAt: number;
  status: 'pending' | 'scheduled' | 'completed';
  notes?: string;
}

export interface PrayerRequest {
  id: string;
  text: string;
  mood?: string;
  name?: string;
  contact?: string;
  createdAt: number;
  status?: 'pending' | 'prayed';
  read: boolean;
}

export interface DevotionalResponse {
  verse: string;
  reference: string;
  message: string;
  prayer: string;
}
