
import React, { useState } from 'react';
import { X, CalendarCheck, Clock, User, CheckCircle } from 'lucide-react';

export const CabinetModal = ({ isOpen, onClose, pastorName }: any) => {
  const [day, setDay] = useState('');
  const [shift, setShift] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSchedule = () => {
    if(!day || !shift || !name) return alert("Preencha todos os campos");
    const msg = `Olá, paz! Me chamo *${name}*. Gostaria de agendar gabinete com *${pastorName}*.\n\n*Preferência:*\nDia: ${day}\nTurno: ${shift}`;
    const phone = "5521964564689"; 
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-0 w-full max-w-md shadow-2xl relative overflow-hidden border border-white/10 animate-slide-up">
        
        {/* Header */}
        <div className="bg-brand-orange p-6 text-white relative">
           <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors bg-black/10 p-2 rounded-full"><X size={20}/></button>
           <h3 className="font-black text-2xl uppercase tracking-tight flex items-center gap-2"><CalendarCheck className="w-6 h-6"/> Agendar Gabinete</h3>
           <p className="text-white/80 text-sm mt-1">Atendimento Pastoral com {pastorName}</p>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
          <div className="space-y-2">
             <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2"><User size={14}/> Seu Nome</label>
             <input className="w-full p-4 rounded-xl bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-orange transition-all" placeholder="Digite seu nome completo" value={name} onChange={e => setName(e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2"><CalendarCheck size={14}/> Dia Preferido</label>
                <select className="w-full p-4 rounded-xl bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-orange transition-all appearance-none" value={day} onChange={e => setDay(e.target.value)}>
                  <option value="">Selecione</option>
                  <option value="Terça-feira">Terça-feira</option>
                  <option value="Quarta-feira">Quarta-feira</option>
                  <option value="Quinta-feira">Quinta-feira</option>
                </select>
             </div>
             <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2"><Clock size={14}/> Turno</label>
                <select className="w-full p-4 rounded-xl bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-orange transition-all appearance-none" value={shift} onChange={e => setShift(e.target.value)}>
                  <option value="">Selecione</option>
                  <option value="Manhã">Manhã</option>
                  <option value="Tarde">Tarde</option>
                  <option value="Noite">Noite</option>
                </select>
             </div>
          </div>

          <button onClick={handleSchedule} className="w-full bg-zinc-900 dark:bg-white text-white dark:text-black py-4 rounded-xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2">
             <CheckCircle size={20}/> Confirmar Agendamento
          </button>
          
          <p className="text-center text-[10px] text-zinc-400">Ao confirmar, você será redirecionado para o WhatsApp da secretaria.</p>
        </div>
      </div>
    </div>
  )
}
