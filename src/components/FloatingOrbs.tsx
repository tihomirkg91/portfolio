import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface OrbState {
  id: number;
  velocity: { x: number; y: number };
  position: { x: number; y: number };
  isKicked: boolean;
  kickTime: number;
  restPosition: { x: number; y: number };
  wasNearCursor: boolean;
}

interface FloatingOrbsProps {
  orbCount: number;
  orbSize: number; // Size in pixels (width/height)
  baseKickForce: number;
  speedMultiplier: number;
  initialPositions?: Array<{ x: number; y: number }>;
}

export const FloatingOrbs = ({
  orbCount,
  orbSize,
  baseKickForce,
  speedMultiplier,
  initialPositions,
}: FloatingOrbsProps) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [previousCursorPosition, setPreviousCursorPosition] = useState({
    x: 0,
    y: 0,
  });

  // Initialize orb states
  const [orbStates, setOrbStates] = useState<OrbState[]>(() =>
    Array.from({ length: orbCount }, (_, i) => {
      const defaultPos = {
        x: 20 + i * 15, // percentage
        y: 30 + (i % 2) * 40, // percentage
      };
      const position = initialPositions?.[i] || defaultPos;

      return {
        id: i,
        velocity: { x: 0, y: 0 },
        position,
        isKicked: false,
        kickTime: 0,
        restPosition: position,
        wasNearCursor: false,
      };
    })
  );

  // Function to check for kicks immediately on cursor movement
  const checkForKicks = (currentCursorPos: { x: number; y: number }) => {
    // Calculate cursor velocity for more realistic physics
    const cursorSpeed = Math.sqrt(
      Math.pow(currentCursorPos.x - previousCursorPosition.x, 2) +
        Math.pow(currentCursorPos.y - previousCursorPosition.y, 2)
    );

    setPreviousCursorPosition(currentCursorPos);

    setOrbStates((prevStates) =>
      prevStates.map((orb) => {
        // Convert percentage to pixels for calculations
        const orbX = (orb.position.x / 100) * window.innerWidth;
        const orbY = (orb.position.y / 100) * window.innerHeight;

        // Calculate distance from cursor to orb center
        const dx = currentCursorPos.x - orbX;
        const dy = currentCursorPos.y - orbY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Orb visual radius (half of size)
        const orbVisualRadius = orbSize / 2;
        const kickTriggerRadius = orbVisualRadius + 5; // Detection zone for reliable kicks

        let newOrb = { ...orb };

        // Check if cursor is currently near the ball
        const isNearBall = distance <= kickTriggerRadius;

        // Simple kick detection: kick when entering ball area
        if (isNearBall && !orb.wasNearCursor) {
          // Calculate kick force based on cursor speed, but always allow some minimum force
          const speedBonus = Math.min(cursorSpeed * speedMultiplier, 25); // Additional force from speed
          const totalKickForce = baseKickForce + speedBonus;

          // Simple random kick direction
          const randomAngle = Math.random() * 2 * Math.PI; // Random angle from 0 to 2π
          const kickDirX = Math.cos(randomAngle);
          const kickDirY = Math.sin(randomAngle);

          // Apply the kick
          newOrb.velocity = {
            x: kickDirX * totalKickForce,
            y: kickDirY * totalKickForce,
          };
          newOrb.isKicked = true;
          newOrb.kickTime = Date.now();
        }

        // Update the "was near cursor" state for next frame
        newOrb.wasNearCursor = isNearBall;

        return newOrb;
      })
    );
  };

  // Mouse tracking for orb physics
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newCursorPos = {
        x: e.clientX,
        y: e.clientY,
      };
      setCursorPosition(newCursorPos);

      // Immediate kick detection on mouse move to prevent missed events
      checkForKicks(newCursorPos);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const newCursorPos = {
          x: touch.clientX,
          y: touch.clientY,
        };
        setCursorPosition(newCursorPos);

        // Immediate kick detection on touch move to prevent missed events
        checkForKicks(newCursorPos);
      }
    };

    // Add passive: false to ensure we can capture fast movements
    window.addEventListener('mousemove', handleMouseMove, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // Physics simulation for orb movement
  useEffect(() => {
    const updatePhysics = () => {
      setOrbStates((prevStates) =>
        prevStates.map((orb) => {
          let newOrb = { ...orb };

          // Update position if orb is moving
          if (orb.isKicked) {
            const friction = 0.94; // Reduced friction for better trajectory preservation
            const stopThreshold = 0.25; // Lower threshold for more natural stopping

            // Apply realistic friction that preserves direction better
            newOrb.velocity.x *= friction;
            newOrb.velocity.y *= friction;

            // Enhanced physics scaling for smoother movement
            let newX = orb.position.x + orb.velocity.x * 0.09;
            let newY = orb.position.y + orb.velocity.y * 0.09;

            // Improved boundary bouncing that preserves more energy and trajectory
            if (newX < 2 || newX > 98) {
              newOrb.velocity.x *= -0.85; // Better energy retention for longer trajectories
              newX = Math.max(2, Math.min(98, newX));

              // Add slight random variation to prevent predictable bouncing patterns
              newOrb.velocity.y += (Math.random() - 0.5) * 0.5;
            }
            if (newY < 2 || newY > 98) {
              newOrb.velocity.y *= -0.85; // Better energy retention for longer trajectories
              newY = Math.max(2, Math.min(98, newY));

              // Add slight random variation to prevent predictable bouncing patterns
              newOrb.velocity.x += (Math.random() - 0.5) * 0.5;
            }

            newOrb.position.x = newX;
            newOrb.position.y = newY;

            // Stop when velocity is low (allow for immediate re-kicks)
            if (
              Math.abs(orb.velocity.x) < stopThreshold &&
              Math.abs(orb.velocity.y) < stopThreshold
            ) {
              newOrb.isKicked = false;
              newOrb.velocity = { x: 0, y: 0 };
              // Set new rest position where it stopped
              newOrb.restPosition = {
                x: newOrb.position.x,
                y: newOrb.position.y,
              };
            }
          }

          return newOrb;
        })
      );
    };

    const animationFrame = requestAnimationFrame(function animate() {
      updatePhysics();
      requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [cursorPosition]);

  return (
    <motion.div className="floating-elements">
      {orbStates.map((orb, i) => (
        <motion.div
          key={orb.id}
          className="floating-orb"
          animate={{
            left: `${orb.position.x}%`,
            top: `${orb.position.y}%`,
            y: orb.isKicked ? 0 : [-10, 10, -10],
            rotate: orb.isKicked ? [0, 360, 720] : [-5, 5, -5],
            scale: orb.isKicked ? [1.2, 0.8, 1] : [1, 1.1, 1],
            filter: orb.isKicked
              ? `hue-rotate(${i * 60 + 180}deg) brightness(1.5)`
              : `hue-rotate(${i * 60}deg) brightness(1)`,
          }}
          transition={{
            left: {
              duration: orb.isKicked ? 0.05 : 0.3,
              ease: orb.isKicked ? 'easeOut' : 'easeInOut',
            },
            top: {
              duration: orb.isKicked ? 0.05 : 0.3,
              ease: orb.isKicked ? 'easeOut' : 'easeInOut',
            },
            y: {
              duration: orb.isKicked ? 0.5 : 6,
              repeat: orb.isKicked ? 0 : Infinity,
              ease: 'easeInOut',
              delay: orb.isKicked ? 0 : i * 0.5,
            },
            rotate: {
              duration: orb.isKicked ? 1 : 8,
              repeat: orb.isKicked ? 0 : Infinity,
              ease: orb.isKicked ? 'easeOut' : 'easeInOut',
              delay: orb.isKicked ? 0 : i * 0.3,
            },
            scale: {
              duration: orb.isKicked ? 0.8 : 4,
              repeat: orb.isKicked ? 0 : Infinity,
              ease: orb.isKicked ? 'backOut' : 'easeInOut',
              delay: orb.isKicked ? 0 : i * 0.2,
            },
            filter: { duration: 0.3, ease: 'easeInOut' },
          }}
          style={{
            position: 'absolute',
            width: `${orbSize}px`,
            height: `${orbSize}px`,
            borderRadius: '50%',
            background: orb.isKicked
              ? `radial-gradient(circle, rgba(255, 100, 100, 0.8) 0%, transparent 70%)`
              : `radial-gradient(circle, rgba(99, 102, 241, 0.6) 0%, transparent 70%)`,
            boxShadow: orb.isKicked
              ? '0 0 30px rgba(255, 100, 100, 0.6)'
              : '0 0 20px rgba(99, 102, 241, 0.3)',
          }}
        />
      ))}
    </motion.div>
  );
};
