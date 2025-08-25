import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useSoundContext } from '../contexts/SoundContext';
import { RandomizingText } from './RandomizingText';

interface DesktopNavProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export const DesktopNav = ({
  isSidebarOpen,
  setIsSidebarOpen,
}: DesktopNavProps) => {
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
          '.desktop-menu-btn'
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
          {/* Enhanced Desktop Sidebar Overlay with Blur */}
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              zIndex: 998,
              backdropFilter: 'blur(8px)',
            }}
            onClick={handleLinkClick}
          />

          {/* Enhanced Desktop sidebar */}
          <motion.div
            ref={sidebarRef}
            className="sidebar"
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '280px',
              height: '100vh',
              background:
                'linear-gradient(135deg, rgba(0, 0, 0, 0.98), rgba(20, 20, 40, 0.98))',
              zIndex: 999,
              padding: '100px 30px 30px',
              borderLeft: '2px solid rgba(99, 102, 241, 0.4)',
              backdropFilter: 'blur(20px)',
              boxShadow: '-10px 0 40px rgba(99, 102, 241, 0.2)',
            }}
          >
            {/* Enhanced Navigation Items */}
            {['HOME', 'ABOUT', 'PROJECTS', 'CONTACT'].map((item, index) => (
              <motion.div
                key={item}
                variants={menuItemVariants}
                custom={index}
                whileHover="hover"
                whileTap="tap"
                style={{ marginBottom: '25px' }}
              >
                <motion.div
                  variants={linkHoverVariants}
                  style={{
                    borderRadius: '12px',
                    overflow: 'hidden',
                  }}
                >
                  <Link
                    to={
                      item === 'HOME'
                        ? '/'
                        : `/${item.toLowerCase().replace(' ', '-')}`
                    }
                    onClick={handleLinkClick}
                    onMouseEnter={() => {
                      setHoveredItem(item);
                      playHoverSound();
                    }}
                    onMouseLeave={() => setHoveredItem(null)}
                    style={{
                      display: 'block',
                      color: '#fff',
                      textDecoration: 'none',
                      fontSize: '1.3rem',
                      fontWeight: 'bold',
                      padding: '15px 20px',
                      position: 'relative',
                      background:
                        hoveredItem === item
                          ? 'rgba(99, 102, 241, 0.1)'
                          : 'transparent',
                      border:
                        hoveredItem === item
                          ? '1px solid rgba(99, 102, 241, 0.3)'
                          : '1px solid transparent',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <motion.span
                      whileHover={{
                        color: '#6366f1',
                        scale: 1.05,
                      }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                      }}
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
                      style={{
                        position: 'absolute',
                        bottom: '8px',
                        left: '20px',
                        right: '20px',
                        height: '2px',
                        background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                        transformOrigin: 'left',
                        borderRadius: '1px',
                      }}
                    />
                  </Link>
                </motion.div>
              </motion.div>
            ))}

            {/* Enhanced Sidebar Footer */}
            <motion.div
              variants={headerVariants}
              style={{
                marginTop: 'auto',
                paddingTop: '30px',
                borderTop: '1px solid rgba(99, 102, 241, 0.3)',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: '12px',
                  margin: 0,
                }}
              >
                TT DEV Portfolio
              </p>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
