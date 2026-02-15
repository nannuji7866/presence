
import React, { useState, useEffect, useRef } from 'react';
import { Ghost, Sparkles, Clock, Lock, ShieldAlert, CheckCircle2, Zap, AlertCircle } from 'lucide-react';

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

const SERVICES = [
  "Professional Hater",
  "Funeral Stand-In",
  "Break-Up Proxy",
  "Fake Alibi",
  "Luxury Trash Disposal",
  "Professional Victim",
  "Ghosting Service",
  "Stalker For Hire"
];

const COOLDOWN_MS = 24 * 60 * 60 * 1000;

const SelectionChallenge: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [status, setStatus] = useState<'idle' | 'evaluating' | 'roasting' | 'success'>('idle');
  const [roastText, setRoastText] = useState("");
  const [currentRoast, setCurrentRoast] = useState("");
  const typingIntervalRef = useRef<number | null>(null);

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

  const handleSelect = (service: string) => {
    if (isLocked || status !== 'idle') return;
    if (selected.includes(service)) {
      setSelected(prev => prev.filter(s => s !== service));
    } else if (selected.length < 3) {
      setSelected(prev => [...prev, service]);
    }
  };

  const startRoast = () => {
    const msg = ROAST_MESSAGES[Math.floor(Math.random() * ROAST_MESSAGES.length)];
    setCurrentRoast(msg);
    setRoastText("");
    setStatus('roasting');
    
    let i = 0;
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    
    typingIntervalRef.current = window.setInterval(() => {
      setRoastText(msg.slice(0, i + 1));
      i++;
      if (i >= msg.length) {
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
        setTimeout(() => {
          setStatus('idle');
          setSelected([]);
        }, 3000);
      }
    }, 50);
  };

  const triggerEvaluation = () => {
    if (selected.length !== 3) return;
    
    setStatus('evaluating');
    localStorage.setItem('oddball_last_attempt', Date.now().toString());
    
    setTimeout(() => {
      const isWinner = Math.random() < 0.15; // 15% success rate
      if (isWinner) {
        setStatus('success');
      } else {
        startRoast();
      }
      checkCooldown();
    }, 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-20 bg-white">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4">
          THE CHALLENGE<span className="text-[#FF00D6]">!</span>
        </h2>
        <p className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-2">
          Select the correct 3 services to unlock complimentary access.
        </p>
        <p className="text-[10px] font-black text-[#8B5CF6] uppercase tracking-[0.3em]">
          One attempt allowed every 24 hours. Choose wisely.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
        {SERVICES.map((s) => {
          const isSelected = selected.includes(s);
          return (
            <button
              key={s}
              onClick={() => handleSelect(s)}
              disabled={isLocked || status !== 'idle'}
              className={`neo-card p-6 text-center transition-all duration-300 relative group h-32 flex flex-col items-center justify-center
                ${isSelected ? 'bg-[#FFCF25] scale-105 shadow-none translate-x-1 translate-y-1' : 'bg-white hover:-translate-y-1'}
                ${isLocked || (status !== 'idle' && status !== 'evaluating') ? 'opacity-50 grayscale cursor-not-allowed' : ''}
              `}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 text-black animate-pulse">
                  <Zap size={14} fill="currentColor" />
                </div>
              )}
              <span className="text-[10px] font-black uppercase tracking-tight leading-tight group-hover:scale-110 transition-transform">
                {s}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-6">
        {isLocked ? (
          <div className="neo-card bg-black text-white px-8 py-4 flex flex-col items-center gap-2 border-4 border-[#8B5CF6] shadow-[8px_8px_0px_#8B5CF6]">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest">
              <Clock size={16} className="text-[#8B5CF6]" /> Attempt Locked
            </div>
            <div className="text-2xl font-black tracking-tighter italic">{formatTime(timeLeft)}</div>
          </div>
        ) : (
          <button
            onClick={triggerEvaluation}
            disabled={selected.length !== 3 || status !== 'idle'}
            className={`neo-btn text-xl px-12 py-5 uppercase italic font-black transition-all
              ${selected.length === 3 && status === 'idle' ? 'bg-[#FF00D6] shadow-[8px_8px_0px_#000] hover:scale-105' : 'bg-gray-200 !text-gray-400 !shadow-none cursor-not-allowed'}
            `}
          >
            {status === 'evaluating' ? 'ANALYZING INTUITION...' : 'VERIFY SELECTION'}
          </button>
        )}
      </div>

      {/* Evaluation States */}
      {status === 'evaluating' && (
        <div className="mt-8 flex justify-center gap-2 animate-pulse">
           {[0, 1, 2].map(i => (
             <div key={i} className="w-3 h-3 bg-black rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}></div>
           ))}
        </div>
      )}

      {/* Roast Popup */}
      {status === 'roasting' && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-white/40 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="neo-card bg-black text-white p-10 max-w-sm w-full relative border-8 border-black shadow-[20px_20px_0px_#FFCF25] rotate-[-2deg]">
              <div className="absolute -top-12 -left-12 w-24 h-24 bg-white border-4 border-black rounded-full flex items-center justify-center animate-bounce shadow-[4px_4px_0px_#000]">
                 <Ghost size={48} className="text-black" />
              </div>
              <p className="text-xs font-black text-[#FFCF25] uppercase tracking-widest mb-4 italic">Security Agent Blossom says:</p>
              <div className="text-2xl font-black leading-tight mb-2 tracking-tighter uppercase italic min-h-[4rem]">
                {roastText}
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full mt-6 overflow-hidden">
                <div className="h-full bg-[#FFCF25] animate-[shimmer_3s_linear_infinite]" style={{ width: '40%' }}></div>
              </div>
           </div>
        </div>
      )}

      {/* Success Popup */}
      {status === 'success' && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-[#FFCF25]/20 backdrop-blur-xl animate-in zoom-in duration-500">
           <div className="neo-card bg-white p-12 max-w-md w-full text-center border-8 border-black shadow-[24px_24px_0px_#000]">
              <div className="w-24 h-24 bg-[#76C24F] border-4 border-black rounded-full flex items-center justify-center mx-auto mb-8 shadow-[6px_6px_0px_#000] animate-bounce">
                <CheckCircle2 size={48} className="text-white" />
              </div>
              <h3 className="text-5xl font-black uppercase italic mb-4 leading-none">ACCESS GRANTED<span className="text-[#76C24F]">!</span></h3>
              <p className="font-black text-gray-500 uppercase tracking-widest text-sm mb-10 leading-relaxed">
                You've unlocked <span className="text-black underline">complimentary priority access</span>. Intuition verified by mission control.
              </p>
              <button 
                onClick={() => setStatus('idle')}
                className="neo-btn bg-black text-white w-full py-6 text-xl uppercase italic shadow-[8px_8px_0px_#76C24F] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
              >
                Continue to Portal
              </button>
           </div>
        </div>
      )}

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
      `}</style>
    </div>
  );
};

export default SelectionChallenge;
