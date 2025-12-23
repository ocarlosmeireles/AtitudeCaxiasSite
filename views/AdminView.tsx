
import React, { useState, useEffect } from 'react';
import { 
  AdminView as AdminViewType, NewsItem, Sermon, Ministry, Cell, 
  Event, DiscipleshipTrack, Notice, WelcomeSectionData, TenYearsData, 
  HomeConfig, PrayerRequest, CabinetRequest, PhotoFrame 
} from '../types';
import { subscribeToData, saveData, deleteData, uploadImage, deleteFile } from '../services/firebase';
import { improveAdminText } from '../services/gemini';
import { 
  LayoutDashboard, Users, BookOpen, Calendar, Video, FileText, 
  MessageCircle, Home, Settings, LogOut, Menu, X, Plus, 
  Trash2, Edit2, ChevronRight, CalendarCheck, Phone, Clock, User, 
  Lock, Sparkles, Image as ImageIcon, UploadCloud, Save, Target, 
  TrendingUp, HeartHandshake, List, CheckCircle, Globe
} from 'lucide-react';

const INPUT_STYLE = "w-full bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 p-4 rounded-xl text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all shadow-sm text-sm";
const LABEL_STYLE = "block text-[10px] font-black text-slate-500 dark:text-zinc-400 uppercase tracking-widest mb-2 ml-1";
const CARD_STYLE = "bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-zinc-800 shadow-xl";

const AdminFormInput = ({ label, value, onChange, placeholder, type = "text" }: any) => (
  <div className="mb-6">
    <label className={LABEL_STYLE}>{label}</label>
    <input type={type} className={INPUT_STYLE} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} />
  </div>
);

const AdminTextArea = ({ label, value, onChange, rows = 4, withAI = false }: any) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const handleAI = async () => {
    setIsGenerating(true);
    const improved = await improveAdminText(value, 'WELCOME');
    onChange(improved);
    setIsGenerating(false);
  };
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className={LABEL_STYLE}>{label}</label>
        {withAI && <button disabled={isGenerating} onClick={handleAI} className="text-brand-orange text-[9px] font-black uppercase flex items-center gap-1 hover:opacity-70 transition-opacity">
          <Sparkles size={12} className={isGenerating ? 'animate-spin' : ''}/> {isGenerating ? 'IA PROCESSANDO...' : 'MELHORAR COM IA'}
        </button>}
      </div>
      <textarea className={INPUT_STYLE} rows={rows} value={value} onChange={e => onChange(e.target.value)} />
    </div>
  );
};

const AdminImageUpload = ({ label, imageUrl, onImageChange }: { label: string, imageUrl: string, onImageChange: (url: string) => void }) => {
  const [uploading, setUploading] = useState(false);
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploading(true);
      const url = await uploadImage(e.target.files[0]);
      if (url) onImageChange(url);
      setUploading(false);
    }
  };

  return (
    <div className="mb-6">
      <label className={LABEL_STYLE}>{label}</label>
      <div className="p-4 bg-slate-50 dark:bg-black/20 rounded-2xl border border-slate-100 dark:border-zinc-800 flex gap-6 items-center">
        <div className="w-24 h-24 bg-zinc-200 dark:bg-zinc-800 rounded-2xl overflow-hidden shrink-0 relative group">
          {imageUrl ? (
             <img src={imageUrl} className="w-full h-full object-cover" alt="Preview" />
          ) : <div className="w-full h-full flex items-center justify-center text-zinc-400"><ImageIcon size={24}/></div>}
          {uploading && <div className="absolute inset-0 bg-black/60 flex items-center justify-center"><Sparkles className="animate-spin text-white"/></div>}
        </div>
        <div className="flex-grow space-y-3">
          <input className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 p-2 rounded-lg text-[10px] text-zinc-500" value={imageUrl} onChange={e => onImageChange(e.target.value)} placeholder="URL manual..." />
          <label className="cursor-pointer bg-zinc-950 dark:bg-zinc-700 text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase inline-flex items-center gap-2 hover:bg-brand-orange transition-colors">
            <UploadCloud size={14}/> Carregar Arquivo
            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
          </label>
        </div>
      </div>
    </div>
  );
};

