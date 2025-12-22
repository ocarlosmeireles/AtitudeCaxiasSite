
import React, { useState, useEffect } from 'react';
import { Droplets, Calendar, CheckCircle, ArrowRight, BookOpen, HelpCircle, Download, FileText } from 'lucide-react';
import { openWhatsApp } from '../utils';
import { subscribeToData } from '../services/firebase';
import { BaptismConfig } from '../types';

export const BaptismView = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [config, setConfig] = useState<BaptismConfig>({
    backgroundUrl: 'https://images.unsplash.com/photo-1519817914152-22d216bb9170?q=80&w=2070',
    nextDate: 'A Definir',
    documents: []
  });

  useEffect(() => {
    const unsub = subscribeToData('settings', (data) => {
      const found = data.find(d => d.id === 'baptismConfig');
      if (found) setConfig(found as BaptismConfig);
    });
    return () => unsub();
  }, []);

  const handleRegister = () => {
    if(!name || !phone) return alert("Preencha todos os campos");
    openWhatsApp(`Olá! Gostaria de me inscrever para o próximo *Batismo*.\nNome: ${name}\nTelefone: ${phone}`);
  };

  return (
    <div className="animate-fade-in pb-20 bg-zinc-50 dark:bg-black min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-cyan-900">
         <img src={config.backgroundUrl} className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" />
         <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 dark:from-black via-transparent to-transparent"></div>
         <div className="relative z-10 text-center px-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-cyan-200 text-xs font-bold uppercase tracking-widest mb-6 border border-white/10 shadow-lg">
               <Droplets size={14}/> Nova Vida
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 leading-tight drop-shadow-2xl">
               Batismo nas Águas
            </h1>
            <p className="text-xl text-cyan-100 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
               A confissão pública da sua fé e o início de uma jornada extraordinária com Cristo.
            </p>
         </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-20 relative z-20">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Info Cards */}
            <div className="lg:col-span-2 space-y-8">
               <div className="bg-white dark:bg-zinc-900 p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-zinc-200 dark:border-white/10">
                  <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
                     <BookOpen className="text-cyan-500"/> O Que é o Batismo?
                  </h2>
                  <div className="prose dark:prose-invert text-zinc-600 dark:text-zinc-300 leading-relaxed text-lg">
                     <p className="mb-4">O batismo é um ato de fé e obediência a Deus, no qual a pessoa declara publicamente que decidiu seguir Jesus. Ele simboliza o fim de uma vida antiga e o começo de uma nova vida com Cristo. Ao se batizar, você mostra seu compromisso com Deus e dá um passo importante de transformação e comunhão com Ele. É um convite para viver uma vida renovada, cheia de propósito e esperança. É um ato simbólico que representa:</p>
                     <ul className="space-y-4 mb-6">
                        <li className="flex items-start gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-white/5"><div className="mt-1 w-8 h-8 rounded-full bg-cyan-500 text-white flex items-center justify-center shrink-0 text-sm font-black">1</div> <div><strong className="block text-zinc-900 dark:text-white mb-1">Morte para o mundo</strong> Ao ser imerso, simbolizamos nossa morte para o pecado e para a velha vida.</div></li>
                        <li className="flex items-start gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-white/5"><div className="mt-1 w-8 h-8 rounded-full bg-cyan-500 text-white flex items-center justify-center shrink-0 text-sm font-black">2</div> <div><strong className="block text-zinc-900 dark:text-white mb-1">Ressurreição em Cristo</strong> Ao levantar das águas, declaramos novidade de vida pelo poder do Espírito.</div></li>
                     </ul>
                     <p className="font-serif italic text-cyan-600">"Quem crer e for batizado será salvo..." (Marcos 16:16)</p>
                  </div>
               </div>

               {/* Downloads Section */}
               {config.documents && config.documents.length > 0 && (
                 <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-200 dark:border-white/10 shadow-lg">
                    <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-6 flex items-center gap-2"><FileText size={20}/> Materiais de Apoio</h3>
                    <div className="grid gap-4">
                       {config.documents.map((doc, idx) => (
                          <a key={idx} href={doc.url} target="_blank" className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 dark:bg-black border border-zinc-100 dark:border-white/10 hover:border-cyan-500 transition-colors group">
                             <span className="font-bold text-zinc-700 dark:text-zinc-300 group-hover:text-cyan-600 transition-colors">{doc.title}</span>
                             <Download size={20} className="text-zinc-400 group-hover:text-cyan-500"/>
                          </a>
                       ))}
                    </div>
                 </div>
               )}

               <div className="bg-zinc-50 dark:bg-black p-8 rounded-[2.5rem] border border-zinc-200 dark:border-white/10">
                  <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-6 uppercase tracking-wider flex items-center gap-2"><HelpCircle size={20}/> Perguntas Frequentes</h3>
                  <div className="grid gap-4">
                     {[
                        {q: "Preciso fazer algum curso?", a: "Sim, oferecemos o 'Curso de Batismo' (3 aulas) para você entender plenamente sua decisão."},
                        {q: "Crianças podem se batizar?", a: "Batizamos crianças a partir de 12 anos, desde que demonstrem consciência do pecado e da salvação."},
                        {q: "O que preciso levar?", a: "No dia, traga uma muda de roupa escura (camiseta e bermuda/calça) e toalha. A igreja fornece a beca."}
                     ].map((faq, i) => (
                        <div key={i} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm">
                           <h4 className="font-bold text-zinc-900 dark:text-white mb-2">{faq.q}</h4>
                           <p className="text-zinc-500 text-sm">{faq.a}</p>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Registration Form - Sticky */}
            <div className="lg:col-span-1">
               <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] shadow-2xl border-t-8 border-cyan-500 sticky top-28">
                  <div className="text-center mb-8">
                     <span className="bg-cyan-100 text-cyan-700 text-[10px] font-bold uppercase px-3 py-1 rounded-full tracking-widest">Próxima Data</span>
                     <h3 className="text-3xl font-black text-zinc-900 dark:text-white mt-4 mb-2">{config.nextDate}</h3>
                     <p className="text-zinc-500 text-sm">Domingo • 10h da Manhã</p>
                  </div>

                  <div className="space-y-4">
                     <div>
                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Nome Completo</label>
                        <input className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-white/10 p-4 rounded-xl text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500 transition-all" value={name} onChange={e => setName(e.target.value)} placeholder="Seu nome" />
                     </div>
                     <div>
                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">WhatsApp</label>
                        <input className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-white/10 p-4 rounded-xl text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500 transition-all" value={phone} onChange={e => setPhone(e.target.value)} placeholder="(21) 99999-9999" />
                     </div>
                     <button onClick={handleRegister} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-4 rounded-xl font-bold uppercase tracking-widest shadow-lg shadow-cyan-500/30 transition-all flex items-center justify-center gap-2 group">
                        Inscrever-se <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
                     </button>
                     <p className="text-center text-[10px] text-zinc-400 mt-4">Nossa equipe entrará em contato para agendar sua entrevista pastoral.</p>
                  </div>
               </div>
            </div>

         </div>
      </div>
    </div>
  );
}
