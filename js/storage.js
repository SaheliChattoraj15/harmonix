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

export const Storage = {
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
