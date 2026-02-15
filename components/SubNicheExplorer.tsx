
import React, { useState, useEffect } from 'react';
import { Category } from '../constants';
import { Sparkles, ArrowUpRight, Star, Heart, Ghost, Zap, Trash2, Camera, Smile, ShieldCheck, HelpCircle } from 'lucide-react';

interface SubNicheExplorerProps {
  category: Category;
  onSelect: (title: string) => void;
  activeSubNiche: string;
  onBack: () => void;
}

const ServiceIllustration = ({ serviceId }: { serviceId: string }) => {
  // Floating mini-elements for specific services
  switch (serviceId) {
    case 'cl1': return <span className="absolute top-2 right-2 text-2xl animate-bounce">⏳</span>; // Queue
    case 'sf1': return <div className="absolute top-2 right-2 flex gap-1"><Camera size={14} className="text-white animate-pulse" /><Zap size={14} className="text-yellow-400" /></div>;
    case 'cp1': return <span className="absolute -top-2 -right-2 text-2xl">🤫</span>; // Listener
    case 'wc2': return <span className="absolute top-2 right-2 text-2xl animate-spin-slow">📵</span>; // Detox
    default: return <Star size={16} className="absolute top-2 right-2 text-white animate-pulse" />;
  }
};

const SubNicheExplorer: React.FC<SubNicheExplorerProps> = ({ category, onSelect, activeSubNiche, onBack }) => {
  return (
    <section className="min-h-screen py-32 bg-white dark:bg-[#1a1a1a] px-6 relative overflow-hidden flex flex-col items-center">
      {/* Background Decor - HEAVILY ENHANCED */}
      <div className="absolute top-0 right-0 pointer-events-none opacity-[0.03] z-0">
        <h4 className="text-[35vw] font-black uppercase tracking-tighter text-black dark:text-white leading-none">{category.title.split(' ')[0]}</h4>
      </div>

      {/* Floating Chaos Doodles */}
      <div className="absolute top-20 left-[10%] w-24 h-24 border-4 border-dashed border-[#FF00D6] rounded-full opacity-20 animate-spin-slow"></div>
      <div className="absolute top-40 right-[15%] text-8xl opacity-10 rotate-12">🤪</div>
      <div className="absolute bottom-40 left-[5%] text-8xl opacity-10 -rotate-12">🦄</div>
      <div className="absolute top-1/2 left-10 text-[#76C24F] opacity-20"><ShieldCheck size={120} /></div>
      <div className="absolute bottom-20 right-[20%] w-32 h-32 bg-[#FFCF25] rounded-full opacity-5 blur-2xl"></div>

      <div className="max-w-7xl w-full relative z-10">
        <div className="flex justify-between items-start mb-16">
          <button 
            onClick={onBack}
            className="neo-btn bg-white dark:bg-[#262626] !text-black dark:!text-white text-[12px] flex items-center gap-2 uppercase tracking-widest group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Gimmicks
          </button>
          
          <div className="hidden md:flex gap-4">
             <div className="neo-card bg-black text-white px-4 py-1 text-[10px] font-black uppercase shadow-[4px_4px_0px_#FF00D6] rotate-2">
               Safe & Sound
             </div>
             <div className="neo-card bg-[#76C24F] text-white px-4 py-1 text-[10px] font-black uppercase shadow-[4px_4px_0px_#000] -rotate-2">
               No Judgement
             </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-12 relative">
          {/* Big Floating Exclamation */}
          <div className="absolute -right-10 top-0 text-[#FF00D6] text-9xl font-black italic opacity-40 animate-bounce select-none">!</div>
          
          <div className="max-w-2xl">
            <div className="inline-block bg-[#FF00D6] text-white px-4 py-1 border-2 border-black mb-6 rotate-[-2deg] text-xs font-black uppercase shadow-[4px_4px_0px_#000]">
              The {category.title} Files
            </div>
            <h2 className="text-7xl md:text-[10rem] font-black uppercase leading-[0.75] tracking-tighter mb-4 italic">
              {category.title}<span className="text-[#FF00D6]">!</span>
            </h2>
            <p className="text-xl md:text-3xl font-black text-gray-300 uppercase tracking-tighter leading-none mt-4">
               {category.description}
            </p>
          </div>
          
          <div className="flex gap-4 items-center">
            <div className="relative group">
              <div className="w-24 h-24 neo-card flex items-center justify-center bg-[#FFCF25] rotate-[-10deg] shadow-[8px_8px_0px_#000] group-hover:rotate-0 transition-transform">
                <Star size={40} className="text-black" fill="black" />
              </div>
              <div className="absolute -top-4 -right-4 bg-white border-2 border-black p-2 rounded-full text-[8px] font-black uppercase">Verified</div>
            </div>
            <div className="w-24 h-24 neo-card flex items-center justify-center bg-[#76C24F] rotate-[15deg] shadow-[8px_8px_0px_#000]">
              <Sparkles size={40} className="text-white" fill="white" />
            </div>
          </div>
        </div>

        {/* The Grid with more character */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {category.subNiches.map((niche, idx) => (
            <div 
              key={niche.id}
              onClick={() => onSelect(niche.title)}
              className="neo-card p-6 cursor-pointer group overflow-visible relative transition-all hover:scale-[1.02]"
              style={{ backgroundColor: niche.color + '08' }}
            >
              {/* Funny Absolute Overlays per card */}
              <div className="absolute -top-5 -right-5 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-[#8B5CF6] text-white text-[10px] font-black uppercase px-4 py-2 border-2 border-black shadow-[4px_4px_0px_#000] rotate-12">
                   Pick Me!
                </div>
              </div>

              {/* Floating Illustration */}
              <ServiceIllustration serviceId={niche.id} />

              <div className="relative aspect-[4/3] rounded-[24px] border-4 border-black overflow-hidden mb-6">
                <img 
                  src={niche.image} 
                  className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-2 transition-transform duration-700" 
                  alt={niche.title}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-all"></div>
                
                {/* Certified Weird Stamp */}
                <div className="absolute top-4 left-4 -rotate-12 group-hover:rotate-0 transition-transform">
                   <div className="bg-[#FF00D6] border-2 border-black text-[10px] font-black text-white px-3 py-1 rounded-sm uppercase shadow-[4px_4px_0px_#000]">
                     {idx % 2 === 0 ? 'Certified Odd' : 'Rare Find'}
                   </div>
                </div>

                <div className="absolute bottom-4 left-4 bg-white border-2 border-black px-4 py-1 rounded-full text-[10px] font-black uppercase group-hover:bg-[#FFCF25] transition-colors">
                  Agent Active 🟢
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="text-3xl font-black uppercase mb-2 italic group-hover:translate-x-2 transition-transform flex items-center gap-2">
                  {niche.title}
                  <HelpCircle size={16} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h4>
                <div className="w-12 h-1 bg-black mb-3"></div>
              </div>
              
              <p className="font-bold text-gray-500 mb-8 text-sm leading-relaxed min-h-[60px] italic">
                "{niche.description}"
              </p>
              
              <div className="flex justify-between items-center pt-6 border-t-2 border-black/10 dark:border-white/10">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Investment</span>
                  <span className="font-black text-3xl tracking-tighter text-[#76C24F]">₹1,999+</span>
                </div>
                <div className="w-16 h-16 bg-black text-white rounded-3xl flex items-center justify-center group-hover:bg-[#FF00D6] group-hover:rotate-12 group-hover:-translate-y-2 transition-all shadow-[6px_6px_0px_rgba(0,0,0,0.3)]">
                  <ArrowUpRight size={32} />
                </div>
              </div>

              {/* Decorative Squiggle at bottom */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[80%] h-3 bg-[#FFCF25] rotate-[-1deg] border-2 border-black opacity-40 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>
        
        {/* Empty Space Filler at bottom */}
        <div className="mt-32 text-center opacity-10 flex flex-col items-center">
           <Smile size={100} strokeWidth={1} className="mb-4" />
           <p className="font-black uppercase tracking-[1em] text-xs">End of Files. Stay Weird.</p>
        </div>
      </div>
      
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default SubNicheExplorer;
