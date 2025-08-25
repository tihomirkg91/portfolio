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
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      scale: 0.8,
      y: -50,
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 },
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
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(8px)',
              zIndex: 9998,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
          >
            <motion.nav
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={(e) => e.stopPropagation()}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
              style={{
                background: 'rgba(0, 0, 0, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                border: '2px solid rgba(99, 102, 241, 0.3)',
                padding: '2rem',
                width: '100%',
                maxWidth: '300px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
              }}
            >
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{
                  textAlign: 'center',
                  marginBottom: '2rem',
                  borderBottom: '1px solid rgba(99, 102, 241, 0.3)',
                  paddingBottom: '1rem',
                }}
              >
                <h3
                  style={{
                    color: '#6366f1',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    margin: 0,
                  }}
                >
                  Navigation
                </h3>
              </motion.div>

              {/* Navigation Items */}
              <motion.div
                variants={{
                  open: {
                    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
                  },
                  closed: {
                    transition: { staggerChildren: 0.05, staggerDirection: -1 },
                  },
                }}
                initial="closed"
                animate="open"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                  <motion.div key={item} variants={itemVariants}>
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
                        color: '#fff',
                        textDecoration: 'none',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        padding: '1rem',
                        textAlign: 'center',
                        borderRadius: '12px',
                        background:
                          hoveredItem === item
                            ? 'rgba(99, 102, 241, 0.15)'
                            : 'transparent',
                        border:
                          hoveredItem === item
                            ? '1px solid rgba(99, 102, 241, 0.4)'
                            : '1px solid transparent',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <motion.span
                        whileHover={{ color: '#6366f1', scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ display: 'block' }}
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
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
