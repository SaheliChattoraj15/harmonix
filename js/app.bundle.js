/* Harmonix Sound - Standalone Production Bundle with Cross-Platform OS Engine */
(function() {

/* --- data.js --- */

/* ==========================================================================
   HARMONIX SOUND - MUSIC CATALOG & DATA
   Curated audiophile tracks with high-fashion artwork, specs, and synced lyrics
   ========================================================================== */
const TRACK_CATALOG = [
  {
    id: 'track-1',
    title: 'Midnight City Lights',
    artist: 'Neo Drive',
    album: 'Neon Horizon',
    duration: 33,
    genre: 'Synthwave',
    mood: 'Energetic',
    color: '#fa2d48',
    bpm: 118,
    key: 'D Minor',
    quality: '24-Bit / 96kHz FLAC',
    coverArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=85',
    audioUrl: 'assets/audio/track1.wav',
    syncedLyrics: [
      { time: 0, text: '♪ (Atmospheric 80s synthesizer swells) ♪' },
      { time: 4, text: 'Cruising through the neon rain' },
      { time: 9, text: 'Reflections dancing on the boulevard' },
      { time: 14, text: 'The city breathes in violet haze' },
      { time: 19, text: 'Electric pulse, accelerating heartbeat' },
      { time: 24, text: 'We own the night under midnight skies' },
      { time: 28, text: 'Beyond the horizon where the lasers merge' }
    ]
  },
  {
    id: 'track-2',
    title: 'Coffee & Raindrops',
    artist: 'Luna Lofi',
    album: 'Cloudy Windows',
    duration: 34,
    genre: 'Lo-Fi Chill',
    mood: 'Relaxing',
    color: '#f59e0b',
    bpm: 85,
    key: 'C Major',
    quality: '24-Bit / 48kHz FLAC',
    coverArt: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=85',
    audioUrl: 'assets/audio/track2.wav',
    syncedLyrics: [
      { time: 0, text: '♪ (Vinyl warmth & gentle Rhodes keys) ♪' },
      { time: 5, text: 'Steam rising from a ceramic mug' },
      { time: 11, text: 'Rain tapping softly against the glass' },
      { time: 17, text: 'Quiet thoughts wandering through time' },
      { time: 23, text: 'Just mellow chords and coffee beans' },
      { time: 29, text: 'Daydreaming beyond peaceful screens' }
    ]
  },
  {
    id: 'track-3',
    title: 'Cyber Protocol',
    artist: 'Nexus-9',
    album: 'System Override',
    duration: 30,
    genre: 'Cyberpunk',
    mood: 'Intense',
    color: '#e11d48',
    bpm: 130,
    key: 'F Minor',
    quality: '24-Bit / 96kHz Master',
    coverArt: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=85',
    audioUrl: 'assets/audio/track3.wav',
    syncedLyrics: [
      { time: 0, text: '♪ (Cybernetic glitch & sub-bass rumble) ♪' },
      { time: 4, text: 'Initializing neural link sequence...' },
      { time: 9, text: 'Bypassing central mainframe security' },
      { time: 15, text: 'Overclock the processor, break the ice' },
      { time: 21, text: 'Firewalls crumbling, system override' },
      { time: 26, text: 'Full decryption complete.' }
    ]
  },
  {
    id: 'track-4',
    title: 'Velvet Horizons',
    artist: 'Solaria & The Groove',
    album: 'Golden Sunset',
    duration: 31,
    genre: 'Neo-Soul',
    mood: 'Smooth',
    color: '#ea580c',
    bpm: 92,
    key: 'Eb Major',
    quality: '24-Bit / 88.2kHz FLAC',
    coverArt: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=85',
    audioUrl: 'assets/audio/track4.wav',
    syncedLyrics: [
      { time: 0, text: '♪ (Silky electric guitar & jazzy bassline) ♪' },
      { time: 5, text: 'Golden hour touching the rooftop view' },
      { time: 11, text: 'A gentle breeze carrying melodies of you' },
      { time: 17, text: 'Stay a little longer, let the record spin' },
      { time: 23, text: 'Velvet horizons, crimson and gold' },
      { time: 27, text: 'Making every broken spirit whole' }
    ]
  },
  {
    id: 'track-5',
    title: 'Astral Drift',
    artist: 'Kaelen',
    album: 'Deep Cosmos',
    duration: 34,
    genre: 'Ambient',
    mood: 'Focus',
    color: '#d97706',
    bpm: 70,
    key: 'A Minor',
    quality: '32-Bit Float Studio',
    coverArt: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=85',
    audioUrl: 'assets/audio/track5.wav',
    syncedLyrics: [
      { time: 0, text: '♪ (Spacious cosmic shimmer & low frequency pulse) ♪' },
      { time: 7, text: 'Drifting weightless through the stellar sea' },
      { time: 14, text: 'Nebulae whispering ancient harmony' },
      { time: 21, text: 'Finding peace and steady poise' },
      { time: 28, text: 'Infinite expanse, silent mind' }
    ]
  },
  {
    id: 'track-6',
    title: 'Starlight Voyage',
    artist: 'Hyperion',
    album: 'Supernova',
    duration: 31,
    genre: 'Electronic',
    mood: 'Euphoric',
    color: '#b45309',
    bpm: 124,
    key: 'A Minor',
    quality: '24-Bit / 96kHz Lossless',
    coverArt: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=85',
    audioUrl: 'assets/audio/track6.wav',
    syncedLyrics: [
      { time: 0, text: '♪ (Arpeggiated pluck intro building up) ♪' },
      { time: 5, text: 'Ready for lift-off, coordinates set' },
      { time: 10, text: 'Shooting past the morning sun!' },
      { time: 16, text: 'Faster than the speed of sound' },
      { time: 22, text: 'Starlight voyage across the sky' },
      { time: 27, text: 'Reflected in your luminous eyes' }
    ]
  }
];
const CURATED_PLAYLISTS = [
  {
    id: 'playlist-featured',
    title: 'Harmonix Selects: Cyberpunk & Synth',
    description: 'High-octane synthwave, cyberpunk beats, and midnight drive anthems carefully curated for immersive listening.',
    coverArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=85',
    color: '#fa2d48',
    trackIds: ['track-1', 'track-3', 'track-6']
  },
  {
    id: 'playlist-chill',
    title: 'Deep Focus & Late Night Lo-Fi',
    description: 'Smooth coffeehouse vinyl loops, relaxing chord progressions, and ambient frequencies to keep you in the zone.',
    coverArt: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=85',
    color: '#f59e0b',
    trackIds: ['track-2', 'track-4', 'track-5']
  },
  {
    id: 'playlist-golden',
    title: 'Sunset Grooves & Neo-Soul',
    description: 'Warm brass chords, soothing basslines, and velvety guitar harmonics perfect for late afternoon golden hours.',
    coverArt: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=85',
    color: '#ea580c',
    trackIds: ['track-4', 'track-1', 'track-2']
  }
];
const GENRE_CATEGORIES = [
  'All',
  'Synthwave',
  'Lo-Fi Chill',
  'Cyberpunk',
  'Neo-Soul',
  'Ambient',
  'Electronic'
];

/* --- storage.js --- */

/* ==========================================================================
   HARMONIX SOUND - STORAGE & LOCAL STATE PERSISTENCE
   ========================================================================== */

const STORAGE_KEYS = {
  LIKES: 'harmonix_liked_track_ids',
  PLAYLISTS: 'harmonix_user_playlists',
  HISTORY: 'harmonix_playback_history',
  THEME: 'harmonix_selected_theme',
  VOLUME: 'harmonix_player_volume',
  MUTED: 'harmonix_player_muted',
  SHUFFLE: 'harmonix_player_shuffle',
  REPEAT: 'harmonix_player_repeat',
  EQ_PRESET: 'harmonix_eq_preset',
  USER: 'harmonix_user_session'
};
const Storage = {
  getLikes() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LIKES);
      return data ? JSON.parse(data) : ['track-1', 'track-4'];
    } catch {
      return ['track-1', 'track-4'];
    }
  },

  setLikes(likesArray) {
    try {
      localStorage.setItem(STORAGE_KEYS.LIKES, JSON.stringify(likesArray));
    } catch (e) {
      console.warn('Storage save failed:', e);
    }
  },

  toggleLike(trackId) {
    const likes = this.getLikes();
    const index = likes.indexOf(trackId);
    let isLiked = false;
    if (index > -1) {
      likes.splice(index, 1);
      isLiked = false;
    } else {
      likes.unshift(trackId);
      isLiked = true;
    }
    this.setLikes(likes);
    return isLiked;
  },

  isLiked(trackId) {
    return this.getLikes().includes(trackId);
  },

  getPlaylists() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PLAYLISTS);
      return data ? JSON.parse(data) : [
        {
          id: 'user-favs',
          title: 'My Neon Favorites',
          description: 'Tracks that ignite late-night energy and cosmic focus.',
          coverArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
          trackIds: ['track-1', 'track-3']
        }
      ];
    } catch {
      return [];
    }
  },

  savePlaylists(playlists) {
    try {
      localStorage.setItem(STORAGE_KEYS.PLAYLISTS, JSON.stringify(playlists));
    } catch (e) {
      console.warn('Playlist save failed:', e);
    }
  },

  createPlaylist(title, description = '') {
    const playlists = this.getPlaylists();
    const newPlaylist = {
      id: 'pl-' + Date.now(),
      title: title.trim() || 'My New Playlist',
      description: description.trim() || 'Created with Harmonix',
      coverArt: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80',
      trackIds: []
    };
    playlists.push(newPlaylist);
    this.savePlaylists(playlists);
    return newPlaylist;
  },

  addTrackToPlaylist(playlistId, trackId) {
    const playlists = this.getPlaylists();
    const pl = playlists.find(p => p.id === playlistId);
    if (pl && !pl.trackIds.includes(trackId)) {
      pl.trackIds.push(trackId);
      this.savePlaylists(playlists);
      return true;
    }
    return false;
  },

  getHistory() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  addToHistory(trackId) {
    const history = this.getHistory().filter(id => id !== trackId);
    history.unshift(trackId);
    if (history.length > 30) history.pop();
    try {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
    } catch (e) {
      console.warn('History save failed:', e);
    }
  },

  getTheme() {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'aurora';
  },

  setTheme(themeName) {
    localStorage.setItem(STORAGE_KEYS.THEME, themeName);
  },

  getVolume() {
    const v = localStorage.getItem(STORAGE_KEYS.VOLUME);
    return v !== null ? parseFloat(v) : 0.8;
  },

  setVolume(vol) {
    localStorage.setItem(STORAGE_KEYS.VOLUME, vol.toString());
  },

  getMuted() {
    return localStorage.getItem(STORAGE_KEYS.MUTED) === 'true';
  },

  setMuted(muted) {
    localStorage.setItem(STORAGE_KEYS.MUTED, muted.toString());
  },

  getUser() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  setUser(user) {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (e) {
      console.warn('User save failed:', e);
    }
  },

  clearUser() {
    try {
      localStorage.removeItem(STORAGE_KEYS.USER);
    } catch (e) {
      console.warn('User clear failed:', e);
    }
  }
};

/* --- os.js --- */

/* ==========================================================================
   HARMONIX SOUND - CROSS-PLATFORM OS DETECTION & SYSTEM ADAPTER
   Autodetects macOS, Windows, Linux, iOS, and Android
   Adapts keyboard shortcuts, keybindings, and native host audio subsystem info
   ========================================================================== */
class OSDetector {
  static getInfo() {
    const ua = navigator.userAgent || '';
    const platform = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || '';

    let osId = 'unknown';
    let osName = 'Desktop Audio';
    let modifierKey = 'Ctrl';
    let modifierName = 'Control';
    let audioDriver = 'WebAudio Master Engine';
    let isMobile = false;

    if (/Mac|iPhone|iPod|iPad/i.test(platform) || /Macintosh|Mac OS X/i.test(ua)) {
      if (/iPhone|iPod|iPad/i.test(ua) || (navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /Mac/i.test(platform))) {
        osId = 'ios';
        osName = 'iOS';
        modifierKey = '⌘';
        modifierName = 'Command';
        audioDriver = 'Apple AVFoundation Engine';
        isMobile = true;
      } else {
        osId = 'macos';
        osName = 'macOS';
        modifierKey = '⌘';
        modifierName = 'Command';
        audioDriver = 'Apple CoreAudio Master';
      }
    } else if (/Win/i.test(platform) || /Windows/i.test(ua)) {
      osId = 'windows';
      osName = 'Windows';
      modifierKey = 'Ctrl';
      modifierName = 'Ctrl';
      audioDriver = 'Windows WASAPI Exclusive';
    } else if (/Android/i.test(ua)) {
      osId = 'android';
      osName = 'Android';
      modifierKey = 'Ctrl';
      modifierName = 'Control';
      audioDriver = 'Google AAudio / OpenSL ES';
      isMobile = true;
    } else if (/Linux/i.test(platform) || /Linux/i.test(ua)) {
      osId = 'linux';
      osName = 'Linux';
      modifierKey = 'Ctrl';
      modifierName = 'Ctrl';
      audioDriver = 'PipeWire / ALSA Studio Audio';
    }

    return {
      id: osId,
      name: osName,
      modifierKey,
      modifierName,
      audioDriver,
      isMobile,
      searchShortcut: `${modifierKey}K`,
      platformString: `${osName} • ${audioDriver}`
    };
  }

