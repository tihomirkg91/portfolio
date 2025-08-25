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

  // Mobile-optimized animation variants for center positioning
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      scale: 0.8,
      y: -50,
      transition: {
        duration: 0.3,
        ease: 'easeInOut' as const,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut' as const,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const overlayVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const menuItemVariants = {
    closed: {
      opacity: 0,
      x: 30,
      transition: { duration: 0.2 },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut' as const,
      },
    },
  };

  const handleLinkClick = () => {
    onLinkClick();
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        className="mobile-menu-btn"
        onClick={() => {
          const willBeOpen = !isOpen;
          onToggle();
          // Mobile sounds and vibration
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

      {/* Mobile Navigation with AnimatePresence */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {/* Mobile Navigation Backdrop */}
            <motion.div
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={handleLinkClick}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.6)',
                zIndex: 9998,
                backdropFilter: 'blur(8px)',
              }}
            />

            {/* Mobile Navigation Menu - Centered with Flexbox Container */}
            <motion.div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                zIndex: 9999,
                pointerEvents: 'none', // Allow clicks to pass through to backdrop
              }}
            >
              <motion.nav
                className="navigation nav-open"
                variants={mobileMenuVariants}
                initial="closed"
                animate="open"
                exit="closed"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on menu
                style={{
                  background: 'rgba(0, 0, 0, 0.95)',
                  backdropFilter: 'blur(20px)',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '2rem',
                  gap: '0.5rem',
                  borderRadius: '16px',
                  border: '2px solid rgba(99, 102, 241, 0.3)',
                  width: '100%',
                  maxWidth: '320px',
                  maxHeight: '80vh',
                  overflowY: 'auto',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
                  pointerEvents: 'auto', // Re-enable pointer events for the menu
                }}
              >
                {/* Mobile Menu Header */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  style={{
                    textAlign: 'center',
                    marginBottom: '1rem',
                    borderBottom: '1px solid rgba(99, 102, 241, 0.3)',
                    paddingBottom: '1rem',
                  }}
                >
                  <h3
                    style={{
                      color: '#6366f1',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      margin: 0,
                    }}
                  >
                    Navigation
                  </h3>
                </motion.div>

                {/* Navigation Links */}
                {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                  <motion.div key={item} variants={menuItemVariants}>
                    <Link
                      to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                      onClick={handleLinkClick}
                      onMouseEnter={() => {
                        setHoveredItem(item);
                        playHoverSound();
                        triggerVibration();
                      }}
                      onMouseLeave={() => setHoveredItem(null)}
                      style={{
                        color: '#fff',
                        textDecoration: 'none',
                        display: 'block',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        padding: '1rem',
                        position: 'relative',
                        textAlign: 'center',
                        borderRadius: '8px',
                        background:
                          hoveredItem === item
                            ? 'rgba(99, 102, 241, 0.15)'
                            : 'transparent',
                        border:
                          hoveredItem === item
                            ? '1px solid rgba(99, 102, 241, 0.4)'
                            : '1px solid transparent',
                        transition: 'all 0.2s ease',
                        marginBottom: '0.5rem',
                      }}
                    >
                      <motion.span
                        whileHover={{
                          color: '#6366f1',
                          scale: 1.02,
                        }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '10px',
                          color: 'inherit',
                        }}
                      >
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{
                            scale: hoveredItem === item ? 1 : 0,
                            rotate: hoveredItem === item ? 360 : 0,
                          }}
                          transition={{ type: 'spring', stiffness: 400 }}
                          style={{
                            width: '6px',
                            height: '6px',
                            backgroundColor: '#6366f1',
                            borderRadius: '50%',
                            flexShrink: 0,
                          }}
                        />
                        <RandomizingText
                          text={item}
                          isHovered={hoveredItem === item}
                        />
                      </motion.span>
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
