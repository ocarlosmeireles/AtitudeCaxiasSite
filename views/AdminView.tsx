
import React, { useState, useEffect } from 'react';
import { AdminView as AdminViewType, NewsItem, Sermon, Ministry, Cell, Event, DiscipleshipTrack, Notice, WelcomeSectionData, TenYearsData, HomeConfig, PrayerRequest, BaptismConfig, ProjectAvanca, AboutPageData, PhotoFrame, CabinetRequest } from '../types';
import { subscribeToData, saveData, deleteData, uploadImage, deleteFile } from '../services/firebase';
import { improveAdminText } from '../services/gemini';
import { LayoutDashboard, Users, BookOpen, Calendar, Video, FileText, MessageCircle, Home, Settings, HeartHandshake, ArrowRight, Plus, Trash2, Edit2, Sparkles, UploadCloud, Database, Image as ImageIcon, Printer, CheckCircle, Clock, Menu, LogOut, X, ArrowUp, ArrowDown, User, Lock, Phone, Camera, CalendarCheck, PlayCircle, Search } from 'lucide-react';

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
      if (imageUrl && imageUrl.includes("firebasestorage")) {
        await deleteFile(imageUrl);
      }
      setUploading(true);
      const url = await uploadImage(e.target.files[0]);
      if (url) onImageChange(url);
      setUploading(false);
    }
  };

  const handleRemove = async () => {
    if (window.confirm("Remover foto permanentemente?")) {
      await deleteFile(imageUrl);
      onImageChange("");
    }
  };

  return (
    <div className="mb-6">
      <label className={LABEL_STYLE}>{label}</label>
      <div className="p-4 bg-slate-50 dark:bg-black/20 rounded-2xl border border-slate-100 dark:border-zinc-800 flex gap-6 items-center">
        <div className="w-24 h-24 bg-zinc-200 dark:bg-zinc-800 rounded-2xl overflow-hidden shrink-0 relative group">
          {imageUrl ? (
             <>
               <img src={imageUrl} className="w-full h-full object-cover" alt="Preview" />
               <button onClick={handleRemove} className="absolute inset-0 bg-red-600/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"><Trash2 size={20}/></button>
             </>
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
  const [cabinetRequests, setCabinetRequests] = useState<CabinetRequest[]>([]);
  const [editingItem, setEditingItem] = useState<any>(null);

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

  const handleDelete = async (collection: string, id: string, img?: string) => {
    const success = await deleteData(collection, id, img);
    if (success) {
      // O firebase onSnapshot cuidará da atualização da UI
    }
  };

  const handleSaveItem = async (collection: string, item: any) => {
    const { id, ...data } = item;
    await saveData(collection, data, id);
    setEditingItem(null);
  };

  const handleUpdateCabinetStatus = async (req: CabinetRequest, status: 'scheduled' | 'completed') => {
    await saveData('cabinetRequests', { ...req, status }, req.id);
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-zinc-950 overflow-hidden font-sans">
      <aside className="w-64 bg-white dark:bg-zinc-900 border-r dark:border-zinc-800 flex flex-col shadow-xl z-50">
        <div className="p-8 border-b dark:border-zinc-800"><h2 className="font-black text-2xl tracking-tighter uppercase">IBA <span className="text-brand-orange">Admin</span></h2></div>
        <div className="flex-grow p-4 space-y-2 overflow-y-auto">
          {[
            { id: 'DASHBOARD', label: 'Início', icon: LayoutDashboard },
            { id: 'WELCOME', label: 'Pastores', icon: User },
            { id: 'CABINET', label: 'Agenda', icon: CalendarCheck },
            { id: 'NEWS', label: 'Notícias', icon: FileText },
            { id: 'SERMONS', label: 'Sermões', icon: PlayCircle },
            { id: 'MINISTRIES', label: 'Ministérios', icon: Users },
            { id: 'CELLS', label: 'Células', icon: Home },
          ].map(item => (
            <button key={item.id} onClick={() => { setView(item.id as AdminViewType); setEditingItem(null); }} className={`w-full flex items-center p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${view === item.id ? 'bg-brand-orange text-white shadow-lg shadow-orange-500/20' : 'text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}>
              <item.icon size={16} className="mr-3"/> {item.label}
            </button>
          ))}
        </div>
        <div className="p-4 border-t dark:border-zinc-800">
           <button onClick={onLogout} className="w-full flex items-center justify-center p-4 text-red-500 font-black uppercase text-[10px] tracking-widest hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl transition-all"><LogOut size={16} className="mr-2"/> Sair</button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-6 md:p-12 relative animate-fade-in">
        <div className="max-w-5xl mx-auto pb-24">
           
           {/* DASHBOARD */}
           {view === 'DASHBOARD' && (
              <div className="py-12">
                 <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">Painel Geral</h2>
                 <p className="text-zinc-400 mb-12 uppercase text-[10px] font-bold tracking-widest">Resumo operacional da igreja</p>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className={CARD_STYLE}>
                       <Users className="text-brand-orange mb-4" />
                       <h4 className="text-3xl font-black">{cells.length}</h4>
                       <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest">Células Ativas</p>
                    </div>
                    <div className={CARD_STYLE}>
                       <CalendarCheck className="text-brand-orange mb-4" />
                       <h4 className="text-3xl font-black">{cabinetRequests.filter(r => r.status === 'pending').length}</h4>
                       <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest">Agendamentos Novos</p>
                    </div>
                    <div className={CARD_STYLE}>
                       <PlayCircle className="text-brand-orange mb-4" />
                       <h4 className="text-3xl font-black">{sermons.length}</h4>
                       <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest">Pregações Online</p>
                    </div>
                 </div>
              </div>
           )}

           {/* PASTORES (WELCOME) */}
           {view === 'WELCOME' && (
              <div className="space-y-10">
                 <header className="flex justify-between items-end">
                    <div>
                       <h2 className="text-4xl font-black uppercase tracking-tighter">Editorial Pastoral</h2>
                       <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Assinatura visual da liderança</p>
                    </div>
                    <button onClick={() => saveData('settings', welcomeData, 'welcomeData')} className="bg-brand-orange text-white px-8 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-lg hover:scale-105 transition-all">Salvar Alterações</button>
                 </header>

                 <div className={CARD_STYLE}>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-orange mb-8 flex items-center gap-2"><Sparkles size={14}/> Citações e Títulos</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <AdminFormInput label="Título Linha 1" value={welcomeData.titleLine1} onChange={(v: string) => setWelcomeData({...welcomeData, titleLine1: v})} />
                       <AdminFormInput label="Título Linha 2" value={welcomeData.titleLine2} onChange={(v: string) => setWelcomeData({...welcomeData, titleLine2: v})} />
                    </div>
                    <AdminTextArea label="Mensagem Central" value={welcomeData.text} onChange={(v: string) => setWelcomeData({...welcomeData, text: v})} withAI rows={6} />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className={CARD_STYLE}>
                       <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-8 border-b dark:border-zinc-800 pb-4">Pastor 01 (Titular)</h3>
                       <AdminFormInput label="Nome" value={welcomeData.pastorName} onChange={(v: string) => setWelcomeData({...welcomeData, pastorName: v})} />
                       <AdminFormInput label="Cargo" value={welcomeData.pastorRole} onChange={(v: string) => setWelcomeData({...welcomeData, pastorRole: v})} />
                       <AdminImageUpload label="Foto de Perfil" imageUrl={welcomeData.imageUrl} onImageChange={(url) => setWelcomeData({...welcomeData, imageUrl: url})} />
                    </div>
                    <div className={CARD_STYLE}>
                       <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-8 border-b dark:border-zinc-800 pb-4">Pastor 02 (Cônjuge)</h3>
                       <AdminFormInput label="Nome" value={welcomeData.pastorName2 || ''} onChange={(v: string) => setWelcomeData({...welcomeData, pastorName2: v})} />
                       <AdminFormInput label="Cargo" value={welcomeData.pastorRole2 || ''} onChange={(v: string) => setWelcomeData({...welcomeData, pastorRole2: v})} />
                       <AdminImageUpload label="Foto de Perfil" imageUrl={welcomeData.imageUrl2 || ''} onImageChange={(url) => setWelcomeData({...welcomeData, imageUrl2: url})} />
                    </div>
                 </div>
              </div>
           )}

           {/* CABINET (AGENDA) */}
           {view === 'CABINET' && (
             <div className="space-y-8">
                <header>
                   <h2 className="text-4xl font-black uppercase tracking-tighter">Agenda de Gabinete</h2>
                   <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">{cabinetRequests.length} solicitações totais</p>
                </header>
                <div className="space-y-4">
                   {cabinetRequests.map(req => (
                      <div key={req.id} className={`bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-zinc-800 flex justify-between items-center group transition-all ${req.status === 'completed' ? 'opacity-50 grayscale' : ''}`}>
                         <div>
                            <div className="flex items-center gap-3 mb-1">
                               <span className="text-xl font-black uppercase tracking-tighter">{req.name}</span>
                               <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-full ${req.status === 'pending' ? 'bg-orange-100 dark:bg-orange-900/30 text-brand-orange' : 'bg-green-100 dark:bg-green-900/30 text-green-500'}`}>
                                 {req.status === 'pending' ? 'Pendente' : 'Atendido'}
                               </span>
                            </div>
                            <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-4">
                               <span className="flex items-center gap-2"><Phone size={10}/> {req.phone}</span>
                               <span className="flex items-center gap-2"><Clock size={10}/> {new Date(req.createdAt).toLocaleDateString()}</span>
                               <span className="flex items-center gap-2 text-zinc-500 font-black"><User size={10}/> {req.preferredPastor || 'Pr. Titular'}</span>
                            </p>
                         </div>
                         <div className="flex gap-2">
                            <button 
                              onClick={() => window.open(`https://wa.me/${req.phone.replace(/\D/g,'')}`, '_blank')} 
                              className="px-5 py-3 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-orange transition-colors"
                            >
                              WhatsApp
                            </button>
                            {req.status === 'pending' && (
                              <button 
                                onClick={() => handleUpdateCabinetStatus(req, 'completed')}
                                className="p-3 text-green-500 bg-green-50 dark:bg-green-900/10 rounded-xl hover:bg-green-500 hover:text-white transition-all"
                              >
                                <CheckCircle size={18}/>
                              </button>
                            )}
                            <button onClick={() => handleDelete('cabinetRequests', req.id)} className="p-3 text-red-500 bg-red-50 dark:bg-red-900/10 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={18}/></button>
                         </div>
                      </div>
                   ))}
                   {cabinetRequests.length === 0 && <div className="text-center py-20 text-zinc-300 font-black uppercase text-xs tracking-[0.2em]">Sem novos agendamentos</div>}
                </div>
             </div>
           )}

           {/* NOTÍCIAS */}
           {view === 'NEWS' && (
              <div className="space-y-10">
                 <header className="flex justify-between items-end">
                    <h2 className="text-4xl font-black uppercase tracking-tighter">Notícias & Avisos</h2>
                    <button onClick={() => setEditingItem({ title: '', excerpt: '', content: '', date: new Date().toLocaleDateString(), image: '', author: 'Comunicação', category: 'Igreja' })} className="bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 shadow-lg"><Plus size={16}/> Nova Notícia</button>
                 </header>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {news.map((item: NewsItem) => (
                       <div key={item.id} className={CARD_STYLE + " group"}>
                          <div className="h-40 rounded-2xl overflow-hidden mb-6 bg-zinc-100 dark:bg-zinc-800 relative">
                             <img src={item.image} className="w-full h-full object-cover" />
                             <div className="absolute top-4 right-4 flex gap-2">
                                <button onClick={() => setEditingItem(item)} className="p-2 bg-white/90 backdrop-blur rounded-lg text-zinc-900 hover:text-brand-orange shadow-lg transition-colors"><Edit2 size={16}/></button>
                                <button onClick={() => handleDelete('news', item.id, item.image)} className="p-2 bg-white/90 backdrop-blur rounded-lg text-red-500 hover:bg-red-500 hover:text-white shadow-lg transition-colors"><Trash2 size={16}/></button>
                             </div>
                          </div>
                          <h4 className="text-lg font-black uppercase leading-tight mb-2 group-hover:text-brand-orange transition-colors">{item.title}</h4>
                          <p className="text-zinc-400 text-xs line-clamp-2">{item.excerpt}</p>
                       </div>
                    ))}
                 </div>
              </div>
           )}

           {/* SERMÕES */}
           {view === 'SERMONS' && (
              <div className="space-y-10">
                 <header className="flex justify-between items-end">
                    <h2 className="text-4xl font-black uppercase tracking-tighter">Sermões (Netflix Style)</h2>
                    <button onClick={() => setEditingItem({ title: '', preacher: '', date: '', youtubeUrl: '', description: '', duration: '45 min' })} className="bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 shadow-lg"><Plus size={16}/> Novo Sermão</button>
                 </header>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {sermons.map((s: Sermon) => (
                       <div key={s.id} className={CARD_STYLE}>
                          <div className="flex justify-between items-start mb-4">
                             <PlayCircle className="text-brand-orange" size={32}/>
                             <div className="flex gap-1">
                                <button onClick={() => setEditingItem(s)} className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white"><Edit2 size={14}/></button>
                                <button onClick={() => handleDelete('sermons', s.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg"><Trash2 size={14}/></button>
                             </div>
                          </div>
                          <h4 className="font-black uppercase text-sm mb-1">{s.title}</h4>
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{s.preacher} • {s.date}</p>
                       </div>
                    ))}
                 </div>
              </div>
           )}

           {/* CÉLULAS */}
           {view === 'CELLS' && (
              <div className="space-y-10">
                 <header className="flex justify-between items-end">
                    <h2 className="text-4xl font-black uppercase tracking-tighter">Gestão de Células</h2>
                    <button onClick={() => setEditingItem({ network: 'Amarela', leader: '', district: '', address: '', day: 'Terça', time: '20h' })} className="bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 shadow-lg"><Plus size={16}/> Nova Célula</button>
                 </header>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cells.map((c: Cell) => (
                       <div key={c.id} className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-100 dark:border-white/5 flex justify-between items-center">
                          <div>
                             <h4 className="font-black uppercase text-sm">{c.leader}</h4>
                             <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{c.district} • {c.day} {c.time}</p>
                             <span className={`inline-block mt-2 px-2 py-0.5 rounded text-[8px] font-black uppercase text-white ${c.network === 'Amarela' ? 'bg-yellow-500' : c.network === 'Azul' ? 'bg-blue-600' : c.network === 'Verde' ? 'bg-green-600' : 'bg-orange-500'}`}>Rede {c.network}</span>
                          </div>
                          <div className="flex gap-2">
                             <button onClick={() => setEditingItem(c)} className="p-2 text-zinc-400 hover:text-zinc-900"><Edit2 size={16}/></button>
                             <button onClick={() => handleDelete('cells', c.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16}/></button>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           )}

        </div>

        {/* MODAL DE EDIÇÃO GENÉRICO */}
        {editingItem && (
           <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
              <div className="bg-white dark:bg-zinc-900 w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl animate-slide-up flex flex-col max-h-[90vh]">
                 <div className="bg-zinc-950 p-8 text-white flex justify-between items-center shrink-0">
                    <h3 className="text-xl font-black uppercase tracking-tighter">Editando {view}</h3>
                    <button onClick={() => setEditingItem(null)} className="text-white/40 hover:text-white"><X/></button>
                 </div>
                 <div className="p-10 overflow-y-auto space-y-2 flex-grow custom-scrollbar">
                    {/* Campos dinâmicos baseados no tipo do objeto */}
                    {Object.keys(editingItem).filter(k => k !== 'id' && k !== 'createdAt').map(key => {
                       if (key === 'image' || key === 'imageUrl' || key === 'imageUrl2') {
                          return <AdminImageUpload key={key} label={key} imageUrl={editingItem[key]} onImageChange={(url) => setEditingItem({...editingItem, [key]: url})} />;
                       }
                       if (key === 'content' || key === 'description' || key === 'text') {
                          return <AdminTextArea key={key} label={key} value={editingItem[key]} onChange={(v:string) => setEditingItem({...editingItem, [key]: v})} />;
                       }
                       if (key === 'network') {
                          return (
                             <div key={key} className="mb-6">
                                <label className={LABEL_STYLE}>Rede</label>
                                <select className={INPUT_STYLE} value={editingItem[key]} onChange={e => setEditingItem({...editingItem, network: e.target.value})}>
                                   {['Amarela', 'Azul', 'Laranja', 'Verde'].map(n => <option key={n} value={n}>{n}</option>)}
                                </select>
                             </div>
                          );
                       }
                       return <AdminFormInput key={key} label={key} value={editingItem[key]} onChange={(v:string) => setEditingItem({...editingItem, [key]: v})} />;
                    })}
                 </div>
                 <div className="p-8 border-t dark:border-zinc-800 bg-zinc-50 dark:bg-black/20 flex gap-4 shrink-0">
                    <button onClick={() => setEditingItem(null)} className="flex-1 py-4 text-zinc-500 font-black uppercase text-[10px] tracking-widest">Cancelar</button>
                    <button onClick={() => handleSaveItem(view.toLowerCase(), editingItem)} className="flex-1 py-4 bg-brand-orange text-white rounded-xl font-black uppercase text-[10px] tracking-widest shadow-lg">Salvar Permanente</button>
                 </div>
              </div>
           </div>
        )}
      </main>
    </div>
  );
};
