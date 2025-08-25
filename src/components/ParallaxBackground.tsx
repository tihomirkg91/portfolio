import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ParallaxBackgroundProps {
  intensity?: 'light' | 'medium' | 'strong';
  showShapes?: boolean;
  children?: React.ReactNode;
}

export const ParallaxBackground = ({
  intensity = 'medium',
  showShapes = true,
  children,
}: ParallaxBackgroundProps) => {
  const { scrollY } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Different intensity levels for parallax movement
  const intensityMultiplier = {
    light: 0.5,
    medium: 1,
    strong: 1.5,
  };

  const multiplier = intensityMultiplier[intensity];

  // Parallax transforms based on intensity
  const y1 = useTransform(scrollY, [0, 1000], [0, -100 * multiplier]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -200 * multiplier]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -400 * multiplier]);
  const y4 = useTransform(scrollY, [0, 1000], [0, 50 * multiplier]);
  const rotate = useTransform(scrollY, [0, 1000], [0, 360 * multiplier]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.2]);
  const opacity = useTransform(scrollY, [0, 300], [0.6, 0.1]);

  // Mouse tracking for subtle interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 100,
        y: (e.clientY - window.innerHeight / 2) / 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="parallax-container">
      {/* Background gradient layer */}
      <motion.div
        className="parallax-bg-layer"
        style={{
          y: y1,
          opacity,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '120vh',
          zIndex: -10,
          background: `
            radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.05) 0%, transparent 60%)
          `,
        }}
      />

      {/* Floating shapes layer */}
      {showShapes && (
        <>
          <motion.div
            className="parallax-shapes-layer"
            style={{
              y: y2,
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '120vh',
              zIndex: -9,
              pointerEvents: 'none',
            }}
          >
            {/* Animated geometric shapes */}
            <motion.div
              style={{
                position: 'absolute',
                top: '15%',
                left: '10%',
                width: '80px',
                height: '80px',
                background:
                  'linear-gradient(45deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))',
                borderRadius: '20px',
                rotate: rotate,
                x: mousePosition.x,
                y: mousePosition.y,
              }}
            />

            <motion.div
              style={{
                position: 'absolute',
                top: '60%',
                right: '15%',
                width: '60px',
                height: '60px',
                background:
                  'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(99, 102, 241, 0.1))',
                borderRadius: '50%',
                scale: scale,
                x: -mousePosition.x * 0.5,
                y: -mousePosition.y * 0.5,
              }}
            />

            <motion.div
              style={{
                position: 'absolute',
                top: '40%',
                left: '70%',
                width: '100px',
                height: '100px',
                background: 'rgba(59, 130, 246, 0.08)',
                borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                rotate: -rotate,
                x: mousePosition.x * 0.3,
                y: mousePosition.y * 0.3,
              }}
            />
          </motion.div>

          {/* Fast moving elements layer */}
          <motion.div
            className="parallax-fast-layer"
            style={{
              y: y3,
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '120vh',
              zIndex: -8,
              pointerEvents: 'none',
            }}
          >
            <motion.div
              style={{
                position: 'absolute',
                top: '25%',
                right: '25%',
                width: '40px',
                height: '40px',
                background: 'rgba(99, 102, 241, 0.2)',
                borderRadius: '50%',
                x: mousePosition.x * 2,
                y: mousePosition.y * 2,
              }}
            />

            <motion.div
              style={{
                position: 'absolute',
                bottom: '30%',
                left: '25%',
                width: '30px',
                height: '30px',
                background: 'rgba(139, 92, 246, 0.2)',
                borderRadius: '50%',
                y: y4, // Reverse parallax
                x: -mousePosition.x,
              }}
            />
          </motion.div>
        </>
      )}

      {/* Content */}
      {children}
    </div>
  );
};