  static applyOSToDOM() {
    const info = this.getInfo();

    // Mark body with OS class for targeted CSS
    document.body.classList.add(`os-${info.id}`);
    if (info.isMobile) document.body.classList.add('is-mobile-device');

    // Update search keyboard shortcut badge
    const searchKbd = document.querySelector('.search-kbd');
    if (searchKbd) {
      searchKbd.textContent = info.searchShortcut;
      searchKbd.title = `Search (${info.modifierName} + K)`;
    }

    // Update any shortcut cues with data-os-key
    document.querySelectorAll('[data-os-cmd]').forEach(el => {
      el.textContent = info.modifierKey;
    });

    return info;
  }
}

/* --- palette.js --- */

/* ==========================================================================
   HARMONIX SOUND - DYNAMIC ARTWORK PALETTE EXTRACTION
   Canvas-based pixel analysis: extracts dominant, vibrant, and ambient tones
   to morph liquid glass lighting, visualizer gradients, and mesh glows
   ========================================================================== */
class PaletteExtractor {
  static extractFromImage(imageUrl) {
    return new Promise((resolve) => {
      if (!imageUrl) {
        resolve(this.getDefaultPalette());
        return;
      }

      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const size = 64; // Downscaled for fast sampling
          canvas.width = size;
          canvas.height = size;

          ctx.drawImage(img, 0, 0, size, size);
          const imgData = ctx.getImageData(0, 0, size, size).data;

          const colorBuckets = {};
          let totalR = 0, totalG = 0, totalB = 0, sampleCount = 0;
          let maxVibrancy = -1;
          let vibrantColor = null;

          // Sample pixels with stride
          for (let i = 0; i < imgData.length; i += 16) {
            const r = imgData[i];
            const g = imgData[i + 1];
            const b = imgData[i + 2];
            const a = imgData[i + 3];

            if (a < 128) continue; // Skip transparency

            // Calculate luminance & saturation
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            const l = (max + min) / 510;
            const s = max === min ? 0 : (max - min) / (l < 0.5 ? (max + min) : (510 - max - min));

            // Skip extreme blacks and pure whites for palette vibrancy
            if (l < 0.12 || l > 0.88 || s < 0.15) continue;

            totalR += r;
            totalG += g;
            totalB += b;
            sampleCount++;

            // Vibrant color scoring: saturation + balanced luminance
            const vibrancyScore = s * 1.5 + (1 - Math.abs(l - 0.5));
            if (vibrancyScore > maxVibrancy) {
              maxVibrancy = vibrancyScore;
              vibrantColor = { r, g, b };
            }

            // Quantize to bucket (step 32)
            const qr = Math.round(r / 32) * 32;
            const qg = Math.round(g / 32) * 32;
            const qb = Math.round(b / 32) * 32;
            const key = `${qr},${qg},${qb}`;
            colorBuckets[key] = (colorBuckets[key] || 0) + 1;
          }

          let dominantR = 250, dominantG = 45, dominantB = 72; // default coral
          if (vibrantColor) {
            dominantR = vibrantColor.r;
            dominantG = vibrantColor.g;
            dominantB = vibrantColor.b;
          } else if (sampleCount > 0) {
            dominantR = Math.round(totalR / sampleCount);
            dominantG = Math.round(totalG / sampleCount);
            dominantB = Math.round(totalB / sampleCount);
          }

          resolve(this.buildPalette(dominantR, dominantG, dominantB));
        } catch (err) {
          console.warn('Artwork palette extraction note (using fallback):', err);
          resolve(this.getDefaultPalette());
        }
      };

      img.onerror = () => {
        resolve(this.getDefaultPalette());
      };

      img.src = imageUrl;
    });
  }

  static buildPalette(r, g, b) {
    // Secondary ambient shifted color
    const secR = Math.min(255, Math.max(0, Math.round(r * 0.7 + 30)));
    const secG = Math.min(255, Math.max(0, Math.round(g * 0.5 + 40)));
    const secB = Math.min(255, Math.max(0, Math.round(b * 1.2 + 20)));

    const dominantHex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    const secondaryHex = `#${((1 << 24) + (secR << 16) + (secG << 8) + secB).toString(16).slice(1)}`;

    return {
      primary: dominantHex,
      secondary: secondaryHex,
      glow: `rgba(${r}, ${g}, ${b}, 0.18)`,
      ambientMesh1: `rgba(${r}, ${g}, ${b}, 0.14)`,
      ambientMesh2: `rgba(${secR}, ${secG}, ${secB}, 0.10)`
    };
  }

  static getDefaultPalette() {
    return {
      primary: '#fa2d48',
      secondary: '#f59e0b',
      glow: 'rgba(250, 45, 72, 0.18)',
      ambientMesh1: 'rgba(250, 45, 72, 0.14)',
      ambientMesh2: 'rgba(245, 158, 11, 0.10)'
    };
  }

  static applyPaletteToDOM(palette) {
    const root = document.documentElement;
    const glow = document.querySelector('.app-background-glow');

    if (glow && palette) {
      glow.style.transition = 'background 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
      glow.style.background = `radial-gradient(circle at 50% -10%, ${palette.ambientMesh1} 0%, ${palette.ambientMesh2} 40%, rgba(10, 11, 14, 0) 75%)`;
    }

    if (root && palette) {
      root.style.setProperty('--ambient-artwork-glow', palette.glow);
      root.style.setProperty('--ambient-mesh-primary', palette.ambientMesh1);
      root.style.setProperty('--ambient-mesh-secondary', palette.ambientMesh2);
    }
  }
}

/* --- audio.js --- */

/* ==========================================================================
   HARMONIX SOUND - AUDIO ENGINE & PLAYBACK CONTROLLER
   Full studio capabilities: 5-band EQ, 60fps AnalyserNode, Spatial Sound,
   Queue manager, Repeat/Shuffle, and local audio drag & drop.
   High-compatibility audio playback across Safari direct file:/// & HTTP.
   Universal MediaSession API integration for hardware media keys & OS overlays.
   Native integrations: DJ Crossfade, Sleep Timer, Output Routing, Sing Mode.
   ========================================================================== */
class AudioEngine {
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

/* --- visualizer.js --- */

/* ==========================================================================
   HARMONIX SOUND - REAL-TIME 60FPS CANVAS AUDIO VISUALIZER
   3 Modes: Neon Equalizer Bars, Liquid Oscilloscope Wave, Radial Pulsar Orb
   High-performance rendering supporting both Web Audio analyser and dynamic pulse
   ========================================================================== */
class Visualizer {
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

/* --- lyrics.js --- */

/* ==========================================================================
   AURA SOUND - KARAOKE SYNCHRONIZED LYRICS ENGINE
   Real-time timestamp tracking, auto-scroll centering, click-to-seek
   ========================================================================== */
class LyricsEngine {
  constructor(audioEngine, containerEl) {
    this.engine = audioEngine;
    this.container = containerEl;
    this.lyrics = [];
    this.currentLineIndex = -1;
    this.lineElements = [];
    this.userScrolling = false;
    this.scrollTimeout = null;

    this.initScrollDetector();
  }

  initScrollDetector() {
    if (!this.container) return;
    this.container.addEventListener('wheel', () => {
      this.userScrolling = true;
      clearTimeout(this.scrollTimeout);
      this.scrollTimeout = setTimeout(() => {
        this.userScrolling = false;
      }, 2500);
    }, { passive: true });
  }

  loadLyrics(track) {
    if (!this.container) return;
    this.currentLineIndex = -1;
    this.lineElements = [];
    this.container.innerHTML = '';

    if (!track || !track.syncedLyrics || track.syncedLyrics.length === 0) {
      this.lyrics = [];
      this.container.innerHTML = `
        <div class="no-lyrics-msg">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M9 18V5l12-2v13"></path>
            <circle cx="6" cy="18" r="3"></circle>
            <circle cx="18" cy="16" r="3"></circle>
          </svg>
          <p>Instrumental or no synced lyrics available</p>
        </div>
      `;
      return;
    }

    this.lyrics = track.syncedLyrics;

    // Render lines
    this.lyrics.forEach((item, index) => {
      const lineEl = document.createElement('div');
      lineEl.className = 'lyric-line';
      lineEl.textContent = item.text;
      lineEl.dataset.time = item.time;
      lineEl.dataset.index = index;

      // Click to seek to that line
      lineEl.addEventListener('click', () => {
        this.engine.seek(item.time);
      });

      this.container.appendChild(lineEl);
      this.lineElements.push(lineEl);
    });
  }

  updateTime(currentTime) {
    if (!this.lyrics || this.lyrics.length === 0) return;

    // Find the latest lyric line whose time <= currentTime
    let activeIndex = -1;
    for (let i = 0; i < this.lyrics.length; i++) {
      if (currentTime >= this.lyrics[i].time) {
        activeIndex = i;
      } else {
        break;
      }
    }

    if (activeIndex !== this.currentLineIndex) {
      this.currentLineIndex = activeIndex;
      this.highlightActiveLine();
    }
  }

  highlightActiveLine() {
    this.lineElements.forEach((el, index) => {
      if (index === this.currentLineIndex) {
        el.classList.add('active');
        if (!this.userScrolling) {
          this.scrollToLine(el);
        }
      } else {
        el.classList.remove('active');
      }
    });
  }

  scrollToLine(lineElement) {
    if (!lineElement || !this.container) return;
    const containerHeight = this.container.clientHeight;
    const lineOffsetTop = lineElement.offsetTop;
    const lineHeight = lineElement.clientHeight;

    // Target scroll so line sits in vertical center of container
    const targetScroll = lineOffsetTop - (containerHeight / 2) + (lineHeight / 2);

    this.container.scrollTo({
      top: Math.max(0, targetScroll),
      behavior: 'smooth'
    });
  }
}

/* --- pip.js --- */

/* ==========================================================================
   HARMONIX SOUND - PICTURE-IN-PICTURE FLOATING MINI-PLAYER
   Dual-Engine Implementation:
   1. Modern Document Picture-in-Picture API (floating HTML window)
   2. Canvas Stream Video PiP Fallback (Safari / WebKit canvas.captureStream)
   ========================================================================== */
class MiniPlayerPiP {
  static pipWindow = null;
  static canvasVideo = null;
  static canvas = null;
  static canvasCtx = null;
  static animFrame = null;
  static audioEngine = null;
  static ui = null;
  static isOpen = false;

  static init(audioEngine, ui) {
    this.audioEngine = audioEngine;
    this.ui = ui;
  }

  static isSupported() {
    return ('documentPictureInPicture' in window) ||
           ('pictureInPictureEnabled' in document);
  }

  static async toggle() {
    if (this.isOpen) {
      this.close();
      return;
    }
    await this.open();
  }

  static async open() {
    if (!this.audioEngine) return;
    const currentTrack = this.audioEngine.getCurrentTrack();
    if (!currentTrack) {
      if (this.ui) this.ui.showToast('Play a track first to open Mini-Player', 'info');
      return;
    }

    // Method A: Document Picture-in-Picture API (Chromium / Modern Desktop)
    if ('documentPictureInPicture' in window) {
      try {
        const pip = await window.documentPictureInPicture.requestWindow({
          width: 340,
          height: 380,
          disallowReturnToOpener: false
        });

        this.pipWindow = pip;
        this.isOpen = true;
        this.renderDocPiP(pip, currentTrack);

        pip.addEventListener('pagehide', () => {
          this.isOpen = false;
          this.pipWindow = null;
          this.updateUiState(false);
        });

        this.updateUiState(true);
        if (this.ui) this.ui.showToast('Floating Mini-Player Active', 'success');
        return;
      } catch (err) {
        console.warn('documentPictureInPicture failed, falling back to Canvas PiP:', err);
      }
    }

    // Method B: Canvas + Video Stream PiP Fallback (Safari & Standard WebKit)
    if (document.pictureInPictureEnabled) {
      try {
        await this.openCanvasPiP(currentTrack);
        this.isOpen = true;
        this.updateUiState(true);
        if (this.ui) this.ui.showToast('Floating Mini-Player Active', 'success');
      } catch (err) {
        console.error('Canvas PiP error:', err);
        if (this.ui) this.ui.showToast('Mini-Player not supported in this session', 'info');
      }
    }
  }

