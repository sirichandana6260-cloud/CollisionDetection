import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { 
  Database, 
  Filter, 
  Cpu, 
  Sparkles, 
  Zap, 
  Radio, 
  ShieldCheck, 
  Activity,
  Layers,
  ArrowRight
} from 'lucide-react';

const SEVERITY_DATA = [
  { severity: 'Fatal / Catastrophic', percentage: 8, color: '#ff1a40', count: 1240 },
  { severity: 'Severe High-G', percentage: 24, color: '#ff5c77', count: 3720 },
  { severity: 'Moderate Collision', percentage: 38, color: '#ff8c00', count: 5890 },
  { severity: 'Minor Fender Bumper', percentage: 30, color: '#00f0ff', count: 4650 },
];

export const TechnologyShowcase: React.FC = () => {
  // State for Signal Processing interactive comparison
  const [signalMode, setSignalMode] = useState<'normal' | 'impact'>('impact');

  // State for Circuit simulation
  const [circuitTriggered, setCircuitTriggered] = useState(false);

  return (
    <section id="technology" className="py-24 bg-[#060709] relative overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-neonRed/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[600px] h-[600px] bg-radarCyan/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Headline */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300 uppercase tracking-widest mb-4">
            <Cpu className="w-3.5 h-3.5 text-neonRed" />
            Core Technology Architecture
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
            ENGINEERED FOR MILLISECOND PRECISION
          </h2>
          <p className="mt-4 text-slate-400 font-light text-base sm:text-lg">
            Three decoupled architectural pillars working in harmony: historical pattern intelligence, real-time noise elimination, and hardwired physical actuators.
          </p>
        </div>

        {/* ============================================================== */}
        {/* 01 — MACHINE LEARNING: Understand the Patterns.               */}
        {/* ============================================================== */}
        <div className="mb-28 glass-panel rounded-3xl p-8 sm:p-12 border border-white/10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Text description */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-neonRed uppercase tracking-widest">
                <span>01</span>
                <span className="w-4 h-px bg-neonRed" />
                <span>MACHINE LEARNING</span>
              </div>

              <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                Understand the Patterns.
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Machine learning analyzes comprehensive historical crash telemetry databases to categorize accident severity patterns, kinetic dissipation rates, and structural hazard clusters.
              </p>

              {/* Crucial requirement distinction */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-slate-400 space-y-1">
                <span className="text-white font-bold flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-radarCyan" />
                  Historical Pattern Analysis Only
                </span>
                <p>
                  ML models operate offline on large historical datasets to derive calibrated risk thresholds, rather than guessing imminent collisions before physical impact occurs.
                </p>
              </div>

              {/* Key metrics */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="border-l-2 border-neonRed pl-3">
                  <span className="text-[10px] font-mono uppercase text-slate-500 block">Trained Records</span>
                  <span className="font-mono font-black text-2xl text-white">15,500+</span>
                </div>
                <div className="border-l-2 border-electricAmber pl-3">
                  <span className="text-[10px] font-mono uppercase text-slate-500 block">Classified Severities</span>
                  <span className="font-mono font-black text-2xl text-white">4 Tiers</span>
                </div>
              </div>
            </div>

            {/* Visual: Severity Distribution Chart */}
            <div className="lg:col-span-7 bg-[#050608] rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="font-mono font-bold text-sm text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-neonRed" />
                    Historical Accident Severity Distribution
                  </h4>
                  <span className="text-[11px] font-mono text-slate-400">
                    Empirical crash dataset classification (n = 15,500)
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] border border-white/10 text-slate-400">
                  DEMO DATA
                </span>
              </div>

              {/* Recharts Bar Chart */}
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={SEVERITY_DATA} layout="vertical" margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
                    <XAxis type="number" domain={[0, 45]} unit="%" stroke="#475569" fontSize={11} fontStyle="italic" />
                    <YAxis dataKey="severity" type="category" width={110} stroke="#94a3b8" fontSize={11} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0c0e12', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                      formatter={(value: any, _name: any, item: any) => [`${value}% (${item.payload.count.toLocaleString()} cases)`, 'Proportion']}
                    />
                    <Bar dataKey="percentage" radius={[0, 6, 6, 0]} barSize={22}>
                      {SEVERITY_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-white/5 text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-neonRed" /> Fatal (8%)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5c77]" /> Severe High-G (24%)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-electricAmber" /> Moderate (38%)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-radarCyan" /> Minor (30%)
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* ============================================================== */}
        {/* 02 — SIGNAL PROCESSING: Read the Signal. Detect the Change.   */}
        {/* ============================================================== */}
        <div className="mb-28 glass-panel rounded-3xl p-8 sm:p-12 border border-white/10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Visual: Animated Raw and Filtered Signal Waveforms */}
            <div className="lg:col-span-7 order-2 lg:order-1 bg-[#050608] rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-mono font-bold text-sm text-white flex items-center gap-2">
                    <Activity className="w-4 h-4 text-radarCyan" />
                    Real-Time Signal Conditioning
                  </h4>
                  <span className="text-[11px] font-mono text-slate-400">
                    Dual-trace comparison: Raw Accelerometer vs. Low-Pass Filtered
                  </span>
                </div>

                {/* Interactive Mode Toggle */}
                <div className="flex items-center bg-graphite-900 p-1 rounded-lg border border-white/10">
                  <button
                    onClick={() => setSignalMode('normal')}
                    className={`px-3 py-1 rounded text-[11px] font-mono font-semibold transition-all ${
                      signalMode === 'normal' 
                        ? 'bg-radarCyan/20 text-radarCyan border border-radarCyan/40' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Normal Drive
                  </button>
                  <button
                    onClick={() => setSignalMode('impact')}
                    className={`px-3 py-1 rounded text-[11px] font-mono font-semibold transition-all ${
                      signalMode === 'impact' 
                        ? 'bg-neonRed/20 text-neonRed border border-neonRed/40' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Impact Spike
                  </button>
                </div>
              </div>

              {/* Dynamic SVG Comparison Canvas */}
              <div className="relative w-full h-[220px] bg-black/60 rounded-xl border border-white/10 p-2 overflow-hidden flex flex-col justify-center">
                
                {/* 3.5G Impact Threshold Line */}
                <div className="absolute top-[32%] left-0 right-0 border-t border-dashed border-red-500/60 z-10">
                  <span className="absolute right-3 -top-5 text-[9px] font-mono text-red-400 bg-black/80 px-1.5 py-0.5 rounded border border-red-500/30">
                    TRIGGER THRESHOLD: 3.50 G
                  </span>
                </div>

                {/* Signal Visualization Canvas */}
                <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="50" x2="500" y2="50" stroke="rgba(255,255,255,0.05)" />
                  <line x1="0" y1="100" x2="500" y2="100" stroke="rgba(255,255,255,0.08)" />
                  <line x1="0" y1="150" x2="500" y2="150" stroke="rgba(255,255,255,0.05)" />

                  {/* Raw Signal: High frequency noise + impact spike if in impact mode */}
                  <path
                    d={
                      signalMode === 'normal'
                        ? "M0,150 Q50,140 100,152 T200,148 T300,153 T400,149 T500,151"
                        : "M0,150 Q60,148 120,152 Q180,149 220,150 L240,25 L255,175 L270,40 L285,155 Q350,148 500,150"
                    }
                    fill="none"
                    stroke="#ff8c00"
                    strokeWidth="1.8"
                    strokeOpacity="0.85"
                  />

                  {/* Filtered Signal: Smooth curve isolating the kinetic acceleration change */}
                  <path
                    d={
                      signalMode === 'normal'
                        ? "M0,150 C125,148 375,151 500,150"
                        : "M0,150 C180,150 220,148 245,35 C270,35 290,150 500,150"
                    }
                    fill="none"
                    stroke={signalMode === 'impact' ? '#ff1a40' : '#00f0ff'}
                    strokeWidth="3.2"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Peak annotation tag when in impact mode */}
                {signalMode === 'impact' && (
                  <div className="absolute top-4 left-[46%] -translate-x-1/2 bg-neonRed text-white px-2.5 py-1 rounded-md text-[10px] font-mono font-bold shadow-lg shadow-neonRed/40 animate-bounce">
                    PEAK ACCELERATION: 5.84 G
                  </div>
                )}
              </div>

              {/* Feature legend and specs */}
              <div className="grid grid-cols-3 gap-3 mt-4 text-xs font-mono">
                <div className="bg-white/[0.03] p-2.5 rounded-lg border border-white/5">
                  <span className="text-[10px] text-slate-500 block">SAMPLING</span>
                  <span className="text-white font-bold">1000 S/sec (1 kHz)</span>
                </div>
                <div className="bg-white/[0.03] p-2.5 rounded-lg border border-white/5">
                  <span className="text-[10px] text-slate-500 block">NOISE REJECTION</span>
                  <span className="text-radarCyan font-bold">2nd-Order Digital LPF</span>
                </div>
                <div className="bg-white/[0.03] p-2.5 rounded-lg border border-white/5">
                  <span className="text-[10px] text-slate-500 block">DECISION TIME</span>
                  <span className="text-techEmerald font-bold">&lt; 12.0 ms</span>
                </div>
              </div>
            </div>

            {/* Text description */}
            <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-electricAmber uppercase tracking-widest">
                <span>02</span>
                <span className="w-4 h-px bg-electricAmber" />
                <span>SIGNAL PROCESSING</span>
              </div>

              <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                Read the Signal. <br />Detect the Change.
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Raw vehicle acceleration signals contain heavy road vibration, pothole bumps, and engine chatter. The real-time processing filter strips spurious jitter to recognize the distinct kinetic profile of a violent deceleration event.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-electricAmber/10 border border-electricAmber/30 text-electricAmber mt-0.5">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-mono text-xs font-bold text-white uppercase">Eliminates False Positives</h5>
                    <p className="text-xs text-slate-400 mt-0.5">Distinguishes hard braking or speed-breakers from true structural impact shocks.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-radarCyan/10 border border-radarCyan/30 text-radarCyan mt-0.5">
                    <Filter className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-mono text-xs font-bold text-white uppercase">Instantaneous Threshold Evaluation</h5>
                    <p className="text-xs text-slate-400 mt-0.5">Sub-millisecond comparator verifies vector magnitude: G = √(X² + Y² + Z²).</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ============================================================== */}
        {/* 03 — ELECTRONIC WARNING CIRCUIT: Make the Warning Visible.     */}
        {/* ============================================================== */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Text description */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-radarCyan uppercase tracking-widest">
                <span>03</span>
                <span className="w-4 h-px bg-radarCyan" />
                <span>ELECTRONIC WARNING CIRCUIT</span>
              </div>

              <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                Make the Warning Visible.
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                When an impact exceeds the safety envelope, the decision logic bypasses software delays through an optoisolated electronic trigger circuit. High-intensity warning LEDs strobe immediately alongside an 85dB resonant acoustic transducer.
              </p>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-slate-300 space-y-2">
                <div className="flex items-center justify-between text-white font-bold">
                  <span>DRIVER HUMAN REACTION</span>
                  <span className="text-red-400">~ 1,500 ms</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-red-500 h-full w-[95%]" />
                </div>
                
                <div className="flex items-center justify-between text-white font-bold pt-1">
                  <span>ELECTRONIC WARNING TRIGGER</span>
                  <span className="text-techEmerald">&lt; 15 ms (100x Faster)</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-techEmerald h-full w-[4%]" />
                </div>
              </div>

              {/* Interactive circuit test button */}
              <button
                onClick={() => setCircuitTriggered(!circuitTriggered)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-mono text-xs font-bold tracking-wider uppercase transition-all ${
                  circuitTriggered 
                    ? 'bg-neonRed text-white shadow-lg shadow-neonRed/30' 
                    : 'bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/15'
                }`}
              >
                <Zap className="w-4 h-4 text-electricAmber" />
                <span>{circuitTriggered ? 'DISENGAGE CIRCUIT' : 'TEST HARDWARE TRIGGER'}</span>
              </button>
            </div>

            {/* Visual: Stylish Circuit-Inspired Schematic & Glowing Indicators */}
            <div className="lg:col-span-7 bg-[#050608] rounded-2xl p-6 sm:p-8 border border-white/10 relative">
              
              {/* Circuit Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h4 className="font-mono font-bold text-sm text-white flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-neonRed" />
                    Opto-Isolated Actuator Interface
                  </h4>
                  <span className="text-[11px] font-mono text-slate-400">
                    Low-side NPN / MOSFET High-Speed Switching Stage
                  </span>
                </div>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                  circuitTriggered 
                    ? 'bg-neonRed/20 border-neonRed text-red-300 animate-pulse' 
                    : 'bg-white/5 border-white/10 text-slate-400'
                }`}>
                  {circuitTriggered ? 'LINE ACTIVE (HIGH)' : 'LINE IDLE (LOW)'}
                </span>
              </div>

              {/* Interactive Circuit Schematic Illustration */}
              <div className="relative border border-white/10 rounded-2xl p-6 bg-graphite-950/80 tech-grid">
                
                {/* Circuit Traces */}
                <div className="grid grid-cols-3 gap-6 items-center text-center">
                  
                  {/* Stage 1: Logic Decision Output */}
                  <div className="p-4 rounded-xl bg-graphite-900 border border-white/10 flex flex-col items-center">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">MCU GPIO</span>
                    <span className="font-mono font-bold text-xs text-white mt-1">DECISION PIN</span>
                    <div className={`mt-3 w-3 h-3 rounded-full border ${
                      circuitTriggered ? 'bg-techEmerald glow-emerald' : 'bg-slate-700'
                    }`} />
                    <span className="text-[9px] font-mono text-slate-500 mt-1">3.3V Logic</span>
                  </div>

                  {/* Stage 2: Optical Isolation & Switching Driver */}
                  <div className="p-4 rounded-xl bg-graphite-900 border border-white/10 flex flex-col items-center relative">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">ISOLATOR / DRIVER</span>
                    <span className="font-mono font-bold text-xs text-electricAmber mt-1">OPTOCOUPLER</span>
                    <div className="mt-2 flex items-center gap-1 text-[9px] font-mono text-slate-400">
                      <Zap className={`w-3.5 h-3.5 ${circuitTriggered ? 'text-electricAmber animate-pulse' : 'text-slate-600'}`} />
                      <span>PC817 / NPN</span>
                    </div>
                    <span className="text-[9px] font-mono text-slate-500 mt-1">Galvanic Isolation</span>
                  </div>

                  {/* Stage 3: Dual Actuators Output */}
                  <div className="space-y-3">
                    
                    {/* Glowing LED Actuator */}
                    <div className={`p-3 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                      circuitTriggered 
                        ? 'bg-neonRed/20 border-neonRed glow-red' 
                        : 'bg-graphite-900 border-white/10'
                    }`}>
                      <div className="text-left">
                        <span className="text-[9px] font-mono text-slate-400 block">LED ARRAY</span>
                        <span className="text-xs font-mono font-bold text-white">RED STROBE</span>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 transition-all ${
                        circuitTriggered 
                          ? 'bg-neonRed border-white glow-red-lg animate-ping' 
                          : 'bg-graphite-800 border-white/20'
                      }`} />
                    </div>

                    {/* Glowing Buzzer Actuator */}
                    <div className={`p-3 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                      circuitTriggered 
                        ? 'bg-electricAmber/20 border-electricAmber glow-amber' 
                        : 'bg-graphite-900 border-white/10'
                    }`}>
                      <div className="text-left">
                        <span className="text-[9px] font-mono text-slate-400 block">PIEZO ALARM</span>
                        <span className="text-xs font-mono font-bold text-white">85 dB SIREN</span>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        circuitTriggered 
                          ? 'bg-electricAmber border-amber-300 text-black animate-pulse' 
                          : 'bg-graphite-800 border-white/20 text-slate-600'
                      }`}>
                        <Radio className="w-3.5 h-3.5" />
                      </div>
                    </div>

                  </div>

                </div>

                {/* Connecting Pulse Line across stages */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>PROPAGATION LATENCY</span>
                  <span className="text-techEmerald font-bold">&lt; 850 nanoseconds</span>
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
