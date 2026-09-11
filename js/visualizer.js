/* ==========================================================================
   HARMONIX SOUND - REAL-TIME 60FPS CANVAS AUDIO VISUALIZER
   3 Modes: Neon Equalizer Bars, Liquid Oscilloscope Wave, Radial Pulsar Orb
   High-performance rendering supporting both Web Audio analyser and dynamic pulse
   ========================================================================== */

export class Visualizer {
  constructor(audioEngine) {
    this.engine = audioEngine;
    this.canvases = [];
    this.mode = 'bars'; // 'bars' | 'wave' | 'radial'
    this.animationFrameId = null;
    this.isRunning = false;

    // Data buffers
    this.dataArray = null;
    this.timeDomainArray = null;

    // Peak decay caps for bars
    this.peaks = [];
  }

  registerCanvas(canvas, type = 'stage') {
    if (!canvas) return;
    this.canvases.push({ canvas, type });
    this.resizeCanvas(canvas);
  }

  resizeCanvas(canvas) {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
  }

  setMode(newMode) {
    this.mode = newMode;
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.renderLoop();
  }

  stop() {
    this.isRunning = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  renderLoop() {
    this.render();
    this.animationFrameId = requestAnimationFrame(() => this.renderLoop());
  }

  render() {
    const analyser = this.engine.analyserNode;
    const isPlaying = this.engine.isPlaying;
    const isLiveWebAudio = analyser && this.engine.webAudioEnabled;

    if (isLiveWebAudio && isPlaying) {
      const bufferLength = analyser.frequencyBinCount;
      if (!this.dataArray || this.dataArray.length !== bufferLength) {
        this.dataArray = new Uint8Array(bufferLength);
        this.timeDomainArray = new Uint8Array(bufferLength);
        this.peaks = new Array(bufferLength).fill(0);
      }
      analyser.getByteFrequencyData(this.dataArray);
      analyser.getByteTimeDomainData(this.timeDomainArray);
    } else if (isPlaying) {
      this.generateSimulatedFrequencies();
    }

    for (const item of this.canvases) {
      const { canvas, type } = item;
      const ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.clearRect(0, 0, width, height);

      if (!isPlaying) {
        this.drawIdlePulse(ctx, width, height, type);
      } else {
        if (this.mode === 'bars') {
          this.drawBars(ctx, width, height);
        } else if (this.mode === 'wave') {
          this.drawWave(ctx, width, height);
        } else if (this.mode === 'radial') {
          this.drawRadial(ctx, width, height);
        }
      }
    }
  }

  generateSimulatedFrequencies() {
    const bufferLength = 64;
    if (!this.dataArray || this.dataArray.length !== bufferLength) {
      this.dataArray = new Uint8Array(bufferLength);
      this.timeDomainArray = new Uint8Array(bufferLength);
      this.peaks = new Array(bufferLength).fill(0);
    }

    const t = Date.now() * 0.006;
    const beat = (Math.sin(t * 3.5) + 1) * 0.5;
    const midPulse = (Math.cos(t * 2.1) + 1) * 0.5;

    for (let i = 0; i < bufferLength; i++) {
      let val = 0;
      if (i < 8) {
        val = (Math.sin(t * 4 + i * 0.4) * 0.25 + 0.75) * (0.8 * beat + 0.2) * 230;
      } else if (i < 28) {
        val = (Math.sin(t * 6 + i * 0.3) * 0.3 + 0.7) * (0.5 * beat + 0.5 * midPulse) * 190;
      } else {
        val = (Math.cos(t * 9 + i * 0.2) * 0.25 + 0.55) * 140;
      }
      this.dataArray[i] = Math.max(15, Math.min(255, Math.floor(val)));
      this.timeDomainArray[i] = 128 + Math.floor(Math.sin(t * 8 + i * 0.3) * (val * 0.35));
    }
  }

  drawIdlePulse(ctx, width, height, type) {
    const time = Date.now() * 0.002;
    const barCount = 48;
    const barWidth = width / barCount;

    for (let i = 0; i < barCount; i++) {
      const h = Math.sin(time + i * 0.2) * 6 + 10;
      const x = i * barWidth;
      const y = height - h;

      ctx.fillStyle = 'rgba(250, 45, 72, 0.18)';
      ctx.fillRect(x + 1, y, barWidth - 2, h);
    }
  }

  drawBars(ctx, width, height) {
    const bufferLength = 64; // Focus on bass & audible mids
    const barWidth = (width / bufferLength);

    // Warm coral-into-studio-amber gradient
    const gradient = ctx.createLinearGradient(0, height, 0, 0);
    gradient.addColorStop(0, '#e0243d');
    gradient.addColorStop(0.7, '#fa2d48');
    gradient.addColorStop(1, '#f59e0b');

    for (let i = 0; i < bufferLength; i++) {
      const val = this.dataArray[i] || 0;
      const percent = val / 255;
      const barHeight = Math.max(3, percent * height * 0.85);

      const x = i * barWidth;
      const y = height - barHeight;

      // Peak tracking with slow falloff
      if (barHeight > (this.peaks[i] || 0)) {
        this.peaks[i] = barHeight;
      } else {
        this.peaks[i] = Math.max(0, (this.peaks[i] || 0) - 1.8);
      }

      // Draw Main Bar
      ctx.fillStyle = gradient;
      ctx.fillRect(x + 2, y, barWidth - 4, barHeight);

      // Peak dot
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x + 2, height - this.peaks[i] - 3, barWidth - 4, 2);
    }
  }

  drawWave(ctx, width, height) {
    const bufferLength = this.timeDomainArray ? this.timeDomainArray.length : 64;
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#fa2d48';
    ctx.shadowBlur = 12;
    ctx.shadowColor = 'rgba(250, 45, 72, 0.45)';

    ctx.beginPath();
    const sliceWidth = width / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const v = (this.timeDomainArray ? this.timeDomainArray[i] : 128) / 128.0;
      const y = (v * height) / 2;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      x += sliceWidth;
    }

    ctx.stroke();
    ctx.shadowBlur = 0; // reset
  }

  drawRadial(ctx, width, height) {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) * 0.72;
    const count = 72;

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const val = this.dataArray ? (this.dataArray[i % this.dataArray.length] || 0) : 0;
      const barLen = (val / 255) * 45;

      const x1 = centerX + Math.cos(angle) * radius;
      const y1 = centerY + Math.sin(angle) * radius;
      const x2 = centerX + Math.cos(angle) * (radius + barLen);
      const y2 = centerY + Math.sin(angle) * (radius + barLen);

      ctx.strokeStyle = i % 2 === 0 ? '#fa2d48' : '#f59e0b';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
  }
}
