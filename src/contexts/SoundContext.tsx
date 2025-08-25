import React, { createContext, useContext, useState, useEffect } from 'react';

interface SoundVibrationContextType {
  playHoverSound: () => void;
  playOpenSound: () => void;
  playCloseSound: () => void;
  triggerVibration: () => void;
  isMobile: boolean;
}

const SoundVibrationContext = createContext<
  SoundVibrationContextType | undefined
>(undefined);

export const useSoundVibrationContext = () => {
  const context = useContext(SoundVibrationContext);
  if (context === undefined) {
    throw new Error(
      'useSoundVibrationContext must be used within a SoundVibrationProvider'
    );
  }
  return context;
};

export const SoundVibrationProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Hover sound function
  const playHoverSound = () => {
    // Create a simple beep sound using Web Audio API
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(800, audioContext.currentTime); // Higher frequency for a nice beep
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + 0.1
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  // Open sound function - higher pitched ascending sound
  const playOpenSound = () => {
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
    oscillator.frequency.linearRampToValueAtTime(
      900,
      audioContext.currentTime + 0.15
    );
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(
      0.08,
      audioContext.currentTime + 0.02
    );
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + 0.15
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.15);
  };

  // Close sound function - lower pitched descending sound
  const playCloseSound = () => {
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(700, audioContext.currentTime);
    oscillator.frequency.linearRampToValueAtTime(
      400,
      audioContext.currentTime + 0.12
    );
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(
      0.08,
      audioContext.currentTime + 0.02
    );
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + 0.12
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.12);
  };

  // Vibration function for mobile devices
  const triggerVibration = () => {
    // Check if the device supports vibration and is mobile
    if (isMobile && 'vibrate' in navigator) {
      // Short, gentle vibration (50ms)
      navigator.vibrate(50);
    }
  };

  const value = {
    playHoverSound,
    playOpenSound,
    playCloseSound,
    triggerVibration,
    isMobile,
  };

  return (
    <SoundVibrationContext.Provider value={value}>
      {children}
    </SoundVibrationContext.Provider>
  );
};
