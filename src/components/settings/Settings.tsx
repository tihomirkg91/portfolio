import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings as SettingsIcon,
  MousePointer2,
  Volume2,
  Orbit,
  Smartphone,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import { useSoundContext } from '../../contexts/SoundContext';
import { usePreventScroll } from '../../hooks/usePreventScroll';
import { SettingItem } from './SettingItem';
import './Settings.css';

export const Settings = () => {
  const [showSettings, setShowSettings] = useState(false);
  const { playHoverSound, playOpenSound, playCloseSound } = useSoundContext();
  const {
    cursorTrailEnabled,
    setCursorTrailEnabled,
    soundEffectsEnabled,
    setSoundEffectsEnabled,
    orbsEnabled,
    setOrbsEnabled,
    isMobile,
    isUserCursorTrailEnabled,
  } = useSettings();

  const settingsData = [
    {
      icon: MousePointer2,
      label: 'Cursor Trail',
      enabled: cursorTrailEnabled,
      onClick: () => setCursorTrailEnabled(!isUserCursorTrailEnabled),
      disabled: isMobile,
      description: isMobile ? (
        <span className="setting-item__description">
          <Smartphone size={16} />
          Disabled on mobile devices for better performance
        </span>
      ) : undefined,
    },
    {
      icon: Volume2,
      label: 'Sound',
      enabled: soundEffectsEnabled,
      onClick: () => setSoundEffectsEnabled(!soundEffectsEnabled),
    },
    {
      icon: Orbit,
      label: 'Planets',
      enabled: orbsEnabled,
      onClick: () => setOrbsEnabled(!orbsEnabled),
    },
  ];

  const handleSettingsToggle = () => {
    const willBeOpen = !showSettings;
    setShowSettings(willBeOpen);
    willBeOpen ? playOpenSound() : playCloseSound();
  };

  // Prevent body scroll on mobile when settings menu is open
  usePreventScroll(isMobile && showSettings);

  return (
    <>
      {/* Settings Button */}
      <motion.button
        className={`settings-btn ${
          showSettings ? 'settings-btn--open' : 'settings-btn--closed'
        } ${
          isMobile || !cursorTrailEnabled
            ? 'settings-btn--mobile-cursor'
            : 'settings-btn--cursor-hidden'
        }`}
        onClick={handleSettingsToggle}
        onMouseEnter={() => playHoverSound()}
        whileHover={{
          scale: 1.05,
        }}
        whileTap={{ scale: 0.85 }}
        animate={{
          rotate: showSettings ? 180 : 0,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <motion.div
          className={showSettings ? 'settings-btn__icon--open' : ''}
          animate={{
            filter: showSettings
              ? 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.8))'
              : 'none',
          }}
        >
          <SettingsIcon size={22} />
        </motion.div>
      </motion.button>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            className={`settings-panel ${
              isMobile ? 'settings-panel--mobile' : 'settings-panel--desktop'
            }`}
            initial={
              isMobile
                ? { opacity: 0, scale: 0.95 }
                : { opacity: 0, x: 300, scale: 0.8 }
            }
            animate={
              isMobile
                ? { opacity: 1, scale: 1 }
                : { opacity: 1, x: 0, scale: 1 }
            }
            exit={
              isMobile
                ? { opacity: 0, scale: 0.95 }
                : { opacity: 0, x: 300, scale: 0.8 }
            }
            transition={{
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
              type: 'tween',
            }}
            onClick={isMobile ? () => setShowSettings(false) : undefined}
          >
            {/* Mobile Close Button */}
            {isMobile && (
              <motion.div
                className="mobile-nav-top-bar"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <motion.button
                  className="mobile-nav-close-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSettings(false);
                    playCloseSound();
                  }}
                  onMouseEnter={playHoverSound}
                  whileHover={{ scale: 1.15, rotate: 180 }}
                  whileTap={{ scale: 0.85, rotate: 270 }}
                  initial={{ x: 20, opacity: 0, rotate: -180 }}
                  animate={{ x: 0, opacity: 1, rotate: 0 }}
                  exit={{
                    x: 20,
                    opacity: 0,
                    rotate: 180,
                    scale: 0.8,
                    transition: { duration: 0.2 },
                  }}
                  transition={{
                    delay: 0.2,
                    type: 'spring',
                    stiffness: 200,
                    damping: 15,
                  }}
                >
                  {/* Animated background effect */}
                  <motion.div
                    className="mobile-nav-close-btn-bg"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  {/* Enhanced X icon with animation */}
                  <motion.div
                    className="mobile-nav-close-icon"
                    whileHover={{
                      rotate: 90,
                      scale: 1.1,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={26} strokeWidth={2.5} />
                  </motion.div>
                </motion.button>
              </motion.div>
            )}

            {/* Settings Content */}
            <motion.div
              className={`settings-content ${
                isMobile
                  ? 'settings-content--mobile'
                  : 'settings-content--desktop'
              }`}
              initial={isMobile ? { opacity: 0, y: 50 } : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={isMobile ? { opacity: 0, y: 50 } : { opacity: 0, y: 30 }}
              transition={{
                duration: isMobile ? 0.4 : 0.3,
                delay: isMobile ? 0.2 : 0.1,
                ease: [0.4, 0, 0.2, 1],
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`settings-list ${
                  isMobile ? 'settings-list--mobile' : ''
                }`}
              >
                {settingsData.map((setting, index) => (
                  <motion.div
                    key={setting.label}
                    initial={
                      isMobile
                        ? { opacity: 0, y: 20 }
                        : { opacity: 0, x: 50, scale: 0.9 }
                    }
                    animate={
                      isMobile
                        ? { opacity: 1, y: 0 }
                        : { opacity: 1, x: 0, scale: 1 }
                    }
                    transition={{
                      delay: isMobile ? 0.3 + index * 0.1 : 0.2 + index * 0.1,
                      duration: isMobile ? 0.4 : 0.3,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                  >
                    <SettingItem {...setting} isMobile={isMobile} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
