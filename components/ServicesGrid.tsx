
import React from 'react';
import { Category } from '../constants';
import { Star, Zap, ShieldCheck, Heart, Sparkles, Smile } from 'lucide-react';

interface ServicesGridProps {
  categories: Category[];
  onCategorySelect: (category: Category) => void;
  activeCategory: Category | null;
}

const CategoryMascot = ({ id }: { id: string }) => {
  switch (id) {
    case 'comfort-presence': return <span className="text-8xl opacity-10 absolute -right-4 -bottom-4 rotate-12 group-hover:rotate-0 transition-transform duration-500">🧸</span>;
    case 'status-flex': return <span className="text-8xl opacity-10 absolute -right-4 -bottom-4 rotate-12 group-hover:rotate-0 transition-transform duration-500">💎</span>;
    case 'convenience-lazy': return <span className="text-8xl opacity-10 absolute -right-4 -bottom-4 rotate-12 group-hover:rotate-0 transition-transform duration-500">🛌</span>;
    case 'wellness-chill': return <span className="text-8xl opacity-10 absolute -right-4 -bottom-4 rotate-12 group-hover:rotate-0 transition-transform duration-500">🧠</span>;
    case 'social-modern': return <span className="text-8xl opacity-10 absolute -right-4 -bottom-4 rotate-12 group-hover:rotate-0 transition-transform duration-500">🛡️</span>;
    case 'creator-digital': return <span className="text-8xl opacity-10 absolute -right-4 -bottom-4 rotate-12 group-hover:rotate-0 transition-transform duration-500">🎥</span>;
    case 'ultra-premium': return <span className="text-8xl opacity-10 absolute -right-4 -bottom-4 rotate-12 group-hover:rotate-0 transition-transform duration-500">🎩</span>;
    default: return null;
  }
};

const ServicesGrid: React.FC<ServicesGridProps> = ({ categories, onCategorySelect }) => {
  return (
    <section className="py-24 bg-white dark:bg-[#1a1a1a] relative overflow-hidden">
      {/* Decorative Squiggles */}
      <div className="absolute top-10 left-10 w-32 h-32 border-8 border-[#FFCF25] rounded-full opacity-10 blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-48 h-48 border-8 border-[#FF00D6] rounded-full opacity-10 blur-xl"></div>

      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-20 relative">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex gap-4 opacity-30">
             <Zap className="animate-bounce" />
             <Star className="animate-pulse" />
             <Zap className="animate-bounce delay-100" />
          </div>
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tight leading-none mb-6 relative z-10">
            CHOOSE YOUR <br /><span className="text-[#FF00D6]">VIBE CHECK</span>
          </h2>
          <div className="w-32 h-4 bg-[#FFCF25] border-4 border-black mx-auto mb-4"></div>
          <p className="font-bold text-gray-400 uppercase tracking-widest text-sm">Oddball services for unique humans</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {categories.map((category) => (
            <div 
              key={category.id}
              onClick={() => onCategorySelect(category)}
              className="neo-card p-8 cursor-pointer group hover:bg-gray-50 dark:hover:bg-[#262626] transition-all relative overflow-hidden flex flex-col justify-between h-full"
            >
              {/* Funny Background Mascot */}
              <CategoryMascot id={category.id} />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-16 h-16 bg-white dark:bg-[#1a1a1a] border-4 border-black rounded-2xl flex items-center justify-center shadow-[4px_4px_0px_#000] group-hover:scale-110 group-hover:rotate-6 transition-all">
                    {category.icon}
                  </div>
                  {/* Random "Sticker" */}
                  <div className="bg-[#76C24F] border-2 border-black px-2 py-0.5 rounded rotate-12 text-[8px] font-black uppercase text-white shadow-[2px_2px_0px_#000] group-hover:-rotate-12 transition-transform">
                    {category.id === 'ultra-premium' ? 'Expensive AF' : '100% Weird'}
                  </div>
                </div>

                <h3 className="text-3xl font-black uppercase mb-3 italic leading-tight">{category.title}</h3>
                <p className="font-bold text-gray-500 mb-8 text-sm leading-relaxed">{category.description}</p>
                
                <div className="space-y-3 mb-10">
                   {category.subNiches.slice(0, 3).map(niche => (
                     <div key={niche.id} className="flex items-center gap-2 text-xs font-black uppercase tracking-tighter text-black/60 dark:text-white/60">
                       <div className="w-1.5 h-1.5 rounded-full bg-[#FF00D6]"></div>
                       {niche.title}
                     </div>
                   ))}
                   {category.subNiches.length > 3 && (
                     <div className="text-[10px] font-black uppercase text-[#8B5CF6] tracking-widest">+ {category.subNiches.length - 3} More Oddities</div>
                   )}
                </div>
              </div>

              <div className="mt-auto flex justify-between items-center relative z-10">
                 <div className="neo-btn bg-black text-white px-6 py-3 text-[10px] uppercase tracking-widest group-hover:bg-[#8B5CF6] transition-colors">
                   Open Portfolio
                 </div>
                 <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-[#FFCF25] flex items-center justify-center text-[10px] shadow-[2px_2px_0px_#000]">👤</div>
                    ))}
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
