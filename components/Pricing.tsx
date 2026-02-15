
import React from 'react';

const Pricing: React.FC = () => {
  return (
    <section className="py-32 bg-slate-900 px-6 relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-30"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-10">Bespoke Pricing</h2>
        
        <div className="p-16 rounded-[40px] border border-amber-500/30 bg-slate-950/50 backdrop-blur-3xl shadow-[0_0_100px_rgba(245,158,11,0.05)]">
          <p className="text-amber-500 text-sm font-bold tracking-[0.3em] uppercase mb-8">Base Investment</p>
          <div className="text-6xl md:text-8xl font-serif font-bold mb-8 tracking-tighter">
            ₹2,000<span className="text-2xl text-slate-500 font-sans font-light"> / session</span>
          </div>
          <p className="text-xl text-slate-400 font-light mb-12 max-w-lg mx-auto leading-relaxed">
            Every experience is unique. We provide flexible pricing based on service type, duration, and custom requirements.
          </p>
          
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm font-medium text-slate-500 uppercase tracking-widest">
            <div className="flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              No Hidden Fees
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              Flexible Duration
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              Full Discretion
            </div>
          </div>
        </div>
        
        <p className="mt-12 text-slate-500 italic">
          * Final quotes are provided after initial consultation.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
