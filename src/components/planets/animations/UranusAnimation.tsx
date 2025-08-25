import { motion } from 'framer-motion';
import { PlanetAnimationProps } from './types';

export const UranusAnimation: React.FC<PlanetAnimationProps> = ({
  isKicked,
  size,
  children,
}) => {
  return (
    <motion.div
      animate={{
        rotate: isKicked ? [0, 270] : [0, 360],
        scale: isKicked ? [1, 1.2, 1] : 1,
        rotateZ: isKicked ? [0, 45, 0] : 0, // Uranus tilts when kicked
      }}
      transition={{
        rotate: {
          duration: isKicked ? 2.2 : 17.2, // Uranus's rotation period
          repeat: isKicked ? 0 : Infinity,
          ease: isKicked ? 'easeOut' : 'linear',
        },
        scale: {
          duration: isKicked ? 2.2 : 0,
          ease: 'easeOut',
        },
        rotateZ: {
          duration: isKicked ? 2 : 0,
          ease: 'easeInOut',
        },
      }}
      style={{
        width: size,
        height: size,
        position: 'relative',
        transformOrigin: 'center center',
      }}
    >
      {/* Vertical ring system (Uranus has vertical rings) */}
      <motion.div
        animate={{
          rotate: isKicked ? [0, -360] : [0, -720],
          opacity: isKicked ? [0.5, 0.9, 0.5] : [0.3, 0.6, 0.3],
        }}
        transition={{
          rotate: {
            duration: isKicked ? 3 : 35,
            repeat: isKicked ? 0 : Infinity,
            ease: 'linear',
          },
          opacity: {
            duration: isKicked ? 0.8 : 5,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) rotate(90deg)',
          width: `${size * 0.08}px`,
          height: `${size * 1.8}px`,
          borderRadius: '50%',
          background: `
            linear-gradient(0deg, 
              transparent 0%, 
              rgba(176, 196, 222, 0.6) 15%, 
              rgba(135, 206, 235, 0.8) 25%, 
              rgba(176, 196, 222, 0.7) 35%, 
              rgba(135, 206, 235, 0.5) 45%, 
              rgba(176, 196, 222, 0.7) 55%, 
              rgba(135, 206, 235, 0.8) 65%, 
              rgba(176, 196, 222, 0.6) 75%, 
              rgba(135, 206, 235, 0.4) 85%, 
              transparent 100%
            )
          `,
          zIndex: -1,
        }}
      />

      {/* Methane clouds swirling */}
      <motion.div
        animate={{
          rotate: isKicked ? [0, 540] : [0, 360],
          opacity: isKicked ? [0.4, 0.8, 0.4] : [0.2, 0.5, 0.2],
        }}
        transition={{
          rotate: {
            duration: isKicked ? 1.8 : 20,
            repeat: isKicked ? 0 : Infinity,
            ease: 'linear',
          },
          opacity: {
            duration: isKicked ? 0.7 : 4,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: `
            radial-gradient(ellipse 40% 25% at 30% 35%, rgba(64, 224, 208, 0.3) 0%, transparent 70%),
            radial-gradient(ellipse 35% 30% at 70% 60%, rgba(0, 255, 255, 0.2) 0%, transparent 65%),
            radial-gradient(ellipse 25% 35% at 50% 80%, rgba(135, 206, 235, 0.3) 0%, transparent 60%)
          `,
          zIndex: 1,
        }}
      />

      {/* Unique tilt wobble effect */}
      <motion.div
        animate={{
          rotateX: isKicked ? [0, 15, -15, 0] : [0, 5, -5, 0],
          rotateY: isKicked ? [0, -10, 10, 0] : [0, 3, -3, 0],
        }}
        transition={{
          duration: isKicked ? 1.5 : 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
