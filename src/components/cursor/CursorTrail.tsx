import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  timestamp: number;
  opacity: number;
  scale: number;
  color: string;
  shape: 'circle' | 'square' | 'star' | 'triangle';
}

interface ClickEffect {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

interface CursorTrailProps {
  trailType?: 'default' | 'hero' | 'projects' | 'about' | 'contact';
  maxParticles?: number;
  particleLifetime?: number;
}

export const CursorTrail = ({
  trailType = 'default',
  maxParticles = 15,
  particleLifetime = 800,
}: CursorTrailProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [clickEffects, setClickEffects] = useState<ClickEffect[]>([]);
  const particleIdRef = useRef(0);
  const lastParticleTimeRef = useRef(0);
  const clickEffectIdRef = useRef(0);

  // Different trail configurations for different sections
  const trailConfigs = {
    default: {
      colors: [
        'rgba(99, 102, 241, 0.8)',
        'rgba(139, 92, 246, 0.6)',
        'rgba(59, 130, 246, 0.4)',
      ],
      shapes: ['circle' as const],
      spawnRate: 50, // milliseconds between particles
      baseSize: 8,
    },
    hero: {
      colors: [
        'rgba(99, 102, 241, 0.9)',
        'rgba(139, 92, 246, 0.7)',
        'rgba(168, 85, 247, 0.5)',
      ],
      shapes: ['circle' as const, 'star' as const],
      spawnRate: 30,
      baseSize: 12,
    },
    projects: {
      colors: [
        'rgba(34, 197, 94, 0.8)',
        'rgba(59, 130, 246, 0.6)',
        'rgba(99, 102, 241, 0.4)',
      ],
      shapes: ['square' as const, 'circle' as const],
      spawnRate: 40,
      baseSize: 10,
    },
    about: {
      colors: [
        'rgba(249, 115, 22, 0.8)',
        'rgba(245, 158, 11, 0.6)',
        'rgba(251, 191, 36, 0.4)',
      ],
      shapes: ['triangle' as const, 'circle' as const],
      spawnRate: 45,
      baseSize: 9,
    },
    contact: {
      colors: [
        'rgba(236, 72, 153, 0.8)',
        'rgba(219, 39, 119, 0.6)',
        'rgba(190, 24, 93, 0.4)',
      ],
      shapes: ['star' as const, 'circle' as const],
      spawnRate: 35,
      baseSize: 11,
    },
  };

  const config = trailConfigs[trailType];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setMousePosition(newPosition);

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isClickable =
        target.matches(
          'a, button, [role="button"], .btn, .project-card, .service-card, .nav-link, .navigation-link, .desktop-menu-btn, .settings-btn, .sidebar, .navigation-container'
        ) ||
        target.closest(
          '.navigation-link, .desktop-menu-btn, .settings-btn, .sidebar, .navigation-container'
        ) !== null;
      setIsPointer(isClickable);

      // Create new particle
      const now = Date.now();
      if (now - lastParticleTimeRef.current > config.spawnRate) {
        const newParticle: Particle = {
          id: particleIdRef.current++,
          x: newPosition.x,
          y: newPosition.y,
          timestamp: now,
          opacity: 1,
          scale: 1,
          color:
            config.colors[Math.floor(Math.random() * config.colors.length)],
          shape:
            config.shapes[Math.floor(Math.random() * config.shapes.length)],
        };

        setParticles((prev) => [...prev.slice(-maxParticles + 1), newParticle]);
        lastParticleTimeRef.current = now;
      }
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: -100, y: -100 });
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleClick = (e: MouseEvent) => {
      const clickPosition = { x: e.clientX, y: e.clientY };

      // Create simple click effect
      const newClickEffect: ClickEffect = {
        id: clickEffectIdRef.current++,
        x: clickPosition.x,
        y: clickPosition.y,
        timestamp: Date.now(),
      };

      setClickEffects((prev) => [...prev, newClickEffect]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('click', handleClick);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('click', handleClick);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [config, maxParticles]);

  // Clean up old particles
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setParticles((prev) =>
        prev.filter((particle) => now - particle.timestamp < particleLifetime)
      );
    }, 50);

    return () => clearInterval(interval);
  }, [particleLifetime]);

  // Clean up old click effects
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setClickEffects(
        (prev) => prev.filter((effect) => now - effect.timestamp < 400) // Simplified click effects last 400ms
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Render different shapes
  const renderShape = (particle: Particle, progress: number) => {
    const size = config.baseSize * particle.scale * (1 - progress * 0.5);
    const opacity = particle.opacity * (1 - progress);

    const baseStyle = {
      position: 'absolute' as const,
      left: particle.x - size / 2,
      top: particle.y - size / 2,
      width: size,
      height: size,
      opacity,
      pointerEvents: 'none' as const,
    };

    switch (particle.shape) {
      case 'circle':
        return (
          <div
            style={{
              ...baseStyle,
              background: particle.color,
              borderRadius: '50%',
              filter: 'blur(0.5px)',
            }}
          />
        );
      case 'square':
        return (
          <div
            style={{
              ...baseStyle,
              background: particle.color,
              borderRadius: '2px',
              transform: `rotate(${progress * 180}deg)`,
            }}
          />
        );
      case 'star':
        return (
          <div
            style={{
              ...baseStyle,
              background: particle.color,
              clipPath:
                'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
              transform: `rotate(${progress * 360}deg)`,
            }}
          />
        );
      case 'triangle':
        return (
          <div
            style={{
              ...baseStyle,
              background: particle.color,
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              transform: `rotate(${progress * 120}deg)`,
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="cursor-trail-container">
      {/* Main cursor */}
      <motion.div
        className="main-cursor"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isClicking ? 0.8 : isPointer ? 1.5 : 1,
        }}
        transition={{
          type: 'tween',
          duration: isClicking ? 0.1 : 0.1,
          ease: 'easeOut',
        }}
        style={{
          position: 'fixed',
          width: 12,
          height: 12,
          background: isClicking
            ? config.colors[0].replace('0.8', '1')
            : isPointer
            ? 'rgba(255, 255, 255, 0.9)'
            : config.colors[0],
          borderRadius: '50%',
          zIndex: 2147483648,
          pointerEvents: 'none',
          border: isPointer ? '2px solid rgba(99, 102, 241, 0.8)' : 'none',
          boxShadow: isClicking
            ? `0 0 30px ${config.colors[0]}, 0 0 60px ${config.colors[0]}`
            : isPointer
            ? '0 0 20px rgba(99, 102, 241, 0.6)'
            : '0 0 10px rgba(99, 102, 241, 0.3)',
        }}
      />

      {/* Particle trail */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 2147483649,
          pointerEvents: 'none',
        }}
      >
        <AnimatePresence>
          {particles.map((particle) => {
            const now = Date.now();
            const age = now - particle.timestamp;
            const progress = age / particleLifetime;

            return (
              <motion.div
                key={particle.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.2 }}
              >
                {renderShape(particle, progress)}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Simple click ripple effects */}
        <AnimatePresence>
          {clickEffects.map((effect) => {
            return (
              <motion.div
                key={effect.id}
                initial={{ opacity: 0.8, scale: 0 }}
                animate={{ opacity: 0, scale: 2 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  left: effect.x - 15,
                  top: effect.y - 15,
                  width: 30,
                  height: 30,
                  border: `2px solid ${config.colors[0]}`,
                  borderRadius: '50%',
                  pointerEvents: 'none',
                }}
              />
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
