/* ==========================================================================
   HARMONIX SOUND - AUDIO ENGINE & PLAYBACK CONTROLLER
   Full studio capabilities: 5-band EQ, 60fps AnalyserNode, Spatial Sound,
   Queue manager, Repeat/Shuffle, and local audio drag & drop.
   High-compatibility audio playback across Safari direct file:/// & HTTP.
   Universal MediaSession API integration for hardware media keys & OS overlays.
   Native integrations: DJ Crossfade, Sleep Timer, Output Routing, Sing Mode.
   ========================================================================== */

import { TRACK_CATALOG } from './data.js';
import { Storage } from './storage.js';

export class AudioEngine {
  constructor() {
    this.audio = new Audio();
    // Do NOT set crossOrigin here. Setting it unconditionally breaks file:/// and local playback.
    this.audio.preload = 'metadata';

    // State
    this.currentTrack = null;
    this.queue = [...TRACK_CATALOG];
    this.queueIndex = 0;
    this.isPlaying = false;
    this.isMuted = Storage.getMuted();
    this.volume = Storage.getVolume();
    this.isShuffled = false;
    this.repeatMode = 'off'; // 'off' | 'all' | 'one'
    this.shuffledQueue = [];

    // Web Audio API Nodes
    this.audioCtx = null;
    this.sourceNode = null;
    this.analyserNode = null;
    this.gainNode = null;
    this.pannerNode = null;
    this.eqNodes = [];
    this.vocalNotch = null;
    this.isSingMode = false;
    this.isAudioCtxInitialized = false;
    this.webAudioEnabled = false;

    // DJ Crossfade & Sleep Timer
    this.crossfadeDuration = 0; // 0 (off), 2, 4, 6 seconds
    this.isCrossfading = false;
    this.sleepTimerMinutes = 0;
    this.sleepTimerEndsAt = null;
    this.sleepTimerInterval = null;
    this.sleepAtTrackEnd = false;
    this.onSleepTimerTick = null;

    // Callbacks for UI updates
    this.onTrackChange = null;
    this.onPlayStateChange = null;
    this.onTimeUpdate = null;
    this.onVolumeChange = null;
    this.onQueueUpdate = null;
    this.onTrackEnd = null;

    this.initAudioElement();
    this.initMediaSession();
  }

