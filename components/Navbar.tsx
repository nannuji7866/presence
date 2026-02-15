
import React from 'react';
import { User } from '../types';

interface NavbarProps {
  onLoginClick: () => void;
  currentUser: User | null;
  onDashboardClick: () => void;
  onLogoClick: () => void;
  onNavHome: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick, currentUser, onDashboardClick, onLogoClick, onNavHome }) => {
  return (
    <nav className="absolute top-0 left-0 w-full z-50 py-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button 
          onClick={onLogoClick} 
          className="text-3xl font-black tracking-tighter uppercase italic group bg-white border-4 border-black px-6 py-2 shadow-[6px_6px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#000] transition-all"
        >
          ODDBALL<span className="text-[#FF00D6]">!</span>
        </button>

        <div className="flex items-center gap-4 md:gap-8">
          <button 
            onClick={onNavHome} 
            className="hidden md:block bg-white border-2 border-black px-4 py-1 text-[10px] font-black uppercase hover:bg-[#8B5CF6] hover:text-white transition-colors shadow-[3px_3px_0px_#000]"
          >
            Gimmicks
          </button>
          
          {currentUser ? (
            <button 
              onClick={onDashboardClick}
              className="neo-btn bg-[#FFCF25] text-black text-xs py-2 px-6"
            >
              ME: {currentUser.name.split(' ')[0]}
            </button>
          ) : (
            <button 
              onClick={onLoginClick}
              className="neo-btn text-xs py-2 px-8 bg-black text-white hover:bg-[#FF00D6]"
            >
              ENTER PORTAL
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
