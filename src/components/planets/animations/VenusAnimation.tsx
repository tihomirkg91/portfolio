import { motion } from 'framer-motion';
import { PlanetAnimationProps } from './types';

export const VenusAnimation: React.FC<PlanetAnimationProps> = ({
  isKicked,
  size,
  children,
}) => {
  return (
    <motion.div
      animate={{
        rotate: isKicked ? [0, -180] : [0, -360], // Venus rotates backwards
        scale: isKicked ? [1, 1.2, 1] : 1,
      }}
      transition={{
        rotate: {
          duration: isKicked ? 2 : 243, // Venus's actual rotation period
          repeat: isKicked ? 0 : Infinity,
          ease: isKicked ? 'easeOut' : 'linear',
        },
        scale: {
          duration: isKicked ? 2 : 0,
          ease: 'easeOut',
        },
      }}
      style={{
        width: size,
        height: size,
        position: 'relative',
      }}
    >
      {/* Thick atmosphere glow for Venus */}
      <motion.div
        animate={{
          opacity: isKicked ? [0.4, 0.9, 0.4] : [0.3, 0.6, 0.3],
          scale: isKicked ? [1, 1.1, 1] : [0.95, 1.05, 0.95],
        }}
        transition={{
          duration: isKicked ? 0.8 : 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          top: '-3px',
          left: '-3px',
          width: 'calc(100% + 6px)',
          height: 'calc(100% + 6px)',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, transparent 55%, rgba(255, 165, 0, 0.4) 75%, rgba(255, 69, 0, 0.2) 100%)',
          zIndex: -1,
        }}
      />
      {children}
    </motion.div>
  );
};
