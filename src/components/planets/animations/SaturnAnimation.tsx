import { motion } from 'framer-motion';
import { PlanetAnimationProps } from './types';

export const SaturnAnimation: React.FC<PlanetAnimationProps> = ({
  isKicked,
  size,
  children,
}) => {
  return (
    <motion.div
      animate={{
        rotate: isKicked ? [0, 450] : [0, 360],
        scale: isKicked ? [1, 1.15, 1] : 1,
      }}
      transition={{
        rotate: {
          duration: isKicked ? 1.3 : 10.7, // Saturn's rotation period
          repeat: isKicked ? 0 : Infinity,
          ease: isKicked ? 'easeOut' : 'linear',
        },
        scale: {
          duration: isKicked ? 1.3 : 0,
          ease: 'easeOut',
        },
      }}
      style={{
        width: size,
        height: size,
        position: 'relative',
      }}
    >
      {/* Ring system animation */}
      <motion.div
        animate={{
          rotate: isKicked ? [0, 720] : [0, 360],
          opacity: isKicked ? [0.7, 1, 0.7] : [0.6, 0.9, 0.6],
        }}
        transition={{
          rotate: {
            duration: isKicked ? 2 : 25, // Rings rotate slower than planet
            repeat: isKicked ? 0 : Infinity,
            ease: 'linear',
          },
          opacity: {
            duration: isKicked ? 0.5 : 4,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: `${size * 2.2}px`,
          height: `${size * 0.1}px`,
          borderRadius: '50%',
          background: `
            linear-gradient(90deg, 
              transparent 0%, 
              rgba(205, 205, 205, 0.8) 10%, 
              rgba(169, 169, 169, 0.9) 20%, 
              rgba(211, 211, 211, 0.7) 30%, 
              rgba(192, 192, 192, 0.8) 40%, 
              rgba(169, 169, 169, 0.6) 50%, 
              rgba(192, 192, 192, 0.8) 60%, 
              rgba(211, 211, 211, 0.7) 70%, 
              rgba(169, 169, 169, 0.9) 80%, 
              rgba(205, 205, 205, 0.8) 90%, 
              transparent 100%
            )
          `,
          boxShadow: '0 0 10px rgba(169, 169, 169, 0.5)',
          zIndex: -1,
        }}
      />

      {/* Ring particle sparkle effect */}
      <motion.div
        animate={{
          opacity: isKicked ? [0.3, 0.9, 0.3] : [0.1, 0.4, 0.1],
          rotate: isKicked ? [0, 360] : [0, 720],
        }}
        transition={{
          opacity: {
            duration: isKicked ? 0.3 : 2,
            repeat: Infinity,
            ease: 'easeInOut',
          },
          rotate: {
            duration: isKicked ? 1 : 30,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: `${size * 2.2}px`,
          height: `${size * 0.1}px`,
          borderRadius: '50%',
          background: `
            radial-gradient(ellipse 2px 1px at 20% 50%, rgba(255, 255, 255, 0.8) 0%, transparent 50%),
            radial-gradient(ellipse 1px 2px at 40% 50%, rgba(255, 255, 255, 0.6) 0%, transparent 50%),
            radial-gradient(ellipse 2px 1px at 60% 50%, rgba(255, 255, 255, 0.9) 0%, transparent 50%),
            radial-gradient(ellipse 1px 1px at 80% 50%, rgba(255, 255, 255, 0.7) 0%, transparent 50%)
          `,
          zIndex: 0,
        }}
      />

      {/* Atmospheric hexagon at north pole */}
      <motion.div
        animate={{
          rotate: isKicked ? [0, 180] : [0, 360],
          opacity: isKicked ? [0.4, 0.8, 0.4] : [0.2, 0.5, 0.2],
        }}
        transition={{
          rotate: {
            duration: isKicked ? 1.5 : 12,
            repeat: isKicked ? 0 : Infinity,
            ease: 'linear',
          },
          opacity: {
            duration: isKicked ? 0.6 : 3,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '30%',
          height: '30%',
          clipPath:
            'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          background: 'rgba(255, 215, 0, 0.3)',
          zIndex: 1,
        }}
      />

      {children}
    </motion.div>
  );
};
