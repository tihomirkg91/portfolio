import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { RandomizingText } from './RandomizingText';

interface MobileNavProps {
  isOpen: boolean;
  playHoverSound: () => void;
  onLinkClick: () => void;
  playOpenSound: () => void;
  playCloseSound: () => void;
  triggerVibration: () => void;
  onToggle: () => void;
}

export const MobileNav = ({
  isOpen,
  playHoverSound,
  onLinkClick,
  playOpenSound,
  playCloseSound,
  triggerVibration,
  onToggle,
}: MobileNavProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: 100,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const menuItemVariants = {
    closed: { opacity: 0, x: 50 },
    open: { opacity: 1, x: 0 },
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
          willBeOpen ? playOpenSound() : playCloseSound();
          triggerVibration();
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'fixed',
          top: '24px',
          right: '80px',
          zIndex: 10001,
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

      {/* Mobile Navigation Menu - Right side sliding menu */}
      {isOpen && (
        <motion.nav
          className="navigation nav-open"
          variants={mobileMenuVariants}
          initial="closed"
          animate="open"
          exit="closed"
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            width: '280px',
            background: 'rgba(0, 0, 0, 0.98)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            padding: '6rem 2rem 2rem 2rem',
            gap: '1.5rem',
            borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
            zIndex: 9998,
            justifyContent: 'flex-start',
          }}
        >
          {/* Mobile Navigation Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              borderBottom: '2px solid rgba(99, 102, 241, 0.3)',
              paddingBottom: '1rem',
              marginBottom: '1rem',
            }}
          >
            <motion.h2
              style={{
                color: '#6366f1',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                textAlign: 'left',
                margin: 0,
              }}
            >
              Navigation
            </motion.h2>
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
                }}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                  color: '#fff',
                  textDecoration: 'none',
                  display: 'block',
                  fontSize: '1.4rem',
                  fontWeight: 'bold',
                  padding: '1.2rem 0',
                  position: 'relative',
                  textAlign: 'left',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <motion.span
                  whileHover={{
                    color: '#6366f1',
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  style={{
                    display: 'block',
                    color: 'inherit',
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
        </motion.nav>
      )}

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="nav-overlay"
          onClick={handleLinkClick}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 997,
            backdropFilter: 'blur(5px)',
          }}
        />
      )}
    </>
  );
};