  initAudioElement() {
    this.audio.volume = this.isMuted ? 0 : this.volume;

    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      this.updateMediaSessionPlaybackState(true);
      if (this.onPlayStateChange) this.onPlayStateChange(true);
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
      this.updateMediaSessionPlaybackState(false);
      if (this.onPlayStateChange) this.onPlayStateChange(false);
    });

    this.audio.addEventListener('timeupdate', () => {
      this.updateMediaSessionPosition();
      this.checkCrossfade();
      if (this.onTimeUpdate) {
        this.onTimeUpdate(this.audio.currentTime, this.audio.duration || 0);
      }
    });

    this.audio.addEventListener('ended', () => {
      if (this.sleepAtTrackEnd) {
        this.pause();
        this.clearSleepTimer();
        return;
      }
      this.handleTrackEnded();
    });

    this.audio.addEventListener('error', (e) => {
      const err = this.audio.error;
      console.warn('Audio stream playback note:', err ? `code=${err.code} msg=${err.message}` : e);
    });
  }

  // Universal Cross-Platform MediaSession API (macOS, Windows, Android, iOS, Linux)
  initMediaSession() {
    if (!('mediaSession' in navigator)) return;

    try {
      const actionHandlers = [
        ['play', () => this.play()],
        ['pause', () => this.pause()],
        ['previoustrack', () => this.prevTrack()],
        ['nexttrack', () => this.nextTrack()],
        ['seekto', (details) => {
          if (details && Number.isFinite(details.seekTime)) {
            this.seek(details.seekTime);
          }
        }],
        ['seekbackward', (details) => {
          const skip = (details && details.seekOffset) || 10;
          this.seek(this.audio.currentTime - skip);
        }],
        ['seekforward', (details) => {
          const skip = (details && details.seekOffset) || 10;
          this.seek(this.audio.currentTime + skip);
        }],
        ['stop', () => this.pause()]
      ];

      for (const [action, handler] of actionHandlers) {
        try {
          navigator.mediaSession.setActionHandler(action, handler);
        } catch (err) {
          // Action might not be supported on this specific browser
        }
      }
    } catch (e) {
      console.warn('MediaSession init note:', e);
    }
  }

  updateMediaSessionMetadata() {
    if (!('mediaSession' in navigator) || !this.currentTrack) return;

    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: this.currentTrack.title || 'Harmonix Track',
        artist: this.currentTrack.artist || 'Harmonix Studio',
        album: this.currentTrack.album || 'Lossless Master',
        artwork: [
          { src: this.currentTrack.coverArt, sizes: '96x96', type: 'image/jpeg' },
          { src: this.currentTrack.coverArt, sizes: '128x128', type: 'image/jpeg' },
          { src: this.currentTrack.coverArt, sizes: '192x192', type: 'image/jpeg' },
          { src: this.currentTrack.coverArt, sizes: '256x256', type: 'image/jpeg' },
          { src: this.currentTrack.coverArt, sizes: '512x512', type: 'image/jpeg' }
        ]
      });
    } catch (err) {
      console.warn('MediaSession metadata update note:', err);
    }
  }

  updateMediaSessionPlaybackState(isPlaying) {
    if (!('mediaSession' in navigator)) return;
    try {
      navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused';
    } catch (e) {}
  }

  updateMediaSessionPosition() {
    if (!('mediaSession' in navigator) || !('setPositionState' in navigator.mediaSession)) return;
    try {
      if (Number.isFinite(this.audio.duration) && this.audio.duration > 0) {
        navigator.mediaSession.setPositionState({
          duration: this.audio.duration,
          playbackRate: this.audio.playbackRate || 1.0,
          position: Math.min(this.audio.currentTime, this.audio.duration)
        });
      }
    } catch (e) {}
  }

  initWebAudioContext() {
    if (this.isAudioCtxInitialized) return;

    // Safari & WebKit CORS Security Rule:
    // MediaElementAudioSourceNode outputs silence on file:/// protocol.
    // For file:/// environment, we leave audio routed directly to hardware speakers
    // so sound playback is 100% reliable and loud.
    const isFileProtocol = window.location.protocol === 'file:';

    try {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtxClass) return;
      this.audioCtx = new AudioCtxClass();

      // Analyser for real-time visualizers
      this.analyserNode = this.audioCtx.createAnalyser();
      this.analyserNode.fftSize = 256;
      this.analyserNode.smoothingTimeConstant = 0.82;

      // Stereo Panner (spatial sound)
      if (this.audioCtx.createStereoPanner) {
        this.pannerNode = this.audioCtx.createStereoPanner();
      }

      // Main Gain
      this.gainNode = this.audioCtx.createGain();
      const currentVol = this.isMuted ? 0 : this.volume;
      this.gainNode.gain.value = currentVol;

      // Apple Music "Sing" Vocal Attenuation Notch Filter (Center-Channel Vocal Suppressor)
      this.vocalNotch = this.audioCtx.createBiquadFilter();
      this.vocalNotch.type = 'peaking';
      this.vocalNotch.frequency.value = 1800; // Human vocal formants
      this.vocalNotch.Q.value = 0.85;
      this.vocalNotch.gain.value = 0; // 0 = off, -18dB = active sing mode

      // 5-band Graphic Equalizer filters
      const subBass = this.audioCtx.createBiquadFilter();
      subBass.type = 'lowshelf';
      subBass.frequency.value = 60;
      subBass.gain.value = 0;

      const bass = this.audioCtx.createBiquadFilter();
      bass.type = 'peaking';
      bass.frequency.value = 250;
      bass.Q.value = 1.0;
      bass.gain.value = 0;

      const mid = this.audioCtx.createBiquadFilter();
      mid.type = 'peaking';
      mid.frequency.value = 1000;
      mid.Q.value = 1.0;
      mid.gain.value = 0;

      const highMid = this.audioCtx.createBiquadFilter();
      highMid.type = 'peaking';
      highMid.frequency.value = 4000;
      highMid.Q.value = 1.0;
      highMid.gain.value = 0;

      const treble = this.audioCtx.createBiquadFilter();
      treble.type = 'highshelf';
      treble.frequency.value = 12000;
      treble.gain.value = 0;

      this.eqNodes = [subBass, bass, mid, highMid, treble];

      if (!isFileProtocol) {
        try {
          // Connect node chain: source -> eq0..4 -> vocalNotch -> (panner) -> analyser -> gain -> destination
          this.sourceNode = this.audioCtx.createMediaElementSource(this.audio);

          let lastNode = this.sourceNode;
          for (const eqNode of this.eqNodes) {
            lastNode.connect(eqNode);
            lastNode = eqNode;
          }

          if (this.vocalNotch) {
            lastNode.connect(this.vocalNotch);
            lastNode = this.vocalNotch;
          }

          if (this.pannerNode) {
            lastNode.connect(this.pannerNode);
            lastNode = this.pannerNode;
          }

          lastNode.connect(this.analyserNode);
          this.analyserNode.connect(this.gainNode);
          this.gainNode.connect(this.audioCtx.destination);
          this.webAudioEnabled = true;
        } catch (nodeErr) {
          console.warn('Web Audio node routing warning (audio plays via native element):', nodeErr);
          this.webAudioEnabled = false;
        }
      } else {
        this.webAudioEnabled = false;
      }

      this.isAudioCtxInitialized = true;
    } catch (err) {
      console.warn('Web Audio Context initialization deferred:', err);
    }
  }

  async ensureAudioContextActive() {
    this.initWebAudioContext();
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      try {
        await this.audioCtx.resume();
      } catch (err) {
        console.warn('AudioContext resume note:', err);
      }
    }
  }

  // Apple Music "Sing" Vocal Attenuation Toggle
  toggleSingMode() {
    this.isSingMode = !this.isSingMode;
    if (this.vocalNotch && this.audioCtx) {
      const targetGain = this.isSingMode ? -18 : 0;
      try {
        this.vocalNotch.gain.setTargetAtTime(targetGain, this.audioCtx.currentTime, 0.05);
      } catch (e) {
        this.vocalNotch.gain.value = targetGain;
      }
    }
    return this.isSingMode;
  }

  // DJ Crossfade Engine
  setCrossfade(seconds) {
    this.crossfadeDuration = Math.max(0, Math.min(10, parseInt(seconds, 10) || 0));
    return this.crossfadeDuration;
  }

  checkCrossfade() {
    if (this.crossfadeDuration <= 0 || this.isCrossfading || !this.audio.duration) return;
    const timeLeft = this.audio.duration - this.audio.currentTime;
    if (timeLeft <= this.crossfadeDuration && timeLeft > 0.4) {
      this.triggerCrossfade();
    }
  }

  triggerCrossfade() {
    this.isCrossfading = true;
    const fadeTime = this.crossfadeDuration;
    const stepInterval = 100;
    const totalSteps = (fadeTime * 1000) / stepInterval;
    let step = 0;
    const initialVol = this.audio.volume;

    const fadeInterval = setInterval(() => {
      step++;
      const factor = Math.max(0, 1 - (step / totalSteps));
      this.audio.volume = initialVol * factor;

      if (step >= totalSteps) {
        clearInterval(fadeInterval);
        this.nextTrack();
        this.audio.volume = this.isMuted ? 0 : this.volume;
        this.isCrossfading = false;
      }
    }, stepInterval);
  }

  // Audiophile Sleep Timer Engine
  setSleepTimer(minutes) {
    this.clearSleepTimer();

    if (minutes === 'end-of-track') {
      this.sleepAtTrackEnd = true;
      this.sleepTimerMinutes = 'end-of-track';
      return 'end-of-track';
    }

    const mins = parseInt(minutes, 10);
    if (!mins || mins <= 0) {
      this.sleepTimerMinutes = 0;
      return 0;
    }

    this.sleepTimerMinutes = mins;
    this.sleepTimerEndsAt = Date.now() + (mins * 60 * 1000);

    this.sleepTimerInterval = setInterval(() => {
      const remainingMs = this.sleepTimerEndsAt - Date.now();
      const remainingSecs = Math.max(0, Math.ceil(remainingMs / 1000));

      if (this.onSleepTimerTick) {
        this.onSleepTimerTick(remainingSecs);
      }

      // 30 seconds before ending: gentle fade down
      if (remainingSecs <= 30 && remainingSecs > 0) {
        const fadeRatio = remainingSecs / 30;
        this.audio.volume = Math.max(0, this.volume * fadeRatio);
      }

      if (remainingSecs <= 0) {
        this.pause();
        this.audio.volume = this.isMuted ? 0 : this.volume;
        this.clearSleepTimer();
      }
    }, 1000);

    return mins;
  }

  clearSleepTimer() {
    if (this.sleepTimerInterval) {
      clearInterval(this.sleepTimerInterval);
      this.sleepTimerInterval = null;
    }
    this.sleepTimerMinutes = 0;
    this.sleepTimerEndsAt = null;
    this.sleepAtTrackEnd = false;
    if (!this.isMuted) {
      this.audio.volume = this.volume;
    }
    if (this.onSleepTimerTick) {
      this.onSleepTimerTick(0);
    }
  }

  getSleepTimerRemaining() {
    if (this.sleepAtTrackEnd) return 'End of Track';
    if (!this.sleepTimerEndsAt) return 0;
    return Math.max(0, Math.ceil((this.sleepTimerEndsAt - Date.now()) / 1000));
  }

  // Audio Output Device Routing (AirPods / External DAC)
  async getAudioOutputDevices() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      return [];
    }
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      return devices
        .filter(d => d.kind === 'audiooutput')
        .map(d => ({
          deviceId: d.deviceId,
          label: d.label || `Output Device (${d.deviceId.slice(0, 5)})`
        }));
    } catch (err) {
      console.warn('Enumerate audio devices note:', err);
      return [];
    }
  }

  async setAudioOutputDevice(deviceId) {
    if (typeof this.audio.setSinkId === 'function') {
      try {
        await this.audio.setSinkId(deviceId);
        return { success: true };
      } catch (err) {
        console.warn('setSinkId error:', err);
        return { success: false, error: err.message };
      }
    }
    return { success: false, error: 'Browser does not support direct setSinkId output switching' };
  }

  setEQBandGain(bandIndex, gainValue) {
    if (this.eqNodes[bandIndex] && this.audioCtx) {
      try {
        this.eqNodes[bandIndex].gain.setTargetAtTime(gainValue, this.audioCtx.currentTime, 0.05);
      } catch (e) {
        this.eqNodes[bandIndex].gain.value = gainValue;
      }
    }
  }

  setStereoPan(panValue) {
    if (this.pannerNode && this.audioCtx) {
      try {
        this.pannerNode.pan.setTargetAtTime(panValue, this.audioCtx.currentTime, 0.05);
      } catch (e) {
        this.pannerNode.pan.value = panValue;
      }
    }
  }

  applyPreset(presetName) {
    const presets = {
      flat: [0, 0, 0, 0, 0],
      bass: [6, 4, 0, -1, -2],
      vocal: [-2, 0, 4, 3, 1],
      electronic: [5, 3, -1, 3, 5],
      acoustic: [3, 2, 0, 2, 4]
    };
    const gains = presets[presetName] || presets.flat;
    gains.forEach((g, i) => this.setEQBandGain(i, g));
    return gains;
  }

  loadTrack(track, autoPlay = true) {
    this.currentTrack = track;
    Storage.addToHistory(track.id);

    // Safari CORS Safety: Never set crossOrigin on file:/// or relative paths
    const isRemoteHttp = track.audioUrl && (track.audioUrl.startsWith('http://') || track.audioUrl.startsWith('https://'));
    if (isRemoteHttp) {
      try {
        const urlObj = new URL(track.audioUrl, window.location.href);
        if (urlObj.origin !== window.location.origin) {
          this.audio.crossOrigin = 'anonymous';
        } else {
          this.audio.removeAttribute('crossorigin');
        }
      } catch (e) {
        this.audio.removeAttribute('crossorigin');
      }
    } else {
      this.audio.removeAttribute('crossorigin');
    }

    this.audio.src = track.audioUrl;
    this.audio.load();

    this.updateMediaSessionMetadata();

    if (this.onTrackChange) {
      this.onTrackChange(this.currentTrack);
    }

    if (autoPlay) {
      this.play();
    }
  }

  async play() {
    await this.ensureAudioContextActive();

    if (!this.currentTrack && this.queue.length > 0) {
      this.loadTrack(this.queue[0], true);
      return;
    }

    try {
      const playPromise = this.audio.play();
      if (playPromise !== undefined) {
        await playPromise;
        this.isPlaying = true;
        this.updateMediaSessionPlaybackState(true);
        if (this.onPlayStateChange) this.onPlayStateChange(true);
      }
    } catch (err) {
      console.warn('Audio playback note:', err);
    }
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
    this.updateMediaSessionPlaybackState(false);
    if (this.onPlayStateChange) this.onPlayStateChange(false);
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  seek(seconds) {
    if (Number.isFinite(seconds)) {
      this.audio.currentTime = Math.max(0, Math.min(seconds, this.audio.duration || 0));
      this.updateMediaSessionPosition();
    }
  }

  seekFraction(fraction) {
    if (this.audio.duration) {
      this.seek(this.audio.duration * fraction);
    }
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    Storage.setVolume(this.volume);
    const targetVol = this.isMuted ? 0 : this.volume;
    this.audio.volume = targetVol;

    if (this.gainNode && this.audioCtx) {
      try {
        this.gainNode.gain.setTargetAtTime(targetVol, this.audioCtx.currentTime, 0.02);
      } catch (e) {
        this.gainNode.gain.value = targetVol;
      }
    }

    if (this.onVolumeChange) {
      this.onVolumeChange(this.volume, this.isMuted);
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    Storage.setMuted(this.isMuted);
    const targetVol = this.isMuted ? 0 : this.volume;
    this.audio.volume = targetVol;

    if (this.gainNode && this.audioCtx) {
      try {
        this.gainNode.gain.setTargetAtTime(targetVol, this.audioCtx.currentTime, 0.02);
      } catch (e) {
        this.gainNode.gain.value = targetVol;
      }
    }

    if (this.onVolumeChange) {
      this.onVolumeChange(this.volume, this.isMuted);
    }
    return this.isMuted;
  }

  nextTrack() {
    const activeQueue = this.isShuffled ? this.shuffledQueue : this.queue;
    if (activeQueue.length === 0) return;

    this.queueIndex = (this.queueIndex + 1) % activeQueue.length;
    this.loadTrack(activeQueue[this.queueIndex], true);
  }

  prevTrack() {
    // If more than 3 seconds in, restart the song
    if (this.audio.currentTime > 3) {
      this.seek(0);
      return;
    }

    const activeQueue = this.isShuffled ? this.shuffledQueue : this.queue;
    if (activeQueue.length === 0) return;

    this.queueIndex = (this.queueIndex - 1 + activeQueue.length) % activeQueue.length;
    this.loadTrack(activeQueue[this.queueIndex], true);
  }

  handleTrackEnded() {
    if (this.repeatMode === 'one') {
      this.seek(0);
      this.play();
    } else if (this.repeatMode === 'all') {
      this.nextTrack();
    } else {
      // Repeat off: stop at end of queue
      const activeQueue = this.isShuffled ? this.shuffledQueue : this.queue;
      if (this.queueIndex < activeQueue.length - 1) {
        this.nextTrack();
      } else {
        this.pause();
        this.seek(0);
      }
    }
  }

  toggleShuffle() {
    this.isShuffled = !this.isShuffled;
    if (this.isShuffled) {
      // Create shuffled queue preserving current track at index 0
      this.shuffledQueue = [...this.queue];
      for (let i = this.shuffledQueue.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.shuffledQueue[i], this.shuffledQueue[j]] = [this.shuffledQueue[j], this.shuffledQueue[i]];
      }
      if (this.currentTrack) {
        const idx = this.shuffledQueue.findIndex(t => t.id === this.currentTrack.id);
        if (idx > -1) {
          this.shuffledQueue.splice(idx, 1);
          this.shuffledQueue.unshift(this.currentTrack);
        }
      }
      this.queueIndex = 0;
    } else {
      if (this.currentTrack) {
        this.queueIndex = this.queue.findIndex(t => t.id === this.currentTrack.id);
      }
    }
    if (this.onQueueUpdate) this.onQueueUpdate(this.getQueue());
    return this.isShuffled;
  }

  cycleRepeat() {
    const modes = ['off', 'all', 'one'];
    const nextIdx = (modes.indexOf(this.repeatMode) + 1) % modes.length;
    this.repeatMode = modes[nextIdx];
    return this.repeatMode;
  }

  setQueue(trackList, startIndex = 0) {
    this.queue = [...trackList];
    this.queueIndex = startIndex;
    if (this.isShuffled) {
      this.toggleShuffle(); // re-shuffle with new queue
    }
    if (this.queue[startIndex]) {
      this.loadTrack(this.queue[startIndex], true);
    }
    if (this.onQueueUpdate) this.onQueueUpdate(this.getQueue());
  }

  addToQueue(track) {
    this.queue.push(track);
    if (this.isShuffled) this.shuffledQueue.push(track);
    if (this.onQueueUpdate) this.onQueueUpdate(this.getQueue());
  }

  insertNextInQueue(track) {
    const activeQueue = this.isShuffled ? this.shuffledQueue : this.queue;
    const insertIdx = this.queueIndex + 1;
    activeQueue.splice(insertIdx, 0, track);
    if (this.onQueueUpdate) this.onQueueUpdate(this.getQueue());
  }

  removeFromQueue(index) {
    const activeQueue = this.isShuffled ? this.shuffledQueue : this.queue;
    if (index >= 0 && index < activeQueue.length) {
      activeQueue.splice(index, 1);
      if (this.queueIndex >= activeQueue.length) {
        this.queueIndex = Math.max(0, activeQueue.length - 1);
      }
      if (this.onQueueUpdate) this.onQueueUpdate(this.getQueue());
    }
  }

  getQueue() {
    return this.isShuffled ? this.shuffledQueue : this.queue;
  }

  // Handle Local User Uploaded Music Files (Drag & Drop or File Input)
  addLocalFile(file) {
    const objectUrl = URL.createObjectURL(file);
    const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
    const parts = fileNameWithoutExt.split(' - ');
    const artist = parts.length > 1 ? parts[0].trim() : 'Local Artist';
    const title = parts.length > 1 ? parts.slice(1).join(' - ').trim() : fileNameWithoutExt;

    const localTrack = {
      id: 'local-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      title: title,
      artist: artist,
      album: 'Local Uploads',
      duration: 180, // Will be updated on metadata load
      genre: 'Local Audio',
      mood: 'Personal',
      color: '#fa2d48',
      coverArt: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
      audioUrl: objectUrl,
      isLocal: true,
      syncedLyrics: [
        { time: 0, text: '♪ Playing local file: ' + file.name + ' ♪' },
        { time: 5, text: 'Full audio visualizer active!' }
      ]
    };

    this.queue.unshift(localTrack);
    this.queueIndex = 0;
    this.loadTrack(localTrack, true);
    if (this.onQueueUpdate) this.onQueueUpdate(this.getQueue());
    return localTrack;
  }
}
