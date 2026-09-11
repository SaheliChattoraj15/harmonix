/* ==========================================================================
   HARMONIX SOUND - USER INTERFACE & VIEW CONTROLLER
   Single-page application views, templates, modals, and toasts
   ========================================================================== */

import { TRACK_CATALOG, CURATED_PLAYLISTS, GENRE_CATEGORIES } from './data.js';
import { Storage } from './storage.js';
import { OSDetector } from './os.js';

export function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export class UIController {
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
