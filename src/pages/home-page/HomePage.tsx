import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import { useCursorTrail } from '../../contexts/CursorTrailContext';
import './homePage.css';

export const HomePage = () => {
  const { setTrailType } = useCursorTrail();
  const { scrollY } = useScroll();
  const heroRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Set cursor trail type for home page
  useEffect(() => {
    setTrailType('hero');
    return () => setTrailType('default');
  }, [setTrailType]);

  // Enhanced Parallax effects with multiple layers
  const y1 = useTransform(scrollY, [0, 1000], [0, -100]); // Slow background layer
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]); // Medium layer
  const y3 = useTransform(scrollY, [0, 1000], [0, -400]); // Fast foreground layer
  const y4 = useTransform(scrollY, [0, 1000], [0, 50]); // Reverse parallax
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.2]);
  const rotate = useTransform(scrollY, [0, 1000], [0, 360]);
  const blurEffect = useTransform(scrollY, [0, 500], [0, 10]);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        setMousePosition({
          x: (touch.clientX - window.innerWidth / 2) / 50,
          y: (touch.clientY - window.innerHeight / 2) / 50,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring' as const,
        damping: 20,
        stiffness: 100,
      },
    },
  };

  return (
    <div className="home-page game-mode">
      {/* CRT Screen Effect */}
      <div className="crt-overlay" />
      <div className="scanlines" />
      {/* Parallax Background Layers */}
      <motion.div
        className="parallax-layer parallax-layer-1"
        style={{
          y: y1,
        }}
      />

      <motion.div
        className="parallax-layer parallax-layer-2"
        style={{
          y: y2,
        }}
      >
        {/* Floating geometric shapes */}
        <motion.div
          className="floating-shape-1"
          style={{
            rotate: rotate,
          }}
        />
        <motion.div
          className="floating-shape-2"
          style={{
            scale: scale,
          }}
        />
      </motion.div>

      <motion.div
        className="parallax-layer parallax-layer-3"
        style={{
          y: y3,
        }}
      >
        {/* Fast moving elements */}
        <motion.div
          className="fast-element-1"
          style={{
            filter: blurEffect,
          }}
        />
        <motion.div
          className="fast-element-2"
          style={{
            y: y4, // Reverse parallax
          }}
        />
      </motion.div>

      {/* Game Title Screen */}
      <section className="hero game-title-screen" ref={heroRef}>
        <div className="container">
          <motion.div
            className="hero-content"
            style={{
              opacity,
              y: y1,
            }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              style={{
                x: mousePosition.x,
                y: mousePosition.y,
              }}
            >
              <motion.div
                className="game-logo"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1, type: 'spring' }}
              >
                <motion.h1
                  className="hero-title pixel-font"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <motion.span
                    className="game-title-glow"
                    animate={{
                      textShadow: [
                        '0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 15px #ff00ff',
                        '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff',
                        '0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 15px #ff00ff',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Tihomir Portolio
                  </motion.span>
                </motion.h1>
                <motion.p
                  className="game-subtitle pixel-font"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  Front End Developer
                </motion.p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated Background */}
        <motion.div
          className="hero-bg game-bg"
          style={{ y: y1 }}
          animate={{
            background: [
              'radial-gradient(circle at 30% 70%, rgba(255, 0, 255, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 70% 30%, rgba(0, 255, 255, 0.4) 0%, transparent 60%)',
              'radial-gradient(circle at 30% 70%, rgba(255, 0, 255, 0.3) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </section>
    </div>
  );
};