  static close() {
    if (this.pipWindow) {
      try {
        this.pipWindow.close();
      } catch (e) {}
      this.pipWindow = null;
    }
    if (document.pictureInPictureElement) {
      try {
        document.exitPictureInPicture();
      } catch (e) {}
    }
    if (this.animFrame) {
      cancelAnimationFrame(this.animFrame);
      this.animFrame = null;
    }
    this.isOpen = false;
    this.updateUiState(false);
  }

  static updateUiState(active) {
    const btn = document.getElementById('btn-open-pip');
    if (btn) {
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    }
  }

  static renderDocPiP(pipWin, track) {
    const doc = pipWin.document;
    doc.title = `${track.title} - Harmonix Mini`;

    // Inject minimal dark glassmorphism styling
    const style = doc.createElement('style');
    style.textContent = `
      * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; }
      body {
        background: #0a0b0e;
        color: #f8fafc;
        font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 100vh;
        padding: 20px;
        overflow: hidden;
        position: relative;
      }
      .bg-blur {
        position: absolute;
        inset: -20px;
        background-size: cover;
        background-position: center;
        filter: blur(40px) brightness(0.28);
        z-index: 0;
      }
      .content {
        position: relative;
        z-index: 1;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 14px;
      }
      .artwork-container {
        width: 170px;
        height: 170px;
        border-radius: 18px;
        overflow: hidden;
        box-shadow: 0 16px 36px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.12);
        position: relative;
      }
      .artwork {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
      .track-meta {
        text-align: center;
        width: 100%;
        overflow: hidden;
      }
      .title {
        font-size: 16px;
        font-weight: 700;
        letter-spacing: -0.3px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        color: #fff;
      }
      .artist {
        font-size: 13px;
        color: rgba(248, 250, 252, 0.7);
        margin-top: 3px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .controls {
        position: relative;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
        width: 100%;
        padding-bottom: 8px;
      }
      .btn {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.15);
        color: #fff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .btn:hover {
        background: rgba(255, 255, 255, 0.22);
        transform: scale(1.08);
      }
      .btn:active {
        transform: scale(0.95);
      }
      .btn-skip {
        width: 40px;
        height: 40px;
      }
      .btn-play {
        width: 52px;
        height: 52px;
        background: #fa2d48;
        border: none;
        box-shadow: 0 6px 20px rgba(250, 45, 72, 0.45);
      }
      .btn-play:hover {
        background: #ff3b56;
        box-shadow: 0 8px 25px rgba(250, 45, 72, 0.6);
      }
      svg {
        width: 20px;
        height: 20px;
        fill: currentColor;
      }
      .btn-play svg {
        width: 24px;
        height: 24px;
      }
    `;
    doc.head.appendChild(style);

    const isPlaying = this.audioEngine.isPlaying;

    doc.body.innerHTML = `
      <div class="bg-blur" id="pip-bg" style="background-image: url('${track.artwork}')"></div>
      <div class="content">
        <div class="artwork-container">
          <img class="artwork" id="pip-art" src="${track.artwork}" alt="${track.title}">
        </div>
        <div class="track-meta">
          <div class="title" id="pip-title">${track.title}</div>
          <div class="artist" id="pip-artist">${track.artist}</div>
        </div>
      </div>
      <div class="controls">
        <button class="btn btn-skip" id="pip-prev" title="Previous Track">
          <svg viewBox="0 0 24 24"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5" stroke="currentColor" stroke-width="2.5"></line></svg>
        </button>
        <button class="btn btn-play" id="pip-play" title="Play/Pause">
          ${isPlaying ?
            '<svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" rx="1"></rect><rect x="14" y="4" width="4" height="16" rx="1"></rect></svg>' :
            '<svg viewBox="0 0 24 24"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>'
          }
        </button>
        <button class="btn btn-skip" id="pip-next" title="Next Track">
          <svg viewBox="0 0 24 24"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19" stroke="currentColor" stroke-width="2.5"></line></svg>
        </button>
      </div>
    `;

    // Connect interactions
    doc.getElementById('pip-prev').addEventListener('click', () => {
      this.audioEngine.previous();
    });

    doc.getElementById('pip-next').addEventListener('click', () => {
      this.audioEngine.next();
    });

    doc.getElementById('pip-play').addEventListener('click', () => {
      this.audioEngine.togglePlay();
    });
  }

  static async openCanvasPiP(track) {
    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
      this.canvas.width = 480;
      this.canvas.height = 480;
      this.canvasCtx = this.canvas.getContext('2d');
    }

    if (!this.canvasVideo) {
      this.canvasVideo = document.createElement('video');
      this.canvasVideo.muted = true;
      this.canvasVideo.playsInline = true;
      this.canvasVideo.style.position = 'fixed';
      this.canvasVideo.style.opacity = '0';
      this.canvasVideo.style.pointerEvents = 'none';
      this.canvasVideo.style.bottom = '0';
      this.canvasVideo.style.right = '0';
      this.canvasVideo.style.width = '10px';
      this.canvasVideo.style.height = '10px';
      document.body.appendChild(this.canvasVideo);

      const stream = this.canvas.captureStream(30);
      this.canvasVideo.srcObject = stream;
      await this.canvasVideo.play();

      this.canvasVideo.addEventListener('leavepictureinpicture', () => {
        this.isOpen = false;
        this.updateUiState(false);
        if (this.animFrame) cancelAnimationFrame(this.animFrame);
      });
    }

    // Load artwork image for drawing
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = track.artwork;
    await new Promise(r => { img.onload = r; img.onerror = r; });

    // Continuous render loop for canvas stream
    const render = () => {
      const ctx = this.canvasCtx;
      const w = 480;
      const h = 480;

      // Dark background
      ctx.fillStyle = '#0a0b0e';
      ctx.fillRect(0, 0, w, h);

      // Draw artwork
      if (img.complete && img.naturalWidth > 0) {
        ctx.save();
        ctx.beginPath();
        const r = 24;
        const artX = 60, artY = 50, artSize = 360;
        ctx.moveTo(artX + r, artY);
        ctx.arcTo(artX + artSize, artY, artX + artSize, artY + artSize, r);
        ctx.arcTo(artX + artSize, artY + artSize, artX, artY + artSize, r);
        ctx.arcTo(artX, artY + artSize, artX, artY, r);
        ctx.arcTo(artX, artY, artX + artSize, artY, r);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, artX, artY, artSize, artSize);
        ctx.restore();
      }

      // Track text banner
      ctx.fillStyle = 'rgba(10, 11, 14, 0.85)';
      ctx.fillRect(0, 420, w, 60);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(track.title, w / 2, 446);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
      ctx.font = '14px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText(track.artist, w / 2, 468);

      if (this.isOpen) {
        this.animFrame = requestAnimationFrame(render);
      }
    };

    render();
    await this.canvasVideo.requestPictureInPicture();
  }

  static updateTrack(track, isPlaying) {
    if (!this.isOpen || !track) return;

    if (this.pipWindow && !this.pipWindow.closed) {
      const doc = this.pipWindow.document;
      const bg = doc.getElementById('pip-bg');
      const art = doc.getElementById('pip-art');
      const title = doc.getElementById('pip-title');
      const artist = doc.getElementById('pip-artist');

      if (bg) bg.style.backgroundImage = `url('${track.artwork}')`;
      if (art) {
        art.src = track.artwork;
        art.alt = track.title;
      }
      if (title) title.textContent = track.title;
      if (artist) artist.textContent = track.artist;
      doc.title = `${track.title} - Harmonix Mini`;
      this.updatePlayState(isPlaying);
    }
  }

  static updatePlayState(isPlaying) {
    if (!this.isOpen) return;

    if (this.pipWindow && !this.pipWindow.closed) {
      const btnPlay = this.pipWindow.document.getElementById('pip-play');
      if (btnPlay) {
        btnPlay.innerHTML = isPlaying ?
          '<svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" rx="1"></rect><rect x="14" y="4" width="4" height="16" rx="1"></rect></svg>' :
          '<svg viewBox="0 0 24 24"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>';
      }
    }
  }
}

/* --- ui.js --- */

/* ==========================================================================
   HARMONIX SOUND - USER INTERFACE & VIEW CONTROLLER
   Single-page application views, templates, modals, and toasts
   ========================================================================== */
function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}
class UIController {
  constructor(audioEngine) {
    this.engine = audioEngine;
    this.viewport = document.getElementById('content-viewport');
    this.currentView = 'home';
    this.selectedGenre = 'All';
    this.searchQuery = '';
    this.activeContextTrack = null;

    this.initContextMenu();
    this.initLosslessHUD();
  }

