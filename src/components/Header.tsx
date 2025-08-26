import { Link } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Settings } from './settings/Settings';
import { MobileNav } from './settings/mobile/MobileNav';
import { Navigation } from './navigation/Navigation';
import { RandomizingText } from './RandomizingText';
import { useSoundContext } from '../contexts/SoundContext';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  const { scrollY } = useScroll();
  const { playOpenSound, playCloseSound, isMobile } = useSoundContext();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <>
      <motion.header
        className={`header ${isScrolled ? 'scrolled' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          type: 'spring' as const,
          stiffness: 100,
          damping: 20,
        }}
        style={{
          backgroundColor: isScrolled
            ? 'rgba(0, 0, 0, 0.98)'
            : 'rgba(0, 0, 0, 0.95)',
        }}
      >
        <div className="header-container">
          <Link
            to="/"
            className="logo"
            style={{ zIndex: 99999999, position: 'relative' }}
          >
            <motion.h1
              whileHover={{
                scale: 1.05,
                textShadow: '0 0 20px rgba(99, 102, 241, 0.5)',
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400 }}
              animate={{
                backgroundPosition: isScrolled ? '100% 0%' : '0% 0%',
              }}
              style={{
                background:
                  'linear-gradient(90deg, #fff 0%, #6366f1 50%, #fff 100%)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                zIndex: 99999999,
                position: 'relative',
              }}
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
            >
              <RandomizingText
                text="TT DEV"
                isHovered={isLogoHovered}
                style={{ zIndex: 10002 }}
              />
            </motion.h1>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* Mobile Menu with all mobile functionality - Always visible for testing */}
            <MobileNav
              isOpen={isOpen}
              onToggle={() => setIsOpen(!isOpen)}
              onLinkClick={() => {
                setIsOpen(false);
                playCloseSound();
              }}
            />

            {/* Desktop Menu Button */}
            {!isMobile && (
              <motion.button
                className="desktop-menu-btn"
                onClick={() => {
                  const willBeOpen = !isSidebarOpen;
                  setIsSidebarOpen(willBeOpen);
                  // Play open/close sound for desktop navigation
                  willBeOpen ? playOpenSound() : playCloseSound();
                }}
                whileHover={{
                  scale: 1.1,
                  background:
                    'linear-gradient(45deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2))',
                  boxShadow: '0 8px 32px rgba(99, 102, 241, 0.4)',
                }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  rotate: isSidebarOpen ? 180 : 0,
                  background: isSidebarOpen
                    ? 'linear-gradient(45deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.3))'
                    : 'rgba(0, 0, 0, 0.8)',
                }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 25,
                }}
                style={{
                  zIndex: 10001,
                  border: '2px solid #6366f1',
                  borderRadius: '12px',
                  padding: '12px',
                  color: '#6366f1',
                  cursor: 'none',
                  backdropFilter: 'blur(10px)',
                  boxShadow: isSidebarOpen
                    ? '0 8px 32px rgba(99, 102, 241, 0.3)'
                    : '0 4px 16px rgba(99, 102, 241, 0.2)',
                }}
              >
                <motion.div
                  animate={{
                    rotate: isSidebarOpen ? 45 : 0,
                    filter: isSidebarOpen
                      ? 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.8))'
                      : 'none',
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.div>
              </motion.button>
            )}

            {/* Settings Component */}
            <Settings />
          </div>
        </div>
      </motion.header>

      {/* Desktop Navigation */}
      {!isMobile && (
        <Navigation
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      )}
    </>
  );
};
