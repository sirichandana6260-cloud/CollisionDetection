import React from 'react';
import { ArrowRight, Activity, ShieldCheck, Zap, Radio, AlertOctagon } from 'lucide-react';
import { useCollision } from '../context/CollisionContext';

export const Hero: React.FC = () => {
  const { status, telemetry, waveform, simulateCollision } = useCollision();
  const isCollision = status === 'SIMULATED_COLLISION';

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Mini-waveform SVG points generator
  const recentWaveform = waveform.slice(-24);
  const minG = 0.5;
  const maxG = 6.0;
  const svgWidth = 260;
  const svgHeight = 44;

  const points = recentWaveform.map((pt, idx) => {
    const x = (idx / (recentWaveform.length - 1)) * svgWidth;
    const clampedG = Math.min(maxG, Math.max(minG, pt.raw));
    const y = svgHeight - ((clampedG - minG) / (maxG - minG)) * svgHeight;
    return `${x},${y}`;
  }).join(' ');

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      
      {/* Background cinematic visuals & gradients */}
      <div className="absolute inset-0 z-0">
        {/* Dark night automotive visual with high-res dark vehicle image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-35 scale-105 transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=2000&q=80')`,
          }}
        />

        {/* Ambient colored lighting glows (neon red & graphite dark vignetting) */}
        <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[140px] pointer-events-none transition-all duration-700 ${
          isCollision ? 'bg-neonRed/35' : 'bg-red-700/15'
        }`} />
        
        <div className="absolute bottom-0 right-10 w-[500px] h-[350px] bg-electricAmber/10 rounded-full blur-[120px] pointer-events-none" />
        
        {/* Vignette gradients to blend seamlessly into pure dark carbon */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060709] via-[#060709]/80 to-[#060709]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060709] via-transparent to-[#060709]" />
        
        {/* Subtle tech grid lines */}
        <div className="absolute inset-0 tech-grid opacity-30" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center">
        
        {/* Floating Top Badge: SYSTEM READY — DEMO MODE */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel border border-white/10 mb-8 backdrop-blur-xl shadow-2xl animate-fade-in">
          <span className="relative flex h-2.5 w-2.5">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              isCollision ? 'bg-neonRed' : 'bg-techEmerald'
            }`} />
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
              isCollision ? 'bg-neonRed' : 'bg-techEmerald'
            }`} />
          </span>
          <span className="text-xs font-mono font-semibold tracking-widest uppercase text-slate-300">
            {isCollision ? 'SIMULATED COLLISION TRIGGERED' : 'SYSTEM READY — DEMO MODE'}
          </span>
          <span className="text-[10px] font-mono text-slate-400 border-l border-white/10 pl-2">
            LATENCY: {telemetry.systemLatencyMs}ms
          </span>
        </div>

        {/* Hero Headline */}
        <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-[0.95] max-w-5xl mb-6">
          EVERY SECOND <br />
          <span className="bg-gradient-to-r from-neonRed via-red-500 to-electricAmber bg-clip-text text-transparent drop-shadow-sm">
            MATTERS.
          </span>
        </h1>

        {/* Supporting text */}
        <p className="text-lg sm:text-xl lg:text-2xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed mb-10">
          Intelligent collision monitoring. Real-time signal analysis. Instant electronic warning.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 mb-14 w-full sm:w-auto">
          <button
            onClick={() => scrollTo('live-monitor')}
            className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-neonRed text-white font-mono font-bold text-sm tracking-wider uppercase overflow-hidden shadow-2xl shadow-neonRed/40 hover:bg-red-600 active:scale-95 transition-all duration-200"
          >
            <span className="relative z-10 flex items-center gap-2">
              LAUNCH MONITOR
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>

          <button
            onClick={() => scrollTo('technology')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl glass-panel border border-white/15 text-slate-200 font-mono font-semibold text-sm tracking-wider uppercase hover:text-white hover:border-white/30 hover:bg-white/[0.08] active:scale-95 transition-all duration-200"
          >
            EXPLORE TECHNOLOGY
          </button>

          {/* Quick Collision Trigger for instant gratification */}
          <button
            onClick={() => simulateCollision('FRONTAL')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-red-950/40 border border-neonRed/40 text-red-300 font-mono text-xs font-semibold tracking-wider uppercase hover:bg-neonRed/20 hover:border-neonRed transition-all"
            title="Instant collision test demo"
          >
            <AlertOctagon className="w-4 h-4 text-neonRed animate-pulse" />
            <span>TEST IMPACT</span>
          </button>
        </div>

        {/* Floating Animated Sensor Waveform & Telemetry Hud Bar */}
        <div className="w-full max-w-4xl glass-panel rounded-2xl p-4 sm:p-5 border border-white/10 shadow-2xl backdrop-blur-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            
            {/* Live Waveform ribbon */}
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-center justify-between w-full">
                <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-neonRed" />
                  Live Sensor Waveform
                </span>
                <span className={`text-[10px] font-mono font-bold ${isCollision ? 'text-neonRed animate-pulse' : 'text-techEmerald'}`}>
                  {isCollision ? 'IMPACT DETECTED' : 'STEADY (1000 Hz)'}
                </span>
              </div>
              
              {/* Mini SVG Oscilloscope */}
              <div className="w-full h-11 bg-graphite-950/70 rounded-lg border border-white/5 px-2 flex items-center overflow-hidden">
                <svg className="w-full h-full" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="none">
                  {/* Baseline grid */}
                  <line x1="0" y1={svgHeight * 0.75} x2={svgWidth} y2={svgHeight * 0.75} stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                  
                  {/* Waveform line */}
                  <polyline
                    fill="none"
                    stroke={isCollision ? '#ff1a40' : '#00f0ff'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={points}
                  />
                </svg>
              </div>
            </div>

            {/* Middle: G-Force Telemetry Metric */}
            <div className="flex items-center justify-around border-y md:border-y-0 md:border-x border-white/10 py-2 md:py-0 px-2">
              <div className="text-center">
                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Impact Force</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className={`font-mono text-2xl font-bold tracking-tight ${
                    telemetry.resultantG > 3.0 ? 'text-neonRed text-glow-red' : 'text-white'
                  }`}>
                    {telemetry.resultantG.toFixed(2)}
                  </span>
                  <span className="text-xs font-mono text-slate-400">G</span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Obstacle Dist</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-mono text-2xl font-bold text-white">
                    {telemetry.distanceCm}
                  </span>
                  <span className="text-xs font-mono text-slate-400">cm</span>
                </div>
              </div>
            </div>

            {/* Right: Electronic Loop Status */}
            <div className="flex items-center justify-between md:justify-end gap-4">
              <div className="text-left md:text-right">
                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Circuit Trigger</p>
                <p className="text-xs font-mono font-bold text-white flex items-center gap-1.5 md:justify-end">
                  <Zap className="w-3.5 h-3.5 text-electricAmber" />
                  &lt; 15ms HARDWIRED
                </p>
              </div>

              <div className="flex items-center gap-2">
                {/* Physical LED visualization badge */}
                <div className="flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full border transition-all duration-200 ${
                    isCollision 
                      ? 'bg-neonRed border-white glow-red animate-ping' 
                      : 'bg-techEmerald border-emerald-400 glow-emerald'
                  }`} />
                  <span className="text-[8px] font-mono text-slate-400 mt-1">LED</span>
                </div>

                {/* Buzzer icon */}
                <div className="flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                    isCollision 
                      ? 'bg-electricAmber border-amber-300 text-black font-bold text-[9px] animate-pulse' 
                      : 'bg-graphite-800 border-white/20 text-slate-500'
                  }`}>
                    <Radio className="w-2.5 h-2.5" />
                  </div>
                  <span className="text-[8px] font-mono text-slate-400 mt-1">BUZZER</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* Futuristic bottom scanline indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </section>
  );
};
