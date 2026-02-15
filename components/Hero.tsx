
import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Smile, Zap, Ghost, Clock, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onCtaClick: () => void;
}

const ROAST_MESSAGES = [
  "Confidence level: delusional.",
  "You had one job. Your brain outsourced it.",
  "I've seen better decision making from expired yogurt.",
  "That was not intuition. That was panic dressed as confidence.",
  "You didn’t choose wrong. Wrong chose you.",
  "Your logic is an abstract concept. Very abstract.",
  "Error 404: Intuition not found in this sector.",
  "If guessing was an Olympic sport, you'd be in last place."
];

const COOLDOWN_MS = 24 * 60 * 60 * 1000;

interface ParallaxBadgeProps {
  label: string;
  isSelected: boolean;
  isLocked: boolean;
  disabled: boolean;
  onClick: () => void;
}

const ParallaxBadge: React.FC<ParallaxBadgeProps> = ({ 
  label, 
  isSelected, 
  isLocked, 
  disabled, 
  onClick 
}) => {
  const cardRef = useRef<HTMLButtonElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Smooth tilt calculation
    const rotateX = (y - centerY) / 8;
    const rotateY = (centerX - x) / 12;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <button
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) ${isSelected ? 'scale(1.02)' : 'scale(1)'}`,
        transition: 'transform 0.1s ease-out, background-color 0.3s ease, box-shadow 0.2s ease'
      }}
      className={`relative w-full h-[120px] flex items-center justify-center p-6 border-[4px] border-black transition-all group overflow-hidden rounded-[32px]
        ${isSelected ? 'bg-[#FFCF25] shadow-none translate-x-1 translate-y-1' : 'bg-white shadow-[10px_10px_0px_#000] hover:shadow-[14px_14px_0px_#000]'}
        ${isLocked || disabled ? 'opacity-40 grayscale cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <div className="flex flex-col items-center gap-2 relative z-10">
        <Ghost size={20} className={`opacity-20 group-hover:opacity-100 transition-opacity ${isSelected ? 'text-black opacity-100' : 'text-gray-400'}`} />
        <span className={`text-xl md:text-2xl font-black uppercase italic tracking-tighter text-center leading-tight transition-all
          ${isSelected ? 'text-black' : 'text-black'}
        `}>
          {label}
        </span>
      </div>
      
      {isSelected && (
        <div className="absolute top-4 right-6 text-black animate-pulse">
          <Zap size={18} fill="currentColor" />
        </div>
      )}
    </button>
  );
};

