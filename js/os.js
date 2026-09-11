/* ==========================================================================
   HARMONIX SOUND - CROSS-PLATFORM OS DETECTION & SYSTEM ADAPTER
   Autodetects macOS, Windows, Linux, iOS, and Android
   Adapts keyboard shortcuts, keybindings, and native host audio subsystem info
   ========================================================================== */

export class OSDetector {
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

