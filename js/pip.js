/* ==========================================================================
   HARMONIX SOUND - PICTURE-IN-PICTURE FLOATING MINI-PLAYER
   Dual-Engine Implementation:
   1. Modern Document Picture-in-Picture API (floating HTML window)
   2. Canvas Stream Video PiP Fallback (Safari / WebKit canvas.captureStream)
   ========================================================================== */

export class MiniPlayerPiP {
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

