/**
 * Utility functions for managing PWA installation status in localStorage
 */

const PWA_STORAGE_KEY = 'pwa-installed';
const PWA_MAYBE_LATER_KEY = 'pwa-maybe-later';
const MAYBE_LATER_DELAY = 10 * 60 * 1000;

export const pwaStorage = {
  isInstalled(): boolean {
    return localStorage.getItem(PWA_STORAGE_KEY) === 'true';
  },

  setInstalled(): void {
    localStorage.setItem(PWA_STORAGE_KEY, 'true');
    localStorage.removeItem(PWA_MAYBE_LATER_KEY);
  },

  setMaybeLater(): void {
    const timestamp = Date.now();
    localStorage.setItem(PWA_MAYBE_LATER_KEY, timestamp.toString());
  },

  shouldShowModal(): boolean {
    if (this.isInstalled()) return false;

    const maybeLaterTimestamp = localStorage.getItem(PWA_MAYBE_LATER_KEY);
    if (maybeLaterTimestamp) {
      const timeSinceMaybeLater =
        Date.now() - parseInt(maybeLaterTimestamp, 10);
      return timeSinceMaybeLater >= MAYBE_LATER_DELAY;
    }

    return true;
  },

  reset(): void {
    localStorage.removeItem(PWA_STORAGE_KEY);
    localStorage.removeItem(PWA_MAYBE_LATER_KEY);
  },

  isRunningStandalone(): boolean {
    const isStandalone = window.matchMedia(
      '(display-mode: standalone)'
    ).matches;
    const isIOSStandalone =
      'standalone' in window.navigator &&
      (window.navigator as { standalone?: boolean }).standalone === true;
    return isStandalone || isIOSStandalone;
  },
};

declare global {
  interface Window {
    pwaStorage?: typeof pwaStorage;
  }
}

if (typeof window !== 'undefined' && import.meta.env?.DEV)
  window.pwaStorage = pwaStorage;