  showToast(message, icon = '✓') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  }

  renderHome() {
    this.currentView = 'home';
    const heroTrack = TRACK_CATALOG[0];

    const filteredTracks = this.selectedGenre === 'All'
      ? TRACK_CATALOG
      : TRACK_CATALOG.filter(t => t.genre.toLowerCase() === this.selectedGenre.toLowerCase());

    const isHeroPlaying = this.engine.currentTrack?.id === heroTrack.id && this.engine.isPlaying;
    const isHeroLiked = Storage.isLiked(heroTrack.id);

    this.viewport.innerHTML = `
      <!-- Editorial Spotlight Banner (Apple Music Standard) -->
      <div class="hero-banner">
        <div class="hero-content">
          <span class="hero-editorial-label">Featured Release</span>
          <h1 class="hero-title">${heroTrack.title}</h1>
          <div class="hero-artist-row">
            <img src="${heroTrack.coverArt}" class="hero-artist-avatar" alt="${heroTrack.artist}" />
            <span class="hero-artist-name">${heroTrack.artist}</span>
            <svg class="verified-badge" width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <p class="hero-description">Neo Drive delivers an atmospheric synthwave journey with expansive analog synthesizers and pristine spatial production.</p>
          <div class="hero-actions">
            <button class="hero-play-master-btn" id="hero-play-btn" data-track-id="${heroTrack.id}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                ${isHeroPlaying
                  ? '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>'
                  : '<polygon points="5 3 19 12 5 21 5 3"></polygon>'
                }
              </svg>
              <span>${isHeroPlaying ? 'Pause' : 'Play'}</span>
            </button>
            <button class="hero-icon-action-btn ${isHeroLiked ? 'liked' : ''}" id="hero-like-btn" data-track-id="${heroTrack.id}" title="Save to Favorites">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="${isHeroLiked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>
        </div>

        <div class="hero-visual">
          <div class="hero-cover-card">
            <img src="${heroTrack.coverArt}" alt="${heroTrack.title}" class="hero-cover-art" />
          </div>
        </div>
      </div>

      <!-- Mood & Genre Filter Chips -->
      <div class="chips-row">
        ${GENRE_CATEGORIES.map(genre => `
          <button class="filter-chip ${genre === this.selectedGenre ? 'active' : ''}" data-genre="${genre}">
            ${genre}
          </button>
        `).join('')}
      </div>

      <!-- Heavy Rotation & Trending -->
      <div class="section-wrapper">
        <div class="section-header">
          <h2 class="section-title">Heavy Rotation</h2>
          <span class="section-more-link" id="see-all-tracks">Show all</span>
        </div>
        <div class="cards-grid">
          ${filteredTracks.map(track => this.renderMusicCard(track)).join('')}
        </div>
      </div>

      <!-- Curated Playlists Section -->
      <div class="section-wrapper">
        <div class="section-header">
          <h2 class="section-title">Featured Playlists</h2>
        </div>
        <div class="cards-grid">
          ${CURATED_PLAYLISTS.map(playlist => this.renderPlaylistCard(playlist)).join('')}
        </div>
      </div>

      <!-- Popular Tracks Table -->
      <div class="section-wrapper">
        <div class="section-header">
          <h2 class="section-title">Top Tracks</h2>
        </div>
        ${this.renderTrackTable(filteredTracks)}
      </div>
    `;

    this.bindHomeEvents();
  }

  renderMusicCard(track) {
    const isPlayingThis = this.engine.currentTrack?.id === track.id && this.engine.isPlaying;
    return `
      <div class="music-card ${isPlayingThis ? 'playing' : ''}" data-track-id="${track.id}">
        <div class="card-cover-container">
          <img src="${track.coverArt}" alt="${track.title}" class="card-cover-img" loading="lazy" />
          <button class="card-play-btn" title="Play ${track.title}">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              ${isPlayingThis
                ? '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>'
                : '<polygon points="5 3 19 12 5 21 5 3"></polygon>'
              }
            </svg>
          </button>
        </div>
        <div class="card-info">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 4px;">
            <span class="card-title" title="${track.title}">${track.title}</span>
            <button class="track-context-btn" data-track-id="${track.id}" title="More Actions">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="2"></circle>
                <circle cx="19" cy="12" r="2"></circle>
                <circle cx="5" cy="12" r="2"></circle>
              </svg>
            </button>
          </div>
          <span class="card-subtitle" title="${track.artist}">${track.artist}</span>
        </div>
      </div>
    `;
  }

  renderPlaylistCard(playlist) {
    return `
      <div class="music-card" data-playlist-id="${playlist.id}">
        <div class="card-cover-container">
          <img src="${playlist.coverArt}" alt="${playlist.title}" class="card-cover-img" loading="lazy" />
          <button class="card-play-btn" title="Play Playlist">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </button>
        </div>
        <div class="card-info">
          <span class="card-title">${playlist.title}</span>
          <span class="card-subtitle">${playlist.description || `Playlist • ${playlist.trackIds.length} tracks`}</span>
        </div>
      </div>
    `;
  }

  renderTrackTable(tracks) {
    return `
      <div class="track-table-container">
        <table class="track-table">
          <thead>
            <tr>
              <th style="width: 48px; text-align: center;">#</th>
              <th>Title</th>
              <th>Album</th>
              <th style="text-align: right;">Time</th>
              <th style="width: 80px;"></th>
            </tr>
          </thead>
          <tbody>
            ${tracks.map((track, idx) => {
              const isActive = this.engine.currentTrack?.id === track.id;
              const isPlaying = isActive && this.engine.isPlaying;
              const isLiked = Storage.isLiked(track.id);
              return `
                <tr class="track-row ${isActive ? 'active' : ''} ${isPlaying ? 'playing' : ''}" data-track-id="${track.id}">
                  <td class="track-col-index">
                    <span class="track-number">${idx + 1}</span>
                    <div class="table-equalizer">
                      <div class="table-eq-bar"></div>
                      <div class="table-eq-bar"></div>
                      <div class="table-eq-bar"></div>
                      <div class="table-eq-bar"></div>
                    </div>
                    <span class="track-row-play-icon">${isPlaying ? '❚❚' : '▶'}</span>
                  </td>
                  <td>
                    <div class="track-col-title">
                      <img src="${track.coverArt}" alt="${track.title}" class="track-thumb-img" />
                      <div>
                        <div class="track-meta-title">${track.title}</div>
                        <div class="track-meta-artist">${track.artist}</div>
                      </div>
                    </div>
                  </td>
                  <td class="track-col-album">${track.album}</td>
                  <td class="track-col-duration">${formatTime(track.duration)}</td>
                  <td>
                    <div class="track-actions-cell" style="display: flex; align-items: center; justify-content: flex-end; gap: 4px;">
                      <button class="btn-like ${isLiked ? 'liked' : ''}" data-track-id="${track.id}" title="Favorite">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="${isLiked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                      </button>
                      <button class="track-context-btn" data-track-id="${track.id}" title="More Actions">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <circle cx="12" cy="12" r="2"></circle>
                          <circle cx="19" cy="12" r="2"></circle>
                          <circle cx="5" cy="12" r="2"></circle>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  renderExplore(query = '') {
    this.currentView = 'explore';
    this.searchQuery = query;

    const lowerQuery = query.toLowerCase().trim();
    const searchResults = lowerQuery
      ? TRACK_CATALOG.filter(t =>
          t.title.toLowerCase().includes(lowerQuery) ||
          t.artist.toLowerCase().includes(lowerQuery) ||
          t.genre.toLowerCase().includes(lowerQuery) ||
          t.album.toLowerCase().includes(lowerQuery)
        )
      : [];

    this.viewport.innerHTML = `
      <div class="section-wrapper">
        <h1 class="hero-title" style="font-size: 32px; margin-bottom: 24px;">Explore Frequencies</h1>

        ${query ? `
          <div class="section-header">
            <h2 class="section-title">Search Results for "${query}" (${searchResults.length})</h2>
          </div>
          ${searchResults.length > 0
            ? this.renderTrackTable(searchResults)
            : '<p style="color: var(--text-muted); margin-top: 20px;">No tracks found matching your query. Try searching for "synthwave", "chill", or "neo-soul".</p>'
          }
        ` : `
          <!-- Browse All Genres -->
          <div class="section-header">
            <h2 class="section-title">Browse By Genre</h2>
          </div>
          <div class="cards-grid">
            ${GENRE_CATEGORIES.filter(g => g !== 'All').map(genre => {
              const sampleTrack = TRACK_CATALOG.find(t => t.genre === genre) || TRACK_CATALOG[0];
              return `
                <div class="music-card" data-browse-genre="${genre}">
                  <div class="card-cover-container">
                    <img src="${sampleTrack.coverArt}" alt="${genre}" class="card-cover-img" />
                  </div>
                  <div class="card-info">
                    <span class="card-title">${genre}</span>
                    <span class="card-subtitle">Discover sonic landscapes</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>
    `;

    this.bindExploreEvents();
  }

  renderLibrary() {
    this.currentView = 'library';
    const userPlaylists = Storage.getPlaylists();
    const likedIds = Storage.getLikes();
    const likedTracks = TRACK_CATALOG.filter(t => likedIds.includes(t.id));

    this.viewport.innerHTML = `
      <div class="section-wrapper">
        <div class="section-header">
          <h1 class="hero-title" style="font-size: 32px;">Your Sonic Vault</h1>
          <button class="btn-primary" id="btn-create-playlist-modal">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Create Playlist
          </button>
        </div>

        <!-- Liked Songs Banner Card -->
        <div class="hero-banner" style="margin-bottom: 32px; background: linear-gradient(135deg, rgba(236, 72, 153, 0.3) 0%, rgba(139, 92, 246, 0.2) 100%);">
          <div class="hero-content">
            <div class="hero-badge">Favorites</div>
            <h2 class="hero-title" style="font-size: 32px;">Liked Songs</h2>
            <p class="hero-subtitle">${likedTracks.length} tracks favorited</p>
            <button class="btn-primary" id="play-all-liked-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              Play Liked Songs
            </button>
          </div>
        </div>

        <!-- Custom Playlists Grid -->
        <div class="section-header">
          <h2 class="section-title">Playlists</h2>
        </div>
        <div class="cards-grid" style="margin-bottom: 36px;">
          ${userPlaylists.map(pl => this.renderPlaylistCard(pl)).join('')}
        </div>

        <!-- Liked Songs Table -->
        ${likedTracks.length > 0 ? `
          <div class="section-header">
            <h2 class="section-title">Liked Tracks</h2>
          </div>
          ${this.renderTrackTable(likedTracks)}
        ` : ''}
      </div>
    `;

    this.bindLibraryEvents();
  }

  renderPlaylistDetail(playlistId) {
    this.currentView = 'playlist-detail';
    const allPlaylists = [...CURATED_PLAYLISTS, ...Storage.getPlaylists()];
    const playlist = allPlaylists.find(p => p.id === playlistId) || CURATED_PLAYLISTS[0];

    const tracks = playlist.trackIds
      .map(id => TRACK_CATALOG.find(t => t.id === id))
      .filter(Boolean);

    const totalDuration = tracks.reduce((acc, t) => acc + t.duration, 0);

    this.viewport.innerHTML = `
      <div class="playlist-view-header">
        <img src="${playlist.coverArt}" alt="${playlist.title}" class="playlist-big-artwork" />
        <div class="playlist-header-details">
          <span class="playlist-type-tag">Playlist</span>
          <h1 class="playlist-header-title">${playlist.title}</h1>
          <p class="playlist-header-desc">${playlist.description || 'Curated track list on Harmonix'}</p>
          <div class="playlist-meta-info">
            <span>${tracks.length} tracks</span>
            <span>•</span>
            <span>${Math.floor(totalDuration / 60)} min ${totalDuration % 60} sec</span>
          </div>
          <div class="playlist-header-controls">
            <button class="btn-primary" id="playlist-play-all-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              Play
            </button>
            <button class="btn-secondary" id="playlist-shuffle-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="16 3 21 3 21 8"></polyline>
                <line x1="4" y1="20" x2="21" y2="3"></line>
                <polyline points="21 16 21 21 16 21"></polyline>
                <line x1="15" y1="15" x2="21" y2="21"></line>
                <line x1="4" y1="4" x2="9" y2="9"></line>
              </svg>
              Shuffle
            </button>
          </div>
        </div>
      </div>

      ${this.renderTrackTable(tracks)}
    `;

    document.getElementById('playlist-play-all-btn')?.addEventListener('click', () => {
      if (tracks.length > 0) {
        this.engine.setQueue(tracks, 0);
      }
    });

    document.getElementById('playlist-shuffle-btn')?.addEventListener('click', () => {
      if (tracks.length > 0) {
        this.engine.setQueue(tracks, 0);
        if (!this.engine.isShuffled) {
          this.engine.toggleShuffle();
        }
      }
    });

    this.bindTrackRows();
  }

  bindHomeEvents() {
    document.getElementById('hero-play-btn')?.addEventListener('click', () => {
      const trackId = document.getElementById('hero-play-btn').dataset.trackId;
      const track = TRACK_CATALOG.find(t => t.id === trackId);
      if (track) {
        if (this.engine.currentTrack?.id === track.id) {
          this.engine.togglePlay();
        } else {
          this.engine.loadTrack(track, true);
        }
      }
    });

    document.getElementById('hero-like-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      const trackId = document.getElementById('hero-like-btn').dataset.trackId;
      const isLiked = Storage.toggleLike(trackId);
      const btn = document.getElementById('hero-like-btn');
      if (btn) {
        btn.classList.toggle('liked', isLiked);
        const svg = btn.querySelector('svg');
        if (svg) svg.setAttribute('fill', isLiked ? 'currentColor' : 'none');
      }
      this.showToast(isLiked ? 'Added to Favorites' : 'Removed from Favorites', isLiked ? '❤️' : '🤍');
    });

    document.getElementById('see-all-tracks')?.addEventListener('click', () => {
      this.renderExplore();
      this.updateActiveNav('nav-explore');
    });

    // Filter chips
    document.querySelectorAll('.filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        this.selectedGenre = chip.dataset.genre;
        this.renderHome();
      });
    });

    this.bindCardEvents();
    this.bindTrackRows();
  }

  bindExploreEvents() {
    document.querySelectorAll('[data-browse-genre]').forEach(card => {
      card.addEventListener('click', () => {
        const genre = card.dataset.browseGenre;
        this.selectedGenre = genre;
        this.renderHome();
        this.updateActiveNav('nav-home');
      });
    });

    this.bindTrackRows();
  }

  bindLibraryEvents() {
    document.getElementById('btn-create-playlist-modal')?.addEventListener('click', () => {
      this.openCreatePlaylistModal();
    });

    document.getElementById('play-all-liked-btn')?.addEventListener('click', () => {
      const likedIds = Storage.getLikes();
      const likedTracks = TRACK_CATALOG.filter(t => likedIds.includes(t.id));
      if (likedTracks.length > 0) {
        this.engine.setQueue(likedTracks, 0);
      } else {
        this.showToast('No liked songs yet!', 'ℹ');
      }
    });

    this.bindCardEvents();
    this.bindTrackRows();
  }

  bindCardEvents() {
    // Music cards
    document.querySelectorAll('.music-card[data-track-id]').forEach(card => {
      card.addEventListener('click', (e) => {
        const trackId = card.dataset.trackId;
        const track = TRACK_CATALOG.find(t => t.id === trackId);
        if (track) {
          if (this.engine.currentTrack?.id === track.id) {
            this.engine.togglePlay();
          } else {
            this.engine.loadTrack(track, true);
          }
        }
      });
    });

    // Playlist cards
    document.querySelectorAll('.music-card[data-playlist-id]').forEach(card => {
      card.addEventListener('click', () => {
        const plId = card.dataset.playlistId;
        this.renderPlaylistDetail(plId);
      });
    });

    this.bindContextMenuButtons();
  }

  bindTrackRows() {
    document.querySelectorAll('.track-row').forEach(row => {
      row.addEventListener('click', (e) => {
        if (e.target.closest('.btn-like') || e.target.closest('.track-context-btn')) return;
        const trackId = row.dataset.trackId;
        const track = TRACK_CATALOG.find(t => t.id === trackId) || this.engine.queue.find(t => t.id === trackId);
        if (track) {
          if (this.engine.currentTrack?.id === track.id) {
            this.engine.togglePlay();
          } else {
            this.engine.loadTrack(track, true);
          }
        }
      });
    });

    // Like buttons
    document.querySelectorAll('.btn-like').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const trackId = btn.dataset.trackId;
        const isLiked = Storage.toggleLike(trackId);
        btn.classList.toggle('liked', isLiked);
        btn.querySelector('svg').setAttribute('fill', isLiked ? 'currentColor' : 'none');
        this.showToast(isLiked ? 'Added to Favorites' : 'Removed from Favorites', isLiked ? '♥' : '♡');
      });
    });

    this.bindContextMenuButtons();
  }

  bindContextMenuButtons() {
    document.querySelectorAll('.track-context-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const trackId = btn.dataset.trackId;
        const track = TRACK_CATALOG.find(t => t.id === trackId) || this.engine.queue.find(t => t.id === trackId);
        if (track) {
          this.openContextMenu(track, btn);
        }
      });
    });
  }

  initContextMenu() {
    const menu = document.getElementById('track-context-menu');
    if (!menu) return;

    document.getElementById('ctx-play-next')?.addEventListener('click', () => {
      if (this.activeContextTrack) {
        this.engine.insertNextInQueue(this.activeContextTrack);
        this.showToast(`"${this.activeContextTrack.title}" will play next`, '⏭');
      }
      this.closeContextMenu();
    });

    document.getElementById('ctx-add-queue')?.addEventListener('click', () => {
      if (this.activeContextTrack) {
        this.engine.addToQueue(this.activeContextTrack);
        this.showToast(`Added "${this.activeContextTrack.title}" to Queue`, '📥');
      }
      this.closeContextMenu();
    });

    document.getElementById('ctx-toggle-fav')?.addEventListener('click', () => {
      if (this.activeContextTrack) {
        const isLiked = Storage.toggleLike(this.activeContextTrack.id);
        this.showToast(isLiked ? 'Added to Favorites' : 'Removed from Favorites', isLiked ? '❤️' : '🤍');
        document.querySelectorAll(`.btn-like[data-track-id="${this.activeContextTrack.id}"]`).forEach(btn => {
          btn.classList.toggle('liked', isLiked);
          btn.querySelector('svg')?.setAttribute('fill', isLiked ? 'currentColor' : 'none');
        });
      }
      this.closeContextMenu();
    });

    document.getElementById('ctx-show-specs')?.addEventListener('click', () => {
      if (this.activeContextTrack) {
        this.openLosslessHUD(this.activeContextTrack);
      }
      this.closeContextMenu();
    });

    document.getElementById('ctx-share-track')?.addEventListener('click', () => {
      if (this.activeContextTrack) {
        this.shareTrack(this.activeContextTrack);
      }
      this.closeContextMenu();
    });

    window.addEventListener('click', (e) => {
      if (!e.target.closest('#track-context-menu') && !e.target.closest('.track-context-btn')) {
        this.closeContextMenu();
      }
    });

    window.addEventListener('scroll', () => this.closeContextMenu(), true);
  }

  openContextMenu(track, anchorEl) {
    const menu = document.getElementById('track-context-menu');
    if (!menu || !anchorEl) return;

    this.activeContextTrack = track;

    const isLiked = Storage.isLiked(track.id);
    const favLabel = document.getElementById('ctx-fav-label');
    if (favLabel) favLabel.textContent = isLiked ? 'Remove Favorite' : 'Save to Favorites';

    const rect = anchorEl.getBoundingClientRect();
    const menuWidth = 200;
    const menuHeight = 160;

    let left = rect.left - menuWidth + rect.width;
    let top = rect.bottom + 6;

    if (left < 10) left = rect.left;
    if (top + menuHeight > window.innerHeight) top = Math.max(10, rect.top - menuHeight - 6);

    menu.style.left = `${left}px`;
    menu.style.top = `${top}px`;
    menu.classList.add('open');
  }

  closeContextMenu() {
    const menu = document.getElementById('track-context-menu');
    menu?.classList.remove('open');
    this.activeContextTrack = null;
  }

  initLosslessHUD() {
    const overlay = document.getElementById('lossless-hud-overlay');
    const closeBtn = document.getElementById('btn-close-lossless-hud');

    closeBtn?.addEventListener('click', () => {
      overlay?.classList.remove('open');
    });

    overlay?.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('open');
      }
    });

    document.getElementById('audio-engine-badge')?.addEventListener('click', () => {
      this.openLosslessHUD(this.engine.currentTrack || TRACK_CATALOG[0]);
    });

    document.getElementById('player-format-badge')?.addEventListener('click', () => {
      this.openLosslessHUD(this.engine.currentTrack || TRACK_CATALOG[0]);
    });
  }

  openLosslessHUD(track) {
    const overlay = document.getElementById('lossless-hud-overlay');
    if (!overlay) return;

    const t = track || this.engine.currentTrack || TRACK_CATALOG[0];
    const osInfo = OSDetector.getInfo();

    const osTextEl = document.getElementById('lossless-os-text');
    const codecEl = document.getElementById('hud-spec-codec');
    const rateEl = document.getElementById('hud-spec-rate');
    const bitrateEl = document.getElementById('hud-spec-bitrate');
    const lufsEl = document.getElementById('hud-spec-lufs');

    if (osTextEl) osTextEl.textContent = osInfo.platformString;
    if (codecEl) codecEl.textContent = t.quality || '24-Bit / 96kHz FLAC';
    if (rateEl) rateEl.textContent = t.bpm ? `${t.bpm} BPM Studio Timing` : '44,100 Hz Master';
    if (bitrateEl) bitrateEl.textContent = '1,411 kbps PCM Linear';
    if (lufsEl) lufsEl.textContent = `${t.key || 'D Minor'} • -0.8 dBFS`;

    overlay.classList.add('open');
  }

  updateActiveNav(activeId) {
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    document.getElementById(activeId)?.classList.add('active');
  }

  openCreatePlaylistModal() {
    const modal = document.getElementById('create-playlist-modal');
    const input = document.getElementById('playlist-name-input');
    if (modal && input) {
      modal.classList.add('open');
      input.value = '';
      input.focus();
    }
  }

  closeCreatePlaylistModal() {
    document.getElementById('create-playlist-modal')?.classList.remove('open');
  }

  renderSidebarPlaylists() {
    const container = document.getElementById('sidebar-playlist-list');
    if (!container) return;

    const playlists = [...CURATED_PLAYLISTS, ...Storage.getPlaylists()];
    container.innerHTML = playlists.map(pl => `
      <div class="playlist-tree-item" data-playlist-id="${pl.id}">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18V5l12-2v13"></path>
          <circle cx="6" cy="18" r="3"></circle>
          <circle cx="18" cy="16" r="3"></circle>
        </svg>
        <span>${pl.title}</span>
      </div>
    `).join('');

    container.querySelectorAll('.playlist-tree-item').forEach(item => {
      item.addEventListener('click', () => {
        this.renderPlaylistDetail(item.dataset.playlistId);
      });
    });
  }

  async shareTrack(track) {
    if (!track) return;
    const shareData = {
      title: `${track.title} - Harmonix Sound`,
      text: `Listening to "${track.title}" by ${track.artist} (${track.quality || 'Lossless FLAC'}) on Harmonix Sound!`,
      url: window.location.href.split('#')[0]
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        this.showToast('Shared successfully', '🔗');
        return;
      } catch (err) {
        if (err.name === 'AbortError') return;
      }
    }

    try {
      const shareText = `🎵 Now Playing on Harmonix Sound: "${track.title}" by ${track.artist}\n${shareData.url}`;
      await navigator.clipboard.writeText(shareText);
      this.showToast('Copied track info & link to clipboard!', '📋');
    } catch (err) {
      this.showToast(`Now Playing: ${track.title} by ${track.artist}`, '🎵');
    }
  }
}

