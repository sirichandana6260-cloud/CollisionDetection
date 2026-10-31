import React from 'react';
import { ShieldAlert, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (id: string) => void;
  onOpenDashboard: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenDashboard }) => {
  return (
    <footer className="bg-[#040507] border-t border-white/10 text-slate-400 py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Safety Tagline (5 Cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-neonRed/20 border border-neonRed/40 flex items-center justify-center text-neonRed">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <span className="font-display font-black text-lg tracking-wider text-white">
                COLLISION<span className="text-neonRed">SYSTEM</span>
              </span>
            </div>

            <p className="text-sm text-slate-300 font-light max-w-sm leading-relaxed">
              Millisecond-precision safety instrumentation for the next generation of intelligent mobility. Real-time kinetic signal conditioning, deterministic threshold comparators, and hardwired optical actuator warning loops.
            </p>

            <div className="pt-2">
              <span className="text-[11px] font-mono text-slate-500">
                AEGIS-V EMBEDDED SAFETY ARCHITECTURE
              </span>
            </div>
          </div>

          {/* Quick Navigation Links (3 Cols) */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
              Quick Navigation
            </span>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <button 
                  onClick={() => onNavigate('hero')}
                  className="hover:text-neonRed transition-colors"
                >
                  Overview & Hero
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('live-monitor')}
                  className="hover:text-neonRed transition-colors"
                >
                  Live Sensor Monitor
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('technology')}
                  className="hover:text-neonRed transition-colors"
                >
                  Technology Showcase
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('system-flow')}
                  className="hover:text-neonRed transition-colors"
                >
                  System Visualization
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('alert-center')}
                  className="hover:text-neonRed transition-colors"
                >
                  Alert Command Center
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('connectivity')}
                  className="hover:text-neonRed transition-colors"
                >
                  Hardware Connectivity
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenDashboard}
                  className="text-white hover:text-neonRed flex items-center gap-1 transition-colors"
                >
                  <span>Project Dashboard</span>
                  <ArrowUpRight className="w-3 h-3 text-neonRed" />
                </button>
              </li>
            </ul>
          </div>

          {/* Institutional Metadata (4 Cols) */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
              Academic & Institutional Affiliation
            </span>
            
            <div className="p-4 rounded-xl bg-graphite-900/80 border border-white/5 space-y-2 text-xs font-mono">
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Institution</span>
                <span className="text-white font-bold">KL University</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Department</span>
                <span className="text-slate-300">Electronics and Communication Engineering</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Academic Year</span>
                <span className="text-techEmerald font-bold">2026–2027</span>
              </div>
            </div>

            <p className="text-[10px] font-mono text-slate-500">
              Interactive technology demonstration platform. Designed without personal identifiers or student registry credentials.
            </p>
          </div>

        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <span>
            Collision Detection and Emergency Alert System &copy; 2026–2027
          </span>
          <span className="text-slate-600">
            SIMULATION MODE ACTIVE · HARDWARE ROADMAP BENCHMARK
          </span>
        </div>

      </div>
    </footer>
  );
};
