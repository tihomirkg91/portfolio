import { motion } from 'framer-motion';
import { PlanetAnimationProps } from './types';

export const JupiterAnimation: React.FC<PlanetAnimationProps> = ({
  isKicked,
  size,
  children,
}) => {
  return (
    <motion.div
      animate={{
        rotate: isKicked ? [0, 540] : [0, 360],
        scale: isKicked ? [1, 1.1, 1] : 1,
      }}
      transition={{
        rotate: {
          duration: isKicked ? 1.2 : 9.9, // Jupiter's fast rotation
          repeat: isKicked ? 0 : Infinity,
          ease: isKicked ? 'easeOut' : 'linear',
        },
        scale: {
          duration: isKicked ? 1.2 : 0,
          ease: 'easeOut',
        },
      }}
      style={{
        width: size,
        height: size,
        position: 'relative',
      }}
    >
      {/* Great Red Spot storm animation */}
      <motion.div
        animate={{
          rotate: isKicked ? [0, -90] : [0, -360],
          scale: isKicked ? [1, 1.3, 1] : [0.95, 1.05, 0.95],
        }}
        transition={{
          rotate: {
            duration: isKicked ? 1 : 20,
            repeat: isKicked ? 0 : Infinity,
            ease: 'linear',
          },
          scale: {
            duration: isKicked ? 0.8 : 6,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
        style={{
          position: 'absolute',
          top: '45%',
          right: '20%',
          width: '25%',
          height: '15%',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse, rgba(255, 69, 0, 0.8) 0%, rgba(139, 69, 19, 0.4) 70%, transparent 100%)',
          zIndex: 1,
        }}
      />

      {/* Magnetic field and radiation belts */}
      <motion.div
        animate={{
          opacity: isKicked ? [0.3, 0.9, 0.3] : [0.2, 0.5, 0.2],
          scale: isKicked ? [1, 1.2, 1] : [0.9, 1.1, 0.9],
        }}
        transition={{
          duration: isKicked ? 0.4 : 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          top: '-8px',
          left: '-8px',
          width: 'calc(100% + 16px)',
          height: 'calc(100% + 16px)',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, transparent 45%, rgba(255, 215, 0, 0.2) 65%, rgba(255, 140, 0, 0.1) 100%)',
          zIndex: -1,
        }}
      />

      {/* Atmospheric bands movement */}
      <motion.div
        animate={{
          rotate: isKicked ? [0, 180] : [0, 360],
        }}
        transition={{
          duration: isKicked ? 1.5 : 15,
          repeat: isKicked ? 0 : Infinity,
          ease: 'linear',
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: `
            linear-gradient(0deg, 
              transparent 0%, 
              rgba(255, 140, 0, 0.1) 20%, 
              transparent 25%, 
              rgba(139, 69, 19, 0.1) 45%, 
              transparent 50%, 
              rgba(255, 215, 0, 0.1) 70%, 
              transparent 75%, 
              rgba(205, 92, 92, 0.1) 95%, 
              transparent 100%
            )
          `,
          zIndex: 0,
        }}
      />

      {children}
    </motion.div>
  );
};
