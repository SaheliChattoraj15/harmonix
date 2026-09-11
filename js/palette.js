/* ==========================================================================
   HARMONIX SOUND - DYNAMIC ARTWORK PALETTE EXTRACTION
   Canvas-based pixel analysis: extracts dominant, vibrant, and ambient tones
   to morph liquid glass lighting, visualizer gradients, and mesh glows
   ========================================================================== */

export class PaletteExtractor {
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

