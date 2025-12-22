
import React, { useState, useRef, useEffect } from 'react';
import { PhotoFrame } from '../types';
import { Camera, Download, RefreshCw, UploadCloud, Image as ImageIcon } from 'lucide-react';

export const PhotoGeneratorView = ({ frames }: { frames: PhotoFrame[] }) => {
  const [selectedFrame, setSelectedFrame] = useState<PhotoFrame | null>(frames[0] || null);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Set default frame if available and none selected
  useEffect(() => {
      if (!selectedFrame && frames.length > 0) setSelectedFrame(frames[0]);
  }, [frames]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserImage(event.target?.result as string);
        setGeneratedImage(null); // Reset generated
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const generateComposite = () => {
    if (!userImage || !selectedFrame || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const frameImg = new Image();
    frameImg.crossOrigin = "anonymous";
    frameImg.src = selectedFrame.frameUrl;

    frameImg.onload = () => {
      // Set canvas size to frame size (usually square 1080x1080 for Instagram)
      canvas.width = frameImg.width;
      canvas.height = frameImg.height;

      const userImg = new Image();
      userImg.src = userImage;
      userImg.onload = () => {
        // 1. Draw User Image (Scaled to 'cover' the frame)
        // Calculate aspect ratios
        const frameRatio = canvas.width / canvas.height;
        const imgRatio = userImg.width / userImg.height;
        
        let renderWidth, renderHeight, offsetX, offsetY;

        if (imgRatio > frameRatio) {
            renderHeight = canvas.height;
            renderWidth = userImg.width * (canvas.height / userImg.height);
            offsetX = (canvas.width - renderWidth) / 2; // Center horizontally
            offsetY = 0;
        } else {
            renderWidth = canvas.width;
            renderHeight = userImg.height * (canvas.width / userImg.width);
            offsetX = 0;
            offsetY = (canvas.height - renderHeight) / 2; // Center vertically
        }

        ctx.drawImage(userImg, offsetX, offsetY, renderWidth, renderHeight);

        // 2. Draw Frame on Top
        ctx.drawImage(frameImg, 0, 0);

        // 3. Export
        setGeneratedImage(canvas.toDataURL('image/png'));
      };
    };
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black pb-20 animate-fade-in pt-32 px-4">
       <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
             <span className="bg-brand-orange/10 text-brand-orange border border-brand-orange/20 text-xs font-black uppercase px-4 py-2 rounded-full tracking-widest mb-4 inline-block">Campanhas & Temas</span>
             <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter mb-4">Eu Sou Atitude</h2>
             <p className="text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">Escolha um tema, envie sua foto e mostre para todo mundo que você faz parte desta família.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
             {/* Controls */}
             <div className="space-y-8 order-2 md:order-1">
                {/* 1. Select Frame */}
                <div>
                   <h3 className="font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2"><span className="w-6 h-6 bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center justify-center text-xs">1</span> Escolha o Tema</h3>
                   <div className="grid grid-cols-3 gap-4">
                      {frames.map(frame => (
                         <button 
                            key={frame.id} 
                            onClick={() => setSelectedFrame(frame)}
                            className={`border-2 rounded-xl overflow-hidden aspect-square relative ${selectedFrame?.id === frame.id ? 'border-brand-orange ring-2 ring-brand-orange/20' : 'border-zinc-200 dark:border-white/10 opacity-60 hover:opacity-100'}`}
                         >
                            <img src={frame.frameUrl} className="w-full h-full object-contain bg-zinc-100 dark:bg-zinc-900" />
                         </button>
                      ))}
                      {frames.length === 0 && <p className="text-zinc-400 text-sm col-span-3">Nenhum tema disponível.</p>}
                   </div>
                </div>

                {/* 2. Upload Photo */}
                <div>
                   <h3 className="font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2"><span className="w-6 h-6 bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center justify-center text-xs">2</span> Sua Foto</h3>
                   <div 
                     onClick={() => fileInputRef.current?.click()}
                     className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl p-8 text-center cursor-pointer hover:border-brand-orange hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all group"
                   >
                      <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
                      <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-400 group-hover:text-brand-orange transition-colors">
                         <UploadCloud size={32}/>
                      </div>
                      <p className="text-sm font-bold text-zinc-600 dark:text-zinc-300">Clique para carregar sua foto</p>
                   </div>
                </div>

                <button 
                    onClick={generateComposite} 
                    disabled={!userImage || !selectedFrame}
                    className="w-full bg-brand-orange text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2"
                >
                    <RefreshCw size={20} /> Gerar Imagem
                </button>
             </div>

             {/* Preview Area */}
             <div className="order-1 md:order-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-3xl p-6 shadow-2xl">
                <h3 className="text-center font-bold text-zinc-400 uppercase tracking-widest text-xs mb-4">Prévia do Resultado</h3>
                
                <div className="aspect-square bg-zinc-100 dark:bg-black rounded-xl overflow-hidden relative flex items-center justify-center border border-zinc-200 dark:border-white/5">
                   {generatedImage ? (
                       <img src={generatedImage} className="w-full h-full object-contain" />
                   ) : (
                       <div className="relative w-full h-full">
                           {/* User Image Layer */}
                           {userImage && <img src={userImage} className="absolute inset-0 w-full h-full object-cover opacity-50 blur-sm" />}
                           
                           {/* Frame Layer */}
                           {selectedFrame && <img src={selectedFrame.frameUrl} className="absolute inset-0 w-full h-full object-contain z-10" />}
                           
                           {!userImage && (
                               <div className="absolute inset-0 flex items-center justify-center z-0">
                                   <ImageIcon className="text-zinc-300 dark:text-zinc-700 w-24 h-24"/>
                               </div>
                           )}
                       </div>
                   )}
                </div>

                {generatedImage && (
                    <a 
                        href={generatedImage} 
                        download={`atitude_tema_${Date.now()}.png`}
                        className="w-full bg-green-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-green-700 transition-all shadow-lg flex items-center justify-center gap-2 mt-6"
                    >
                        <Download size={20}/> Baixar Imagem
                    </a>
                )}
                
                {/* Hidden Canvas for Processing */}
                <canvas ref={canvasRef} className="hidden"></canvas>
             </div>
          </div>
       </div>
    </div>
  );
};
