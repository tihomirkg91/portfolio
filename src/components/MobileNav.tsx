import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useSoundVibrationContext } from '../contexts/SoundVibrationContext';
import { RandomizingText } from './RandomizingText';

interface MobileNavProps {
  isOpen: boolean;
  onLinkClick: () => void;
  onToggle: () => void;
}

export const MobileNav = ({
  isOpen,
  onLinkClick,
  onToggle,
}: MobileNavProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { playHoverSound, playOpenSound, playCloseSound, triggerVibration } =
    useSoundVibrationContext();

  const overlayVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
    },
    open: {
      opacity: 1,
      scale: 1,
    },
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        className="mobile-menu-btn"
        onClick={() => {
          const willBeOpen = !isOpen;
          onToggle();
          willBeOpen ? playOpenSound() : playCloseSound();
          triggerVibration();
        }}
        onMouseEnter={playHoverSound}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'rgba(0, 0, 0, 0.8)',
          border: '2px solid #6366f1',
          borderRadius: '12px',
          padding: '12px',
          color: '#6366f1',
          cursor: 'pointer',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 16px rgba(99, 102, 241, 0.2)',
          zIndex: 1000001,
        }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.div>
      </motion.button>

      {/* Mobile Navigation Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onLinkClick}
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
              zIndex: 8888888,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              height: '100vh',
            }}
          >
            {/* Top Bar with Close Button */}
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                padding: '20px 24px',
                borderBottom: '1px solid rgba(99, 102, 241, 0.2)',
                background: 'rgba(0, 0, 0, 0.3)',
              }}
            >
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  onLinkClick();
                  playCloseSound();
                  triggerVibration();
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
                {/* Animated background effect */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)',
                    borderRadius: '50%',
                  }}
                />

                {/* Enhanced X icon with animation */}
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
                  <X
                    size={26}
                    strokeWidth={2.5}
                    style={{
                      filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                    }}
                  />
                </motion.div>
              </motion.button>
            </motion.div>

            {/* Navigation Content */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.4, delay: 0.2 }}
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
              {/* Decorative Background Elements */}
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                }}
                style={{
                  position: 'absolute',
                  top: '10%',
                  right: '10%',
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
                  zIndex: -1,
                }}
              />

              <motion.div
                animate={{
                  rotate: -360,
                  scale: [1, 0.9, 1],
                }}
                transition={{
                  rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                }}
                style={{
                  position: 'absolute',
                  bottom: '15%',
                  left: '15%',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
                  zIndex: -1,
                }}
              />

              {/* Navigation Items */}
              <motion.div
                variants={{
                  open: {
                    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
                  },
                  closed: {
                    transition: {
                      staggerChildren: 0.05,
                      staggerDirection: -1,
                    },
                  },
                }}
                initial="closed"
                animate="open"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                  width: '100%',
                  maxWidth: '400px',
                  zIndex: 10,
                }}
              >
                {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay:
                        0.1 *
                        ['Home', 'About', 'Projects', 'Contact'].indexOf(item),
                    }}
                    whileHover={{
                      scale: 1.02,
                      y: -2,
                    }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      zIndex: 20,
                    }}
                  >
                    <Link
                      to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                      onClick={onLinkClick}
                      onMouseEnter={() => {
                        setHoveredItem(item);
                        playHoverSound();
                        triggerVibration();
                      }}
                      onMouseLeave={() => setHoveredItem(null)}
                      style={{
                        display: 'block',
                        color: '#ffffff',
                        textDecoration: 'none',
                        fontSize: '28px',
                        fontWeight: 'bold',
                        padding: '20px 32px',
                        textAlign: 'center',
                        borderRadius: '20px',
                        background:
                          hoveredItem === item
                            ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(139, 92, 246, 0.3) 100%)'
                            : 'rgba(255, 255, 255, 0.1)',
                        border:
                          hoveredItem === item
                            ? '2px solid rgba(99, 102, 241, 0.6)'
                            : '2px solid rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(10px)',
                        boxShadow:
                          hoveredItem === item
                            ? '0 20px 40px rgba(99, 102, 241, 0.4)'
                            : '0 8px 32px rgba(255, 255, 255, 0.1)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      {/* Animated background on hover */}
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                          scale: hoveredItem === item ? 1 : 0,
                          opacity: hoveredItem === item ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background:
                            'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                          borderRadius: '18px',
                          zIndex: -1,
                        }}
                      />

                      <motion.span
                        style={{
                          display: 'block',
                          color: '#ffffff',
                          fontWeight: 'bold',
                          fontSize: '28px',
                          textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                        }}
                      >
                        <RandomizingText
                          text={item}
                          isHovered={hoveredItem === item}
                        />
                      </motion.span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Bottom Gradient */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4 }}
              style={{
                height: '60px',
                background:
                  'linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 100%)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
