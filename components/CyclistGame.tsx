
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Play, RefreshCcw, Award, Zap, Mountain } from 'lucide-react';

interface CyclistGameProps {
  onClose: () => void;
}

type ObstacleType = 'cone' | 'stone' | 'pillar' | 'mountain' | 'sign' | 'hydrant';

const CyclistGame: React.FC<CyclistGameProps> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'start' | 'playing' | 'gameOver'>('start');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => Number(localStorage.getItem('cyclist-high-score')) || 0);
  
  const frameRef = useRef(0);
  const cyclistRef = useRef({ y: 0, vy: 0, isJumping: false });
  const obstaclesRef = useRef<{ x: number, type: ObstacleType, passed: boolean }[]>([]);
  const speedRef = useRef(6);
  const spawnTimerRef = useRef(100); // Initial delay to prevent immediate spawning

  const resetGame = () => {
    setScore(0);
    speedRef.current = 6;
    cyclistRef.current = { y: 0, vy: 0, isJumping: false };
    obstaclesRef.current = [];
    spawnTimerRef.current = 80; // Start with a clear path
    setGameState('playing');
  };

  const jump = useCallback(() => {
    if (!cyclistRef.current.isJumping && gameState === 'playing') {
      cyclistRef.current.vy = -14; // Slightly lighter jump
      cyclistRef.current.isJumping = true;
    }
  }, [gameState]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [jump]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let active = true;

    const update = () => {
      if (!active) return;

      const groundY = 320; // Explicit ground Y
      const cyclistW = 50;
      const cyclistH = 50;
      const cyclistX = 100;

      // Gravity and Physics
      cyclistRef.current.vy += 0.6;
      cyclistRef.current.y += cyclistRef.current.vy;

      if (cyclistRef.current.y > 0) {
        cyclistRef.current.y = 0;
        cyclistRef.current.vy = 0;
        cyclistRef.current.isJumping = false;
      }

      // Spawning obstacles
      spawnTimerRef.current--;
      if (spawnTimerRef.current <= 0) {
        const types: ObstacleType[] = ['cone', 'stone', 'pillar', 'mountain', 'sign', 'hydrant'];
        const randomType = types[Math.floor(Math.random() * types.length)];
        obstaclesRef.current.push({ 
          x: 850, // Start just off screen
          type: randomType,
          passed: false 
        });
        spawnTimerRef.current = Math.max(40, 100 - (speedRef.current * 3));
      }

      // Player Hitbox
      const hitPadding = 15;
      const cHitX = cyclistX + hitPadding;
      const cHitY = (groundY + cyclistRef.current.y - cyclistH) + hitPadding;
      const cHitW = cyclistW - (hitPadding * 2);
      const cHitH = cyclistH - (hitPadding * 2);

      // Move and check collisions
      let collisionDetected = false;
      for (const obs of obstaclesRef.current) {
        obs.x -= speedRef.current;

        let oWidth = 40;
        let oHeight = 40;
        
        switch(obs.type) {
          case 'cone': oWidth = 30; oHeight = 35; break;
          case 'stone': oWidth = 40; oHeight = 20; break;
          case 'pillar': oWidth = 25; oHeight = 65; break;
          case 'mountain': oWidth = 60; oHeight = 50; break;
          case 'sign': oWidth = 35; oHeight = 45; break;
          case 'hydrant': oWidth = 25; oHeight = 35; break;
        }

        const oHitPadding = 4;
        const oHitX = obs.x + oHitPadding;
        const oHitY = groundY - oHeight + oHitPadding;
        const oHitW = oWidth - (oHitPadding * 2);
        const oHitH = oHeight - (oHitPadding * 2);

        // AABB Collision Check
        if (
          cHitX < oHitX + oHitW &&
          cHitX + cHitW > oHitX &&
          cHitY < oHitY + oHitH &&
          cHitY + cHitH > oHitY
        ) {
          collisionDetected = true;
          break; // Stop checking others
        }

        // Score logic
        if (!obs.passed && obs.x < cyclistX) {
          obs.passed = true;
          setScore(s => s + 1);
          speedRef.current += 0.05;
        }
      }

      if (collisionDetected) {
        active = false;
        setGameState('gameOver');
        return;
      }

      obstaclesRef.current = obstaclesRef.current.filter(obs => obs.x > -150);

      // --- RENDERING ---
      ctx.fillStyle = '#E0F2FE'; 
      ctx.fillRect(0, 0, 800, 400);

      // Ground
      ctx.fillStyle = '#F1F5F9';
      ctx.fillRect(0, groundY, 800, 80);
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(800, groundY);
      ctx.stroke();

      // Cyclist Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.1)';
      const shadowSize = 35 - (Math.abs(cyclistRef.current.y) / 4);
      if (shadowSize > 2) {
        ctx.beginPath();
        ctx.ellipse(cyclistX + 25, groundY, shadowSize, 4, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Cyclist
      ctx.font = '48px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.save();
      const cDrawY = groundY + cyclistRef.current.y;
      if (cyclistRef.current.isJumping) {
        ctx.translate(cyclistX + 25, cDrawY - 24);
        ctx.rotate(-0.06);
        ctx.translate(-(cyclistX + 25), -(cDrawY - 24));
      }
      ctx.fillText('🚲', cyclistX + 25, cDrawY);
      ctx.restore();

      // Draw Obstacles
      obstaclesRef.current.forEach(obs => {
        let emoji = '🚧';
        let fontSize = '38px';
        switch(obs.type) {
          case 'cone': emoji = '🚧'; fontSize = '36px'; break;
          case 'stone': emoji = '🪨'; fontSize = '42px'; break;
          case 'pillar': emoji = '🏛️'; fontSize = '52px'; break;
          case 'mountain': emoji = '⛰️'; fontSize = '58px'; break;
          case 'sign': emoji = '🪧'; fontSize = '42px'; break;
          case 'hydrant': emoji = '🚨'; fontSize = '38px'; break;
        }
        ctx.font = `${fontSize} serif`;
        ctx.fillText(emoji, obs.x + 20, groundY);
      });

      frameRef.current = requestAnimationFrame(update);
    };

    frameRef.current = requestAnimationFrame(update);
    return () => {
      active = false;
      cancelAnimationFrame(frameRef.current);
    };
  }, [gameState]);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('cyclist-high-score', String(score));
    }
  }, [score, highScore]);

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4">
      <div className="relative w-full max-w-3xl neo-card bg-white h-[450px] overflow-hidden flex flex-col items-center select-none border-8 border-black">
        
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-20">
           <div className="bg-[#FFCF25] border-4 border-black px-6 py-2 rounded-full text-sm font-black uppercase flex items-center gap-2 shadow-[4px_4px_0px_#000]">
             <Award size={18} /> High Score: {highScore}
           </div>
           <button onClick={onClose} className="w-12 h-12 neo-card bg-white flex items-center justify-center hover:bg-[#FF00D6] hover:text-white transition-colors border-4 border-black">
              <X size={24} strokeWidth={3} />
           </button>
        </div>

        <canvas 
          ref={canvasRef} 
          width={800} 
          height={400} 
          className="w-full h-full cursor-pointer touch-none bg-[#E0F2FE]"
          onClick={jump}
        />

        {gameState === 'playing' && (
          <div className="absolute top-24 left-1/2 -translate-x-1/2 text-9xl font-black italic tracking-tighter text-black/10 pointer-events-none">
            {score}
          </div>
        )}

        {gameState === 'start' && (
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex flex-col items-center justify-center z-30">
             <div className="text-center p-12 neo-card bg-[#8B5CF6] text-white border-8 border-black shadow-[12px_12px_0px_#000] rotate-[-1deg]">
                <Mountain className="mx-auto mb-6 text-[#FFCF25]" size={72} strokeWidth={3} />
                <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-4 leading-none">CHAMBA RUNNER</h2>
                <p className="font-black uppercase tracking-widest text-xs mb-8 bg-black/20 py-2 rounded-xl border border-white/10">Jump Over the Chaos</p>
                <button 
                  onClick={resetGame}
                  className="neo-btn bg-[#FFCF25] !text-black text-2xl px-16 py-6 flex items-center gap-4 animate-bounce shadow-[8px_8px_0px_#000] border-4 border-black group"
                >
                  <Play fill="black" size={28} /> START MISSION
                </button>
             </div>
          </div>
        )}

        {gameState === 'gameOver' && (
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center z-40">
             <div className="text-center p-12 neo-card bg-[#FF00D6] text-white rotate-2 border-8 border-black shadow-[12px_12px_0px_#000]">
                <h2 className="text-6xl font-black uppercase italic mb-2 leading-none">CRASHED!</h2>
                <div className="text-3xl font-black mb-10 italic opacity-90 tracking-tight">SCORE: {score}</div>
                <div className="flex gap-4">
                  <button 
                    onClick={resetGame}
                    className="neo-btn bg-white !text-black text-xl px-12 py-4 flex items-center gap-3 border-4 border-black hover:rotate-[-1deg] transition-all"
                  >
                    <RefreshCcw size={24} strokeWidth={3} /> RETRY
                  </button>
                  <button 
                    onClick={onClose}
                    className="neo-btn bg-black text-white text-xl px-12 py-4 border-4 border-white hover:rotate-[1deg] transition-all"
                  >
                    ABORT
                  </button>
                </div>
             </div>
          </div>
        )}

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase text-black/50 tracking-widest bg-white/50 px-4 py-1 rounded-full border border-black/10">
           SPACE or CLICK to Avoid Death
        </div>
      </div>
    </div>
  );
};

export default CyclistGame;