export const AdminView = ({ 
  notices, news, sermons, welcomeData, setWelcomeData, 
  homeConfig, setHomeConfig, ministries, cells, events, discipleshipTracks, onLogout 
}: any) => {
  const [view, setView] = useState<AdminViewType>('DASHBOARD');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [cabinetRequests, setCabinetRequests] = useState<CabinetRequest[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      const unsub = subscribeToData('cabinetRequests', (data) => {
        const sorted = (data as CabinetRequest[]).sort((a, b) => b.createdAt - a.createdAt);
        setCabinetRequests(sorted);
      });
      return () => unsub();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-zinc-950 p-6">
        <div className="bg-white dark:bg-zinc-900 p-12 rounded-[3rem] w-full max-w-md shadow-2xl border border-white dark:border-zinc-800 text-center">
          <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-8"><Lock className="text-brand-orange" size={32}/></div>
          <h2 className="text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter mb-8">Admin Access</h2>
          <input type="password" placeholder="Senha" className="w-full p-5 bg-zinc-50 dark:bg-black rounded-2xl outline-none focus:ring-2 focus:ring-brand-orange text-center mb-4 dark:text-white" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && password === 'admin' && setIsAuthenticated(true)} />
          <button onClick={() => password === 'admin' && setIsAuthenticated(true)} className="w-full bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-brand-orange dark:hover:bg-brand-orange dark:hover:text-white transition-all">Entrar</button>
        </div>
      </div>
    );
  }

  const menuItems = [
    { id: 'DASHBOARD', label: 'Painel', icon: LayoutDashboard },
    { id: 'WELCOME', label: 'Pastores', icon: User },
    { id: 'CABINET', label: 'Agenda Pastores', icon: CalendarCheck, collection: 'cabinetRequests' },
    { id: 'MINISTRIES', label: 'Ministérios', icon: Users, collection: 'ministries' },
    { id: 'NEWS', label: 'Notícias', icon: FileText, collection: 'news' },
    { id: 'SERMONS', label: 'Mensagens', icon: Video, collection: 'sermons' },
    { id: 'CELLS', label: 'Células', icon: Home, collection: 'cells' },
    { id: 'EVENTS', label: 'Agenda Geral', icon: Calendar, collection: 'events' },
    { id: 'DISCIPLESHIP', label: 'Academia Atitude', icon: BookOpen, collection: 'tracks' },
  ];

  const handleMenuClick = (id: AdminViewType) => {
    setView(id);
    setIsSidebarOpen(false);
    setEditingItem(null);
  };

  const handleSaveItem = async (collection: string, item: any) => {
    const { id, ...data } = item;
    await saveData(collection, data, id);
    setEditingItem(null);
  };

  const handleDeleteItem = async (collection: string, id: string) => {
    if(window.confirm("Confirmar exclusão permanente?")) {
        await deleteData(collection, id);
    }
  };

  const currentCollection = menuItems.find(m => m.id === view)?.collection;
  const currentData = view === 'NEWS' ? news : 
                    view === 'SERMONS' ? sermons : 
                    view === 'MINISTRIES' ? ministries : 
                    view === 'CELLS' ? cells : 
                    view === 'EVENTS' ? events : 
                    view === 'DISCIPLESHIP' ? discipleshipTracks : 
                    view === 'CABINET' ? cabinetRequests : [];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-zinc-950 overflow-hidden font-sans">
      
      {/* Sidebar Navigation */}
      <aside className={`fixed lg:static inset-y-0 left-0 w-72 bg-white dark:bg-zinc-900 border-r dark:border-zinc-800 flex flex-col shadow-2xl z-[120] transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-8 border-b dark:border-zinc-800 flex justify-between items-center">
            <h2 className="font-black text-2xl tracking-tighter uppercase text-zinc-900 dark:text-white">IBA <span className="text-brand-orange">Admin</span></h2>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full"><X size={20}/></button>
        </div>
        <nav className="flex-grow p-4 space-y-2 overflow-y-auto custom-scrollbar">
          {menuItems.map(item => (
            <button key={item.id} onClick={() => handleMenuClick(item.id as AdminViewType)} className={`w-full flex items-center justify-between p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${view === item.id ? 'bg-brand-orange text-white shadow-lg shadow-orange-500/20' : 'text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}>
              <div className="flex items-center">
                <item.icon size={16} className="mr-3"/> {item.label}
              </div>
              <ChevronRight size={14} className={view === item.id ? 'opacity-100' : 'opacity-0'}/>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t dark:border-zinc-800">
           <button onClick={onLogout} className="w-full flex items-center justify-center p-4 text-red-500 font-black uppercase text-[10px] tracking-widest hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl transition-all"><LogOut size={16} className="mr-2"/> Sair</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative animate-fade-in custom-scrollbar">
        
        {/* Mobile Header */}
        <header className="flex lg:hidden items-center justify-between p-6 bg-white dark:bg-zinc-900 border-b dark:border-zinc-800 sticky top-0 z-50">
            <button onClick={() => setIsSidebarOpen(true)} className="p-2 bg-zinc-50 dark:bg-black rounded-xl text-zinc-600 dark:text-zinc-400"><Menu size={24}/></button>
            <span className="font-black uppercase tracking-widest text-[10px] text-brand-orange">{view}</span>
            <div className="w-10"></div> 
        </header>

        <div className="p-6 md:p-12 max-w-6xl mx-auto pb-32">
           
           {/* DASHBOARD VIEW */}
           {view === 'DASHBOARD' && (
              <div className="space-y-12">
                 <header>
                    <h2 className="text-4xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white mb-2">Resumo Geral</h2>
                    <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Painel de controle em tempo real</p>
                 </header>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    <div className={CARD_STYLE}>
                       <Users className="text-brand-orange mb-4" />
                       <h4 className="text-3xl font-black text-zinc-900 dark:text-white">{cells.length}</h4>
                       <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Células Ativas</p>
                    </div>
                    <div className={CARD_STYLE}>
                       <Video className="text-brand-orange mb-4" />
                       <h4 className="text-3xl font-black text-zinc-900 dark:text-white">{sermons.length}</h4>
                       <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Pregações</p>
                    </div>
                    <div className={CARD_STYLE}>
                       <CalendarCheck className="text-brand-orange mb-4" />
                       <h4 className="text-3xl font-black text-zinc-900 dark:text-white">{cabinetRequests.filter(r => r.status === 'pending').length}</h4>
                       <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Agenda Pendente</p>
                    </div>
                    <div className={CARD_STYLE}>
                       <BookOpen className="text-brand-orange mb-4" />
                       <h4 className="text-3xl font-black text-zinc-900 dark:text-white">{discipleshipTracks.length}</h4>
                       <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Cursos Academia</p>
                    </div>
                 </div>
              </div>
           )}

           {/* CRUD VIEWS */}
           {currentCollection && (
             <div className="space-y-8 animate-fade-in">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                   <div>
                      <h2 className="text-4xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white">{view}</h2>
                      <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Gerencie registros de {currentCollection}</p>
                   </div>
                   <button onClick={() => setEditingItem({})} className="w-full sm:w-auto bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-6 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 shadow-xl hover:bg-brand-orange transition-all hover:text-white">
                      <Plus size={16}/> Adicionar Novo
                   </button>
                </div>

                <div className="grid gap-4">
                   {currentData.map((item: any) => (
                      <div key={item.id} className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-100 dark:border-white/5 flex items-center justify-between shadow-sm group">
                         <div className="flex items-center gap-6">
                            {(item.image || item.imageUrl) && <img src={item.image || item.imageUrl} className="w-14 h-14 rounded-2xl object-cover shrink-0 shadow-lg" />}
                            <div>
                               <h4 className="font-black text-zinc-900 dark:text-white uppercase text-base">{item.title || item.name || item.leader}</h4>
                               <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{item.date || item.category || item.district || item.phone}</p>
                            </div>
                         </div>
                         <div className="flex gap-2">
                            <button onClick={() => setEditingItem(item)} className="p-3 bg-zinc-50 dark:bg-white/5 text-zinc-400 rounded-xl hover:text-brand-orange hover:bg-white transition-all"><Edit2 size={18}/></button>
                            <button onClick={() => handleDeleteItem(currentCollection, item.id)} className="p-3 bg-zinc-50 dark:bg-white/5 text-zinc-400 rounded-xl hover:text-red-500 hover:bg-red-50 transition-all"><Trash2 size={18}/></button>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
           )}

           {/* PASTORAL WELCOME EDIT */}
           {view === 'WELCOME' && (
              <div className="space-y-12 animate-fade-in">
                 <header className="flex justify-between items-end">
                    <div>
                       <h2 className="text-4xl font-black uppercase tracking-tighter">Página Inicial / Pastores</h2>
                       <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Identidade Visual da Liderança</p>
                    </div>
                    <button onClick={() => saveData('settings', welcomeData, 'welcomeData')} className="bg-brand-orange text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl flex items-center gap-2 hover:scale-105 transition-all">
                       <Save size={18}/> Salvar Portal
                    </button>
                 </header>

                 <div className={CARD_STYLE}>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-orange mb-8 flex items-center gap-2"><Sparkles size={14}/> Conteúdo Editorial</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <AdminFormInput label="Título Linha 1" value={welcomeData.titleLine1} onChange={(v: string) => setWelcomeData({...welcomeData, titleLine1: v})} />
                       <AdminFormInput label="Título Linha 2" value={welcomeData.titleLine2} onChange={(v: string) => setWelcomeData({...welcomeData, titleLine2: v})} />
                    </div>
                    <AdminTextArea label="Mensagem Pastoral" value={welcomeData.text} onChange={(v: string) => setWelcomeData({...welcomeData, text: v})} withAI rows={6} />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className={CARD_STYLE}>
                       <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-8 border-b dark:border-zinc-800 pb-4">Pastor Titular</h3>
                       <AdminFormInput label="Nome" value={welcomeData.pastorName} onChange={(v: string) => setWelcomeData({...welcomeData, pastorName: v})} />
                       <AdminFormInput label="Cargo" value={welcomeData.pastorRole} onChange={(v: string) => setWelcomeData({...welcomeData, pastorRole: v})} />
                       <AdminImageUpload label="Foto" imageUrl={welcomeData.imageUrl} onImageChange={(url) => setWelcomeData({...welcomeData, imageUrl: url})} />
                    </div>
                    <div className={CARD_STYLE}>
                       <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-8 border-b dark:border-zinc-800 pb-4">Cônjuge / Segundo Pastor</h3>
                       <AdminFormInput label="Nome" value={welcomeData.pastorName2 || ''} onChange={(v: string) => setWelcomeData({...welcomeData, pastorName2: v})} />
                       <AdminFormInput label="Cargo" value={welcomeData.pastorRole2 || ''} onChange={(v: string) => setWelcomeData({...welcomeData, pastorRole2: v})} />
                       <AdminImageUpload label="Foto" imageUrl={welcomeData.imageUrl2 || ''} onImageChange={(url) => setWelcomeData({...welcomeData, imageUrl2: url})} />
                    </div>
                 </div>
              </div>
           )}

        </div>
      </main>

      {/* Editing Modal (Dynamic) */}
      {editingItem && currentCollection && (
         <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-0 sm:p-6 animate-fade-in">
            <div className="bg-white dark:bg-zinc-900 w-full max-w-2xl h-full sm:h-auto sm:max-h-[90vh] sm:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col">
               <div className="bg-zinc-950 p-6 md:p-8 text-white flex justify-between items-center shrink-0">
                  <h3 className="text-xl font-black uppercase tracking-tighter">Editar {view}</h3>
                  <button onClick={() => setEditingItem(null)} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><X size={24}/></button>
               </div>
               
               <div className="p-8 md:p-12 overflow-y-auto space-y-6 flex-grow custom-scrollbar">
                  {/* Dynamic Fields for CRUD */}
                  {view === 'NEWS' && (
                      <>
                        <AdminFormInput label="Título" value={editingItem.title} onChange={(v:string) => setEditingItem({...editingItem, title: v})} />
                        <AdminFormInput label="Data" value={editingItem.date} onChange={(v:string) => setEditingItem({...editingItem, date: v})} />
                        <AdminTextArea label="Resumo" value={editingItem.excerpt} onChange={(v:string) => setEditingItem({...editingItem, excerpt: v})} />
                        <AdminTextArea label="Conteúdo Completo" value={editingItem.content} onChange={(v:string) => setEditingItem({...editingItem, content: v})} rows={8} />
                        <AdminImageUpload label="Imagem" imageUrl={editingItem.image} onImageChange={(v:string) => setEditingItem({...editingItem, image: v})} />
                      </>
                  )}
                  {view === 'MINISTRIES' && (
                      <>
                        <AdminFormInput label="Nome do Ministério" value={editingItem.name} onChange={(v:string) => setEditingItem({...editingItem, name: v})} />
                        <AdminFormInput label="Líder" value={editingItem.leader} onChange={(v:string) => setEditingItem({...editingItem, leader: v})} />
                        <AdminFormInput label="Categoria" value={editingItem.category} onChange={(v:string) => setEditingItem({...editingItem, category: v})} />
                        <AdminTextArea label="Descrição Curta" value={editingItem.description} onChange={(v:string) => setEditingItem({...editingItem, description: v})} />
                        <AdminTextArea label="Descrição Completa" value={editingItem.fullDescription} onChange={(v:string) => setEditingItem({...editingItem, fullDescription: v})} rows={6} />
                        <AdminFormInput label="WhatsApp Líder" value={editingItem.whatsappContact} onChange={(v:string) => setEditingItem({...editingItem, whatsappContact: v})} />
                        <AdminImageUpload label="Imagem de Capa" imageUrl={editingItem.image} onImageChange={(v:string) => setEditingItem({...editingItem, image: v})} />
                      </>
                  )}
                  {/* ... other CRUD fields simplified here ... */}
                  {Object.keys(editingItem).length === 0 && <div className="text-center py-20 text-zinc-400">Novo Registro em branco.</div>}
               </div>

               <div className="p-6 md:p-10 border-t dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 flex gap-4 shrink-0">
                  <button onClick={() => setEditingItem(null)} className="flex-1 py-4 text-zinc-500 font-black uppercase text-[10px] tracking-widest">Cancelar</button>
                  <button onClick={() => handleSaveItem(currentCollection, editingItem)} className="flex-1 py-4 bg-brand-orange text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg active:scale-95 transition-all">Salvar Permanente</button>
               </div>
            </div>
         </div>
      )}

    </div>
  );
};
