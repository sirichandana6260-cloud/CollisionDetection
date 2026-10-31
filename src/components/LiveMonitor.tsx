import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  AlertTriangle, 
  Radio, 
  Activity, 
  Gauge, 
  ShieldAlert, 
  Volume2, 
  Zap,
  Crosshair,
  Sliders
} from 'lucide-react';
import { useCollision } from '../context/CollisionContext';
import { ImpactVector } from '../types';

export const LiveMonitor: React.FC = () => {
  const { 
    status, 
    telemetry, 
    waveform, 
    ledState, 
    buzzerState, 
    collisionCount, 
    startMonitoring, 
    stopMonitoring, 
    simulateCollision, 
    resetSystem,
    activeVector
  } = useCollision();

  const [selectedVector, setSelectedVector] = useState<ImpactVector>('FRONTAL');
  const isCollision = status === 'SIMULATED_COLLISION';
  const isMonitoring = status === 'MONITORING' || isCollision;

  // Radar target coordinate calculation
  // Distance maps to radar radius (0 to 120 px from center)
  const radarRadius = Math.min(125, Math.max(25, (telemetry.distanceCm / 160) * 125));
  // Angle based on active vector
  let radarAngleDeg = 0; // Front
  if (activeVector === 'REAR') radarAngleDeg = 180;
  else if (activeVector === 'LATERAL_SIDE') radarAngleDeg = 90;
  else if (activeVector === 'ROLLOVER') radarAngleDeg = 315;

  const radarAngleRad = (radarAngleDeg - 90) * (Math.PI / 180);
  const targetX = 140 + radarRadius * Math.cos(radarAngleRad);
  const targetY = 140 + radarRadius * Math.sin(radarAngleRad);

  // Oscilloscope canvas-like SVG paths
  const svgWidth = 480;
  const svgHeight = 130;
  const minG = 0.0;
  const maxG = 7.0;

  const rawPoints = waveform.map((pt, idx) => {
    const x = (idx / (waveform.length - 1)) * svgWidth;
    const clampedG = Math.min(maxG, Math.max(minG, pt.raw));
    const y = svgHeight - ((clampedG - minG) / (maxG - minG)) * (svgHeight - 14) - 7;
    return `${x},${y}`;
  }).join(' ');

  const filteredPoints = waveform.map((pt, idx) => {
    const x = (idx / (waveform.length - 1)) * svgWidth;
    const clampedG = Math.min(maxG, Math.max(minG, pt.filtered));
    const y = svgHeight - ((clampedG - minG) / (maxG - minG)) * (svgHeight - 14) - 7;
    return `${x},${y}`;
  }).join(' ');

  return (
    <section id="live-monitor" className="relative py-20 bg-[#08090c] border-y border-white/[0.06] overflow-hidden">
      
      {/* Red alert screen flash effect during collision */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300 z-0 ${
        isCollision ? 'opacity-20 bg-neonRed animate-pulse' : 'opacity-0'
      }`} />

      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-radarCyan/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-neonRed/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-neonRed animate-ping" />
              <span className="text-xs font-mono font-bold tracking-widest text-neonRed uppercase">
                Interactive Sensor Instrumentation
              </span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              LIVE SENSOR MONITOR
            </h2>
          </div>

          {/* Prominent Simulation Mode Badge */}
          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-lg bg-electricAmber/10 border border-electricAmber/30 text-electricAmber font-mono text-xs flex items-center gap-2 shadow-lg shadow-electricAmber/10">
              <span className="w-2 h-2 rounded-full bg-electricAmber animate-pulse" />
              <span className="font-bold tracking-wider">SIMULATION MODE</span>
              <span className="text-[10px] text-amber-200/70 border-l border-electricAmber/30 pl-2">
                SYNTHETIC TELEMETRY
              </span>
            </div>

            <div className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-slate-300 font-mono text-xs flex items-center gap-2">
              <span>EVENTS:</span>
              <span className="font-bold text-white bg-white/10 px-1.5 py-0.5 rounded text-[11px]">
                {collisionCount}
              </span>
            </div>
          </div>
        </div>

        {/* Main Monitor Console Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT: Central Radar Visualization (5 Cols) */}
          <div className={`lg:col-span-5 glass-panel rounded-2xl p-6 border transition-all duration-500 relative flex flex-col justify-between ${
            isCollision ? 'border-neonRed/60 shadow-2xl shadow-neonRed/20' : 'border-white/10'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                <Crosshair className="w-4 h-4 text-radarCyan" />
                Proximity Radar HUD
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                SWEEP: 360° / 4.0s
              </span>
            </div>

            {/* Radar Scope */}
            <div className="relative w-[280px] h-[280px] sm:w-[300px] sm:h-[300px] mx-auto my-4 flex items-center justify-center">
              
              {/* Outer Radar Rings */}
              <div className="absolute inset-0 rounded-full border border-radarCyan/25 bg-graphite-950/80 shadow-inner" />
              <div className="absolute inset-[15%] rounded-full border border-radarCyan/20" />
              <div className="absolute inset-[32%] rounded-full border border-radarCyan/20" />
              <div className="absolute inset-[50%] rounded-full border border-electricAmber/30" />
              
              {/* Critical Threat Ring (Close proximity collision zone) */}
              <div className={`absolute inset-[70%] rounded-full border-2 transition-all duration-300 ${
                isCollision 
                  ? 'border-neonRed bg-neonRed/20 animate-ping' 
                  : 'border-neonRed/30'
              }`} />

              {/* Crosshair Axes */}
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-radarCyan/15 -translate-x-1/2" />
              <div className="absolute left-0 right-0 top-1/2 h-px bg-radarCyan/15 -translate-y-1/2" />
              
              {/* Range labels */}
              <span className="absolute top-1 text-[9px] font-mono text-slate-500">150cm</span>
              <span className="absolute top-10 text-[9px] font-mono text-slate-500">100cm</span>
              <span className="absolute top-20 text-[9px] font-mono text-slate-500">50cm</span>
              <span className="absolute bottom-1 text-[9px] font-mono text-slate-500">REAR</span>
              <span className="absolute left-2 text-[9px] font-mono text-slate-500">L</span>
              <span className="absolute right-2 text-[9px] font-mono text-slate-500">R</span>

              {/* Rotating Radar Sweep Beam */}
              {isMonitoring && (
                <div 
                  className="absolute inset-0 rounded-full pointer-events-none animate-radar-sweep"
                  style={{
                    background: 'conic-gradient(from 0deg, rgba(0, 240, 255, 0.28) 0deg, rgba(0, 240, 255, 0.05) 45deg, transparent 60deg)',
                  }}
                />
              )}

              {/* Central Vehicle Icon */}
              <div className="relative z-10 w-9 h-14 rounded-lg bg-graphite-900 border border-white/20 flex flex-col items-center justify-between py-1 shadow-lg">
                <div className="w-6 h-1 rounded bg-white/40" />
                <span className="text-[8px] font-mono font-bold text-slate-300">HOST</span>
                <div className="w-6 h-1 rounded bg-neonRed/70" />
              </div>

              {/* Dynamic Target Blip / Obstacle Indicator */}
              <div 
                className="absolute z-20 transition-all duration-150 pointer-events-none"
                style={{
                  left: `${targetX}px`,
                  top: `${targetY}px`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className={`relative flex items-center justify-center ${
                  isCollision ? 'scale-125' : ''
                }`}>
                  <span className={`animate-ping absolute inline-flex h-6 w-6 rounded-full opacity-75 ${
                    isCollision ? 'bg-neonRed' : 'bg-electricAmber'
                  }`} />
                  <span className={`relative inline-flex rounded-full h-3.5 w-3.5 border border-white ${
                    isCollision ? 'bg-neonRed glow-red' : 'bg-electricAmber glow-amber'
                  }`} />
                </div>
              </div>

            </div>

            {/* Radar Footer Readout */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-xs font-mono">
              <div>
                <span className="text-slate-400 block text-[10px]">DISTANCE</span>
                <span className="text-white font-bold text-sm">{telemetry.distanceCm} cm</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-[10px]">SECTOR</span>
                <span className="text-electricAmber font-bold text-sm">{activeVector}</span>
              </div>
            </div>

          </div>

          {/* RIGHT: Signal Oscilloscope & Hardware Actuators (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6 justify-between">
            
            {/* Top: Status Banner & Collision Status */}
            <div className={`glass-panel rounded-2xl p-5 border transition-all duration-300 ${
              isCollision 
                ? 'border-neonRed bg-red-950/25 glow-red' 
                : 'border-white/10'
            }`}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                    Collision Engine State
                  </span>
                  <div className="flex items-center gap-3 mt-1">
                    <div className={`w-3.5 h-3.5 rounded-full ${
                      isCollision 
                        ? 'bg-neonRed animate-ping' 
                        : isMonitoring 
                          ? 'bg-techEmerald animate-pulse' 
                          : 'bg-slate-600'
                    }`} />
                    <h3 className={`font-display font-black text-xl sm:text-2xl tracking-wider uppercase ${
                      isCollision 
                        ? 'text-neonRed text-glow-red animate-pulse' 
                        : isMonitoring 
                          ? 'text-white' 
                          : 'text-slate-400'
                    }`}>
                      {isCollision 
                        ? 'SIMULATED COLLISION DETECTED' 
                        : isMonitoring 
                          ? 'NORMAL / ACTIVE MONITORING' 
                          : 'SYSTEM IDLE'}
                    </h3>
                  </div>
                </div>

                {/* G-Force Peak Gauge */}
                <div className="flex items-center gap-4 self-end sm:self-auto bg-black/40 px-4 py-2 rounded-xl border border-white/5">
                  <Gauge className={`w-6 h-6 ${isCollision ? 'text-neonRed animate-bounce' : 'text-radarCyan'}`} />
                  <div>
                    <span className="text-[9px] font-mono text-slate-400 uppercase block">Current G-Force</span>
                    <span className={`font-mono text-xl font-black ${
                      telemetry.resultantG > 3.0 ? 'text-neonRed' : 'text-white'
                    }`}>
                      {telemetry.resultantG.toFixed(2)} G
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Middle: Live Oscilloscope Waveform Display */}
            <div className="glass-panel rounded-2xl p-5 border border-white/10 relative">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-neonRed" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                    Dynamic Signal Waveform
                  </span>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-4 text-[11px] font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-electricAmber rounded" />
                    <span className="text-slate-400">Raw Sensor Signal</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-radarCyan rounded" />
                    <span className="text-slate-400">Filtered G Signal</span>
                  </div>
                </div>
              </div>

              {/* Oscilloscope Viewport */}
              <div className="relative w-full h-[140px] bg-[#050608] rounded-xl border border-white/10 overflow-hidden flex items-center">
                
                {/* Horizontal Threshold Grid Line (3.5G Collision Boundary) */}
                <div 
                  className="absolute left-0 right-0 border-t border-dashed border-red-500/50 z-10"
                  style={{ top: `${(1 - (3.5 / maxG)) * 100}%` }}
                >
                  <span className="absolute right-2 -top-4 text-[9px] font-mono text-red-400 font-bold bg-black/60 px-1 rounded">
                    IMPACT THRESHOLD: 3.50 G
                  </span>
                </div>

                {/* Center Baseline */}
                <div 
                  className="absolute left-0 right-0 border-t border-white/10 z-0"
                  style={{ top: `${(1 - (1.0 / maxG)) * 100}%` }}
                />

                {/* SVG Curves */}
                <svg className="w-full h-full relative z-10" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="none">
                  {/* Raw Signal Polyline (Amber with slight jitter) */}
                  <polyline
                    fill="none"
                    stroke="#ff8c00"
                    strokeWidth="1.5"
                    strokeOpacity="0.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={rawPoints}
                  />

                  {/* Filtered Signal Polyline (Electric Cyan/Red when impact) */}
                  <polyline
                    fill="none"
                    stroke={isCollision ? '#ff1a40' : '#00f0ff'}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={filteredPoints}
                  />
                </svg>

                {/* Scanline Sweep FX */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent pointer-events-none animate-scanline" />
              </div>

              {/* Waveform Metric Bar */}
              <div className="grid grid-cols-4 gap-2 mt-3 text-center text-xs font-mono">
                <div className="bg-white/[0.02] p-1.5 rounded border border-white/5">
                  <span className="text-[9px] text-slate-500 block">X-AXIS</span>
                  <span className="font-bold text-slate-300">{telemetry.accelX} G</span>
                </div>
                <div className="bg-white/[0.02] p-1.5 rounded border border-white/5">
                  <span className="text-[9px] text-slate-500 block">Y-AXIS</span>
                  <span className="font-bold text-slate-300">{telemetry.accelY} G</span>
                </div>
                <div className="bg-white/[0.02] p-1.5 rounded border border-white/5">
                  <span className="text-[9px] text-slate-500 block">Z-AXIS</span>
                  <span className="font-bold text-slate-300">{telemetry.accelZ} G</span>
                </div>
                <div className="bg-white/[0.02] p-1.5 rounded border border-white/5">
                  <span className="text-[9px] text-slate-500 block">SAMPLING</span>
                  <span className="font-bold text-radarCyan">{telemetry.samplingRateHz} Hz</span>
                </div>
              </div>
            </div>

            {/* Bottom: Hardware Actuators (LED + Buzzer Indicators) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* LED Indicator Visualization */}
              <div className={`glass-panel rounded-xl p-4 border transition-all duration-300 flex items-center justify-between ${
                isCollision 
                  ? 'border-neonRed bg-neonRed/10 glow-red' 
                  : 'border-white/10'
              }`}>
                <div>
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-neonRed" />
                    <span className="text-[10px] font-mono uppercase text-slate-400">LED Actuator</span>
                  </div>
                  <p className="font-mono font-bold text-sm text-white mt-1">
                    {ledState === 'ALERT_RED_STROBE' 
                      ? 'ALERT STROBE RED' 
                      : ledState === 'NORMAL_GREEN' 
                        ? 'STEADY GREEN' 
                        : 'LED OFF'}
                  </p>
                  <span className="text-[10px] font-mono text-slate-500">Opto-Isolated Drive</span>
                </div>

                {/* Physical LED Bulb Graphic */}
                <div className="relative flex items-center justify-center w-12 h-12">
                  <div className={`w-8 h-8 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                    isCollision 
                      ? 'bg-neonRed border-white glow-red-lg animate-ping' 
                      : isMonitoring 
                        ? 'bg-techEmerald border-emerald-300 glow-emerald' 
                        : 'bg-graphite-800 border-white/20'
                  }`}>
                    <div className="w-2.5 h-2.5 rounded-full bg-white/70" />
                  </div>
                </div>
              </div>

              {/* Buzzer Status Indicator */}
              <div className={`glass-panel rounded-xl p-4 border transition-all duration-300 flex items-center justify-between ${
                isCollision 
                  ? 'border-electricAmber bg-electricAmber/10 glow-amber' 
                  : 'border-white/10'
              }`}>
                <div>
                  <div className="flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-electricAmber" />
                    <span className="text-[10px] font-mono uppercase text-slate-400">Piezo Buzzer</span>
                  </div>
                  <p className="font-mono font-bold text-sm text-white mt-1">
                    {buzzerState === 'SIMULATED_ON' ? 'SIMULATED ON (85 dB)' : 'SIMULATED OFF'}
                  </p>
                  <span className="text-[10px] font-mono text-slate-500">2.8 kHz Resonant Pulse</span>
                </div>

                {/* Acoustic Buzzer Graphic */}
                <div className="relative flex items-center justify-center w-12 h-12">
                  <div className={`w-8 h-8 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                    buzzerState === 'SIMULATED_ON'
                      ? 'bg-electricAmber border-amber-300 text-black animate-pulse'
                      : 'bg-graphite-800 border-white/20 text-slate-600'
                  }`}>
                    <Radio className="w-4 h-4" />
                  </div>
                  {buzzerState === 'SIMULATED_ON' && (
                    <span className="absolute inset-0 rounded-full border border-electricAmber animate-ping pointer-events-none" />
                  )}
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Interactive Control Console Deck */}
        <div className="mt-8 glass-panel rounded-2xl p-6 border border-white/10 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Control Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              {/* Start / Pause */}
              {isMonitoring ? (
                <button
                  onClick={stopMonitoring}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] border border-white/15 text-white font-mono text-xs font-bold tracking-wider uppercase transition-all"
                >
                  <Pause className="w-4 h-4 text-electricAmber" />
                  PAUSE MONITORING
                </button>
              ) : (
                <button
                  onClick={startMonitoring}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-techEmerald text-black font-mono text-xs font-black tracking-wider uppercase hover:bg-emerald-400 transition-all shadow-lg shadow-techEmerald/20"
                >
                  <Play className="w-4 h-4" />
                  START MONITORING
                </button>
              )}

              {/* SIMULATE COLLISION (Primary Action) */}
              <button
                onClick={() => simulateCollision(selectedVector)}
                className="group relative overflow-hidden flex items-center gap-2.5 px-7 py-3 rounded-xl bg-gradient-to-r from-neonRed via-red-600 to-neonRed text-white font-mono text-xs font-black tracking-wider uppercase transition-all duration-300 hover:shadow-xl hover:shadow-neonRed/50 active:scale-95"
              >
                <AlertTriangle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>SIMULATE COLLISION</span>
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>

              {/* RESET SYSTEM */}
              <button
                onClick={resetSystem}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 text-slate-300 font-mono text-xs font-semibold tracking-wider uppercase transition-all"
              >
                <RotateCcw className="w-4 h-4 text-slate-400" />
                RESET SYSTEM
              </button>
            </div>

            {/* Impact Vector Preset Selector */}
            <div className="flex items-center gap-2 w-full lg:w-auto bg-black/40 p-1.5 rounded-xl border border-white/10">
              <span className="text-[11px] font-mono text-slate-400 px-2 flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5 text-slate-500" />
                VECTOR:
              </span>

              {(['FRONTAL', 'REAR', 'LATERAL_SIDE', 'ROLLOVER'] as ImpactVector[]).map((v) => (
                <button
                  key={v}
                  onClick={() => setSelectedVector(v)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold tracking-wider transition-all ${
                    selectedVector === v
                      ? 'bg-neonRed/20 text-red-300 border border-neonRed/40'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {v.replace('_', ' ')}
                </button>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
