import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { SystemStatus, ImpactVector, SensorTelemetry, AlertEvent, LEDState, BuzzerState } from '../types';
import { buzzerSound } from '../utils/sound';

interface CollisionContextType {
  status: SystemStatus;
  telemetry: SensorTelemetry;
  waveform: { index: number; raw: number; filtered: number; timestamp: number }[];
  ledState: LEDState;
  buzzerState: BuzzerState;
  alertHistory: AlertEvent[];
  soundEnabled: boolean;
  collisionCount: number;
  uptimeSeconds: number;
  activeVector: ImpactVector;
  startMonitoring: () => void;
  stopMonitoring: () => void;
  simulateCollision: (vector?: ImpactVector) => void;
  resetSystem: () => void;
  clearAlertHistory: () => void;
  toggleSound: () => void;
}

const INITIAL_TELEMETRY: SensorTelemetry = {
  timestamp: Date.now(),
  accelX: 0.04,
  accelY: -0.02,
  accelZ: 0.98,
  resultantG: 0.98,
  filteredG: 0.98,
  distanceCm: 142,
  speedKmh: 64,
  vibration: 0.05,
  samplingRateHz: 1000,
  systemLatencyMs: 11.8,
};

const INITIAL_ALERTS: AlertEvent[] = [
  {
    id: 'demo-alert-01',
    timestamp: '10:14:22.418',
    type: 'SIMULATED FRONT IMPACT',
    impactVector: 'FRONTAL',
    peakG: 4.82,
    durationMs: 145,
    severity: 'CRITICAL',
    ledTriggered: true,
    buzzerTriggered: true,
    isSimulated: true,
  },
  {
    id: 'demo-alert-02',
    timestamp: '09:48:05.112',
    type: 'SIMULATED PROXIMITY HAZARD',
    impactVector: 'REAR',
    peakG: 2.15,
    durationMs: 310,
    severity: 'WARNING',
    ledTriggered: true,
    buzzerTriggered: false,
    isSimulated: true,
  }
];

const CollisionContext = createContext<CollisionContextType | undefined>(undefined);

