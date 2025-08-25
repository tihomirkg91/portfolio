import { motion } from 'framer-motion';
import { PlanetAnimationProps } from './types';

export const MarsAnimation: React.FC<PlanetAnimationProps> = ({
  isKicked,
  size,
  children,
}) => {
  return (
    <motion.div
      animate={{
        rotate: isKicked ? [0, 450] : [0, 360],
        scale: isKicked ? [1, 1.25, 1] : 1,
      }}
      transition={{
        rotate: {
          duration: isKicked ? 1.8 : 24.6, // Mars's rotation period
          repeat: isKicked ? 0 : Infinity,
          ease: isKicked ? 'easeOut' : 'linear',
        },
        scale: {
          duration: isKicked ? 1.8 : 0,
          ease: 'easeOut',
        },
      }}
      style={{
        width: size,
        height: size,
        position: 'relative',
      }}
    >
      {/* Dust storm effect for Mars */}
      <motion.div
        animate={{
          opacity: isKicked ? [0.3, 0.8, 0.3] : [0.1, 0.4, 0.1],
          rotate: isKicked ? [0, 180] : [0, 360],
        }}
        transition={{
          opacity: {
            duration: isKicked ? 0.7 : 5,
            repeat: Infinity,
            ease: 'easeInOut',
          },
          rotate: {
            duration: isKicked ? 2 : 30,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
        style={{
          position: 'absolute',
          top: '-2px',
          left: '-2px',
          width: 'calc(100% + 4px)',
          height: 'calc(100% + 4px)',
          borderRadius: '50%',
          background: `
            radial-gradient(ellipse 30% 15% at 20% 40%, rgba(205, 92, 92, 0.3) 0%, transparent 70%),
            radial-gradient(ellipse 25% 20% at 70% 60%, rgba(255, 140, 0, 0.2) 0%, transparent 60%)
          `,
          zIndex: -1,
        }}
      />

      {/* Polar ice cap shimmer */}
      <motion.div
        animate={{
          opacity: isKicked ? [0.4, 0.8, 0.4] : [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: isKicked ? 0.5 : 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          top: '5%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '20%',
          height: '15%',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 70%)',
          zIndex: 1,
        }}
      />

      {children}
    </motion.div>
  );
};
