import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useSoundContext } from '../../../contexts/SoundContext';
import { usePreventScroll } from '../../../hooks/usePreventScroll';
import { RandomizingText } from '../../RandomizingText';
import { useCurrentActivePage } from '../../../hooks/useCurrentActivePage';
import './MobileNav.css';

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
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const { playHoverSound, playOpenSound, playCloseSound } = useSoundContext();
  const { isActive } = useCurrentActivePage();

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

  // Prevent body scroll when navigation is open
  usePreventScroll(isOpen);

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        className="mobile-menu-btn"
        onClick={() => {
          const willBeOpen = !isOpen;

          onToggle();
          willBeOpen ? playOpenSound() : playCloseSound();
        }}
        onMouseEnter={() => {
          playHoverSound();
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <motion.div
          className="mobile-menu-icon"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.div>
      </motion.button>

      {/* Mobile Navigation Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-nav-overlay"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onLinkClick}
            transition={{
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            {/* Top Bar with Close Button */}
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
                  onLinkClick();
                  playCloseSound();
                }}
                onMouseEnter={playHoverSound}
                whileHover={{
                  scale: 1.15,
                  rotate: 180,
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

            {/* Navigation Content */}
            <motion.div
              className="mobile-nav-content"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {/* Decorative Background Elements */}
              <motion.div
                className="mobile-nav-decoration-1"
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                }}
              />

              <motion.div
                className="mobile-nav-decoration-2"
                animate={{
                  rotate: -360,
                  scale: [1, 0.9, 1],
                }}
                transition={{
                  rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                }}
              />

              {/* Navigation Items */}
              <motion.div
                className="mobile-nav-items"
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
                onAnimationStart={() => {
                  setIsAnimationComplete(false);
                }}
              >
                {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                  <motion.div
                    key={item}
                    className="mobile-nav-item"
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
                    onAnimationComplete={() => {
                      // Only trigger when the last item (Contact) finishes animating
                      if (item === 'Contact' && isOpen) {
                        setIsAnimationComplete(true);
                      }
                    }}
                  >
                    <Link
                      to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                      className={`mobile-nav-link ${
                        hoveredItem === item ? 'hovered' : ''
                      } ${isActive(item, 'mobile') ? 'active' : ''}`}
                      onClick={() => {
                        onLinkClick();
                      }}
                      onMouseEnter={() => {
                        setHoveredItem(item);
                        playHoverSound();
                      }}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      {/* Animated background on hover */}
                      <motion.div
                        className="mobile-nav-link-bg"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                          scale: hoveredItem === item ? 1 : 0,
                          opacity: hoveredItem === item ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      />

                      <motion.span className="mobile-nav-link-text">
                        <RandomizingText
                          text={item}
                          isHovered={
                            hoveredItem === item && isAnimationComplete
                          }
                        />
                      </motion.span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Bottom Gradient */}
            <motion.div
              className="mobile-nav-bottom-gradient"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