const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<'idle' | 'evaluating' | 'roasting' | 'success'>('idle');
  const [roastText, setRoastText] = useState("");
  const typingIntervalRef = useRef<number | null>(null);

  const funnyBadges = [
    { label: "Professional Hater" },
    { label: "Funeral Stand-in" },
    { label: "Break-up Proxy" },
    { label: "Fake Alibi" },
    { label: "Luxury Trash Disposal" },
    { label: "Professional Victim" },
    { label: "Ghosting Service" },
    { label: "Stalker for Hire" }
  ];

  useEffect(() => {
    checkCooldown();
    const timer = setInterval(checkCooldown, 1000);
    return () => clearInterval(timer);
  }, []);

  const checkCooldown = () => {
    const lastAttempt = localStorage.getItem('oddball_last_attempt');
    if (lastAttempt) {
      const elapsed = Date.now() - parseInt(lastAttempt);
      if (elapsed < COOLDOWN_MS) {
        setIsLocked(true);
        setTimeLeft(COOLDOWN_MS - elapsed);
      } else {
        setIsLocked(false);
        setTimeLeft(0);
      }
    }
  };

  const formatTime = (ms: number) => {
    const h = Math.floor(ms / (1000 * 60 * 60));
    const m = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((ms % (1000 * 60)) / 1000);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleBadgeClick = (label: string) => {
    if (isLocked || gameStatus !== 'idle') return;
    
    if (selected.includes(label)) {
      setSelected(prev => prev.filter(s => s !== label));
    } else if (selected.length < 3) {
      setSelected(prev => [...prev, label]);
    }
  };

  const startRoast = () => {
    const msg = ROAST_MESSAGES[Math.floor(Math.random() * ROAST_MESSAGES.length)];
    setRoastText("");
    setGameStatus('roasting');
    
    let i = 0;
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    
    typingIntervalRef.current = window.setInterval(() => {
      setRoastText(msg.slice(0, i + 1));
      i++;
      if (i >= msg.length) {
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
        setTimeout(() => {
          setGameStatus('idle');
          setSelected([]);
        }, 3000);
      }
    }, 50);
  };

  const triggerEvaluation = () => {
    if (selected.length !== 3) return;
    
    setGameStatus('evaluating');
    localStorage.setItem('oddball_last_attempt', Date.now().toString());
    
    setTimeout(() => {
      const isWinner = Math.random() < 0.15;
      if (isWinner) {
        setGameStatus('success');
      } else {
        startRoast();
      }
      checkCooldown();
    }, 2000);
  };

  return (
    <section className="relative min-h-screen pt-32 pb-32 flex flex-col items-center justify-start bg-white overflow-hidden">
      {/* Decorative Blur Layers */}
      <div className="absolute top-20 right-[-50px] w-96 h-96 bg-[#FF00D6] rounded-full opacity-5 blur-[120px]"></div>
      <div className="absolute bottom-20 left-[-50px] w-96 h-96 bg-[#76C24F] rounded-full opacity-5 blur-[120px]"></div>
      
      <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center">
        
        {/* Title Section */}
        <div className="text-center mb-16 relative">
          <h1 className="text-7xl md:text-[8rem] font-black uppercase leading-[0.8] tracking-tighter mb-8 italic text-black">
            AJEEBO <br />
            <span className="text-[#8B5CF6]">GAREEB</span>
          </h1>
          <p className="text-lg md:text-2xl font-bold text-gray-400 max-w-xl mx-auto uppercase tracking-tighter leading-none">
            India's first premium marketplace for things you're <span className="text-black">too lazy</span> or <span className="text-black underline decoration-[#FF00D6] decoration-4">too rich</span> to do yourself.
          </p>
        </div>

        {/* Game Grid - Refined 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mb-16">
          {funnyBadges.map((badge, i) => (
            <ParallaxBadge
              key={i}
              label={badge.label}
              isSelected={selected.includes(badge.label)}
              isLocked={isLocked}
              disabled={isLocked || (gameStatus !== 'idle' && gameStatus !== 'evaluating')}
              onClick={() => handleBadgeClick(badge.label)}
            />
          ))}
        </div>

        {/* Action / Lock Section */}
        <div className="flex flex-col items-center gap-6">
          {isLocked ? (
            <div className="neo-card bg-black text-white px-10 py-5 flex flex-col items-center gap-2 border-4 border-[#8B5CF6] shadow-[10px_10px_0px_#8B5CF6] animate-in fade-in zoom-in">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em]">
                <Clock size={16} className="text-[#8B5CF6]" /> Lock Active
              </div>
              <div className="text-3xl font-black tracking-tighter italic">{formatTime(timeLeft)}</div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <button 
                onClick={triggerEvaluation}
                disabled={selected.length !== 3 || gameStatus !== 'idle'}
                className={`neo-btn text-xl px-16 py-6 transition-all !rounded-[40px] uppercase italic font-black shadow-[10px_10px_0px_#000]
                  ${selected.length === 3 && gameStatus === 'idle' ? 'bg-[#FF00D6] hover:scale-105 text-white' : 'bg-gray-100 !text-gray-300 !shadow-none cursor-not-allowed'}
                `}
              >
                {gameStatus === 'evaluating' ? 'Verifying Signal...' : 'Verify Intuition'}
              </button>
              {selected.length > 0 && selected.length < 3 && (
                <p className="text-[10px] font-black uppercase tracking-widest text-[#FF00D6] animate-pulse italic">Select {3 - selected.length} more to continue</p>
              )}
            </div>
          )}
        </div>

        <div className="mt-16">
          <button 
            onClick={onCtaClick}
            className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-300 hover:text-black transition-colors flex items-center gap-2"
          >
            Explore Services <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Popups */}
      {gameStatus === 'roasting' && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-white/40 backdrop-blur-md animate-in fade-in duration-300">
           <div className="neo-card bg-black text-white p-10 max-w-sm w-full relative border-8 border-black shadow-[20px_20px_0px_#FFCF25] rotate-[-2deg]">
              <div className="absolute -top-12 -left-12 w-24 h-24 bg-white border-4 border-black rounded-full flex items-center justify-center animate-bounce shadow-[4px_4px_0px_#000]">
                 <Ghost size={48} className="text-black" />
              </div>
              <p className="text-xs font-black text-[#FFCF25] uppercase tracking-widest mb-4 italic">Security Check Failed:</p>
              <div className="text-2xl font-black leading-tight mb-2 tracking-tighter uppercase italic">
                {roastText}
              </div>
           </div>
        </div>
      )}

      {gameStatus === 'success' && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-[#FFCF25]/20 backdrop-blur-xl animate-in zoom-in duration-500">
           <div className="neo-card bg-white p-12 max-w-md w-full text-center border-8 border-black shadow-[24px_24px_0px_#000]">
              <div className="w-24 h-24 bg-[#76C24F] border-4 border-black rounded-full flex items-center justify-center mx-auto mb-8 shadow-[6px_6px_0px_#000]">
                <CheckCircle2 size={48} className="text-white" />
              </div>
              <h3 className="text-5xl font-black uppercase italic mb-4 leading-none">ACCESS GRANTED</h3>
              <p className="font-bold text-gray-500 uppercase tracking-widest text-sm mb-10 leading-relaxed">
                You've unlocked priority access. Mission control verified.
              </p>
              <button 
                onClick={() => setGameStatus('idle')}
                className="neo-btn bg-black text-white w-full py-6 text-xl uppercase shadow-[8px_8px_0px_#76C24F] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
              >
                Enter Portal
              </button>
           </div>
        </div>
      )}
    </section>
  );
};

const ArrowRight = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

export default Hero;
