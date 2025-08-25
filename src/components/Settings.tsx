import { motion, AnimatePresence } from 'framer-motion';
import { Settings as SettingsIcon } from 'lucide-react';
import { useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { useSoundVibrationContext } from '../contexts/SoundVibrationContext';

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

  return (
    <>
      {/* Enhanced Settings button */}
      <motion.button
        className="settings-btn"
        onClick={() => {
          const willBeOpen = !showSettings;
          setShowSettings(willBeOpen);
          // Play open/close sound for settings
          willBeOpen ? playOpenSound() : playCloseSound();
        }}
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
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 25,
        }}
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

      {/* Enhanced Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <>
            {/* Mobile Settings Modal */}
            {isMobile ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1],
                }}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background:
                    'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(15, 15, 35, 0.95) 100%)',
                  backdropFilter: 'blur(20px)',
                  zIndex: 8888887,
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  height: '100vh',
                }}
                onClick={() => setShowSettings(false)}
              >
                {/* Top Bar with Close Button */}
                <motion.div
                  initial={{ y: -100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -100, opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '20px 24px',
                    borderBottom: '1px solid rgba(99, 102, 241, 0.2)',
                    background: 'rgba(0, 0, 0, 0.3)',
                  }}
                >
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{
                      flex: 1,
                    }}
                  />

                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowSettings(false);
                      playCloseSound();
                    }}
                    onMouseEnter={playHoverSound}
                    whileHover={{
                      scale: 1.15,
                      rotate: 180,
                      backgroundColor: 'rgba(245, 158, 11, 0.2)',
                      borderColor: 'rgba(245, 158, 11, 0.5)',
                      boxShadow: '0 12px 40px rgba(245, 158, 11, 0.4)',
                    }}
                    whileTap={{
                      scale: 0.85,
                      rotate: 270,
                    }}
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
                      backdropFilter: 'blur(15px)',
                      boxShadow:
                        '0 8px 32px rgba(99, 102, 241, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <motion.div
                      whileHover={{
                        rotate: 90,
                        scale: 1.1,
                      }}
                      transition={{ duration: 0.2 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1,
                      }}
                    >
                      <motion.div
                        style={{
                          width: '26px',
                          height: '26px',
                          position: 'relative',
                        }}
                      >
                        <motion.div
                          style={{
                            position: 'absolute',
                            width: '20px',
                            height: '2px',
                            background: 'currentColor',
                            top: '12px',
                            left: '3px',
                            borderRadius: '1px',
                          }}
                          animate={{ rotate: 45 }}
                        />
                        <motion.div
                          style={{
                            position: 'absolute',
                            width: '20px',
                            height: '2px',
                            background: 'currentColor',
                            top: '12px',
                            left: '3px',
                            borderRadius: '1px',
                          }}
                          animate={{ rotate: -45 }}
                        />
                      </motion.div>
                    </motion.div>
                  </motion.button>
                </motion.div>

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
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '40px 24px',
                    position: 'relative',
                    minHeight: '60vh',
                  }}
                >
                  <motion.div
                    style={{
                      width: '100%',
                      maxWidth: '400px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '24px',
                    }}
                  >
                    {/* Mobile Settings Items */}

                    {/* Cursor Trail Setting */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '20px',
                        padding: '24px',
                        border: '2px solid rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '12px',
                        }}
                      >
                        <span
                          style={{
                            color: '#ffffff',
                            fontSize: '18px',
                            fontWeight: 'bold',
                          }}
                        >
                          ✨ Cursor Trail Effects
                        </span>
                        <motion.div
                          style={{
                            background: cursorTrailEnabled
                              ? '#6366f1'
                              : '#374151',
                            borderRadius: '24px',
                            width: '52px',
                            height: '28px',
                            position: 'relative',
                            cursor: 'not-allowed',
                            opacity: 0.5,
                          }}
                        >
                          <motion.div
                            animate={{
                              x: cursorTrailEnabled ? 22 : 2,
                            }}
                            style={{
                              width: '20px',
                              height: '20px',
                              borderRadius: '50%',
                              background: '#fff',
                              position: 'absolute',
                              top: '2px',
                            }}
                          />
                        </motion.div>
                      </div>
                      <p
                        style={{
                          color: '#ff9800',
                          fontSize: '14px',
                          margin: 0,
                          fontStyle: 'italic',
                        }}
                      >
                        📱 Disabled on mobile devices for better performance
                      </p>
                    </motion.div>

                    {/* Sound Effects Setting */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '20px',
                        padding: '24px',
                        border: '2px solid rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <span
                          style={{
                            color: '#ffffff',
                            fontSize: '18px',
                            fontWeight: 'bold',
                          }}
                        >
                          🔊 Sound Effects
                        </span>
                        <motion.button
                          onClick={() =>
                            setSoundEffectsEnabled(!soundEffectsEnabled)
                          }
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          style={{
                            background: soundEffectsEnabled
                              ? '#6366f1'
                              : '#374151',
                            borderRadius: '24px',
                            width: '52px',
                            height: '28px',
                            position: 'relative',
                            border: 'none',
                            cursor: 'pointer',
                          }}
                        >
                          <motion.div
                            animate={{
                              x: soundEffectsEnabled ? 22 : 2,
                            }}
                            transition={{
                              type: 'spring',
                              stiffness: 500,
                              damping: 30,
                            }}
                            style={{
                              width: '20px',
                              height: '20px',
                              borderRadius: '50%',
                              background: '#fff',
                              position: 'absolute',
                              top: '2px',
                            }}
                          />
                        </motion.button>
                      </div>
                    </motion.div>

                    {/* Floating Orbs Setting */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '20px',
                        padding: '24px',
                        border: '2px solid rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <span
                          style={{
                            color: '#ffffff',
                            fontSize: '18px',
                            fontWeight: 'bold',
                          }}
                        >
                          🌟 Floating Orbs
                        </span>
                        <motion.button
                          onClick={() => setOrbsEnabled(!orbsEnabled)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          style={{
                            background: orbsEnabled ? '#6366f1' : '#374151',
                            borderRadius: '24px',
                            width: '52px',
                            height: '28px',
                            position: 'relative',
                            border: 'none',
                            cursor: 'pointer',
                          }}
                        >
                          <motion.div
                            animate={{
                              x: orbsEnabled ? 22 : 2,
                            }}
                            transition={{
                              type: 'spring',
                              stiffness: 500,
                              damping: 30,
                            }}
                            style={{
                              width: '20px',
                              height: '20px',
                              borderRadius: '50%',
                              background: '#fff',
                              position: 'absolute',
                              top: '2px',
                            }}
                          />
                        </motion.button>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ) : (
              /* Desktop Settings Panel */
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.3,
                  rotateY: -15,
                  y: -30,
                  x: 20,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotateY: 0,
                  y: 0,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.3,
                  rotateY: 15,
                  y: -30,
                  x: 20,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 25,
                  mass: 0.8,
                }}
                style={{
                  position: 'fixed',
                  top: '80px',
                  right: '20px',
                  left: 'auto',
                  zIndex: 9999,
                  background:
                    'linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(20, 20, 40, 0.95))',
                  border: '1px solid #6366f1',
                  borderRadius: '16px',
                  padding: '24px',
                  minWidth: '300px',
                  maxWidth: '300px',
                  backdropFilter: 'blur(20px)',
                  boxShadow:
                    '0 20px 40px rgba(99, 102, 241, 0.3), 0 0 0 1px rgba(99, 102, 241, 0.1)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <motion.h3
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  style={{
                    color: '#6366f1',
                    marginBottom: '24px',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {/* Empty space for cleaner look */}
                </motion.h3>

                {/* Enhanced Cursor Trail Toggle */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '20px',
                    padding: '12px 16px',
                    background: 'rgba(99, 102, 241, 0.05)',
                    borderRadius: '12px',
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      style={{
                        color: '#fff',
                        fontSize: '15px',
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      ✨ Cursor Trail Effects
                    </span>
                    <motion.button
                      onClick={() =>
                        setCursorTrailEnabled(!isUserCursorTrailEnabled)
                      }
                      onMouseEnter={() => playHoverSound()}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      animate={{
                        background: cursorTrailEnabled
                          ? 'linear-gradient(45deg, #6366f1, #8b5cf6)'
                          : 'rgba(55, 65, 81, 0.8)',
                        borderColor: cursorTrailEnabled ? '#6366f1' : '#374151',
                      }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      style={{
                        border: '2px solid',
                        borderRadius: '24px',
                        width: '52px',
                        height: '28px',
                        position: 'relative',
                        cursor: 'none',
                        overflow: 'hidden',
                      }}
                    >
                      <motion.div
                        animate={{
                          x: cursorTrailEnabled ? 22 : 2,
                          background: cursorTrailEnabled ? '#fff' : '#9ca3af',
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 500,
                          damping: 30,
                        }}
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          position: 'absolute',
                          top: '2px',
                          boxShadow: cursorTrailEnabled
                            ? '0 2px 8px rgba(0, 0, 0, 0.3)'
                            : '0 1px 3px rgba(0, 0, 0, 0.2)',
                        }}
                      />
                    </motion.button>
                  </div>
                </motion.div>

                {/* Sound Effects Toggle */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                    padding: '12px 16px',
                    background: 'rgba(99, 102, 241, 0.05)',
                    borderRadius: '12px',
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                  }}
                >
                  <span
                    style={{
                      color: '#fff',
                      fontSize: '15px',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    🔊 Sound Effects
                  </span>
                  <motion.button
                    onClick={() => setSoundEffectsEnabled(!soundEffectsEnabled)}
                    onMouseEnter={() => playHoverSound()}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    animate={{
                      background: soundEffectsEnabled
                        ? 'linear-gradient(45deg, #6366f1, #8b5cf6)'
                        : 'rgba(55, 65, 81, 0.8)',
                      borderColor: soundEffectsEnabled ? '#6366f1' : '#374151',
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{
                      border: '2px solid',
                      borderRadius: '24px',
                      width: '52px',
                      height: '28px',
                      position: 'relative',
                      cursor: 'none',
                      overflow: 'hidden',
                    }}
                  >
                    <motion.div
                      animate={{
                        x: soundEffectsEnabled ? 22 : 2,
                        background: soundEffectsEnabled ? '#fff' : '#9ca3af',
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                      }}
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        position: 'absolute',
                        top: '2px',
                        boxShadow: soundEffectsEnabled
                          ? '0 2px 8px rgba(0, 0, 0, 0.3)'
                          : '0 1px 3px rgba(0, 0, 0, 0.2)',
                      }}
                    />
                  </motion.button>
                </motion.div>

                {/* Floating Orbs Toggle */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 16px',
                    background: 'rgba(99, 102, 241, 0.05)',
                    borderRadius: '12px',
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                  }}
                >
                  <span
                    style={{
                      color: '#fff',
                      fontSize: '15px',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    🌟 Floating Orbs
                  </span>
                  <motion.button
                    onClick={() => setOrbsEnabled(!orbsEnabled)}
                    onMouseEnter={() => playHoverSound()}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    animate={{
                      background: orbsEnabled
                        ? 'linear-gradient(45deg, #6366f1, #8b5cf6)'
                        : 'rgba(55, 65, 81, 0.8)',
                      borderColor: orbsEnabled ? '#6366f1' : '#374151',
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{
                      border: '2px solid',
                      borderRadius: '24px',
                      width: '52px',
                      height: '28px',
                      position: 'relative',
                      cursor: 'none',
                      overflow: 'hidden',
                    }}
                  >
                    <motion.div
                      animate={{
                        x: orbsEnabled ? 22 : 2,
                        background: orbsEnabled ? '#fff' : '#9ca3af',
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                      }}
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        position: 'absolute',
                        top: '2px',
                        boxShadow: orbsEnabled
                          ? '0 2px 8px rgba(0, 0, 0, 0.3)'
                          : '0 1px 3px rgba(0, 0, 0, 0.2)',
                      }}
                    />
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </>
  );
};
