export type SystemStatus = 'IDLE' | 'MONITORING' | 'WARNING' | 'SIMULATED_COLLISION';

export type ImpactVector = 'FRONTAL' | 'REAR' | 'LATERAL_SIDE' | 'ROLLOVER';

export interface SensorTelemetry {
  timestamp: number;
  accelX: number; // in G
  accelY: number; // in G
  accelZ: number; // in G
  resultantG: number; // in G
  filteredG: number; // filtered signal
  distanceCm: number; // ultrasonic sensor distance
  speedKmh: number; // vehicle speed
  vibration: number; // peak noise
  samplingRateHz: number; // e.g. 1000 Hz
  systemLatencyMs: number; // e.g. 11.4 ms
}

export interface AlertEvent {
  id: string;
  timestamp: string;
  type: string;
  impactVector: ImpactVector;
  peakG: number;
  durationMs: number;
  severity: 'CRITICAL' | 'WARNING' | 'MODERATE' | 'SYSTEM';
  ledTriggered: boolean;
  buzzerTriggered: boolean;
  isSimulated: boolean;
}

export type LEDState = 'OFF' | 'NORMAL_GREEN' | 'CAUTION_AMBER' | 'ALERT_RED_STROBE';
export type BuzzerState = 'SIMULATED_OFF' | 'SIMULATED_CAUTION' | 'SIMULATED_ON';

export interface MLPatternStat {
  category: string;
  severityLevel: string;
  frequencyPct: number;
  avgPeakG: number;
  avgResponseMs: number;
}
