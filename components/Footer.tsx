
import React from 'react';
import { Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-32 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-32">
          <div className="col-span-1 md:col-span-2">
            <a href="#" className="text-3xl font-black tracking-tighter flex items-center gap-2 mb-10 italic uppercase">
              Presence
              <span className="text-[#9d67ef]">.</span>
            </a>
            <p className="text-gray-500 max-w-sm mb-12 leading-loose text-sm font-medium">
              Global leaders in on-demand lifestyle concierge and premium companionship. Redefining the human experience for the modern elite.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-gray-300 hover:text-[#9d67ef] transition-all"><Instagram size={20} /></a>
              <a href="#" className="text-gray-300 hover:text-[#9d67ef] transition-all"><Twitter size={20} /></a>
              <a href="#" className="text-gray-300 hover:text-[#9d67ef] transition-all"><Linkedin size={20} /></a>
              <a href="#" className="text-gray-300 hover:text-[#9d67ef] transition-all"><Facebook size={20} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-black mb-10">Navigation</h4>
            <ul className="space-y-6">
              <li><a href="#services" className="text-gray-500 hover:text-[#9d67ef] text-sm font-bold transition-colors">Specialists</a></li>
              <li><a href="#about" className="text-gray-500 hover:text-[#9d67ef] text-sm font-bold transition-colors">The Studio</a></li>
              <li><a href="#" className="text-gray-500 hover:text-[#9d67ef] text-sm font-bold transition-colors">Portal</a></li>
              <li><a href="#" className="text-gray-500 hover:text-[#9d67ef] text-sm font-bold transition-colors">Inquiry</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-black mb-10">Connect</h4>
            <ul className="space-y-6 text-sm font-bold text-gray-500">
              <li className="hover:text-[#9d67ef] cursor-pointer transition-colors">concierge@presence.io</li>
              <li className="hover:text-[#9d67ef] cursor-pointer transition-colors">+91 9816402487</li>
              <li>Mumbai • Dubai • London</li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:row items-center justify-between pt-16 border-t border-gray-100 text-gray-400 text-[10px] font-black uppercase tracking-[0.3em]">
          <p>© 2025 PRESENCE LIFESTYLE. ELEVATING HUMAN CONNECTION.</p>
          <div className="flex gap-12 mt-8 md:mt-0">
            <a href="#" className="hover:text-black transition-colors">Privacy</a>
            <a href="#" className="hover:text-black transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
