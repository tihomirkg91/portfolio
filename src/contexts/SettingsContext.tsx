import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface SettingsContextType {
  cursorTrailEnabled: boolean;
  setCursorTrailEnabled: (enabled: boolean) => void;
  soundEffectsEnabled: boolean;
  setSoundEffectsEnabled: (enabled: boolean) => void;
  usePlanets: boolean;
  setUsePlanets: (enabled: boolean) => void;
  isMobile: boolean;
  isUserCursorTrailEnabled: boolean; // User's preference regardless of mobile
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({
  children,
}) => {
  const [isUserCursorTrailEnabled, setIsUserCursorTrailEnabled] =
    useState(true);
  const [soundEffectsEnabled, setSoundEffectsEnabled] = useState(true);
  const [usePlanets, setUsePlanets] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection effect
  useEffect(() => {
    const checkMobile = () => {
      const mobile =
        window.innerWidth <= 768 ||
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) ||
        'ontouchstart' in window;
      setIsMobile(mobile);
    };

    // Initial check
    checkMobile();

    // Listen for resize events
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Computed cursor trail enabled - disabled on mobile devices
  const cursorTrailEnabled = !isMobile && isUserCursorTrailEnabled;

  // Custom setter that updates user preference
  const setCursorTrailEnabled = (enabled: boolean) => {
    setIsUserCursorTrailEnabled(enabled);
  };

  const value = {
    cursorTrailEnabled,
    setCursorTrailEnabled,
    soundEffectsEnabled,
    setSoundEffectsEnabled,
    usePlanets,
    setUsePlanets,
    isMobile,
    isUserCursorTrailEnabled,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