export const CollisionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<SystemStatus>('MONITORING');
  const [telemetry, setTelemetry] = useState<SensorTelemetry>(INITIAL_TELEMETRY);
  const [ledState, setLedState] = useState<LEDState>('NORMAL_GREEN');
  const [buzzerState, setBuzzerState] = useState<BuzzerState>('SIMULATED_OFF');
  const [alertHistory, setAlertHistory] = useState<AlertEvent[]>(INITIAL_ALERTS);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [collisionCount, setCollisionCount] = useState<number>(INITIAL_ALERTS.length);
  const [uptimeSeconds, setUptimeSeconds] = useState<number>(142);
  const [activeVector, setActiveVector] = useState<ImpactVector>('FRONTAL');

  // Waveform ring buffer (50 points)
  const [waveform, setWaveform] = useState<{ index: number; raw: number; filtered: number; timestamp: number }[]>(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      index: i,
      raw: 1.0 + Math.sin(i * 0.4) * 0.08 + (Math.random() - 0.5) * 0.05,
      filtered: 1.0 + Math.sin(i * 0.4) * 0.06,
      timestamp: Date.now() - (50 - i) * 100,
    }));
  });

  const spikeRemainingRef = useRef<number>(0);
  const activeSpikeGRef = useRef<number>(5.6);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Uptime counter
  useEffect(() => {
    const interval = setInterval(() => {
      setUptimeSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Real-time telemetry generator
  useEffect(() => {
    if (status === 'IDLE') return;

    timerRef.current = setInterval(() => {
      const now = Date.now();
      const t = now / 300;

      let rawG = 1.0 + Math.sin(t * 0.8) * 0.08 + (Math.random() - 0.5) * 0.12;
      let filteredG = 1.0 + Math.sin(t * 0.8) * 0.06;

      // Handle impact spike injection
      if (spikeRemainingRef.current > 0) {
        spikeRemainingRef.current -= 1;
        const decay = spikeRemainingRef.current / 15;
        const shock = activeSpikeGRef.current * (0.4 + decay * 0.6) + (Math.random() - 0.5) * 0.8;
        rawG = Math.max(1.0, shock);
        filteredG = Math.max(1.0, shock * 0.88);
      }

      const accelX = Number(((Math.sin(t * 0.5) * 0.06) + (spikeRemainingRef.current > 0 ? (activeSpikeGRef.current * 0.5) : 0)).toFixed(2));
      const accelY = Number(((Math.cos(t * 0.4) * 0.04) + (spikeRemainingRef.current > 0 ? (activeSpikeGRef.current * 0.3) : 0)).toFixed(2));
      const accelZ = Number((rawG).toFixed(2));
      const resultant = Number(Math.sqrt(accelX * accelX + accelY * accelY + accelZ * accelZ).toFixed(2));

      // Ultrasonic proximity simulation
      const baseDistance = spikeRemainingRef.current > 0 ? 12 : 135 + Math.sin(t * 0.2) * 25;
      const distanceCm = Math.max(8, Math.round(baseDistance + (Math.random() - 0.5) * 4));

      setTelemetry(prev => ({
        ...prev,
        timestamp: now,
        accelX,
        accelY,
        accelZ,
        resultantG: resultant,
        filteredG: Number(filteredG.toFixed(2)),
        distanceCm,
        vibration: Number((Math.random() * 0.08).toFixed(3)),
        systemLatencyMs: Number((11.2 + Math.random() * 1.2).toFixed(1)),
      }));

      setWaveform(prev => {
        const nextIndex = prev.length > 0 ? prev[prev.length - 1].index + 1 : 0;
        const next = [
          ...prev.slice(1),
          {
            index: nextIndex,
            raw: Number(rawG.toFixed(2)),
            filtered: Number(filteredG.toFixed(2)),
            timestamp: now,
          }
        ];
        return next;
      });
    }, 90);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status]);

  const startMonitoring = useCallback(() => {
    buzzerSound.playClick(1400);
    setStatus('MONITORING');
    setLedState('NORMAL_GREEN');
    setBuzzerState('SIMULATED_OFF');
  }, []);

  const stopMonitoring = useCallback(() => {
    buzzerSound.playClick(800);
    setStatus('IDLE');
    setLedState('OFF');
    setBuzzerState('SIMULATED_OFF');
  }, []);

  const simulateCollision = useCallback((vector: ImpactVector = 'FRONTAL') => {
    setActiveVector(vector);
    setStatus('SIMULATED_COLLISION');
    setLedState('ALERT_RED_STROBE');
    setBuzzerState('SIMULATED_ON');

    // Peak G determination based on vector
    const peakGMap: Record<ImpactVector, number> = {
      FRONTAL: 5.84,
      REAR: 4.21,
      LATERAL_SIDE: 6.12,
      ROLLOVER: 7.45
    };
    const peakG = peakGMap[vector] || 5.84;
    activeSpikeGRef.current = peakG;
    spikeRemainingRef.current = 15; // 15 tick decay duration

    // Sound alert
    buzzerSound.triggerAlarmPattern();

    // Create timestamp string
    const d = new Date();
    const timeStr = `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}.${d.getMilliseconds().toString().padStart(3, '0')}`;

    const newAlert: AlertEvent = {
      id: `alert-${Date.now()}`,
      timestamp: timeStr,
      type: `SIMULATED ${vector.replace('_', ' ')} COLLISION`,
      impactVector: vector,
      peakG: peakG,
      durationMs: 168,
      severity: 'CRITICAL',
      ledTriggered: true,
      buzzerTriggered: true,
      isSimulated: true,
    };

    setAlertHistory(prev => [newAlert, ...prev]);
    setCollisionCount(prev => prev + 1);
  }, []);

  const resetSystem = useCallback(() => {
    buzzerSound.playClick(1100);
    buzzerSound.stopAlarm();
    spikeRemainingRef.current = 0;
    setStatus('MONITORING');
    setLedState('NORMAL_GREEN');
    setBuzzerState('SIMULATED_OFF');
    setTelemetry(INITIAL_TELEMETRY);
  }, []);

  const clearAlertHistory = useCallback(() => {
    buzzerSound.playClick(900);
    setAlertHistory([]);
    setCollisionCount(0);
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => {
      const next = !prev;
      buzzerSound.setMuted(!next);
      if (next) {
        buzzerSound.playClick(1600);
      }
      return next;
    });
  }, []);

  return (
    <CollisionContext.Provider
      value={{
        status,
        telemetry,
        waveform,
        ledState,
        buzzerState,
        alertHistory,
        soundEnabled,
        collisionCount,
        uptimeSeconds,
        activeVector,
        startMonitoring,
        stopMonitoring,
        simulateCollision,
        resetSystem,
        clearAlertHistory,
        toggleSound,
      }}
    >
      {children}
    </CollisionContext.Provider>
  );
};

export const useCollision = (): CollisionContextType => {
  const context = useContext(CollisionContext);
  if (!context) {
    throw new Error('useCollision must be used within a CollisionProvider');
  }
  return context;
};
