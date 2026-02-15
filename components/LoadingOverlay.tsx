
import React, { useEffect, useState } from 'react';
import { Star, Sparkles, Smile, Crown } from 'lucide-react';

const LoadingOverlay: React.FC = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[200] bg-[#f8f9fc] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
         <div className="absolute top-20 left-20 text-[#9d67ef] animate-bounce"><Star size={48} strokeWidth={1.5} /></div>
         <div className="absolute bottom-20 right-20 text-[#9d67ef] animate-pulse"><Sparkles size={64} strokeWidth={1.5} /></div>
      </div>

      <div className="relative">
        {/* Main Logo Card */}
        <div className="w-32 h-32 rounded-[48px] bg-white shadow-2xl shadow-[#9d67ef]/10 flex items-center justify-center text-[#9d67ef] text-6xl font-black italic scale-110 animate-pulse border border-[#9d67ef]/5">
          P
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mt-20 w-64 h-2 bg-white rounded-full overflow-hidden border border-[#9d67ef]/10">
        <div className="h-full bg-[#9d67ef] w-full origin-left animate-[shimmer_2s_infinite]"></div>
      </div>
      
      <div className="mt-12 flex flex-col items-center gap-6">
        <p className="text-black text-[11px] font-black uppercase tracking-[0.5em] opacity-40">
          Syncing Presence{dots}
        </p>
        <div className="flex gap-3">
           <div className="w-2.5 h-2.5 rounded-full bg-[#9d67ef] animate-bounce" style={{ animationDelay: '0s' }}></div>
           <div className="w-2.5 h-2.5 rounded-full bg-black animate-bounce" style={{ animationDelay: '0.2s' }}></div>
           <div className="w-2.5 h-2.5 rounded-full bg-[#9d67ef] animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: scaleX(0); transform-origin: left; }
          50% { transform: scaleX(1); transform-origin: left; }
          100% { transform: scaleX(0); transform-origin: right; }
        }
      `}</style>
    </div>
  );
};

export default LoadingOverlay;
