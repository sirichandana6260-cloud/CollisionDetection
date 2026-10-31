import React, { useState } from 'react';
import { ShieldAlert, Volume2, VolumeX, Menu, X, Radio, Activity, Cpu, Bell, LayoutDashboard } from 'lucide-react';
import { useCollision } from '../context/CollisionContext';

interface NavbarProps {
  activeView: 'landing' | 'dashboard';
  setActiveView: (view: 'landing' | 'dashboard') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeView, setActiveView }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { status, soundEnabled, toggleSound, collisionCount } = useCollision();

  const isCollision = status === 'SIMULATED_COLLISION';

  const scrollTo = (id: string) => {
    setActiveView('landing');
    setMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#060709]/85 backdrop-blur-xl border-b border-white/[0.08] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <button 
          onClick={() => scrollTo('hero')} 
          className="flex items-center gap-3.5 text-left group focus:outline-none"
        >
          <div className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 border ${
            isCollision 
              ? 'bg-neonRed/20 border-neonRed glow-red animate-pulse' 
              : 'bg-graphite-850 border-white/10 group-hover:border-neonRed/50'
          }`}>
            <ShieldAlert className={`w-6 h-6 transition-colors duration-300 ${
              isCollision ? 'text-neonRed animate-bounce' : 'text-neonRed group-hover:text-red-400'
            }`} />
            {/* Pulsing beacon dot */}
            <span className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
              isCollision ? 'bg-neonRed animate-ping' : 'bg-techEmerald'
            }`} />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-lg tracking-wider text-white">
                COLLISION<span className="text-neonRed">SYSTEM</span>
              </span>
              <span className="text-[10px] font-mono tracking-widest px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/10 text-slate-300">
                v2.6
              </span>
            </div>
            <p className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
              Impact Telemetry & Alert
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          <button 
            onClick={() => scrollTo('hero')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
              activeView === 'landing' ? 'text-white hover:text-neonRed' : 'text-slate-400 hover:text-white'
            }`}
          >
            Home
          </button>

          <button 
            onClick={() => scrollTo('live-monitor')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-slate-400 hover:text-neonRed transition-colors"
          >
            <Activity className="w-3.5 h-3.5 text-neonRed" />
            Live Monitor
          </button>

          <button 
            onClick={() => scrollTo('technology')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-slate-400 hover:text-white transition-colors"
          >
            <Cpu className="w-3.5 h-3.5 text-electricAmber" />
            Technology
          </button>

          <button 
            onClick={() => scrollTo('system-flow')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-slate-400 hover:text-white transition-colors"
          >
            <Radio className="w-3.5 h-3.5 text-radarCyan" />
            System Flow
          </button>

          <button 
            onClick={() => scrollTo('alert-center')}
            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-slate-400 hover:text-white transition-colors"
          >
            <Bell className="w-3.5 h-3.5 text-neonRed" />
            Alert Center
            {collisionCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-neonRed/20 text-neonRed border border-neonRed/30 font-bold">
                {collisionCount}
              </span>
            )}
          </button>

          <button 
            onClick={() => {
              setActiveView('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              activeView === 'dashboard'
                ? 'bg-neonRed text-white shadow-lg shadow-neonRed/30'
                : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            Dashboard
          </button>
        </div>

        {/* Right side controls & System status */}
        <div className="hidden sm:flex items-center gap-3">
          
          {/* Status Chip */}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono border backdrop-blur-md transition-all duration-300 ${
            isCollision 
              ? 'bg-neonRed/15 border-neonRed/50 text-red-300 shadow-lg shadow-neonRed/20' 
              : 'bg-techEmerald/10 border-techEmerald/30 text-emerald-400'
          }`}>
            <span className={`w-2 h-2 rounded-full ${
              isCollision ? 'bg-neonRed animate-ping' : 'bg-techEmerald animate-pulse'
            }`} />
            <span className="tracking-wider uppercase text-[11px] font-semibold">
              {isCollision ? 'COLLISION TRIGGERED' : 'SYSTEM READY — DEMO'}
            </span>
          </div>

          {/* Sound Mute/Unmute Toggle */}
          <button
            onClick={toggleSound}
            aria-label="Toggle buzzer sound"
            title={soundEnabled ? "Buzzer audio sound enabled" : "Buzzer audio sound muted"}
            className={`p-2 rounded-lg border transition-all ${
              soundEnabled 
                ? 'bg-electricAmber/10 border-electricAmber/40 text-electricAmber hover:bg-electricAmber/20' 
                : 'bg-white/[0.04] border-white/10 text-slate-500 hover:text-slate-300'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Quick Launch CTA */}
          <button
            onClick={() => scrollTo('live-monitor')}
            className="relative group overflow-hidden px-4 py-2 rounded-lg bg-gradient-to-r from-neonRed to-red-600 text-white text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 hover:shadow-lg hover:shadow-neonRed/40 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              <span>LAUNCH MONITOR</span>
            </span>
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={toggleSound}
            aria-label="Toggle sound"
            className={`p-2 rounded-lg border ${
              soundEnabled ? 'text-electricAmber border-electricAmber/30 bg-electricAmber/10' : 'text-slate-500 border-white/10'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-white/[0.05] border border-white/10 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 pt-3 pb-6 border-t border-white/10 bg-[#080a0e]/95 backdrop-blur-2xl space-y-2">
          <div className="mb-3 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">System State</span>
            <span className={`text-xs font-mono font-bold ${isCollision ? 'text-neonRed animate-pulse' : 'text-techEmerald'}`}>
              {isCollision ? 'COLLISION TRIGGERED' : 'SYSTEM READY'}
            </span>
          </div>

          <button 
            onClick={() => scrollTo('hero')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-mono text-slate-200 hover:bg-white/[0.06]"
          >
            Home
          </button>
          <button 
            onClick={() => scrollTo('live-monitor')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-mono text-slate-200 hover:bg-white/[0.06] flex items-center justify-between"
          >
            <span>Live Monitor</span>
            <Activity className="w-4 h-4 text-neonRed" />
          </button>
          <button 
            onClick={() => scrollTo('technology')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-mono text-slate-200 hover:bg-white/[0.06] flex items-center justify-between"
          >
            <span>Technology Showcase</span>
            <Cpu className="w-4 h-4 text-electricAmber" />
          </button>
          <button 
            onClick={() => scrollTo('system-flow')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-mono text-slate-200 hover:bg-white/[0.06] flex items-center justify-between"
          >
            <span>System Visualization</span>
            <Radio className="w-4 h-4 text-radarCyan" />
          </button>
          <button 
            onClick={() => scrollTo('alert-center')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-mono text-slate-200 hover:bg-white/[0.06] flex items-center justify-between"
          >
            <span>Alert Center</span>
            <Bell className="w-4 h-4 text-neonRed" />
          </button>
          <button 
            onClick={() => {
              setActiveView('dashboard');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-mono text-white bg-neonRed/20 border border-neonRed/40 flex items-center justify-between"
          >
            <span>Project Dashboard</span>
            <LayoutDashboard className="w-4 h-4 text-neonRed" />
          </button>
        </div>
      )}
    </nav>
  );
};
