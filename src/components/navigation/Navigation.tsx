import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useSoundContext } from '../../contexts/SoundContext';
import { RandomizingText } from '../RandomizingText';
import './Navigation.css';

interface NavigationProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  /** Layout type for navigation - 'flexbox' for flexible layout, 'grid' for structured grid layout */
  layoutType?: 'flexbox' | 'grid';
}

export const Navigation = ({
  isSidebarOpen,
  setIsSidebarOpen,
  layoutType = 'flexbox', // Default to flexbox
}: NavigationProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { playHoverSound, playCloseSound } = useSoundContext();

  // Handle click outside sidebar to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isSidebarOpen && sidebarRef.current) {
        const target = event.target as Node;
        const isInsideSidebar = sidebarRef.current.contains(target);
        const isMenuButton = (event.target as HTMLElement)?.closest(
          '.navigation-menu-btn'
        );

        // Check if click is outside the sidebar and not on the menu button
        if (!isInsideSidebar && !isMenuButton) {
          setIsSidebarOpen(false);
          playCloseSound();
        }
      }
    };

    // Add event listener when sidebar is open
    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen, setIsSidebarOpen, playCloseSound]);

  // Advanced animation variants for sophisticated entrance/exit
  const sidebarVariants = {
    closed: {
      x: '100%',
      opacity: 0,
      scale: 0.95,
      transition: {
        type: 'spring' as const,
        stiffness: 400,
        damping: 40,
        duration: 0.6,
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
    open: {
      x: '0%',
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
        duration: 0.8,
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const overlayVariants = {
    closed: {
      opacity: 0,
      backdropFilter: 'blur(0px)',
      transition: {
        duration: 0.4,
        ease: 'easeInOut' as const,
      },
    },
    open: {
      opacity: 1,
      backdropFilter: 'blur(8px)',
      transition: {
        duration: 0.6,
        ease: 'easeInOut' as const,
      },
    },
  };

  const headerVariants = {
    closed: {
      opacity: 0,
      y: -30,
      scale: 0.8,
      transition: { duration: 0.3 },
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 0.3,
        duration: 0.5,
        type: 'spring' as const,
        stiffness: 200,
      },
    },
  };

  const menuItemVariants = {
    closed: {
      opacity: 0,
      x: 50,
      scale: 0.8,
      rotateY: 15,
      transition: { duration: 0.3 },
    },
    open: {
      opacity: 1,
      x: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        delay: 0.4,
        duration: 0.6,
        type: 'spring' as const,
        stiffness: 200,
        damping: 20,
      },
    },
  };

  const linkHoverVariants = {
    hover: {
      scale: 1.05,
      x: 10,
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      borderLeft: '4px solid #6366f1',
      transition: {
        type: 'spring' as const,
        stiffness: 400,
        damping: 15,
      },
    },
    tap: {
      scale: 0.95,
      x: 5,
      transition: {
        duration: 0.1,
      },
    },
  };

  const handleLinkClick = () => {
    setIsSidebarOpen(false);
    playCloseSound();
  };

  return (
    <AnimatePresence mode="wait">
      {isSidebarOpen && (
        <>
          {/* Enhanced Navigation Sidebar Overlay with Blur */}
          <motion.div
            className="navigation-overlay"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={handleLinkClick}
          />

          {/* Enhanced Navigation sidebar */}
          <motion.div
            ref={sidebarRef}
            className="sidebar navigation-container"
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Enhanced Navigation Items */}
            <nav
              className={
                layoutType === 'grid' ? 'navigation-grid' : 'navigation-menu'
              }
            >
              {['HOME', 'ABOUT', 'PROJECTS', 'CONTACT'].map((item, index) => (
                <motion.div
                  key={item}
                  variants={menuItemVariants}
                  custom={index}
                  whileHover="hover"
                  whileTap="tap"
                  className="navigation-item"
                >
                  <motion.div
                    variants={linkHoverVariants}
                    className="navigation-item"
                  >
                    <Link
                      to={
                        item === 'HOME'
                          ? '/'
                          : `/${item.toLowerCase().replace(' ', '-')}`
                      }
                      className="navigation-link"
                      onClick={handleLinkClick}
                      onMouseEnter={() => {
                        setHoveredItem(item);
                        playHoverSound();
                      }}
                      onMouseLeave={() => setHoveredItem(null)}
                      style={{
                        background:
                          hoveredItem === item
                            ? 'rgba(99, 102, 241, 0.1)'
                            : 'transparent',
                        border:
                          hoveredItem === item
                            ? '1px solid rgba(99, 102, 241, 0.3)'
                            : '1px solid transparent',
                      }}
                    >
                      <motion.span
                        className="navigation-link-content"
                        whileHover={{
                          color: '#6366f1',
                          scale: 1.05,
                        }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <RandomizingText
                          text={item}
                          isHovered={hoveredItem === item}
                        />
                      </motion.span>

                      <motion.div
                        className="nav-link-underline"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  </motion.div>
                </motion.div>
              ))}
            </nav>

            {/* Enhanced Sidebar Footer */}
            <motion.div variants={headerVariants} className="navigation-footer">
              <p>TT DEV Portfolio</p>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
