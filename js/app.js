/* ==========================================================================
   HARMONIX SOUND - APPLICATION ORCHESTRATOR & BOOTSTRAP
   Wires state, audio engine, visualizers, lyrics, and user interaction
   ========================================================================== */

import { TRACK_CATALOG } from './data.js';
import { Storage } from './storage.js';
import { AudioEngine } from './audio.js';
import { Visualizer } from './visualizer.js';
import { LyricsEngine } from './lyrics.js';
import { UIController, formatTime } from './ui.js';
import { OSDetector } from './os.js';
import { PaletteExtractor } from './palette.js';
import { MiniPlayerPiP } from './pip.js';

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
