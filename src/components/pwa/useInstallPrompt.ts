import { useState, useEffect } from 'react';
import { pwaStorage } from '../../utils/pwaStorage';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export const useInstallPrompt = () => {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const checkIfInstalled = () => {
      const isRunningStandalone = pwaStorage.isRunningStandalone();
      const wasInstalledPreviously = pwaStorage.isInstalled();

      const installedStatus = isRunningStandalone || wasInstalledPreviously;
      setIsInstalled(installedStatus);

      if (isRunningStandalone) pwaStorage.setInstalled();
    };

    checkIfInstalled();

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      const promptEvent = event as BeforeInstallPromptEvent;

      if (pwaStorage.isInstalled()) return;

      setInstallPrompt(promptEvent);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setInstallPrompt(null);
      pwaStorage.setInstalled();
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const promptInstall = async () => {
    if (!installPrompt) return false;

    try {
      await installPrompt.prompt();
      const choice = await installPrompt.userChoice;

      if (choice.outcome === 'accepted') {
        setIsInstallable(false);
        setInstallPrompt(null);
        setIsInstalled(true);
        pwaStorage.setInstalled();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error showing install prompt:', error);
      return false;
    }
  };

  const resetInstallationStatus = () => {
    pwaStorage.reset();
    setIsInstalled(false);
    const checkInstallability = () => {
      const isRunningStandalone = pwaStorage.isRunningStandalone();
      if (!isRunningStandalone) setIsInstallable(true);
    };
    setTimeout(checkInstallability, 100);
  };

  return {
    isInstallable,
    isInstalled,
    promptInstall,
    resetInstallationStatus,
  };
};
