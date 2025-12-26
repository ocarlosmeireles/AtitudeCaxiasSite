
import React, { useState, useEffect } from 'react';
import { Users, Heart, Share2, Plus, X, Send, Sparkles, Smile, Flame, Filter, Check } from 'lucide-react';
import { GratitudePost } from '../types';

export const CommunityView = () => {
    const [posts, setPosts] = useState<GratitudePost[]>([]);
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [newPost, setNewPost] = useState({ name: '', text: '', category: 'Gratidão' });
    const [filter, setFilter] = useState('Todos');
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        setPosts([
            { id: '1', userName: 'Mariana Costa', text: 'Hoje meu coração transborda de alegria pela cura de minha mãe. Deus é fiel!', category: 'Testemunho', createdAt: Date.now(), reactions: { amem: 12, gloria: 8, love: 5 } },
            { id: '2', userName: 'Lucas Silva', text: 'Grato pela nova oportunidade de emprego que surgiu através de uma conexão na célula.', category: 'Gratidão', createdAt: Date.now() - 100000, reactions: { amem: 15, gloria: 4, love: 2 } },
            { id: '3', userName: 'Família Pereira', text: 'Nossos filhos amam o Atitude Kids. É lindo ver eles aprendendo sobre Jesus.', category: 'Família', createdAt: Date.now() - 500000, reactions: { amem: 22, gloria: 10, love: 18 } },
        ]);
    }, []);

    const handleAddPost = () => {
        if (!newPost.text) return;
        const post: GratitudePost = {
            id: Date.now().toString(),
            userName: newPost.name || 'Membro da Família',
            text: newPost.text,
            category: newPost.category,
            createdAt: Date.now(),
            reactions: { amem: 0, gloria: 0, love: 0 }
        };
        setPosts([post, ...posts]);
        setIsPostModalOpen(false);
        setNewPost({ name: '', text: '', category: 'Gratidão' });
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 4000);
    };

    const handleReaction = (postId: string, type: 'amem' | 'gloria' | 'love') => {
        setPosts(posts.map(p => {
            if (p.id === postId) {
                const reactions = { ...p.reactions! };
                reactions[type] = (reactions[type] || 0) + 1;
                return { ...p, reactions };
            }
            return p;
        }));
    };

    const filteredPosts = filter === 'Todos' ? posts : posts.filter(p => p.category === filter);
    const categories = ['Todos', 'Gratidão', 'Testemunho', 'Família', 'Serviço', 'Cura'];

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 animate-fade-in pb-40 overflow-x-hidden relative">
             
             {/* Success Notification */}
             {showSuccess && (
                 <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] bg-green-500 text-white px-10 py-5 rounded-[2.5rem] font-black uppercase text-xs tracking-widest shadow-2xl flex items-center gap-4 animate-bounce">
                    <Sparkles size={24}/> Publicação enviada com sucesso!
                 </div>
             )}

             <div className="bg-zinc-900 pt-48 pb-32 px-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-orange/5 rounded-full blur-[180px]"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[140px]"></div>
                
                <div className="max-w-5xl mx-auto relative z-10 text-center space-y-12">
                    <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-brand-orange animate-slide-up backdrop-blur-sm">
                        <Users size={16}/> Mural da Família
                    </div>
                    
                    <h1 className="text-7xl md:text-[9rem] font-black text-white tracking-tighter leading-[0.8] uppercase animate-slide-up">
                        VOZES DA <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-red-600">FAMÍLIA.</span>
                    </h1>
                    
                    <p className="text-zinc-400 text-xl md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed">
                        Testemunhos que edificam e vitórias que inspiram. Compartilhe o que Deus tem feito em sua vida.
                    </p>

                    <button 
                        onClick={() => setIsPostModalOpen(true)}
                        className="bg-white text-zinc-900 px-12 py-6 rounded-[2.5rem] font-black uppercase tracking-widest text-xs shadow-2xl hover:bg-brand-orange hover:text-white transition-all transform hover:scale-110 active:scale-95 flex items-center gap-4 mx-auto"
                    >
                        <Plus size={24}/> Publicar Meu Testemunho
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-8 -mt-16 relative z-20">
                <div className="bg-white dark:bg-zinc-900 p-4 rounded-[3rem] shadow-2xl border border-zinc-100 dark:border-white/5 mb-16 flex flex-wrap items-center justify-between gap-6">
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                        {categories.map(cat => (
                            <button key={cat} onClick={() => setFilter(cat)} className={`px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${filter === cat ? 'bg-brand-orange text-white shadow-xl' : 'bg-zinc-50 dark:bg-white/5 text-zinc-400 hover:text-zinc-900'}`}>{cat}</button>
                        ))}
                    </div>
                    <div className="hidden md:flex items-center gap-4 text-zinc-400 mr-4">
                        <Filter size={18}/><span className="text-[10px] font-black uppercase tracking-widest">Filtrar</span>
                    </div>
                </div>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {filteredPosts.map(post => (
                        <div key={post.id} className="break-inside-avoid bg-white dark:bg-zinc-900 p-10 rounded-[3.5rem] shadow-xl border border-zinc-100 dark:border-white/5 transition-all duration-700 hover:shadow-2xl hover:-translate-y-3 group relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/[0.03] rounded-bl-full pointer-events-none"></div>
                            
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 rounded-2xl bg-zinc-900 text-white flex items-center justify-center font-black text-lg transition-transform group-hover:rotate-6">{post.userName.charAt(0)}</div>
                                <div>
                                    <h4 className="font-black text-base uppercase tracking-tight text-zinc-900 dark:text-white">{post.userName}</h4>
                                    <p className="text-[9px] font-black uppercase text-zinc-400 tracking-widest">{new Date(post.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>

                            <p className="text-xl text-zinc-700 dark:text-zinc-200 leading-relaxed font-medium italic mb-10">"{post.text}"</p>

                            <div className="pt-8 border-t border-zinc-50 dark:border-white/5 flex items-center gap-3">
                                <button onClick={() => handleReaction(post.id, 'amem')} className="flex-1 bg-zinc-50 dark:bg-white/5 hover:bg-brand-orange/10 hover:text-brand-orange py-3 rounded-2xl transition-all flex flex-col items-center gap-1 group/btn">
                                    <Heart size={16} className={`${post.reactions?.amem ? 'text-brand-orange fill-current' : 'text-zinc-400'}`}/>
                                    <span className="text-xs font-black">{post.reactions?.amem || 0}</span>
                                </button>
                                <button onClick={() => handleReaction(post.id, 'gloria')} className="flex-1 bg-zinc-50 dark:bg-white/5 hover:bg-yellow-500/10 hover:text-yellow-600 py-3 rounded-2xl transition-all flex flex-col items-center gap-1 group/btn">
                                    <Sparkles size={16} className={`${post.reactions?.gloria ? 'text-yellow-500 fill-current' : 'text-zinc-400'}`}/>
                                    <span className="text-xs font-black">{post.reactions?.gloria || 0}</span>
                                </button>
                                <button onClick={() => handleReaction(post.id, 'love')} className="flex-1 bg-zinc-50 dark:bg-white/5 hover:bg-red-500/10 hover:text-red-500 py-3 rounded-2xl transition-all flex flex-col items-center gap-1 group/btn">
                                    <Smile size={16} className={`${post.reactions?.love ? 'text-red-500 fill-current' : 'text-zinc-400'}`}/>
                                    <span className="text-xs font-black">{post.reactions?.love || 0}</span>
                                </button>
                                <button className="w-12 h-12 flex items-center justify-center text-zinc-300 hover:text-brand-orange transition-colors"><Share2 size={20}/></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Post Modal */}
            {isPostModalOpen && (
                <div className="fixed inset-0 z-[200] bg-zinc-950/98 backdrop-blur-3xl flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white dark:bg-zinc-900 w-full max-w-2xl rounded-[4rem] overflow-hidden shadow-2xl relative animate-slide-up border border-white/10">
                        <div className="bg-zinc-950 p-10 text-white flex justify-between items-center border-b border-white/5">
                            <h3 className="text-3xl font-black uppercase tracking-tighter">Voz da Família</h3>
                            <button onClick={() => setIsPostModalOpen(false)} className="p-4 bg-white/5 rounded-full hover:bg-red-600 transition-all"><X size={28}/></button>
                        </div>
                        <div className="p-12 space-y-10">
                            <input className="w-full bg-zinc-50 dark:bg-black/50 border border-zinc-100 dark:border-white/5 p-6 rounded-[2rem] outline-none focus:border-brand-orange transition-all font-black text-lg" placeholder="Seu Nome (Ex: Família Santos)" value={newPost.name} onChange={e => setNewPost({...newPost, name: e.target.value})} />
                            <div className="flex flex-wrap gap-3">
                                {['Gratidão', 'Testemunho', 'Cura', 'Família', 'Serviço'].map(cat => (
                                    <button key={cat} onClick={() => setNewPost({...newPost, category: cat})} className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${newPost.category === cat ? 'bg-brand-orange text-white shadow-xl' : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-400'}`}>{cat}</button>
                                ))}
                            </div>
                            <textarea className="w-full bg-zinc-50 dark:bg-black/50 border border-zinc-100 dark:border-white/5 p-8 rounded-[2.5rem] outline-none focus:border-brand-orange transition-all h-48 resize-none font-medium text-lg" placeholder="Compartilhe o que Deus fez..." value={newPost.text} onChange={e => setNewPost({...newPost, text: e.target.value})} />
                            <button onClick={handleAddPost} disabled={!newPost.text} className="w-full bg-zinc-950 dark:bg-white text-white dark:text-zinc-900 py-8 rounded-[2.5rem] font-black uppercase tracking-[0.5em] text-xs flex items-center justify-center gap-4 hover:bg-brand-orange hover:text-white transition-all shadow-2xl disabled:opacity-30">
                                <Send size={24}/> PUBLICAR TESTEMUNHO
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
