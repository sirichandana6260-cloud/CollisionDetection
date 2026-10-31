import React, { useState } from 'react';
import { CollisionProvider } from './context/CollisionContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LiveMonitor } from './components/LiveMonitor';
import { TechnologyShowcase } from './components/TechnologyShowcase';
import { SystemVisualization } from './components/SystemVisualization';
import { AlertCenter } from './components/AlertCenter';
import { FutureConnectivity } from './components/FutureConnectivity';
import { DashboardView } from './components/DashboardView';
import { Footer } from './components/Footer';

export const AppContent: React.FC = () => {
  const [activeView, setActiveView] = useState<'landing' | 'dashboard'>('landing');

  const handleNavigate = (id: string) => {
    setActiveView('landing');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div className="min-h-screen bg-[#060709] text-slate-100 flex flex-col font-sans selection:bg-neonRed selection:text-white">
      {/* Sticky Glass Navbar */}
      <Navbar activeView={activeView} setActiveView={setActiveView} />

      {/* Main View Router */}
      <main className="flex-1">
        {activeView === 'landing' ? (
          <>
            <Hero />
            <LiveMonitor />
            <TechnologyShowcase />
            <SystemVisualization />
            <AlertCenter />
            <FutureConnectivity />
          </>
        ) : (
          <DashboardView onBackToLanding={() => setActiveView('landing')} />
        )}
      </main>

      {/* Automotive Engineering Footer */}
      <Footer 
        onNavigate={handleNavigate} 
        onOpenDashboard={() => {
          setActiveView('dashboard');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} 
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <CollisionProvider>
      <AppContent />
    </CollisionProvider>
  );
};

export default App;