/* --- app.js --- */

/* ==========================================================================
   HARMONIX SOUND - APPLICATION ORCHESTRATOR & BOOTSTRAP
   Wires state, audio engine, visualizers, lyrics, and user interaction
   ========================================================================== */









document.addEventListener('DOMContentLoaded', () => {
  // Apply Platform & OS Detection
  const osInfo = OSDetector.applyOSToDOM();

  // Initialize Subsystems
  const audioEngine = new AudioEngine();
  const visualizer = new Visualizer(audioEngine);
  const lyricsContainer = document.getElementById('lyrics-container');
  const lyricsEngine = new LyricsEngine(audioEngine, lyricsContainer);
  const ui = new UIController(audioEngine);
  MiniPlayerPiP.init(audioEngine, ui);

  // Visualizer & Views Setup

  // Setup Visualizer Canvases
  const dockCanvas = document.getElementById('dock-visualizer');
  const stageCanvas = document.getElementById('stage-visualizer');
  if (dockCanvas) visualizer.registerCanvas(dockCanvas, 'dock');
  if (stageCanvas) visualizer.registerCanvas(stageCanvas, 'stage');
  visualizer.start();

  // Initial Views
  ui.renderHome();
  ui.renderSidebarPlaylists();

  // Load first track in queue as default ready track
  if (TRACK_CATALOG.length > 0) {
    audioEngine.loadTrack(TRACK_CATALOG[0], false);
  }

  // --------------------------------------------------------------------------
  // Audio Engine Callbacks
  // --------------------------------------------------------------------------
  audioEngine.onTrackChange = (track) => {
    updatePlayerDockInfo(track);
    lyricsEngine.loadLyrics(track);
    updateAmbientMeshColors(track.color);

    // Dynamic Artwork Palette Extraction & Ambient Lighting Morph
    PaletteExtractor.extractFromImage(track.coverArt).then(palette => {
      PaletteExtractor.applyPaletteToDOM(palette);
    });

    // Update Floating Mini-Player PiP
    MiniPlayerPiP.updateTrack(track, audioEngine.isPlaying);

    // Update Fullscreen Stage
    const stageCover = document.getElementById('stage-cover-art');
    const stageBg = document.getElementById('stage-backdrop-img');
    const stageTitle = document.getElementById('stage-track-title');
    const stageArtist = document.getElementById('stage-track-artist');

    if (stageCover) stageCover.src = track.coverArt;
    if (stageBg) stageBg.src = track.coverArt;
    if (stageTitle) stageTitle.textContent = track.title;
    if (stageArtist) stageArtist.textContent = track.artist;

    // Sync Hero Banner Play Button state
    const isHeroTrack = track.id === TRACK_CATALOG[0].id;
    const heroBtn = document.getElementById('hero-play-btn');
    if (heroBtn) {
      const span = heroBtn.querySelector('span');
      if (span) span.textContent = (isHeroTrack && audioEngine.isPlaying) ? 'Pause' : 'Play';
      const svg = heroBtn.querySelector('svg');
      if (svg) {
        svg.innerHTML = (isHeroTrack && audioEngine.isPlaying)
          ? '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>'
          : '<polygon points="5 3 19 12 5 21 5 3"></polygon>';
      }
    }

    // Refresh active state on any rendered track rows/cards
    document.querySelectorAll('.track-row').forEach(row => {
      const isThis = row.dataset.trackId === track.id;
      row.classList.toggle('active', isThis);
      row.classList.toggle('playing', isThis && audioEngine.isPlaying);
      const icon = row.querySelector('.track-row-play-icon');
      if (icon) icon.textContent = (isThis && audioEngine.isPlaying) ? '❚❚' : '▶';
    });
    document.querySelectorAll('.music-card[data-track-id]').forEach(card => {
      const isThis = card.dataset.trackId === track.id;
      card.classList.toggle('playing', isThis && audioEngine.isPlaying);
    });

    renderQueueList();
  };

  audioEngine.onPlayStateChange = (isPlaying) => {
    MiniPlayerPiP.updatePlayState(isPlaying);
    manageWakeLock();

    const playIcon = document.getElementById('control-play-icon');
    const miniWave = document.getElementById('mini-sound-wave');

    if (playIcon) {
      playIcon.innerHTML = isPlaying
        ? '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>'
        : '<polygon points="5 3 19 12 5 21 5 3"></polygon>';
    }

    if (miniWave) {
      miniWave.classList.toggle('playing', isPlaying);
    }

    // Sync Track Rows
    document.querySelectorAll('.track-row').forEach(row => {
      const isThis = row.dataset.trackId === audioEngine.currentTrack?.id;
      row.classList.toggle('playing', isThis && isPlaying);
      const icon = row.querySelector('.track-row-play-icon');
      if (icon) icon.textContent = (isThis && isPlaying) ? '❚❚' : '▶';
    });

    // Sync Hero Play Button
    const isHeroTrack = audioEngine.currentTrack?.id === TRACK_CATALOG[0].id;
    const heroBtn = document.getElementById('hero-play-btn');
    if (heroBtn) {
      const span = heroBtn.querySelector('span');
      if (span) span.textContent = (isHeroTrack && isPlaying) ? 'Pause' : 'Play';
      const svg = heroBtn.querySelector('svg');
      if (svg) {
        svg.innerHTML = (isHeroTrack && isPlaying)
          ? '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>'
          : '<polygon points="5 3 19 12 5 21 5 3"></polygon>';
      }
    }

    // Sync Music Cards
    document.querySelectorAll('.music-card[data-track-id]').forEach(card => {
      const isThis = card.dataset.trackId === audioEngine.currentTrack?.id;
      card.classList.toggle('playing', isThis && isPlaying);
    });
  };

  let isScrubbing = false;

  audioEngine.onTimeUpdate = (currentTime, duration) => {
    const timeCurrentEl = document.getElementById('time-current');
    const timeTotalEl = document.getElementById('time-total');
    const scrubberProgress = document.getElementById('scrubber-progress');
    const scrubberHandle = document.getElementById('scrubber-handle');

    if (timeCurrentEl) timeCurrentEl.textContent = formatTime(currentTime);
    if (timeTotalEl && duration) timeTotalEl.textContent = formatTime(duration);

    if (duration > 0 && !isScrubbing) {
      const pct = (currentTime / duration) * 100;
      if (scrubberProgress) scrubberProgress.style.width = `${pct}%`;
      if (scrubberHandle) scrubberHandle.style.left = `${pct}%`;
    }

    lyricsEngine.updateTime(currentTime);
  };

  audioEngine.onVolumeChange = (vol, isMuted) => {
    const volLevel = document.getElementById('volume-level');
    const volHandle = document.getElementById('volume-handle');
    const volTooltip = document.getElementById('volume-tooltip');
    const volIcon = document.getElementById('volume-icon');

    const pct = isMuted ? 0 : Math.round(vol * 100);
    if (volLevel) volLevel.style.width = `${pct}%`;
    if (volHandle) volHandle.style.left = `${pct}%`;
    if (volTooltip) {
      volTooltip.style.left = `${pct}%`;
      volTooltip.textContent = isMuted ? 'Muted' : `${pct}%`;
    }

    if (volIcon) {
      if (isMuted || vol === 0) {
        volIcon.innerHTML = '<path d="M11 5L6 9H2v6h4l5 4V5z"></path><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>';
      } else if (vol < 0.5) {
        volIcon.innerHTML = '<path d="M11 5L6 9H2v6h4l5 4V5z"></path><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>';
      } else {
        volIcon.innerHTML = '<path d="M11 5L6 9H2v6h4l5 4V5z"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>';
      }
    }
  };

  // --------------------------------------------------------------------------
  // Update Player Dock Metadata
  // --------------------------------------------------------------------------
  function updatePlayerDockInfo(track) {
    const thumb = document.getElementById('player-thumb');
    const title = document.getElementById('player-track-title');
    const artist = document.getElementById('player-track-artist');
    const formatPill = document.getElementById('player-format-badge');
    const likeBtn = document.getElementById('player-like-btn');

    if (thumb) thumb.src = track.coverArt;
    if (title) title.textContent = track.title;
    if (artist) artist.textContent = track.artist;
    if (formatPill) formatPill.textContent = 'Lossless';

    if (likeBtn) {
      const isLiked = Storage.isLiked(track.id);
      likeBtn.classList.toggle('liked', isLiked);
      const svg = likeBtn.querySelector('svg');
      if (svg) svg.setAttribute('fill', isLiked ? 'currentColor' : 'none');
    }
  }

  function updateAmbientMeshColors(color) {
    const glow = document.querySelector('.app-background-glow');
    if (glow && color) {
      glow.style.background = `radial-gradient(circle at 50% 0%, ${color}14 0%, rgba(10, 11, 14, 0) 70%)`;
    }
  }

  // --------------------------------------------------------------------------
  // Player Controls Event Wiring
  // --------------------------------------------------------------------------
  document.getElementById('control-play')?.addEventListener('click', () => {
    audioEngine.togglePlay();
  });

  document.getElementById('control-prev')?.addEventListener('click', () => {
    audioEngine.prevTrack();
  });

  document.getElementById('control-next')?.addEventListener('click', () => {
    audioEngine.nextTrack();
  });

  const shuffleBtn = document.getElementById('control-shuffle');
  shuffleBtn?.addEventListener('click', () => {
    const active = audioEngine.toggleShuffle();
    shuffleBtn.classList.toggle('active', active);
    ui.showToast(active ? 'Shuffle turned ON' : 'Shuffle turned OFF', '🔀');
  });

  const repeatBtn = document.getElementById('control-repeat');
  repeatBtn?.addEventListener('click', () => {
    const mode = audioEngine.cycleRepeat();
    repeatBtn.classList.toggle('active', mode !== 'off');
    if (mode === 'one') {
      repeatBtn.title = 'Repeat One';
      ui.showToast('Repeat Track', '🔂');
    } else if (mode === 'all') {
      repeatBtn.title = 'Repeat All';
      ui.showToast('Repeat Queue', '🔁');
    } else {
      repeatBtn.title = 'Repeat Off';
      ui.showToast('Repeat OFF', '➔');
    }
  });

  // Fluid Drag-to-Seek Scrubber with Live Timestamp Tooltip
  const scrubber = document.getElementById('custom-scrubber');
  const tooltip = document.getElementById('scrubber-tooltip');
  const scrubberProgress = document.getElementById('scrubber-progress');
  const scrubberHandle = document.getElementById('scrubber-handle');

  if (scrubber) {
    const updateScrubVisual = (clientX) => {
      const rect = scrubber.getBoundingClientRect();
      const fraction = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const pct = fraction * 100;
      if (scrubberProgress) scrubberProgress.style.width = `${pct}%`;
      if (scrubberHandle) scrubberHandle.style.left = `${pct}%`;
      if (tooltip) {
        tooltip.style.left = `${pct}%`;
        const dur = audioEngine.audio.duration || audioEngine.currentTrack?.duration || 180;
        tooltip.textContent = formatTime(dur * fraction);
      }
      return fraction;
    };

    scrubber.addEventListener('pointerdown', (e) => {
      isScrubbing = true;
      scrubber.classList.add('dragging');
      try { scrubber.setPointerCapture(e.pointerId); } catch (err) {}
      const frac = updateScrubVisual(e.clientX);
      audioEngine.seekFraction(frac);
    });

    scrubber.addEventListener('pointermove', (e) => {
      if (isScrubbing) {
        const frac = updateScrubVisual(e.clientX);
        audioEngine.seekFraction(frac);
      } else {
        const rect = scrubber.getBoundingClientRect();
        const fraction = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        if (tooltip) {
          tooltip.style.left = `${fraction * 100}%`;
          const dur = audioEngine.audio.duration || audioEngine.currentTrack?.duration || 180;
          tooltip.textContent = formatTime(dur * fraction);
        }
      }
    });

    const finishScrub = (e) => {
      if (isScrubbing) {
        isScrubbing = false;
        scrubber.classList.remove('dragging');
        try { scrubber.releasePointerCapture(e.pointerId); } catch (err) {}
      }
    };

    scrubber.addEventListener('pointerup', finishScrub);
    scrubber.addEventListener('pointercancel', finishScrub);
  }

  // Fluid Drag-to-Volume with Live Percentage Tooltip
  const volTrack = document.getElementById('volume-slider-track');
  const volLevel = document.getElementById('volume-level');
  const volHandle = document.getElementById('volume-handle');
  const volTooltip = document.getElementById('volume-tooltip');
  let isDraggingVol = false;

  if (volTrack) {
    const updateVolumeFromPointer = (clientX) => {
      const rect = volTrack.getBoundingClientRect();
      const fraction = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const pct = Math.round(fraction * 100);
      audioEngine.setVolume(fraction);
      if (volLevel) volLevel.style.width = `${pct}%`;
      if (volHandle) volHandle.style.left = `${pct}%`;
      if (volTooltip) {
        volTooltip.style.left = `${pct}%`;
        volTooltip.textContent = `${pct}%`;
      }
    };

    volTrack.addEventListener('pointerdown', (e) => {
      isDraggingVol = true;
      volTrack.classList.add('dragging');
      try { volTrack.setPointerCapture(e.pointerId); } catch (err) {}
      updateVolumeFromPointer(e.clientX);
    });

    volTrack.addEventListener('pointermove', (e) => {
      if (isDraggingVol) {
        updateVolumeFromPointer(e.clientX);
      } else {
        const rect = volTrack.getBoundingClientRect();
        const fraction = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const pct = Math.round(fraction * 100);
        if (volTooltip) {
          volTooltip.style.left = `${pct}%`;
          volTooltip.textContent = `${pct}%`;
        }
      }
    });

    const finishVolDrag = (e) => {
      if (isDraggingVol) {
        isDraggingVol = false;
        volTrack.classList.remove('dragging');
        try { volTrack.releasePointerCapture(e.pointerId); } catch (err) {}
      }
    };

    volTrack.addEventListener('pointerup', finishVolDrag);
    volTrack.addEventListener('pointercancel', finishVolDrag);
  }

  document.getElementById('volume-btn')?.addEventListener('click', () => {
    const isMuted = audioEngine.toggleMute();
    ui.showToast(isMuted ? 'Muted' : 'Unmuted', isMuted ? '🔇' : '🔊');
  });

  // Like in bottom dock
  document.getElementById('player-like-btn')?.addEventListener('click', () => {
    if (!audioEngine.currentTrack) return;
    const isLiked = Storage.toggleLike(audioEngine.currentTrack.id);
    const likeBtn = document.getElementById('player-like-btn');
    likeBtn?.classList.toggle('liked', isLiked);
    likeBtn?.querySelector('svg')?.setAttribute('fill', isLiked ? 'currentColor' : 'none');
    ui.showToast(isLiked ? 'Added to Favorites' : 'Removed from Favorites', isLiked ? '♥' : '♡');
  });

  // --------------------------------------------------------------------------
  // Fullscreen Immersive Stage & Lyrics + Screen Wake Lock
  // --------------------------------------------------------------------------
  const stage = document.getElementById('immersive-stage');
  const openStageBtn = document.getElementById('btn-open-stage');
  const closeStageBtn = document.getElementById('stage-close-btn');

  // Screen Wake Lock API (keeps display awake during fullscreen lyrics stage)
  let wakeLockSentinel = null;
  async function requestWakeLock() {
    if ('wakeLock' in navigator) {
      try {
        if (!wakeLockSentinel) {
          wakeLockSentinel = await navigator.wakeLock.request('screen');
          wakeLockSentinel.addEventListener('release', () => {
            wakeLockSentinel = null;
          });
        }
      } catch (err) {
        // Ignored on battery saver or restricted permissions
      }
    }
  }

  function releaseWakeLock() {
    if (wakeLockSentinel) {
      wakeLockSentinel.release().catch(() => {});
      wakeLockSentinel = null;
    }
  }

  function manageWakeLock() {
    const isStageOpen = stage?.classList.contains('open');
    if (isStageOpen && audioEngine.isPlaying) {
      requestWakeLock();
    } else {
      releaseWakeLock();
    }
  }

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      manageWakeLock();
    }
  });

  function openStage() {
    stage?.classList.add('open');
    if (audioEngine.currentTrack) {
      lyricsEngine.loadLyrics(audioEngine.currentTrack);
    }
    manageWakeLock();
  }

  function closeStage() {
    stage?.classList.remove('open');
    manageWakeLock();
  }

  openStageBtn?.addEventListener('click', openStage);
  document.getElementById('btn-open-stage-thumb')?.addEventListener('click', openStage);
  closeStageBtn?.addEventListener('click', closeStage);

  // Apple Music Sing Mode Vocal Suppressor
  const stageSingBtn = document.getElementById('stage-sing-btn');
  stageSingBtn?.addEventListener('click', () => {
    const active = audioEngine.toggleSingMode();
    stageSingBtn.classList.toggle('active', active);
    ui.showToast(active ? 'Sing Mode Active (Lead Vocals Suppressed)' : 'Sing Mode Off (Original Vocals Restored)', '🎤');
  });

  // Native Web Share in Stage
  document.getElementById('stage-share-btn')?.addEventListener('click', () => {
    if (audioEngine.currentTrack) {
      ui.shareTrack(audioEngine.currentTrack);
    }
  });

  // Mode switcher in stage
  document.querySelectorAll('.stage-mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.stage-mode-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      visualizer.setMode(btn.dataset.mode);
    });
  });

  // --------------------------------------------------------------------------
  // Queue Drawer
  // --------------------------------------------------------------------------
  const queueDrawer = document.getElementById('queue-drawer');
  const queueToggleBtn = document.getElementById('btn-toggle-queue');

  queueToggleBtn?.addEventListener('click', () => {
    const isOpen = queueDrawer?.classList.toggle('open');
    queueToggleBtn.classList.toggle('active', isOpen);
    if (isOpen) renderQueueList();
  });

  document.getElementById('btn-close-queue')?.addEventListener('click', () => {
    queueDrawer?.classList.remove('open');
    queueToggleBtn?.classList.remove('active');
  });

  document.getElementById('brand-home-link')?.addEventListener('click', () => {
    ui.renderHome();
    ui.updateActiveNav('nav-home');
  });

  function renderQueueList() {
    const listEl = document.getElementById('queue-list');
    if (!listEl) return;
    const currentQueue = audioEngine.getQueue();

    listEl.innerHTML = currentQueue.map((track, idx) => {
      const isActive = track.id === audioEngine.currentTrack?.id;
      return `
        <div class="queue-item ${isActive ? 'active' : ''}" data-queue-index="${idx}">
          <img src="${track.coverArt}" alt="${track.title}" class="queue-item-thumb" />
          <div class="queue-item-info">
            <div class="queue-item-title">${track.title}</div>
            <div class="queue-item-artist">${track.artist}</div>
          </div>
          <span style="font-size: 11px; color: var(--text-muted);">${formatTime(track.duration)}</span>
        </div>
      `;
    }).join('');

    listEl.querySelectorAll('.queue-item').forEach(item => {
      item.addEventListener('click', () => {
        const idx = parseInt(item.dataset.queueIndex, 10);
        audioEngine.queueIndex = idx;
        audioEngine.loadTrack(currentQueue[idx], true);
      });
    });
  }

  audioEngine.onQueueUpdate = () => {
    renderQueueList();
  };

  // --------------------------------------------------------------------------
  // Studio Equalizer Modal
  // --------------------------------------------------------------------------
  const studioModal = document.getElementById('studio-modal');
  const btnStudio = document.getElementById('btn-open-studio');
  const btnCloseStudio = document.getElementById('btn-close-studio');

  btnStudio?.addEventListener('click', () => {
    studioModal?.classList.add('open');
    btnStudio.classList.add('active');
  });

  btnCloseStudio?.addEventListener('click', () => {
    studioModal?.classList.remove('open');
    btnStudio?.classList.remove('active');
  });

  // EQ Sliders
  document.querySelectorAll('.eq-vertical-slider').forEach(slider => {
    slider.addEventListener('input', () => {
      const bandIndex = parseInt(slider.dataset.band, 10);
      const val = parseFloat(slider.value);
      audioEngine.setEQBandGain(bandIndex, val);
      const badge = slider.parentElement.querySelector('.eq-val-badge');
      if (badge) badge.textContent = `${val > 0 ? '+' : ''}${val} dB`;
      // Clear preset button active highlight
      document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
    });
  });

  // Preset Buttons
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const preset = btn.dataset.preset;
      const gains = audioEngine.applyPreset(preset);

      // Update vertical sliders
      document.querySelectorAll('.eq-vertical-slider').forEach((slider, idx) => {
        slider.value = gains[idx];
        const badge = slider.parentElement.querySelector('.eq-val-badge');
        if (badge) badge.textContent = `${gains[idx] > 0 ? '+' : ''}${gains[idx]} dB`;
      });

      ui.showToast(`Applied "${btn.textContent.trim()}" preset`, '🎛');
    });
  });

  // Spatial Panner
  const pannerSlider = document.getElementById('spatial-panner-slider');
  pannerSlider?.addEventListener('input', () => {
    const val = parseFloat(pannerSlider.value);
    audioEngine.setStereoPan(val);
  });

  // Picture-in-Picture Floating Mini-Player
  document.getElementById('btn-open-pip')?.addEventListener('click', () => {
    MiniPlayerPiP.toggle();
  });

  // DJ Smooth Crossfade
  const crossfadeBadge = document.getElementById('crossfade-badge');
  document.querySelectorAll('#crossfade-chips .chip-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#crossfade-chips .chip-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const secs = parseInt(btn.dataset.crossfade, 10);
      audioEngine.setCrossfade(secs);
      if (crossfadeBadge) {
        crossfadeBadge.textContent = secs === 0 ? '0s (Off)' : `${secs}s`;
      }
      ui.showToast(secs === 0 ? 'Crossfade Disabled' : `Crossfade set to ${secs}s`, '🎚');
    });
  });

  // Audiophile Sleep Timer
  const sleepTimerBadge = document.getElementById('sleep-timer-badge');
  let sleepTimerInterval = null;

  function updateSleepTimerBadge() {
    const remaining = audioEngine.getSleepTimerRemaining();
    if (remaining <= 0) {
      if (sleepTimerBadge) sleepTimerBadge.textContent = 'Off';
      if (sleepTimerInterval) {
        clearInterval(sleepTimerInterval);
        sleepTimerInterval = null;
      }
      return;
    }
    const mins = Math.floor(remaining / 60);
    const secs = remaining % 60;
    if (sleepTimerBadge) {
      sleepTimerBadge.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
  }

  document.querySelectorAll('#sleep-timer-chips .chip-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#sleep-timer-chips .chip-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const val = btn.dataset.sleep;

      if (val === '0') {
        audioEngine.clearSleepTimer();
        if (sleepTimerBadge) sleepTimerBadge.textContent = 'Off';
        if (sleepTimerInterval) clearInterval(sleepTimerInterval);
        ui.showToast('Sleep timer cancelled', '⏱');
      } else if (val === 'end') {
        audioEngine.setSleepTimer('end');
        if (sleepTimerBadge) sleepTimerBadge.textContent = 'End of Song';
        ui.showToast('Playback will stop at end of song', '🌙');
      } else {
        const mins = parseInt(val, 10);
        audioEngine.setSleepTimer(mins);
        updateSleepTimerBadge();
        if (sleepTimerInterval) clearInterval(sleepTimerInterval);
        sleepTimerInterval = setInterval(updateSleepTimerBadge, 1000);
        ui.showToast(`Sleep timer set for ${mins} minutes (with gentle 30s fade)`, '🌙');
      }
    });
  });

  // Audio Output Device Routing
  const outputSelect = document.getElementById('audio-output-select');
  const outputStatus = document.getElementById('output-device-status');
  if (outputSelect && audioEngine.audio && typeof audioEngine.audio.setSinkId === 'function') {
    audioEngine.getAudioOutputDevices().then(devices => {
      if (devices.length > 0) {
        outputSelect.innerHTML = devices.map(d => `
          <option value="${d.deviceId}">${d.label}</option>
        `).join('');
      }
    });

    outputSelect.addEventListener('change', async () => {
      const deviceId = outputSelect.value;
      const ok = await audioEngine.setAudioOutputDevice(deviceId);
      if (ok) {
        const selLabel = outputSelect.options[outputSelect.selectedIndex]?.text || 'Device';
        if (outputStatus) outputStatus.textContent = selLabel.split('(')[0].trim().slice(0, 16);
        ui.showToast(`Audio output routed to: ${selLabel}`, '🔊');
      } else {
        ui.showToast('Could not route audio to selected device', 'warning');
      }
    });
  } else if (outputStatus) {
    outputStatus.textContent = 'System Default';
  }

  // --------------------------------------------------------------------------
  // Navigation Routing (Home, Explore, Library)
  // --------------------------------------------------------------------------
  document.getElementById('nav-home')?.addEventListener('click', () => {
    ui.renderHome();
    ui.updateActiveNav('nav-home');
  });

  document.getElementById('nav-explore')?.addEventListener('click', () => {
    ui.renderExplore();
    ui.updateActiveNav('nav-explore');
  });

  document.getElementById('nav-library')?.addEventListener('click', () => {
    ui.renderLibrary();
    ui.updateActiveNav('nav-library');
  });

  document.getElementById('nav-favorites')?.addEventListener('click', () => {
    ui.renderLibrary();
    ui.updateActiveNav('nav-library');
  });

  // History back / forward buttons
  document.getElementById('btn-nav-back')?.addEventListener('click', () => {
    if (ui.currentView !== 'home') {
      ui.renderHome();
      ui.updateActiveNav('nav-home');
    }
  });

  // --------------------------------------------------------------------------
  // Dynamic Search Placeholder Typewriter Engine
  // --------------------------------------------------------------------------
  class SearchTypewriter {
    constructor(inputEl, phrases, options = {}) {
      this.input = inputEl;
      this.phrases = phrases || [
        'Search songs, artists, albums...',
        "Search 'The Weeknd'...",
        "Search 'Blinding Lights'...",
        "Search 'Daft Punk'...",
        "Search 'Midnight City'...",
        "Search 'Synthwave'...",
        "Search 'Cyberpunk Beats'...",
        "Search 'Lo-Fi Chillhop'..."
      ];
      this.typeSpeed = options.typeSpeed || 70;
      this.deleteSpeed = options.deleteSpeed || 35;
      this.holdTime = options.holdTime || 2000;
      this.pauseBeforeType = options.pauseBeforeType || 350;

      this.phraseIndex = 0;
      this.charIndex = 0;
      this.isDeleting = false;
      this.isRunning = false;
      this.timeoutId = null;

      if (!this.input) return;

      this.input.addEventListener('focus', () => this.stop());
      this.input.addEventListener('blur', () => {
        if (!this.input.value.trim()) {
          this.start();
        }
      });

      if (!this.input.value.trim()) {
        this.start();
      }
    }

    start() {
      if (this.isRunning) return;
      this.isRunning = true;
      this.tick();
    }

    stop() {
      this.isRunning = false;
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }
      this.input.setAttribute('placeholder', 'Search songs, artists, albums...');
    }

    tick() {
      if (!this.isRunning) return;

      const currentPhrase = this.phrases[this.phraseIndex];

      if (!this.isDeleting) {
        this.charIndex++;
        this.input.setAttribute('placeholder', currentPhrase.slice(0, this.charIndex));

        if (this.charIndex >= currentPhrase.length) {
          this.isDeleting = true;
          this.timeoutId = setTimeout(() => this.tick(), this.holdTime);
          return;
        }
        this.timeoutId = setTimeout(() => this.tick(), this.typeSpeed);
      } else {
        this.charIndex--;
        this.input.setAttribute('placeholder', currentPhrase.slice(0, this.charIndex));

        if (this.charIndex <= 0) {
          this.isDeleting = false;
          this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
          this.timeoutId = setTimeout(() => this.tick(), this.pauseBeforeType);
          return;
        }
        this.timeoutId = setTimeout(() => this.tick(), this.deleteSpeed);
      }
    }
  }

  // --------------------------------------------------------------------------
  // Search Input Live Filter with 500ms Debounce & Active Typing Animation
  // --------------------------------------------------------------------------
  const searchInput = document.getElementById('search-input');
  const searchWrapper = document.getElementById('search-input-wrapper');
  const searchClear = document.getElementById('search-clear-btn');
  let searchTimer = null;
  const SEARCH_DEBOUNCE_MS = 500;

  // Launch Search Typewriter
  const searchTypewriter = new SearchTypewriter(searchInput, [
    'Search songs, artists, albums...',
    "Search 'The Weeknd'...",
    "Search 'Blinding Lights'...",
    "Search 'Daft Punk'...",
    "Search 'Midnight City'...",
    "Search 'Synthwave'...",
    "Search 'Cyberpunk Beats'...",
    "Search 'Retro Chill'...",
    "Search 'Lo-Fi Chillhop'..."
  ]);

  searchInput?.addEventListener('input', (e) => {
    const query = e.target.value;
    searchClear?.classList.toggle('visible', query.length > 0);

    // Active typing feedback while debounce is waiting
    if (query.trim().length > 0) {
      searchWrapper?.classList.add('is-searching');
    } else {
      searchWrapper?.classList.remove('is-searching');
    }

    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      searchWrapper?.classList.remove('is-searching');
      if (query.trim().length > 0) {
        ui.renderExplore(query);
        ui.updateActiveNav('nav-explore');
      } else {
        ui.renderHome();
        ui.updateActiveNav('nav-home');
      }
    }, SEARCH_DEBOUNCE_MS);
  });

  searchInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      clearTimeout(searchTimer);
      searchWrapper?.classList.remove('is-searching');
      const query = searchInput.value;
      if (query.trim().length > 0) {
        ui.renderExplore(query);
        ui.updateActiveNav('nav-explore');
      }
    }
  });

  searchClear?.addEventListener('click', () => {
    if (searchInput) {
      searchInput.value = '';
      searchInput.focus();
    }
    searchClear.classList.remove('visible');
    searchWrapper?.classList.remove('is-searching');
    ui.renderHome();
    ui.updateActiveNav('nav-home');
  });

  // --------------------------------------------------------------------------
  // User Authentication Controller (Google, Email/Password, Phone)
  // --------------------------------------------------------------------------
  const authModal = document.getElementById('auth-modal');
  const btnOpenAuth = document.getElementById('btn-open-auth-modal');
  const btnCloseAuth = document.getElementById('btn-close-auth');
  const userProfileChip = document.getElementById('user-profile-chip');
  const userAvatarInitials = document.getElementById('user-avatar-initials');
  const userDisplayName = document.getElementById('user-display-name');
  const btnUserSignOut = document.getElementById('btn-user-signout');

  const btnGoogleAuth = document.getElementById('btn-google-auth');
  const tabAuthEmail = document.getElementById('tab-auth-email');
  const tabAuthPhone = document.getElementById('tab-auth-phone');
  const formAuthEmail = document.getElementById('form-auth-email');
  const formAuthPhone = document.getElementById('form-auth-phone');
  const btnToggleSignup = document.getElementById('btn-toggle-signup');
  const authHeading = document.getElementById('auth-modal-heading');
  const authSubheading = document.getElementById('auth-modal-subheading');
  const authTogglePrompt = document.getElementById('auth-toggle-prompt');
  const btnEmailSubmit = document.getElementById('btn-email-submit');
  const btnPhoneSubmit = document.getElementById('btn-phone-submit');

  let isSignUpMode = false;

  function initUserAuth() {
    const user = Storage.getUser();
    if (user) {
      if (btnOpenAuth) btnOpenAuth.style.display = 'none';
      if (userProfileChip) userProfileChip.style.display = 'flex';
      if (userDisplayName) userDisplayName.textContent = user.name || 'User';
      if (userAvatarInitials) {
        const initial = (user.name || user.email || 'U').charAt(0).toUpperCase();
        userAvatarInitials.textContent = initial;
      }
    } else {
      if (btnOpenAuth) btnOpenAuth.style.display = 'flex';
      if (userProfileChip) userProfileChip.style.display = 'none';
    }
  }

  // Initial call to set user auth state
  initUserAuth();

  function openAuthModal() {
    authModal?.classList.add('open');
  }

  function closeAuthModal() {
    authModal?.classList.remove('open');
  }

  btnOpenAuth?.addEventListener('click', openAuthModal);
  btnCloseAuth?.addEventListener('click', closeAuthModal);

  // Method Switcher: Email vs Phone
  tabAuthEmail?.addEventListener('click', () => {
    tabAuthEmail.classList.add('active');
    tabAuthPhone?.classList.remove('active');
    if (formAuthEmail) formAuthEmail.style.display = 'flex';
    if (formAuthPhone) formAuthPhone.style.display = 'none';
  });

  tabAuthPhone?.addEventListener('click', () => {
    tabAuthPhone.classList.add('active');
    tabAuthEmail?.classList.remove('active');
    if (formAuthEmail) formAuthEmail.style.display = 'none';
    if (formAuthPhone) formAuthPhone.style.display = 'flex';
  });

  // Toggle Sign In vs Sign Up
  btnToggleSignup?.addEventListener('click', () => {
    isSignUpMode = !isSignUpMode;
    if (isSignUpMode) {
      if (authHeading) authHeading.textContent = 'Create your Harmonix account';
      if (authSubheading) authSubheading.textContent = 'Join millions of audiophiles streaming in crystal HD clarity.';
      if (authTogglePrompt) authTogglePrompt.textContent = 'Already have an account?';
      if (btnToggleSignup) btnToggleSignup.textContent = 'Sign In';
      if (btnEmailSubmit) btnEmailSubmit.querySelector('span').textContent = 'Create Account';
      if (btnPhoneSubmit) btnPhoneSubmit.querySelector('span').textContent = 'Sign Up with Phone';
    } else {
      if (authHeading) authHeading.textContent = 'Sign in to Harmonix';
      if (authSubheading) authSubheading.textContent = 'Unlock high-fidelity sound, custom playlists & personal vaults.';
      if (authTogglePrompt) authTogglePrompt.textContent = "Don't have an account?";
      if (btnToggleSignup) btnToggleSignup.textContent = 'Sign Up';
      if (btnEmailSubmit) btnEmailSubmit.querySelector('span').textContent = 'Sign In';
      if (btnPhoneSubmit) btnPhoneSubmit.querySelector('span').textContent = 'Sign In with Phone';
    }
  });

  // Google Sign-In
  btnGoogleAuth?.addEventListener('click', () => {
    const googleUser = {
      name: 'Google User',
      email: 'alex.rivera@gmail.com',
      provider: 'google'
    };
    Storage.setUser(googleUser);
    initUserAuth();
    closeAuthModal();
    ui.showToast('Signed in with Google as Alex Rivera!', '✓');
  });

  // Email & Password Submit
  formAuthEmail?.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('auth-email-input');
    const email = emailInput?.value.trim() || 'audiophile@harmonix.io';
    const rawName = email.split('@')[0];
    const capitalizedName = rawName.charAt(0).toUpperCase() + rawName.slice(1);

    const emailUser = {
      name: capitalizedName,
      email: email,
      provider: 'email'
    };
    Storage.setUser(emailUser);
    initUserAuth();
    closeAuthModal();
    ui.showToast(isSignUpMode ? `Welcome to Harmonix, ${capitalizedName}!` : `Welcome back, ${capitalizedName}!`, '✓');
  });

  // Phone Number Submit
  formAuthPhone?.addEventListener('submit', (e) => {
    e.preventDefault();
    const code = document.getElementById('auth-country-code')?.value || '+1';
    const phone = document.getElementById('auth-phone-input')?.value.trim() || 'User';

    const phoneUser = {
      name: `${code} ${phone}`,
      phone: `${code} ${phone}`,
      provider: 'phone'
    };
    Storage.setUser(phoneUser);
    initUserAuth();
    closeAuthModal();
    ui.showToast(`Signed in with ${code} ${phone}`, '📱');
  });

  // Sign Out
  btnUserSignOut?.addEventListener('click', () => {
    Storage.clearUser();
    initUserAuth();
    ui.showToast('You have been signed out.', 'ℹ');
  });

  // --------------------------------------------------------------------------
  // Create Playlist Modal
  // --------------------------------------------------------------------------
  document.getElementById('btn-new-playlist-sidebar')?.addEventListener('click', () => {
    ui.openCreatePlaylistModal();
  });

  document.getElementById('btn-cancel-playlist')?.addEventListener('click', () => {
    ui.closeCreatePlaylistModal();
  });

  document.getElementById('btn-confirm-playlist')?.addEventListener('click', () => {
    const input = document.getElementById('playlist-name-input');
    const title = input?.value.trim();
    if (title) {
      const pl = Storage.createPlaylist(title);
      ui.closeCreatePlaylistModal();
      ui.renderSidebarPlaylists();
      ui.renderPlaylistDetail(pl.id);
      ui.showToast(`Created playlist "${title}"`, '🎶');
    }
  });

  // --------------------------------------------------------------------------
  // Drag & Drop Local Audio Files
  // --------------------------------------------------------------------------
  const dropOverlay = document.getElementById('file-drop-overlay');
  const localFileInput = document.getElementById('local-file-input');
  const navLocalAudio = document.getElementById('nav-local-audio');

  navLocalAudio?.addEventListener('click', () => {
    localFileInput?.click();
  });

  localFileInput?.addEventListener('change', (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      for (const file of files) {
        audioEngine.addLocalFile(file);
      }
      ui.showToast(`Imported ${files[0].name}`, '📂');
    }
  });

  window.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropOverlay?.classList.add('active');
  });

  window.addEventListener('dragleave', (e) => {
    if (e.relatedTarget === null) {
      dropOverlay?.classList.remove('active');
    }
  });

  window.addEventListener('drop', (e) => {
    e.preventDefault();
    dropOverlay?.classList.remove('active');
    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      let importedCount = 0;
      for (const file of files) {
        if (file.type.startsWith('audio/') || /\.(mp3|wav|flac|m4a|ogg)$/i.test(file.name)) {
          audioEngine.addLocalFile(file);
          importedCount++;
        }
      }
      if (importedCount > 0) {
        ui.showToast(`Imported & playing ${importedCount} track(s)!`, '🎧');
      } else {
        ui.showToast('Please drop valid audio files (.mp3, .wav, .flac)', '⚠');
      }
    }
  });

  // --------------------------------------------------------------------------
  // Global Keyboard Shortcuts
  // --------------------------------------------------------------------------
  window.addEventListener('keydown', (e) => {
    // Command/Ctrl + K focus search bar
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const sInput = document.getElementById('search-input');
      sInput?.focus();
      sInput?.select();
      return;
    }

    // Avoid other shortcuts when typing into inputs
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

    if (e.code === 'Space') {
      e.preventDefault();
      audioEngine.togglePlay();
    } else if (e.code === 'ArrowRight') {
      e.preventDefault();
      audioEngine.seek(audioEngine.audio.currentTime + 5);
    } else if (e.code === 'ArrowLeft') {
      e.preventDefault();
      audioEngine.seek(audioEngine.audio.currentTime - 5);
    } else if (e.code === 'ArrowUp') {
      e.preventDefault();
      audioEngine.setVolume(Math.min(1, audioEngine.volume + 0.05));
    } else if (e.code === 'ArrowDown') {
      e.preventDefault();
      audioEngine.setVolume(Math.max(0, audioEngine.volume - 0.05));
    } else if (e.code === 'KeyP') {
      MiniPlayerPiP.toggle();
    } else if (e.code === 'KeyM') {
      audioEngine.toggleMute();
    } else if (e.code === 'KeyL') {
      if (stage?.classList.contains('open')) {
        closeStage();
      } else {
        openStage();
      }
    } else if (e.code === 'KeyV') {
      const modes = ['bars', 'wave', 'radial'];
      const nextMode = modes[(modes.indexOf(visualizer.mode) + 1) % modes.length];
      visualizer.setMode(nextMode);
      document.querySelectorAll('.stage-mode-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.mode === nextMode);
      });
      ui.showToast(`Visualizer mode: ${nextMode.toUpperCase()}`, '📊');
    } else if (e.code === 'Escape') {
      closeStage();
      studioModal?.classList.remove('open');
      ui.closeCreatePlaylistModal();
      queueDrawer?.classList.remove('open');
      closeAuthModal();
      document.getElementById('lossless-hud-overlay')?.classList.remove('open');
      ui.closeContextMenu();
    }
  });

  // Window resize handler for canvas visualizers
  window.addEventListener('resize', () => {
    if (dockCanvas) visualizer.resizeCanvas(dockCanvas);
    if (stageCanvas) visualizer.resizeCanvas(stageCanvas);
  });

  // PWA Desktop Service Worker Registration
  if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').then((reg) => {
        console.log('Harmonix ServiceWorker registered with scope:', reg.scope);
      }).catch((err) => {
        console.warn('Harmonix ServiceWorker registration note:', err);
      });
    });
  }
});

})();
