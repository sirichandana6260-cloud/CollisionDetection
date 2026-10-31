import React from 'react';
import { 
  Cpu, 
  Radio, 
  Zap, 
  MapPin, 
  PhoneCall, 
  Network, 
  CheckCircle, 
  Clock, 
  ShieldAlert,
  Layers
} from 'lucide-react';

interface HardwareModule {
  id: string;
  name: string;
  category: string;
  protocol: string;
  status: 'PLANNED' | 'NOT CONNECTED';
  icon: React.ReactNode;
  specs: string;
  description: string;
}

const MODULES: HardwareModule[] = [
  {
    id: 'esp32',
    name: 'ESP32 Dual-Core Microcontroller',
    category: 'Edge Controller',
    protocol: 'FreeRTOS / I2C / SPI',
    status: 'PLANNED',
    icon: <Cpu className="w-5 h-5 text-electricAmber" />,
    specs: '240 MHz Tensilica Xtensa, 520 KB SRAM',
    description: 'Hardware target host executing the deterministic sub-millisecond comparator loop and hardware interrupt ISR.'
  },
  {
    id: 'sensors',
    name: 'Physical 3-Axis MEMS Sensors',
    category: 'Kinetic Sensing',
    protocol: 'I2C Bus (0x53 / 0x68)',
    status: 'NOT CONNECTED',
    icon: <Radio className="w-5 h-5 text-radarCyan" />,
    specs: 'ADXL345 / MPU-6050 (±16G range, 1000 Hz)',
    description: 'Hardwired 3-axis accelerometer and gyro detecting sudden multi-vector deceleration spikes upon physical impact.'
  },
  {
    id: 'actuators',
    name: 'External Warning LED Bar & Piezo Horn',
    category: 'Physical Alert',
    protocol: '12V MOSFET Low-Side Driver',
    status: 'NOT CONNECTED',
    icon: <Zap className="w-5 h-5 text-neonRed" />,
    specs: '120-Lumen Strobe Array + 105 dB Siren',
    description: 'Direct high-power cockpit and exterior safety lighting triggered via optical isolation transistors.'
  },
  {
    id: 'gps',
    name: 'GPS Telemetry Module',
    category: 'Geospatial Location',
    protocol: 'UART NMEA 0183 (9600 bps)',
    status: 'PLANNED',
    icon: <MapPin className="w-5 h-5 text-blue-400" />,
    specs: 'u-blox NEO-6M / NEO-M8N Satellite Receiver',
    description: 'Accurate geospatial coordinates acquisition during severe incident conditions for rescue telemetry packets.'
  },
  {
    id: 'sos',
    name: 'Emergency SOS Cellular Gateway',
    category: 'Telemetry Dispatch',
    protocol: 'GSM / LTE-M / MQTT TLS',
    status: 'PLANNED',
    icon: <PhoneCall className="w-5 h-5 text-purple-400" />,
    specs: 'SIM800L / SIM7600 4G Cellular Transceiver',
    description: 'Autonomous transmission of collision severity rating, G-force telemetry, and GPS location to emergency responders.'
  }
];

export const FutureConnectivity: React.FC = () => {
  return (
    <section id="connectivity" className="py-24 bg-[#08090c] border-t border-white/[0.06] relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-electricAmber/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300 uppercase tracking-widest mb-4">
            <Network className="w-3.5 h-3.5 text-electricAmber" />
            Hardware Architecture Roadmap
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            FUTURE HARDWARE CONNECTIVITY
          </h2>
          <p className="mt-4 text-slate-400 font-light text-base sm:text-lg">
            Physical edge expansion interfaces designed for modular bench prototyping and vehicle harness integration.
          </p>
        </div>

        {/* Prominent Roadmap Disclaimer Banner */}
        <div className="mb-10 p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-electricAmber animate-pulse shrink-0" />
            <p className="text-xs font-mono text-slate-300">
              <strong className="text-electricAmber">HARDWARE INTEGRATION NOTICE:</strong> Physical pins, GPS telemetry, and cellular SOS dispatch are currently documented roadmap specifications. All current telemetry runs on the client-side deterministic simulation engine.
            </p>
          </div>
          <span className="shrink-0 text-[10px] font-mono px-3 py-1 rounded bg-white/5 border border-white/10 text-slate-400">
            ROADMAP SPECIFICATION
          </span>
        </div>

        {/* Modular Hardware Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODULES.map((mod) => (
            <div 
              key={mod.id}
              className="glass-panel rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header: Icon + Status */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-graphite-900 border border-white/10 group-hover:border-white/20 transition-colors">
                    {mod.icon}
                  </div>

                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase border ${
                    mod.status === 'NOT CONNECTED'
                      ? 'bg-red-950/30 border-red-500/30 text-red-300'
                      : 'bg-electricAmber/15 border-electricAmber/30 text-amber-300'
                  }`}>
                    {mod.status}
                  </span>
                </div>

                <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider block">
                  {mod.category}
                </span>

                <h3 className="font-mono font-bold text-base text-white mt-1">
                  {mod.name}
                </h3>

                <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                  {mod.description}
                </p>
              </div>

              {/* Footer Specs & Protocol */}
              <div className="pt-4 mt-6 border-t border-white/10 space-y-1.5 text-[11px] font-mono">
                <div className="flex items-center justify-between text-slate-400">
                  <span>INTERFACE:</span>
                  <span className="text-slate-200">{mod.protocol}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>SPECS:</span>
                  <span className="text-slate-300 truncate max-w-[170px]" title={mod.specs}>{mod.specs}</span>
                </div>
              </div>

            </div>
          ))}

          {/* Quick Info Tile on Hardware Bench Hookup */}
          <div className="glass-panel rounded-2xl p-6 border border-dashed border-white/20 flex flex-col justify-between bg-graphite-950/40">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider block">
                Bench Prototype Interface
              </span>
              <h3 className="font-mono font-bold text-base text-white mt-1">
                Standardized 3.3V / 5V Bus
              </h3>
              <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                Direct pinout compatibility with breadboard prototyping and automotive OBD-II / CAN transceiver add-on shields.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 text-[11px] font-mono text-slate-400 space-y-1">
              <div className="flex items-center justify-between">
                <span>INTERRUPT PIN:</span>
                <span className="text-techEmerald">GPIO 25 (EXT0)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>I2C ADDRESS:</span>
                <span className="text-radarCyan">0x53 (ADXL345)</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
