import React, { useState } from 'react';
import { 
  Database, 
  BrainCircuit, 
  Lightbulb, 
  Radio, 
  Cpu, 
  ShieldAlert, 
  Zap, 
  Volume2, 
  ArrowRight, 
  CheckCircle2, 
  Layers,
  ChevronRight
} from 'lucide-react';

interface NodeDetail {
  title: string;
  path: 'historical' | 'realtime';
  stage: string;
  specs: string[];
  latency: string;
  description: string;
}

const NODE_DETAILS: Record<string, NodeDetail> = {
  // Historical Path
  'hist-data': {
    title: 'Historical Accident Data',
    path: 'historical',
    stage: 'Input Corpus',
    specs: ['15,500+ NHTSA / Euro NCAP telemetry logs', 'Structural deformation records', 'Multi-vector crash profiles'],
    latency: 'Offline Batch Sync',
    description: 'Empirical crash databases covering multi-angle collision dynamics, vehicle structural inertia, and injury severity indices.'
  },
  'ml-analysis': {
    title: 'Machine Learning Analysis',
    path: 'historical',
    stage: 'Pattern Modeling',
    specs: ['Gradient Boosted Trees (GBDT)', 'Kinetic energy distribution curves', 'Feature importance weighting'],
    latency: 'Offline Training',
    description: 'Studies historical accident patterns to understand how crash peak accelerations correlate with cabin breach severity.'
  },
  'severity-insights': {
    title: 'Severity Insights & Limits',
    path: 'historical',
    stage: 'Safety Parameters',
    specs: ['Calibrated 3.50G safety threshold', 'Dynamic duration windows (120ms)', 'Confidence boundary matrices'],
    latency: 'Static Calibration',
    description: 'Provides calibrated threshold limits deployed directly to the edge controller firmware to minimize false collision triggers.'
  },
  // Real-Time Safety Loop
  'sensor-input': {
    title: 'Sensor Input Stage',
    path: 'realtime',
    stage: 'Hardware Sensing',
    specs: ['3-Axis MEMS Accelerometer (±16G range)', 'Ultrasonic Proximity Transducer (2-400cm)', '1000 Hz continuous I2C/SPI sampling'],
    latency: '1.0 ms Acquisition',
    description: 'High-frequency physical sensing capturing vehicle body deceleration vectors across X, Y, and Z axes simultaneously.'
  },
  'signal-processing': {
    title: 'Signal Conditioning Filter',
    path: 'realtime',
    stage: 'Edge Processing',
    specs: ['2nd-order digital low-pass filtering', 'Pothole & engine vibration rejection', 'Real-time vector magnitude calculation'],
    latency: '3.2 ms Processing',
    description: 'Attenuates high-frequency mechanical vibration and road bumps, preventing premature triggers during normal aggressive driving.'
  },
  'collision-decision': {
    title: 'Collision Decision Engine',
    path: 'realtime',
    stage: 'Deterministic Logic',
    specs: ['Threshold comparator (>3.50G for >40ms)', 'Immediate hardware interrupt routine', 'Zero OS dependency execution'],
    latency: '&lt; 2.0 ms Logic Decision',
    description: 'Executes hardwired logic evaluation. If kinetic deceleration sustains beyond the calibrated boundary, an alert interrupt fires.'
  },
  'led-buzzer': {
    title: 'LED + Buzzer Warning Circuit',
    path: 'realtime',
    stage: 'Physical Warning',
    specs: ['Optoisolated high-speed driver', 'Ultra-bright pulsed red LED cluster', '85 dB resonant piezo acoustic siren'],
    latency: '&lt; 850 ns Actuator Fire',
    description: 'Instantly alerts driver and surrounding cabin occupants milliseconds before human cognitive reflexes could register the incident.'
  }
};

