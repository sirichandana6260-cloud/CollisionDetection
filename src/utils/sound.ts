// Web Audio API sound synthesizer for simulated automotive piezo buzzer
class BuzzerSynthesizer {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private activeOscillator: OscillatorNode | null = null;
  private activeGain: GainNode | null = null;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopAlarm();
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  // Quick soft click or chirp on UI button actions
  public playClick(freq = 1200) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.06);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.07);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Simulated Piezo Buzzer: high-frequency 2800Hz resonant alarm pattern
  public triggerAlarmPattern() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      this.stopAlarm();

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square'; // Typical harsh piezo transducer acoustic wave
      osc.frequency.setValueAtTime(2600, this.ctx.currentTime);

      // Beep-beep-beep pulse pattern
      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0, now);

      for (let i = 0; i < 4; i++) {
        const start = now + i * 0.18;
        gain.gain.setValueAtTime(0.08, start);
        gain.gain.setValueAtTime(0.0001, start + 0.10);
      }

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.8);
    } catch {
      // ignore
    }
  }

  public stopAlarm() {
    if (this.activeOscillator) {
      try {
        this.activeOscillator.stop();
        this.activeOscillator.disconnect();
      } catch {
        // ignore
      }
      this.activeOscillator = null;
    }
  }
}

export const buzzerSound = new BuzzerSynthesizer();
