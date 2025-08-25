import { motion } from 'framer-motion';
import { PlanetAnimationProps } from './types';

export const EarthAnimation: React.FC<PlanetAnimationProps> = ({
  isKicked,
  size,
  children,
}) => {
  return (
    <motion.div
      animate={{
        rotate: isKicked ? [0, 360] : [0, 360],
        scale: isKicked ? [1, 1.15, 1] : 1,
      }}
      transition={{
        rotate: {
          duration: isKicked ? 1 : 24, // Earth's 24-hour rotation
          repeat: isKicked ? 0 : Infinity,
          ease: isKicked ? 'easeOut' : 'linear',
        },
        scale: {
          duration: isKicked ? 1 : 0,
          ease: 'easeOut',
        },
      }}
      style={{
        width: size,
        height: size,
        position: 'relative',
      }}
    >
      {/* Earth's magnetic field visualization */}
      <motion.div
        animate={{
          opacity: isKicked ? [0.2, 0.7, 0.2] : [0.1, 0.3, 0.1],
          scale: isKicked ? [1, 1.2, 1] : [0.9, 1.1, 0.9],
        }}
        transition={{
          duration: isKicked ? 0.6 : 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          top: '-5px',
          left: '-5px',
          width: 'calc(100% + 10px)',
          height: 'calc(100% + 10px)',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, transparent 50%, rgba(135, 206, 250, 0.2) 70%, rgba(100, 149, 237, 0.1) 100%)',
          zIndex: -1,
        }}
      />

      {/* Tidal bulge effect when kicked */}
      {isKicked && (
        <motion.div
          initial={{ scaleY: 1 }}
          animate={{ scaleY: [1, 1.05, 1] }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            zIndex: 1,
          }}
        >
          {children}
        </motion.div>
      )}

      {!isKicked && children}
    </motion.div>
  );
};
