import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Activity, 
  Cpu, 
  Zap, 
  Radio, 
  ShieldAlert, 
  Clock, 
  HardDrive, 
  Gauge, 
  Sliders, 
  Layers, 
  ArrowLeft, 
  Play, 
  RotateCcw,
  AlertTriangle,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { useCollision } from '../context/CollisionContext';

interface DashboardViewProps {
  onBackToLanding: () => void;
}

const PIE_SEVERITY_DATA = [
  { name: 'Fatal / Severe High-G', value: 32, color: '#ff1a40' },
  { name: 'Moderate Collision', value: 38, color: '#ff8c00' },
  { name: 'Minor Impact', value: 30, color: '#00f0ff' },
];

export const DashboardView: React.FC<DashboardViewProps> = ({ onBackToLanding }) => {
  const { 
    status, 
    telemetry, 
    waveform, 
    ledState, 
    buzzerState, 
    collisionCount, 
    uptimeSeconds, 
    simulateCollision, 
    resetSystem 
  } = useCollision();

  const [activeTab, setActiveTab] = useState<'overview' | 'signal' | 'ml' | 'diagnostics'>('overview');
  const isCollision = status === 'SIMULATED_COLLISION';

  // Format uptime
  const hrs = Math.floor(uptimeSeconds / 3600);
  const mins = Math.floor((uptimeSeconds % 3600) / 60);
  const secs = uptimeSeconds % 60;
  const uptimeStr = `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  return (
    <div className="min-h-screen bg-[#060709] text-slate-100 pt-20 pb-16">
      
      {/* Top Engineering Header Bar */}
      <div className="border-b border-white/10 bg-[#080a0e]/90 backdrop-blur-xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToLanding}
              className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white transition-colors"
              title="Return to Product Showcase"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-black text-xl text-white tracking-wide">
                  VEHICLE TELEMATICS CONTROL CONSOLE
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-electricAmber/15 border border-electricAmber/40 text-electricAmber font-bold">
                  DEMO DATA
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400">
                AEGIS-V · Physical Sensing & Actuator Supervisory Dashboard
              </p>
            </div>
          </div>

          {/* Quick Actions in Header */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => simulateCollision('FRONTAL')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-neonRed text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-red-600 transition-all shadow-lg shadow-neonRed/30"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>TEST IMPACT</span>
            </button>

            <button
              onClick={resetSystem}
              className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300"
              title="Reset system"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Main Dashboard Layout: Sidebar + Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ============================================================== */}
          {/* SIDEBAR NAVIGATION (3 Cols)                                   */}
          {/* ============================================================== */}
          <div className="lg:col-span-3 glass-panel rounded-2xl p-4 border border-white/10 space-y-4">
            
            <div className="px-3 py-2 border-b border-white/10">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                Instrumentation Views
              </span>
            </div>

            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                  activeTab === 'overview'
                    ? 'bg-neonRed text-white shadow-lg shadow-neonRed/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Activity className="w-4 h-4" />
                  <span>Telemetry Overview</span>
                </div>
                <span className="text-[10px] opacity-75">LIVE</span>
              </button>

              <button
                onClick={() => setActiveTab('signal')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                  activeTab === 'signal'
                    ? 'bg-neonRed text-white shadow-lg shadow-neonRed/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Sliders className="w-4 h-4" />
                  <span>Signal Analysis</span>
                </div>
                <span className="text-[10px] opacity-75">1 kHz</span>
              </button>

              <button
                onClick={() => setActiveTab('ml')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                  activeTab === 'ml'
                    ? 'bg-neonRed text-white shadow-lg shadow-neonRed/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4" />
                  <span>ML Severity Analytics</span>
                </div>
                <span className="text-[10px] opacity-75">15.5k</span>
              </button>

              <button
                onClick={() => setActiveTab('diagnostics')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                  activeTab === 'diagnostics'
                    ? 'bg-neonRed text-white shadow-lg shadow-neonRed/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Cpu className="w-4 h-4" />
                  <span>Hardware Health</span>
                </div>
                <span className="text-[10px] opacity-75">3.3V</span>
              </button>
            </nav>

            {/* System Status Mini Widget */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block px-3">
                Live State Matrix
              </span>

              <div className="bg-graphite-900/90 rounded-xl p-3 border border-white/5 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">ENGINE STATE</span>
                  <span className={`font-bold ${isCollision ? 'text-neonRed animate-pulse' : 'text-techEmerald'}`}>
                    {isCollision ? 'COLLISION' : 'NOMINAL'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">SESSION UPTIME</span>
                  <span className="text-white font-bold">{uptimeStr}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">SIMULATED EVENTS</span>
                  <span className="text-neonRed font-bold">{collisionCount}</span>
                </div>
              </div>
            </div>

          </div>

          {/* ============================================================== */}
          {/* RESPONSIVE WIDGET GRID (9 Cols)                               */}
          {/* ============================================================== */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Row 1: Key Performance Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              
              {/* Metric 1: Peak Resultant G */}
              <div className="glass-panel rounded-2xl p-4 border border-white/10">
                <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
                  <span>RESULTANT G</span>
                  <Gauge className="w-4 h-4 text-radarCyan" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className={`font-mono text-3xl font-black ${
                    telemetry.resultantG > 3.0 ? 'text-neonRed text-glow-red' : 'text-white'
                  }`}>
                    {telemetry.resultantG.toFixed(2)}
                  </span>
                  <span className="text-xs font-mono text-slate-400">G</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500 mt-1 block">Vector Magnitude</span>
              </div>

              {/* Metric 2: Proximity Distance */}
              <div className="glass-panel rounded-2xl p-4 border border-white/10">
                <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
                  <span>OBSTACLE DIST</span>
                  <Activity className="w-4 h-4 text-electricAmber" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-3xl font-black text-white">
                    {telemetry.distanceCm}
                  </span>
                  <span className="text-xs font-mono text-slate-400">cm</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500 mt-1 block">Ultrasonic Echo</span>
              </div>

              {/* Metric 3: System Latency */}
              <div className="glass-panel rounded-2xl p-4 border border-white/10">
                <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
                  <span>TRIGGER LATENCY</span>
                  <Clock className="w-4 h-4 text-techEmerald" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-3xl font-black text-techEmerald">
                    {telemetry.systemLatencyMs}
                  </span>
                  <span className="text-xs font-mono text-slate-400">ms</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500 mt-1 block">Sub-15ms Target</span>
              </div>

              {/* Metric 4: Total Alerts */}
              <div className="glass-panel rounded-2xl p-4 border border-white/10">
                <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
                  <span>TOTAL IMPACTS</span>
                  <ShieldAlert className="w-4 h-4 text-neonRed" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-3xl font-black text-neonRed">
                    {collisionCount}
                  </span>
                  <span className="text-xs font-mono text-slate-400">logs</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500 mt-1 block">Demo Incident Log</span>
              </div>

            </div>

            {/* Row 2: Real-Time Signal Acceleration Timeline Chart (Recharts) */}
            <div className="glass-panel rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-mono font-bold text-sm text-white flex items-center gap-2">
                    <Activity className="w-4 h-4 text-neonRed" />
                    Kinetic Acceleration Waveform (G-Force vs. Time)
                  </h3>
                  <span className="text-[11px] font-mono text-slate-400">
                    Continuous sliding buffer (50 sampling points @ 1000 Hz)
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
                  DEMO DATA
                </span>
              </div>

              {/* Recharts Area Chart */}
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={waveform} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gForceGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={isCollision ? '#ff1a40' : '#00f0ff'} stopOpacity={0.6}/>
                        <stop offset="95%" stopColor={isCollision ? '#ff1a40' : '#00f0ff'} stopOpacity={0.0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="index" stroke="#475569" fontSize={10} tickLine={false} />
                    <YAxis domain={[0, 7]} stroke="#475569" fontSize={10} unit="G" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0b0e14', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                      formatter={(value: any) => [`${value} G`, 'Acceleration']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="raw" 
                      stroke={isCollision ? '#ff1a40' : '#00f0ff'} 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#gForceGradient)" 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="filtered" 
                      stroke="#ff8c00" 
                      strokeWidth={2} 
                      dot={false} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-3 border-t border-white/5">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-neonRed" /> Raw Signal
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-electricAmber" /> Low-Pass Filtered
                  </span>
                </div>
                <span>Deceleration Threshold: 3.50 G</span>
              </div>
            </div>

            {/* Row 3: Actuator Hardware Matrix & ML Distribution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Widget: Hardware Actuator Matrix */}
              <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono font-bold text-sm text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-electricAmber" />
                    Actuator Driver States
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400">GPIO TELEMETRY</span>
                </div>

                <div className="space-y-3">
                  {/* LED Actuator Row */}
                  <div className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                    ledState === 'ALERT_RED_STROBE' 
                      ? 'bg-neonRed/15 border-neonRed glow-red' 
                      : 'bg-graphite-900 border-white/5'
                  }`}>
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 block">OUTPUT CHANNEL 01</span>
                      <h4 className="font-mono font-bold text-xs text-white">Visual Warning LED</h4>
                      <span className="text-[10px] font-mono text-slate-500">Opto-Coupled High Current Strobe</span>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold block ${
                        ledState === 'ALERT_RED_STROBE' ? 'bg-neonRed text-white animate-pulse' : 'bg-techEmerald/20 text-emerald-300'
                      }`}>
                        {ledState === 'ALERT_RED_STROBE' ? 'HIGH / STROBE' : 'LOW / NORMAL'}
                      </span>
                    </div>
                  </div>

                  {/* Buzzer Actuator Row */}
                  <div className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                    buzzerState === 'SIMULATED_ON' 
                      ? 'bg-electricAmber/15 border-electricAmber glow-amber' 
                      : 'bg-graphite-900 border-white/5'
                  }`}>
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 block">OUTPUT CHANNEL 02</span>
                      <h4 className="font-mono font-bold text-xs text-white">Piezo Resonant Buzzer</h4>
                      <span className="text-[10px] font-mono text-slate-500">2.8 kHz Resonant Acoustic Tone</span>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold block ${
                        buzzerState === 'SIMULATED_ON' ? 'bg-electricAmber text-black font-black animate-pulse' : 'bg-white/10 text-slate-400'
                      }`}>
                        {buzzerState === 'SIMULATED_ON' ? '85 dB ACTIVE' : 'INACTIVE'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-[10px] font-mono text-slate-500 flex items-center justify-between">
                  <span>DRIVER VOLTAGE: 5.0 V</span>
                  <span>ISOLATION: 2.5 kV RMS</span>
                </div>
              </div>

              {/* Widget: ML Severity Breakdown (Donut Chart) */}
              <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono font-bold text-sm text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-radarCyan" />
                    Historical Severity Breakdown
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400">N = 15,500</span>
                </div>

                <div className="h-44 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={PIE_SEVERITY_DATA}
                        innerRadius={45}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {PIE_SEVERITY_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0b0e14', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                        formatter={(value: any) => [`${value}%`, 'Class Percentage']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono text-slate-400 pt-2 border-t border-white/5">
                  <div>
                    <span className="text-neonRed font-bold block">32%</span>
                    <span>Severe / Fatal</span>
                  </div>
                  <div>
                    <span className="text-electricAmber font-bold block">38%</span>
                    <span>Moderate</span>
                  </div>
                  <div>
                    <span className="text-radarCyan font-bold block">30%</span>
                    <span>Minor Bump</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Row 4: Hardware Health Diagnostics */}
            <div className="glass-panel rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-mono font-bold text-sm text-white flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-techEmerald" />
                  Embedded Microcontroller Diagnostics
                </h3>
                <span className="text-xs font-mono text-techEmerald flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> ALL SYSTEMS NOMINAL
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                <div className="bg-graphite-900/90 p-3 rounded-xl border border-white/5">
                  <span className="text-[10px] text-slate-500 block">CORE CLOCK</span>
                  <span className="font-bold text-white text-sm">80.00 MHz</span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">Dual-Core Xtensa</span>
                </div>
                <div className="bg-graphite-900/90 p-3 rounded-xl border border-white/5">
                  <span className="text-[10px] text-slate-500 block">BUS VOLTAGE</span>
                  <span className="font-bold text-techEmerald text-sm">3.31 V</span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">±0.04V ripple</span>
                </div>
                <div className="bg-graphite-900/90 p-3 rounded-xl border border-white/5">
                  <span className="text-[10px] text-slate-500 block">CORE TEMP</span>
                  <span className="font-bold text-white text-sm">34.2 °C</span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">Thermal Envelope Safe</span>
                </div>
                <div className="bg-graphite-900/90 p-3 rounded-xl border border-white/5">
                  <span className="text-[10px] text-slate-500 block">PACKET LOSS</span>
                  <span className="font-bold text-techEmerald text-sm">0.000 %</span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">I2C Parity OK</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
