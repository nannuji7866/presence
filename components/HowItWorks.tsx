
import React from 'react';
import { Search, Calendar, CheckCircle } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "Discover",
      description: "Browse our exclusive portfolio of lifestyle specialists and companions."
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Sync",
      description: "Match your schedule with on-demand availability through our portal."
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Experience",
      description: "Enjoy unparalleled human presence with surgical precision."
    }
  ];

  return (
    <section className="py-40 bg-[#f8f9fc] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="text-center mb-32">
          <span className="text-[#9d67ef] font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">The Process</span>
          <h2 className="text-5xl font-serif font-bold mb-4 italic text-black">How it flows.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
          <div className="hidden md:block absolute top-[40px] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#9d67ef]/20 to-transparent -z-0"></div>
          
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group z-10">
              <div className="w-24 h-24 rounded-[32px] bg-white border border-gray-100 flex items-center justify-center text-[#9d67ef] mb-10 group-hover:scale-110 group-hover:border-[#9d67ef] transition-all duration-500 shadow-xl shadow-gray-200/50">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-black">{step.title}</h3>
              <p className="text-gray-500 leading-relaxed max-w-xs text-sm font-medium">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
