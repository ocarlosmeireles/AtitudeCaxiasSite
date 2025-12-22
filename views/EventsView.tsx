
import React, { useState } from 'react';
import { Event } from '../types';
import { Calendar, Clock, MapPin, X, CheckCircle, Camera, Search, Filter, Ticket } from 'lucide-react';
import { formatCurrency, openWhatsApp } from '../utils';

const EventRegistrationModal = ({ event, onClose }: { event: Event, onClose: () => void }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  if (!event) return null;
  const isFree = event.price === 0;

  const handleRegister = () => {
    let message = "";
    if (isFree) {
      message = `*NOVA INSCRIÇÃO (GRATUITO)*\n\nEvento: ${event.title}\nNome: ${name}\nTelefone: ${phone}\n\nGostaria de confirmar minha presença!`;
    } else {
      message = `*NOVA INSCRIÇÃO (COM PAGAMENTO)*\n\nEvento: ${event.title}\nValor: ${formatCurrency(event.price)}\nNome: ${name}\nTelefone: ${phone}\n\n*Segue em anexo o meu comprovante de pagamento.*`;
    }
    openWhatsApp(message);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
       <div className="bg-white dark:bg-zinc-900 w-full max-w-4xl rounded-[2.5rem] overflow-hidden shadow-2xl relative flex flex-col md:flex-row max-h-[90vh]">
          {/* Image Side */}
          <div className="md:w-1/2 relative h-64 md:h-auto">
             <img src={event.image || "https://images.unsplash.com/photo-1544531586-fde5298cdd40"} className="absolute inset-0 w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
             <div className="absolute bottom-8 left-8 text-white">
                <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase mb-4 shadow-lg ${isFree ? 'bg-green-500' : 'bg-brand-orange'}`}>{isFree ? 'Entrada Franca' : 'Inscrição Paga'}</span>
                <h3 className="text-4xl font-black uppercase leading-none mb-2">{event.title}</h3>
                <p className="text-white/80 font-bold flex items-center gap-2"><MapPin size={14}/> {event.location}</p>
             </div>
          </div>

          {/* Form Side */}
          <div className="md:w-1/2 p-8 md:p-12 relative flex flex-col justify-center">
             <button onClick={onClose} className="absolute top-6 right-6 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"><X size={24}/></button>
             
             <div className="mb-8">
                <div className="flex items-center gap-6 mb-6">
                   <div className="text-center">
                      <span className="block text-3xl font-black text-zinc-900 dark:text-white leading-none">{event.date.split(' ')[0]}</span>
                      <span className="text-xs font-bold text-zinc-500 uppercase">{event.date.split(' ')[1]}</span>
                   </div>
                   <div className="h-10 w-[1px] bg-zinc-200 dark:bg-white/10"></div>
                   <div>
                      <p className="text-zinc-900 dark:text-white font-bold text-lg">{event.time}</p>
                      <p className="text-zinc-500 text-xs">Horário de Início</p>
                   </div>
                   <div className="ml-auto">
                      <p className="text-2xl font-black text-brand-orange">{isFree ? 'GRÁTIS' : formatCurrency(event.price)}</p>
                   </div>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{event.description || "Junte-se a nós neste evento especial. Grandes coisas o Senhor fará."}</p>
             </div>

             <div className="space-y-4">
                <div className="bg-zinc-50 dark:bg-black/50 p-4 rounded-xl border border-zinc-200 dark:border-white/5">
                   <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Seu Nome</label>
                   <input className="w-full bg-transparent text-zinc-900 dark:text-white font-bold outline-none" value={name} onChange={e => setName(e.target.value)} placeholder="Nome Completo" />
                </div>
                <div className="bg-zinc-50 dark:bg-black/50 p-4 rounded-xl border border-zinc-200 dark:border-white/5">
                   <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">WhatsApp</label>
                   <input className="w-full bg-transparent text-zinc-900 dark:text-white font-bold outline-none" value={phone} onChange={e => setPhone(e.target.value)} placeholder="(21) 99999-9999" />
                </div>
                <button onClick={handleRegister} className="w-full bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-brand-orange dark:hover:bg-brand-orange hover:text-white dark:hover:text-white py-4 rounded-xl font-bold uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-2 mt-4">
                   {isFree ? <CheckCircle size={20}/> : <Camera size={20}/>} {isFree ? 'Confirmar Presença' : 'Enviar Comprovante'}
                </button>
             </div>
          </div>
       </div>
    </div>
  );
};

export const EventsView = ({ events }: { events: Event[] }) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [filter, setFilter] = useState('Todos');

  const categories = ['Todos', 'Geral', 'Jovens', 'Mulheres', 'Homens', 'Kids'];
  const filteredEvents = filter === 'Todos' ? events : events.filter(e => e.category === filter);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black pb-20 animate-fade-in">
       {/* Hero Header */}
       <div className="bg-zinc-900 text-white pt-32 pb-20 px-4 rounded-b-[3rem] relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/20 rounded-full blur-[128px]"></div>
          <div className="max-w-6xl mx-auto relative z-10 text-center">
             <span className="bg-white/10 backdrop-blur border border-white/20 text-white text-xs font-bold uppercase px-4 py-2 rounded-full tracking-widest mb-6 inline-block">Portal de Eventos</span>
             <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">Agenda Atitude</h2>
             <p className="text-zinc-400 max-w-xl mx-auto text-lg">Fique por dentro de tudo o que acontece em nossa igreja. Conferências, retiros, cultos especiais e muito mais.</p>
          </div>
       </div>

       <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-20">
          {/* Filters */}
          <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-xl border border-zinc-100 dark:border-white/5 flex flex-wrap gap-2 justify-center mb-12">
             {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${filter === cat ? 'bg-brand-orange text-white shadow-lg' : 'bg-zinc-100 dark:bg-white/5 text-zinc-500 hover:bg-zinc-200 dark:hover:bg-white/10'}`}
                >
                  {cat}
                </button>
             ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {filteredEvents.map(event => (
                <div key={event.id} onClick={() => setSelectedEvent(event)} className="bg-white dark:bg-zinc-900 rounded-[2.5rem] overflow-hidden border border-zinc-200 dark:border-white/5 shadow-lg cursor-pointer group hover:-translate-y-2 transition-transform duration-500 flex flex-col h-full">
                   <div className="h-64 relative overflow-hidden">
                      <img src={event.image || "https://images.unsplash.com/photo-1544531586-fde5298cdd40"} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">{event.category}</div>
                      <div className="absolute bottom-6 left-6 text-white">
                         <div className="flex items-end gap-3 mb-2">
                            <span className="text-4xl font-black leading-none">{event.date.split(' ')[0]}</span>
                            <span className="text-sm font-bold uppercase mb-1">{event.date.split(' ')[1]}</span>
                         </div>
                         <h3 className="text-2xl font-black uppercase leading-none group-hover:text-brand-orange transition-colors">{event.title}</h3>
                      </div>
                   </div>
                   <div className="p-8 flex flex-col flex-grow">
                      <div className="space-y-3 mb-6">
                         <div className="flex items-center text-zinc-500 text-sm font-medium"><Clock size={16} className="mr-3 text-brand-orange"/> {event.time}</div>
                         <div className="flex items-center text-zinc-500 text-sm font-medium"><MapPin size={16} className="mr-3 text-brand-orange"/> {event.location}</div>
                      </div>
                      <div className="mt-auto pt-6 border-t border-zinc-100 dark:border-white/5 flex justify-between items-center">
                         <span className="text-lg font-black text-zinc-900 dark:text-white">{event.price === 0 ? 'Grátis' : formatCurrency(event.price)}</span>
                         <span className="bg-zinc-900 dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-xs font-bold uppercase flex items-center gap-2 group-hover:bg-brand-orange group-hover:text-white transition-colors">
                            Ingressos <Ticket size={14}/>
                         </span>
                      </div>
                   </div>
                </div>
             ))}
          </div>
          
          {filteredEvents.length === 0 && (
             <div className="text-center py-20">
                <Calendar size={48} className="text-zinc-300 mx-auto mb-4"/>
                <p className="text-zinc-500 font-medium">Nenhum evento encontrado nesta categoria.</p>
             </div>
          )}
       </div>
       {selectedEvent && <EventRegistrationModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
    </div>
  );
};
