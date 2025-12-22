
import React, { useState } from 'react';
import { Home, Monitor, Search, X } from 'lucide-react';
import { Cell } from '../../types';

export const CellsSection = ({ cells, cellSystemUrl, showSearch = false }: { cells: Cell[], cellSystemUrl?: string, showSearch?: boolean }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  const [isSystemOpen, setIsSystemOpen] = useState(false);

  const filteredCells = cells.filter(cell => 
    (filter === '' || cell.network === filter) &&
    (searchTerm === '' || cell.district.toLowerCase().includes(searchTerm.toLowerCase()) || cell.leader.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="relative py-20 px-4 overflow-hidden bg-white dark:bg-zinc-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
          <div className="md:w-1/2">
             <h2 className="text-brand-orange font-bold uppercase tracking-widest text-sm mb-4 flex items-center"><Home className="w-4 h-4 mr-2" /> Não caminhe sozinho</h2>
             <h3 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white tracking-tighter leading-none mb-6">IGREJA EM<br/>CÉLULAS.</h3>
             <p className="text-zinc-600 dark:text-brand-gray text-lg leading-relaxed mb-6">A Célula é o lugar onde a igreja acontece de forma mais íntima. Pequenos grupos nos lares.</p>
             {cellSystemUrl && (
               <button onClick={() => setIsSystemOpen(true)} className="bg-zinc-900 dark:bg-white text-white dark:text-black px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-brand-orange hover:text-white dark:hover:bg-brand-orange dark:hover:text-white transition-all shadow-lg flex items-center gap-3">
                 <Monitor size={20} /> Acessar Sistema de Gestão
               </button>
             )}
          </div>
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            {['Amarela', 'Azul', 'Laranja', 'Verde'].map((color) => (
               <div key={color} onClick={() => showSearch && setFilter(filter === color ? '' : color)} className={`p-6 rounded-2xl text-white shadow-lg transform ${showSearch ? 'hover:-translate-y-1 cursor-pointer' : ''} transition-all border-2 ${filter === color && showSearch ? 'border-white scale-105' : 'border-transparent'} ${color === 'Amarela' ? 'bg-yellow-500' : color === 'Azul' ? 'bg-blue-600' : color === 'Laranja' ? 'bg-orange-500' : 'bg-green-600'}`}>
                <h4 className="font-black text-2xl uppercase mb-1">{color}</h4>
              </div>
            ))}
          </div>
        </div>
        {isSystemOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-zinc-900 w-full h-full md:w-[90vw] md:h-[90vh] rounded-3xl overflow-hidden relative shadow-2xl flex flex-col">
              <div className="bg-zinc-100 dark:bg-black p-4 flex justify-between items-center border-b border-zinc-200 dark:border-white/10">
                <span className="font-bold text-zinc-900 dark:text-white">Sistema de Células Integrado</span>
                <button onClick={() => setIsSystemOpen(false)}><X size={20} /></button>
              </div>
              <div className="flex-grow bg-white"><iframe src={cellSystemUrl} className="w-full h-full border-0" title="Sistema de Células"></iframe></div>
            </div>
          </div>
        )}
        
        {showSearch && (
            <div className="bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden min-h-[400px]">
            <div className="relative z-10 flex flex-col md:flex-row items-end justify-between gap-8 mb-8">
                <div className="flex-grow">
                    <h3 className="text-2xl font-black text-zinc-900 dark:text-white uppercase mb-2">Encontre uma Célula</h3>
                </div>
                <div className="relative w-full sm:w-80">
                    <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Seu Bairro, Líder..." className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl py-4 pl-12 pr-4 text-zinc-900 dark:text-white focus:outline-none focus:border-brand-orange transition-colors" />
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
                </div>
            </div>
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCells.map(cell => (
                    <div key={cell.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 p-6 rounded-2xl hover:border-brand-orange transition-colors group">
                    <div className="flex justify-between items-start mb-3">
                        <div className={`text-xs font-bold uppercase px-2 py-1 rounded w-fit bg-zinc-100 dark:bg-white/5 text-zinc-500`}>Rede {cell.network}</div>
                    </div>
                    <h4 className="font-bold text-zinc-900 dark:text-white text-lg mb-1">{cell.leader}</h4>
                    <p className="text-zinc-500 dark:text-brand-gray text-sm mb-4">{cell.district}</p>
                    </div>
                ))}
            </div>
            </div>
        )}
      </div>
    </div>
  );
};
