
import React, { useState } from 'react';
import { 
  LogOut, Shield, Users, Briefcase, Trash2, 
  CheckCircle, Clock, ExternalLink, Mail, Phone,
  BarChart3, Search, ChevronRight, X, AlertTriangle
} from 'lucide-react';
import { User, Booking } from '../types';

interface AdminDashboardProps {
  user: User;
  allRecords: Booking[];
  allUsers: User[];
  onLogout: () => void;
  onUpdateStatus: (id: string, status: Booking['status']) => void;
  onDeleteBooking: (id: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  user, allRecords, allUsers, onLogout, onUpdateStatus, onDeleteBooking 
}) => {
  const [activeTab, setActiveTab] = useState<'missions' | 'clients' | 'intel'>('missions');
  const [searchTerm, setSearchTerm] = useState('');

  const stats = {
    totalRevenue: allRecords.length * 2000,
    activeMissions: allRecords.filter(r => r.status === 'Pending').length,
    completedMissions: allRecords.filter(r => r.status === 'Completed').length,
    clientCount: allUsers.length
  };

  const filteredRecords = allRecords.filter(r => 
    r.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#111] text-white font-sans p-6 md:p-10 pb-32">
      {/* Admin Header */}
      <header className="flex flex-col md:row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-[#FF00D6] p-2 rounded-lg border-2 border-black">
              <Shield size={24} />
            </div>
            <h1 className="text-4xl font-black uppercase italic tracking-tighter">MISSION CONTROL</h1>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#76C24F]">Secure Admin Access: {user.name}</p>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <button onClick={onLogout} className="neo-btn bg-[#FF00D6] !text-white flex items-center gap-2 !px-6">
            <LogOut size={18} /> Exit Control
          </button>
        </div>
      </header>

      {/* Analytics Strips */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="neo-card bg-[#222] p-6 border-[#8B5CF6]">
          <h4 className="text-[10px] font-black uppercase text-[#8B5CF6] mb-2">Total Value</h4>
          <div className="text-3xl font-black italic">₹{stats.totalRevenue.toLocaleString()}</div>
        </div>
        <div className="neo-card bg-[#222] p-6 border-[#FFCF25]">
          <h4 className="text-[10px] font-black uppercase text-[#FFCF25] mb-2">Active Missions</h4>
          <div className="text-3xl font-black italic">{stats.activeMissions}</div>
        </div>
        <div className="neo-card bg-[#222] p-6 border-[#76C24F]">
          <h4 className="text-[10px] font-black uppercase text-[#76C24F] mb-2">Completed</h4>
          <div className="text-3xl font-black italic">{stats.completedMissions}</div>
        </div>
        <div className="neo-card bg-[#222] p-6 border-white/20">
          <h4 className="text-[10px] font-black uppercase text-white/50 mb-2">Agents/Clients</h4>
          <div className="text-3xl font-black italic">{stats.clientCount}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        <button 
          onClick={() => setActiveTab('missions')}
          className={`neo-btn whitespace-nowrap !rounded-full text-xs transition-all ${activeTab === 'missions' ? 'bg-[#76C24F] text-black' : 'bg-[#333] text-white opacity-50'}`}
        >
          <Briefcase className="inline mr-2" size={14} /> All Missions
        </button>
        <button 
          onClick={() => setActiveTab('clients')}
          className={`neo-btn whitespace-nowrap !rounded-full text-xs transition-all ${activeTab === 'clients' ? 'bg-[#8B5CF6] text-white' : 'bg-[#333] text-white opacity-50'}`}
        >
          <Users className="inline mr-2" size={14} /> Client Intel
        </button>
        <button 
          onClick={() => setActiveTab('intel')}
          className={`neo-btn whitespace-nowrap !rounded-full text-xs transition-all ${activeTab === 'intel' ? 'bg-[#FFCF25] text-black' : 'bg-[#333] text-white opacity-50'}`}
        >
          <BarChart3 className="inline mr-2" size={14} /> Global Analytics
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-10">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search size={20} className="text-gray-500" />
        </div>
        <input 
          type="text" 
          placeholder="Search missions, agents, or codes..."
          className="w-full bg-[#1a1a1a] border-4 border-[#333] rounded-2xl py-5 pl-14 pr-6 font-black uppercase text-sm tracking-widest outline-none focus:border-[#76C24F] transition-colors"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Main Content Area */}
      {activeTab === 'missions' && (
        <div className="space-y-6">
          {filteredRecords.length > 0 ? filteredRecords.map((rec) => (
            <div key={rec.id} className="neo-card bg-[#1a1a1a] p-6 border-white/10 group">
              <div className="flex flex-col lg:row justify-between gap-6">
                <div className="flex gap-6">
                  <div className="w-16 h-16 bg-[#333] border-2 border-[#444] rounded-2xl flex items-center justify-center font-black text-2xl italic group-hover:bg-[#8B5CF6] transition-colors">
                    {rec.service[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="text-xl font-black uppercase tracking-tight">{rec.service}</h4>
                      <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded border ${
                        rec.status === 'Completed' ? 'bg-[#76C24F]/20 text-[#76C24F] border-[#76C24F]' :
                        rec.status === 'Confirmed' ? 'bg-[#8B5CF6]/20 text-[#8B5CF6] border-[#8B5CF6]' :
                        'bg-[#FFCF25]/20 text-[#FFCF25] border-[#FFCF25]'
                      }`}>
                        {rec.status}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">ID: {rec.id} • Target: {rec.userName}</p>
                    <div className="flex gap-4">
                      <a href={`tel:${rec.userPhone}`} className="text-[10px] font-black text-[#76C24F] flex items-center gap-1 hover:underline">
                        <Phone size={10} /> {rec.userPhone}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-white/5 pt-6 lg:pt-0 lg:pl-6 max-w-md">
                   <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">Mission Briefing:</p>
                   <p className="text-xs text-gray-300 italic">"{rec.missionBrief || 'No specific details provided.'}"</p>
                </div>

                <div className="flex items-center gap-3 lg:self-center">
                  <select 
                    value={rec.status}
                    onChange={(e) => onUpdateStatus(rec.id, e.target.value as Booking['status'])}
                    className="bg-black border-2 border-[#333] rounded-lg px-3 py-2 text-[10px] font-black uppercase outline-none focus:border-[#76C24F]"
                  >
                    <option value="Pending">Set Pending</option>
                    <option value="Confirmed">Confirm Mission</option>
                    <option value="Completed">Mark Complete</option>
                  </select>
                  <button 
                    onClick={() => onDeleteBooking(rec.id)}
                    className="w-10 h-10 neo-card bg-[#222] hover:bg-red-500 border-none flex items-center justify-center transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          )) : (
            <div className="text-center py-20 bg-[#1a1a1a] rounded-3xl border-4 border-dashed border-[#333]">
              <AlertTriangle size={48} className="mx-auto text-gray-700 mb-4" />
              <p className="font-black uppercase tracking-widest text-gray-600">No matching logs found.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'clients' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allUsers.map((u) => (
            <div key={u.id} className="neo-card bg-[#1a1a1a] p-6 border-white/5 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-16 h-16 bg-[#8B5CF6]/10 rotate-45 translate-x-8 -translate-y-8"></div>
               <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#FF00D6] flex items-center justify-center font-black text-xl">
                    {u.name[0]}
                  </div>
                  <div>
                    <h4 className="font-black uppercase tracking-tighter text-lg">{u.name}</h4>
                    <span className="text-[8px] font-black bg-white/10 px-2 py-0.5 rounded uppercase">{u.role}</span>
                  </div>
               </div>
               <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs font-bold text-gray-400">
                    <Mail size={14} className="text-[#8B5CF6]" /> {u.email}
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-gray-400">
                    <Phone size={14} className="text-[#76C24F]" /> {u.phone || 'No phone'}
                  </div>
               </div>
               <button className="w-full mt-6 neo-btn bg-white !text-black text-[10px] !py-2">
                 View History
               </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'intel' && (
        <div className="neo-card bg-[#1a1a1a] p-10 text-center">
           <BarChart3 size={64} className="mx-auto text-[#FFCF25] mb-6" />
           <h3 className="text-2xl font-black uppercase mb-4">Deep Data Visualization</h3>
           <p className="text-gray-500 max-w-sm mx-auto font-bold text-sm uppercase leading-relaxed mb-8">
             Analytics engine is crunching the numbers. We will soon display growth curves and sub-niche heatmaps here.
           </p>
           <div className="flex justify-center gap-2">
              {[1,2,3,4,5].map(i => <div key={i} className="w-4 h-24 bg-[#333] rounded-full animate-pulse" style={{ animationDelay: `${i*0.2}s` }}></div>)}
           </div>
        </div>
      )}

      {/* Floating Status Bar */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 neo-card bg-black/80 backdrop-blur-xl px-8 py-3 flex items-center gap-6 border-[#76C24F]/30 z-[60]">
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#76C24F] animate-pulse"></div>
            <span className="text-[10px] font-black uppercase text-gray-400">System Live</span>
         </div>
         <div className="w-px h-4 bg-white/20"></div>
         <div className="text-[10px] font-black uppercase">
            Queued Tasks: <span className="text-[#FFCF25]">{stats.activeMissions}</span>
         </div>
      </div>
    </div>
  );
};

export default AdminDashboard;