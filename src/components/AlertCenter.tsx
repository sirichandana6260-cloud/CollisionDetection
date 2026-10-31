import React, { useState } from 'react';
import { 
  Bell, 
  Trash2, 
  AlertTriangle, 
  CheckCircle, 
  ShieldAlert, 
  Clock, 
  Activity, 
  Radio, 
  Zap, 
  Filter,
  PlusCircle,
  AlertOctagon
} from 'lucide-react';
import { useCollision } from '../context/CollisionContext';

export const AlertCenter: React.FC = () => {
  const { alertHistory, clearAlertHistory, simulateCollision, status } = useCollision();
  const [filter, setFilter] = useState<'ALL' | 'CRITICAL' | 'WARNING'>('ALL');
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

  const filteredAlerts = alertHistory.filter(item => {
    if (filter === 'ALL') return true;
    return item.severity === filter;
  });

  const isCollision = status === 'SIMULATED_COLLISION';

  return (
    <section id="alert-center" className="py-24 bg-[#060709] border-t border-white/[0.06] relative">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[500px] h-[400px] bg-neonRed/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-neonRed" />
              <span className="text-xs font-mono font-bold tracking-widest text-neonRed uppercase">
                Tactical Event Dispatch
              </span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              ALERT CENTER
            </h2>
          </div>

          {/* Quick status bar */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Normal / Warning indicators */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-graphite-900 border border-white/10 text-xs font-mono">
              <span className={`w-2 h-2 rounded-full ${
                isCollision ? 'bg-neonRed animate-ping' : 'bg-techEmerald animate-pulse'
              }`} />
              <span className="text-slate-400">STATE:</span>
              <span className={`font-bold ${isCollision ? 'text-neonRed' : 'text-techEmerald'}`}>
                {isCollision ? 'COLLISION ALERT ACTIVE' : 'NOMINAL MONITORING'}
              </span>
            </div>

            {/* Clear history button */}
            {alertHistory.length > 0 && (
              <button
                onClick={() => setConfirmClearOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/20 hover:bg-red-900/30 border border-red-500/20 text-red-300 text-xs font-mono transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear History</span>
              </button>
            )}
          </div>
        </div>

        {/* Command Center Panel */}
        <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          
          {/* Panel Top Toolbar */}
          <div className="p-4 sm:p-5 bg-graphite-900/90 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
            
            {/* Filter Tabs */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-500 mr-1" />
              {(['ALL', 'CRITICAL', 'WARNING'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                    filter === tab
                      ? 'bg-neonRed text-white shadow-md shadow-neonRed/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Total count badge */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span>Showing:</span>
              <strong className="text-white font-bold">{filteredAlerts.length}</strong>
              <span>of</span>
              <strong className="text-white font-bold">{alertHistory.length}</strong>
              <span>simulated logs</span>
            </div>

          </div>

          {/* Event Log Table / List */}
          <div className="divide-y divide-white/[0.06] max-h-[460px] overflow-y-auto">
            {filteredAlerts.length > 0 ? (
              filteredAlerts.map((alert) => (
                <div 
                  key={alert.id}
                  className="p-4 sm:p-5 hover:bg-white/[0.02] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  
                  {/* Left: Event Type, Timestamp, Severity */}
                  <div className="flex items-start sm:items-center gap-4">
                    <div className={`p-2.5 rounded-xl border shrink-0 ${
                      alert.severity === 'CRITICAL'
                        ? 'bg-neonRed/15 border-neonRed text-neonRed'
                        : 'bg-electricAmber/15 border-electricAmber text-electricAmber'
                    }`}>
                      <AlertOctagon className="w-5 h-5" />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase border ${
                          alert.severity === 'CRITICAL'
                            ? 'bg-neonRed/20 border-neonRed/40 text-red-300'
                            : 'bg-electricAmber/20 border-electricAmber/40 text-amber-300'
                        }`}>
                          {alert.severity}
                        </span>

                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
                          SIMULATED EVENT
                        </span>

                        <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-500" />
                          {alert.timestamp}
                        </span>
                      </div>

                      <h4 className="font-mono font-bold text-sm text-white">
                        {alert.type}
                      </h4>
                    </div>
                  </div>

                  {/* Right: Metrics & Actuator status */}
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono text-slate-300 pl-12 md:pl-0">
                    <div>
                      <span className="text-[10px] text-slate-500 block">PEAK FORCE</span>
                      <span className={`font-bold text-sm ${alert.peakG > 3.5 ? 'text-neonRed font-black' : 'text-white'}`}>
                        {alert.peakG} G
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-500 block">DURATION</span>
                      <span className="font-bold text-sm text-white">{alert.durationMs} ms</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-500 block">ACTUATORS</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-red-500/20 text-red-300 border border-red-500/30 flex items-center gap-1">
                          <Zap className="w-2.5 h-2.5" /> LED STROBE
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                          <Radio className="w-2.5 h-2.5" /> 85dB BUZZER
                        </span>
                      </div>
                    </div>

                  </div>

                </div>
              ))
            ) : (
              /* Empty State */
              <div className="py-16 px-4 text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-slate-500 mb-4">
                  <CheckCircle className="w-6 h-6 text-techEmerald" />
                </div>
                <h4 className="font-mono font-bold text-base text-white">
                  No Alert Incidents in Log
                </h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 mb-6">
                  The system has recorded zero active alerts. Trigger a simulated collision above or click below to test the event logging pipeline.
                </p>
                <button
                  onClick={() => simulateCollision('FRONTAL')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neonRed text-white font-mono text-xs font-bold tracking-wider uppercase hover:bg-red-600 transition-all shadow-lg shadow-neonRed/30"
                >
                  <PlusCircle className="w-4 h-4" />
                  SIMULATE DEMO IMPACT
                </button>
              </div>
            )}
          </div>

          {/* Panel Footer */}
          <div className="p-3 bg-graphite-950 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>STORAGE: FIFO TELEMETRY CIRCULAR BUFFER</span>
            <span>ALL ENTRIES SYNTHETIC</span>
          </div>

        </div>

      </div>

      {/* Confirmation Modal for Clearing History */}
      {confirmClearOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-panel max-w-md w-full rounded-2xl p-6 border border-white/15 shadow-2xl animate-scale-in">
            <div className="w-12 h-12 rounded-xl bg-red-950/40 border border-neonRed text-neonRed flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="font-display font-bold text-lg text-white">
              Clear Simulated Alert History?
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              This will erase all recorded simulated collision incidents from the current demo memory buffer. You can trigger new events at any time.
            </p>

            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                onClick={() => setConfirmClearOpen(false)}
                className="px-4 py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono text-slate-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  clearAlertHistory();
                  setConfirmClearOpen(false);
                }}
                className="px-4 py-2 rounded-lg bg-neonRed hover:bg-red-600 text-xs font-mono font-bold text-white shadow-lg shadow-neonRed/30 transition-all"
              >
                Confirm Clear
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
