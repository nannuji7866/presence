
import React, { useState, useEffect } from 'react';
import { 
  LogOut, Home, Bell, Settings, Plus, Trophy, 
  CheckCircle, Clock, Smile, Star, HardDrive, 
  RefreshCcw, FileText, ExternalLink, X, Moon, Sun, Layout, ShieldCheck, Heart
} from 'lucide-react';
import { User as UserType, Booking } from '../types';

interface DashboardProps {
  user: UserType;
  onLogout: () => void;
  onGoHome: () => void;
  records: Booking[];
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout, onGoHome, records }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isChaosMode, setIsChaosMode] = useState(false);

  useEffect(() => {
    // Check system preference on mount
    if (document.documentElement.classList.contains('dark')) {
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDarkMode(!isDarkMode);
  };

  const toggleChaos = () => {
    document.body.classList.toggle('chaos-mode');
    setIsChaosMode(!isChaosMode);
  };

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans p-6 pb-32 transition-colors duration-300`}>
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-black uppercase leading-tight">THE <br />VAULT</h1>
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Agent: {user.name}</p>
        </div>
        <div className="flex gap-4">
           <div 
             onClick={() => setIsSettingsOpen(true)}
             className="w-12 h-12 neo-card flex items-center justify-center bg-white dark:bg-[#262626] cursor-pointer hover:rotate-12 transition-transform"
           >
            <Settings size={24} />
          </div>
          <button onClick={onLogout} className="w-12 h-12 neo-card flex items-center justify-center bg-[#FF00D6] text-white">
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* Google Drive Status Section */}
      <section className="neo-card p-6 mb-8 bg-[#FFCF25] dark:text-black relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div className="bg-white border-2 border-black p-3 rounded-2xl shadow-[4px_4px_0px_#000]">
              <HardDrive size={32} />
            </div>
            <button 
              onClick={handleSync}
              className={`neo-btn bg-black !p-3 rounded-xl transition-all ${isSyncing ? 'animate-spin' : ''}`}
            >
              <RefreshCcw size={20} className="text-white" />
            </button>
          </div>
          <h2 className="text-2xl font-black mb-1 uppercase italic">Google Drive</h2>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-widest">Active Connection</span>
          </div>
          <p className="text-xs font-bold text-black/60 mb-6">Records are being maintained in folder: <span className="underline cursor-pointer">/Oddball_Records_2025</span></p>
          <div className="progress-bar bg-black/10 border-black/20">
            <div className="progress-fill bg-black" style={{ width: '65%' }}></div>
          </div>
          <div className="flex justify-between mt-2 text-[9px] font-black uppercase tracking-widest">
            <span>Sync Progress</span>
            <span>65% Clean</span>
          </div>
        </div>
        {/* Decorative cloud */}
        <div className="absolute top-[-20px] right-[-20px] opacity-10">
          <HardDrive size={160} />
        </div>
      </section>

      {/* Maintenance Table (Records) */}
      <h3 className="text-xl font-black uppercase tracking-tighter mb-4 flex items-center gap-2">
        <FileText size={20} /> Record History
      </h3>
      <div className="space-y-4">
        {records.map((rec) => (
          <div key={rec.id} className="neo-card p-5 flex items-center justify-between group hover:border-[#8B5CF6]">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl border-2 border-black bg-gray-50 dark:bg-[#1a1a1a] flex items-center justify-center font-black text-xs">
                {rec.service[0]}
              </div>
              <div>
                <h4 className="font-black text-sm uppercase leading-none mb-1">{rec.service}</h4>
                <div className="flex items-center gap-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">
                  <span>{rec.id}</span>
                  <span>•</span>
                  <span>{rec.date}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
               <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-md border-2 border-black ${
                 rec.status === 'Confirmed' ? 'bg-[#76C24F] text-white' : 'bg-[#FFCF25] text-black'
               }`}>
                 {rec.status}
               </span>
               <ExternalLink size={16} className="text-gray-300 group-hover:text-black dark:group-hover:text-white cursor-pointer" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4">
         <div className="neo-card p-6 bg-[#8B5CF6] text-white">
            <h4 className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-70">Total Savings</h4>
            <div className="text-3xl font-black">₹4.2k</div>
         </div>
         <div className="neo-card p-6 bg-[#76C24F] text-white">
            <h4 className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-70">Odd Check-ins</h4>
            <div className="text-3xl font-black">24</div>
         </div>
      </div>

      {/* Navigation Bar */}
      <nav className="fixed bottom-6 left-6 right-6 neo-card bg-white dark:bg-[#262626] p-3 flex justify-around items-center h-16 shadow-[8px_8px_0px_#1a1a1a] z-50">
        <button onClick={onGoHome} className="text-gray-400 hover:text-black dark:hover:text-white transition-colors"><Home size={24} /></button>
        <button className="bg-white dark:bg-[#1a1a1a] border-2 border-black rounded-full px-4 py-1 flex items-center gap-2 font-black text-xs shadow-[2px_2px_0px_#000]">
          <HardDrive size={16} /> Records
        </button>
        <button onClick={() => setIsSettingsOpen(true)} className="text-gray-400 hover:text-black dark:hover:text-white transition-colors">
          <Settings size={24} />
        </button>
        <button className="bg-[#8B5CF6] text-white p-2 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]"><Plus size={24} /></button>
      </nav>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsSettingsOpen(false)}></div>
          <div className="relative w-full max-w-md neo-card bg-white dark:bg-[#1a1a1a] p-8 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-black uppercase italic tracking-tighter">Vault Config</h2>
              <button onClick={() => setIsSettingsOpen(false)} className="w-10 h-10 neo-card flex items-center justify-center bg-white dark:bg-[#262626]">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Theme Toggle */}
              <div className="flex items-center justify-between p-4 neo-card bg-gray-50 dark:bg-[#262626]">
                <div className="flex items-center gap-3">
                  <div className="bg-[#FFCF25] p-2 rounded-lg border-2 border-black">
                    {isDarkMode ? <Moon size={20} className="text-black" /> : <Sun size={20} className="text-black" />}
                  </div>
                  <span className="font-black uppercase text-xs">Dark Mode</span>
                </div>
                <button 
                  onClick={toggleTheme}
                  className={`w-14 h-8 rounded-full border-4 border-black transition-colors relative ${isDarkMode ? 'bg-[#76C24F]' : 'bg-gray-200'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-black transition-all ${isDarkMode ? 'left-7' : 'left-1'}`}></div>
                </button>
              </div>

              {/* Layout Toggle */}
              <div className="flex items-center justify-between p-4 neo-card bg-gray-50 dark:bg-[#262626]">
                <div className="flex items-center gap-3">
                  <div className="bg-[#FF00D6] p-2 rounded-lg border-2 border-black">
                    <Layout size={20} className="text-white" />
                  </div>
                  <span className="font-black uppercase text-xs">Chaos Mode (Wiggles)</span>
                </div>
                <button 
                  onClick={toggleChaos}
                  className={`w-14 h-8 rounded-full border-4 border-black transition-colors relative ${isChaosMode ? 'bg-[#76C24F]' : 'bg-gray-200'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-black transition-all ${isChaosMode ? 'left-7' : 'left-1'}`}></div>
                </button>
              </div>

              {/* Must Read Section */}
              <div className="p-5 neo-card bg-[#8B5CF6] text-white">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck size={20} />
                  <h3 className="font-black uppercase text-sm italic">The Sacred Oath</h3>
                </div>
                <p className="text-[11px] font-bold leading-relaxed opacity-90 uppercase tracking-tight">
                  Listen, weirdo. Your info is tighter than a pickle jar lid. We don't sell your data, we don't leak your secrets, and we certainly don't judge your choice of "Late Night Walk Buddy." 
                  <br /><br />
                  <span className="flex items-center gap-1"><Heart size={10} fill="white" /> Your safety is our #1 mission. Everything else is secondary.</span>
                </p>
              </div>

              <div className="pt-4">
                <button 
                  onClick={() => setIsSettingsOpen(false)}
                  className="w-full neo-btn bg-black text-white py-4 uppercase text-sm tracking-widest"
                >
                  Save & Return to Vault
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
