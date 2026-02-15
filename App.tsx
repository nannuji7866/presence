
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesGrid from './components/ServicesGrid';
import HowItWorks from './components/HowItWorks';
import About from './components/About';
import BookingForm from './components/BookingForm';
import QueryForm from './components/QueryForm';
import SubNicheExplorer from './components/SubNicheExplorer';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import LoadingOverlay from './components/LoadingOverlay';
import CyclistGame from './components/CyclistGame';
import { User, Booking } from './types';
import { Category, CATEGORIES } from './constants';

type ViewState = 'landing' | 'category' | 'booking' | 'query' | 'dashboard' | 'admin-dashboard';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGameActive, setIsGameActive] = useState(false);
  
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSubNiche, setSelectedSubNiche] = useState<string>("");
  
  // Simulated Global Database
  const [allUsers, setAllUsers] = useState<User[]>([
    { id: 'u1', name: 'Alice Wonder', email: 'alice@odd.com', phone: '9876543210', role: 'user' },
    { id: 'u2', name: 'Bob Weirdo', email: 'bob@odd.com', phone: '9123456789', role: 'user' }
  ]);

  const [records, setRecords] = useState<Booking[]>([
    { id: 'REC-001', userId: 'u1', userName: 'Alice Wonder', userPhone: '9876543210', service: 'Personal Paparazzi', date: '2025-05-12', status: 'Confirmed', missionBrief: 'Need photos at the park pretending to be a celebrity.' },
    { id: 'REC-002', userId: 'u2', userName: 'Bob Weirdo', userPhone: '9123456789', service: 'Queue Standing', date: '2025-05-14', status: 'Pending', missionBrief: 'Stand in line for the new iPhone launch.' }
  ]);

  const navigateTo = (view: ViewState, category?: Category, niche?: string) => {
    setIsLoading(true);
    setTimeout(() => {
      if (category) setSelectedCategory(category);
      if (niche) setSelectedSubNiche(niche);
      setCurrentView(view);
      window.scrollTo({ top: 0, behavior: 'instant' });
      setIsLoading(false);
    }, 800); 
  };

  const handleNewBooking = (service: string, details: any) => {
    const newRecord: Booking = {
      id: `REC-${Math.floor(Math.random() * 9000) + 1000}`,
      userId: currentUser?.id || 'guest',
      userName: details.name || currentUser?.name || 'Anonymous',
      userPhone: details.phone || details.contact || 'Unknown',
      service,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending',
      missionBrief: details.message || details.description
    };
    setRecords(prev => [newRecord, ...prev]);
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setIsAuthModalOpen(false);
    if (user.role === 'admin') {
      navigateTo('admin-dashboard');
    } else {
      navigateTo('dashboard');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigateTo('landing');
  };

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return (
          <>
            <Hero onCtaClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} />
            <div id="services">
              <ServicesGrid 
                categories={CATEGORIES} 
                onCategorySelect={(cat) => navigateTo('category', cat)}
                activeCategory={null}
              />
              <div className="flex justify-center pb-20 bg-white dark:bg-[#1a1a1a]">
                <button 
                  onClick={() => navigateTo('query')}
                  className="neo-btn bg-[#FFCF25] !text-black text-xl px-12 py-5 flex items-center gap-3 shadow-[8px_8px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all !rounded-[40px] uppercase italic font-black"
                >
                  Can't find your weird? Request Custom <ArrowRight />
                </button>
              </div>
            </div>
            <div className="bg-white dark:bg-[#1a1a1a]">
              <HowItWorks />
              <div id="about"><About /></div>
            </div>
          </>
        );
      case 'category':
        return selectedCategory && (
          <SubNicheExplorer 
            category={selectedCategory} 
            onSelect={(niche) => navigateTo('booking', undefined, niche)} 
            activeSubNiche={selectedSubNiche}
            onBack={() => navigateTo('landing')}
          />
        );
      case 'booking':
        return (
          <div className="pt-32 min-h-screen bg-white dark:bg-[#1a1a1a]">
             <div className="max-w-7xl mx-auto px-6">
                <button 
                  onClick={() => navigateTo('category', selectedCategory!)}
                  className="flex items-center gap-2 text-black/30 dark:text-white/30 hover:text-black dark:hover:text-white transition-colors text-xs font-bold uppercase tracking-widest mb-8"
                >
                  ← Back to Portfolio
                </button>
             </div>
             <BookingForm 
              initialService={selectedSubNiche} 
              onBookingComplete={(service, details) => handleNewBooking(service, details)}
            />
          </div>
        );
      case 'query':
        return (
          <div className="pt-32 min-h-screen bg-white dark:bg-[#1a1a1a]">
            <QueryForm 
              onBack={() => navigateTo('landing')}
              onQueryComplete={(details) => handleNewBooking("Custom Oddity", details)}
            />
          </div>
        );
      case 'dashboard':
        return currentUser && (
          <Dashboard 
            user={currentUser} 
            onLogout={handleLogout} 
            onGoHome={() => navigateTo('landing')} 
            records={records.filter(r => r.userId === currentUser.id)}
          />
        );
      case 'admin-dashboard':
        return currentUser?.role === 'admin' && (
          <AdminDashboard 
            user={currentUser}
            allRecords={records}
            allUsers={allUsers}
            onLogout={handleLogout}
            onUpdateStatus={(id, status) => setRecords(prev => prev.map(r => r.id === id ? { ...r, status } : r))}
            onDeleteBooking={(id) => setRecords(prev => prev.filter(r => r.id !== id))}
          />
        );
    }
  };

  const ArrowRight = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-[#1a1a1a] text-black dark:text-white selection:bg-[#2b48ff]/20">
      {isLoading && <LoadingOverlay />}
      {isGameActive && <CyclistGame onClose={() => setIsGameActive(false)} />}
      
      {currentView !== 'dashboard' && currentView !== 'admin-dashboard' && (
        <Navbar 
          onLoginClick={() => setIsAuthModalOpen(true)} 
          currentUser={currentUser}
          onDashboardClick={() => navigateTo(currentUser?.role === 'admin' ? 'admin-dashboard' : 'dashboard')}
          onLogoClick={() => setIsGameActive(true)}
          onNavHome={() => navigateTo('landing')}
        />
      )}
      
      <main>
        {renderView()}
      </main>

      {currentView !== 'dashboard' && currentView !== 'admin-dashboard' && <Footer />}

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLogin={handleLogin}
      />
    </div>
  );
};

export default App;
