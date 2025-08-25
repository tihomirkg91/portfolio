import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings as SettingsIcon,
  MousePointer2,
  Volume2,
  Orbit,
  Smartphone,
} from 'lucide-react';
import { useState } from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import { useSoundVibrationContext } from '../../contexts/SoundVibrationContext';
import { SettingItem } from './SettingItem';

export const Settings = () => {
  const [showSettings, setShowSettings] = useState(false);
  const { playHoverSound, playOpenSound, playCloseSound } =
    useSoundVibrationContext();
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
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
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
      label: 'Floating Orbs',
      enabled: orbsEnabled,
      onClick: () => setOrbsEnabled(!orbsEnabled),
    },
  ];

  const handleSettingsToggle = () => {
    const willBeOpen = !showSettings;
    setShowSettings(willBeOpen);
    willBeOpen ? playOpenSound() : playCloseSound();
  };

  return (
    <>
      {/* Settings Button */}
      <motion.button
        className="settings-btn"
        onClick={handleSettingsToggle}
        onMouseEnter={() => playHoverSound()}
        whileHover={{
          scale: 1.15,
          background:
            'linear-gradient(45deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2))',
          boxShadow: '0 8px 32px rgba(99, 102, 241, 0.4)',
        }}
        whileTap={{ scale: 0.85 }}
        animate={{
          rotate: showSettings ? 180 : 0,
          background: showSettings
            ? 'linear-gradient(45deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.3))'
            : 'rgba(0, 0, 0, 0.8)',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        style={{
          zIndex: 10000,
          border: '2px solid #6366f1',
          borderRadius: '12px',
          padding: '12px',
          color: '#6366f1',
          cursor: 'none',
          backdropFilter: 'blur(10px)',
          boxShadow: showSettings
            ? '0 8px 32px rgba(99, 102, 241, 0.3)'
            : '0 4px 16px rgba(99, 102, 241, 0.2)',
        }}
      >
        <motion.div
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: 'fixed',
              top: isMobile ? 0 : '80px',
              left: isMobile ? 0 : 'auto',
              right: isMobile ? 0 : '20px',
              bottom: isMobile ? 0 : 'auto',
              zIndex: isMobile ? 8888887 : 9999,
              background: isMobile
                ? 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(15, 15, 35, 0.95) 100%)'
                : 'linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(20, 20, 40, 0.95))',
              border: isMobile ? 'none' : '1px solid #6366f1',
              borderRadius: isMobile ? '0' : '16px',
              padding: '24px',
              minWidth: isMobile ? 'auto' : '300px',
              maxWidth: isMobile ? 'auto' : '300px',
              backdropFilter: 'blur(20px)',
              boxShadow: isMobile
                ? 'none'
                : '0 20px 40px rgba(99, 102, 241, 0.3), 0 0 0 1px rgba(99, 102, 241, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              height: isMobile ? '100vh' : 'auto',
            }}
            onClick={isMobile ? () => setShowSettings(false) : undefined}
          >
            {/* Mobile Close Button */}
            {isMobile && (
              <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  padding: '20px 24px',
                  borderBottom: '1px solid rgba(99, 102, 241, 0.2)',
                  background: 'rgba(0, 0, 0, 0.3)',
                }}
              >
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSettings(false);
                    playCloseSound();
                  }}
                  onMouseEnter={playHoverSound}
                  whileHover={{ scale: 1.15, rotate: 180 }}
                  whileTap={{ scale: 0.85, rotate: 270 }}
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.15))',
                    border: '2px solid rgba(99, 102, 241, 0.4)',
                    borderRadius: '50%',
                    width: '52px',
                    height: '52px',
                    color: '#6366f1',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '26px',
                      height: '26px',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        width: '20px',
                        height: '2px',
                        background: 'currentColor',
                        top: '12px',
                        left: '3px',
                        borderRadius: '1px',
                        transform: 'rotate(45deg)',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        width: '20px',
                        height: '2px',
                        background: 'currentColor',
                        top: '12px',
                        left: '3px',
                        borderRadius: '1px',
                        transform: 'rotate(-45deg)',
                      }}
                    />
                  </div>
                </motion.button>
              </motion.div>
            )}

            {/* Settings Content */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: isMobile ? 'center' : 'flex-start',
                alignItems: 'center',
                padding: isMobile ? '40px 24px' : '0',
                minHeight: isMobile ? '60vh' : 'auto',
              }}
            >
              <div
                style={{
                  width: '100%',
                  maxWidth: isMobile ? '400px' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                }}
              >
                {settingsData.map((setting, index) => (
                  <motion.div
                    key={setting.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
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
