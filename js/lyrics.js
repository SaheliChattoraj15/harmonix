/* ==========================================================================
   AURA SOUND - KARAOKE SYNCHRONIZED LYRICS ENGINE
   Real-time timestamp tracking, auto-scroll centering, click-to-seek
   ========================================================================== */

export class LyricsEngine {
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