export const SystemVisualization: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string>('collision-decision');
  const activeDetail = NODE_DETAILS[selectedNode] || NODE_DETAILS['collision-decision'];

  return (
    <section id="system-flow" className="py-24 bg-[#08090c] border-t border-white/[0.06] relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[500px] bg-neonRed/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300 uppercase tracking-widest mb-4">
            <Layers className="w-3.5 h-3.5 text-radarCyan" />
            System Architecture
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight">
            DUAL-PATH TECHNOLOGY FLOW
          </h2>
          <p className="mt-4 text-slate-400 font-light text-base sm:text-lg">
            Complete technical separation between the offline Machine Learning intelligence pipeline and the hardwired millisecond safety loop.
          </p>
        </div>

        {/* ============================================================== */}
        {/* DIAGRAM FLOW CONTAINER                                        */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Interactive Pipeline Diagram (8 Cols) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* PATH 1: Historical Data Pipeline (Cyan theme) */}
            <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-radarCyan/30 relative overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-radarCyan shadow-lg shadow-radarCyan/50" />
                  <h3 className="font-mono font-bold text-sm text-white uppercase tracking-wider">
                    Pipeline A: Historical Data & ML Insights (Offline)
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-radarCyan/10 border border-radarCyan/30 text-cyan-300">
                  ANALYTICAL
                </span>
              </div>

              {/* Flow Nodes (3 stages) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative">
                
                {/* Node 1 */}
                <button
                  onClick={() => setSelectedNode('hist-data')}
                  className={`text-left p-4 rounded-xl border transition-all duration-200 relative group ${
                    selectedNode === 'hist-data'
                      ? 'bg-radarCyan/15 border-radarCyan glow-cyan'
                      : 'bg-graphite-900/90 border-white/10 hover:border-radarCyan/50'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-radarCyan/20 flex items-center justify-center text-radarCyan mb-3">
                    <Database className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Step 01</span>
                  <h4 className="font-mono font-bold text-xs text-white mt-0.5">Historical Accident Data</h4>
                  <span className="text-[10px] font-mono text-cyan-400/80 block mt-2">15,500+ records</span>
                </button>

                {/* Node 2 */}
                <button
                  onClick={() => setSelectedNode('ml-analysis')}
                  className={`text-left p-4 rounded-xl border transition-all duration-200 relative group ${
                    selectedNode === 'ml-analysis'
                      ? 'bg-radarCyan/15 border-radarCyan glow-cyan'
                      : 'bg-graphite-900/90 border-white/10 hover:border-radarCyan/50'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-radarCyan/20 flex items-center justify-center text-radarCyan mb-3">
                    <BrainCircuit className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Step 02</span>
                  <h4 className="font-mono font-bold text-xs text-white mt-0.5">ML Pattern Analysis</h4>
                  <span className="text-[10px] font-mono text-cyan-400/80 block mt-2">GBDT Severity Model</span>
                </button>

                {/* Node 3 */}
                <button
                  onClick={() => setSelectedNode('severity-insights')}
                  className={`text-left p-4 rounded-xl border transition-all duration-200 relative group ${
                    selectedNode === 'severity-insights'
                      ? 'bg-radarCyan/15 border-radarCyan glow-cyan'
                      : 'bg-graphite-900/90 border-white/10 hover:border-radarCyan/50'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-radarCyan/20 flex items-center justify-center text-radarCyan mb-3">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Step 03</span>
                  <h4 className="font-mono font-bold text-xs text-white mt-0.5">Severity Insights</h4>
                  <span className="text-[10px] font-mono text-cyan-400/80 block mt-2">Calibrated Limits</span>
                </button>

              </div>

              {/* Connecting trace text */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Output: Informs hardwired threshold parameters</span>
                <span className="text-cyan-400">Zero active crash intervention claim</span>
              </div>
            </div>

            {/* PATH 2: Real-Time Millisecond Collision Alert Loop (Neon Red theme) */}
            <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-neonRed/40 relative overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-neonRed animate-ping" />
                  <h3 className="font-mono font-bold text-sm text-white uppercase tracking-wider">
                    Pipeline B: Collision Alert Path (Real-Time Safety Loop)
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neonRed/15 border border-neonRed/40 text-red-300 font-bold">
                  &lt; 15ms CRITICAL
                </span>
              </div>

              {/* Flow Nodes (4 stages) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative">
                
                {/* Node 1 */}
                <button
                  onClick={() => setSelectedNode('sensor-input')}
                  className={`text-left p-3.5 rounded-xl border transition-all duration-200 relative group ${
                    selectedNode === 'sensor-input'
                      ? 'bg-neonRed/20 border-neonRed glow-red'
                      : 'bg-graphite-900/90 border-white/10 hover:border-neonRed/40'
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-white mb-2">
                    <Radio className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[9px] font-mono text-slate-400 uppercase block">Stage 01</span>
                  <h4 className="font-mono font-bold text-xs text-white mt-0.5">Sensor Input</h4>
                  <span className="text-[10px] font-mono text-slate-400 block mt-1">3-Axis IMU (1 kHz)</span>
                </button>

                {/* Node 2 */}
                <button
                  onClick={() => setSelectedNode('signal-processing')}
                  className={`text-left p-3.5 rounded-xl border transition-all duration-200 relative group ${
                    selectedNode === 'signal-processing'
                      ? 'bg-neonRed/20 border-neonRed glow-red'
                      : 'bg-graphite-900/90 border-white/10 hover:border-neonRed/40'
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-electricAmber/20 flex items-center justify-center text-electricAmber mb-2">
                    <Cpu className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[9px] font-mono text-slate-400 uppercase block">Stage 02</span>
                  <h4 className="font-mono font-bold text-xs text-white mt-0.5">Signal Filter</h4>
                  <span className="text-[10px] font-mono text-slate-400 block mt-1">Noise Suppression</span>
                </button>

                {/* Node 3 */}
                <button
                  onClick={() => setSelectedNode('collision-decision')}
                  className={`text-left p-3.5 rounded-xl border transition-all duration-200 relative group ${
                    selectedNode === 'collision-decision'
                      ? 'bg-neonRed/20 border-neonRed glow-red'
                      : 'bg-graphite-900/90 border-white/10 hover:border-neonRed/40'
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-neonRed/20 flex items-center justify-center text-neonRed mb-2">
                    <ShieldAlert className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[9px] font-mono text-slate-400 uppercase block">Stage 03</span>
                  <h4 className="font-mono font-bold text-xs text-white mt-0.5">Decision Engine</h4>
                  <span className="text-[10px] font-mono text-neonRed font-semibold block mt-1">&gt; 3.50 G Trigger</span>
                </button>

                {/* Node 4 */}
                <button
                  onClick={() => setSelectedNode('led-buzzer')}
                  className={`text-left p-3.5 rounded-xl border transition-all duration-200 relative group ${
                    selectedNode === 'led-buzzer'
                      ? 'bg-neonRed/20 border-neonRed glow-red'
                      : 'bg-graphite-900/90 border-white/10 hover:border-neonRed/40'
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-neonRed/30 flex items-center justify-center text-neonRed mb-2">
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[9px] font-mono text-slate-400 uppercase block">Stage 04</span>
                  <h4 className="font-mono font-bold text-xs text-white mt-0.5">LED + Buzzer</h4>
                  <span className="text-[10px] font-mono text-red-300 block mt-1">Instant Strobe / 85dB</span>
                </button>

              </div>

              {/* Connecting trace footer */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>TOTAL WORST-CASE LATENCY:</span>
                <span className="text-neonRed font-bold">&lt; 14.8 milliseconds</span>
              </div>
            </div>

          </div>

          {/* RIGHT: Node Detail Inspector Card (4 Cols) */}
          <div className="lg:col-span-4 glass-panel rounded-2xl p-6 sm:p-7 border border-white/10 sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                Node Inspector
              </span>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                activeDetail.path === 'historical'
                  ? 'bg-radarCyan/15 text-cyan-300 border border-radarCyan/30'
                  : 'bg-neonRed/15 text-red-300 border border-neonRed/30'
              }`}>
                {activeDetail.stage}
              </span>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <h3 className="font-display font-extrabold text-xl text-white">
                  {activeDetail.title}
                </h3>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5 mt-1">
                  Latency: <strong className="text-white">{activeDetail.latency}</strong>
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {activeDetail.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-white/5">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">
                  Technical Specifications
                </span>
                {activeDetail.specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-mono text-slate-300">
                    <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${
                      activeDetail.path === 'historical' ? 'text-radarCyan' : 'text-neonRed'
                    }`} />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <span className="text-[10px] font-mono text-slate-500 italic block">
                  Click any block in the architecture flow to inspect its stage telemetry and hardware interfaces.
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
