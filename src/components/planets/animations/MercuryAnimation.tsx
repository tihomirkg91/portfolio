import { motion } from 'framer-motion';
import { PlanetAnimationProps } from './types';

export const MercuryAnimation: React.FC<PlanetAnimationProps> = ({
  isKicked,
  size,
  children,
}) => {
  return (
    <motion.div
      animate={{
        rotate: isKicked ? [0, 720] : [0, 360],
        scale: isKicked ? [1, 1.3, 1] : 1,
      }}
      transition={{
        rotate: {
          duration: isKicked ? 1.5 : 88, // Mercury's actual rotation period
          repeat: isKicked ? 0 : Infinity,
          ease: isKicked ? 'easeOut' : 'linear',
        },
        scale: {
          duration: isKicked ? 1.5 : 0,
          ease: 'easeOut',
        },
      }}
      style={{
        width: size,
        height: size,
        position: 'relative',
      }}
    >
      {/* Heat shimmer effect for Mercury */}
      <motion.div
        animate={{
          opacity: isKicked ? [0.3, 0.8, 0.3] : [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: isKicked ? 0.5 : 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          top: '-2px',
          left: '-2px',
          width: 'calc(100% + 4px)',
          height: 'calc(100% + 4px)',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, transparent 60%, rgba(255, 140, 0, 0.3) 80%, transparent 100%)',
          zIndex: -1,
        }}
      />
      {children}
    </motion.div>
  );
};
