import { motion } from 'framer-motion';
import { PlanetAnimationProps } from './types';

export const NeptuneAnimation: React.FC<PlanetAnimationProps> = ({
  isKicked,
  size,
  children,
}) => {
  return (
    <motion.div
      animate={{
        rotate: isKicked ? [0, 600] : [0, 360],
        scale: isKicked ? [1, 1.3, 1] : 1,
      }}
      transition={{
        rotate: {
          duration: isKicked ? 1.6 : 16.1, // Neptune's rotation period
          repeat: isKicked ? 0 : Infinity,
          ease: isKicked ? 'easeOut' : 'linear',
        },
        scale: {
          duration: isKicked ? 1.6 : 0,
          ease: 'easeOut',
        },
      }}
      style={{
        width: size,
        height: size,
        position: 'relative',
      }}
    >
      {/* Great Dark Spot storm system */}
      <motion.div
        animate={{
          rotate: isKicked ? [0, -180] : [0, -360],
          scale: isKicked ? [1, 1.4, 1] : [0.9, 1.1, 0.9],
          opacity: isKicked ? [0.6, 1, 0.6] : [0.4, 0.7, 0.4],
        }}
        transition={{
          rotate: {
            duration: isKicked ? 1.2 : 18,
            repeat: isKicked ? 0 : Infinity,
            ease: 'linear',
          },
          scale: {
            duration: isKicked ? 0.8 : 7,
            repeat: Infinity,
            ease: 'easeInOut',
          },
          opacity: {
            duration: isKicked ? 0.5 : 3,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
        style={{
          position: 'absolute',
          top: '35%',
          left: '25%',
          width: '35%',
          height: '20%',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse, rgba(25, 25, 112, 0.8) 0%, rgba(0, 0, 139, 0.4) 70%, transparent 100%)',
          zIndex: 1,
        }}
      />

      {/* Supersonic winds visualization */}
      <motion.div
        animate={{
          rotate: isKicked ? [0, 900] : [0, 360],
        }}
        transition={{
          duration: isKicked ? 1 : 8, // Very fast winds
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
            linear-gradient(45deg, 
              transparent 0%, 
              rgba(70, 130, 180, 0.2) 15%, 
              transparent 20%, 
              rgba(100, 149, 237, 0.3) 35%, 
              transparent 40%, 
              rgba(135, 206, 235, 0.2) 55%, 
              transparent 60%, 
              rgba(176, 196, 222, 0.3) 75%, 
              transparent 80%, 
              rgba(70, 130, 180, 0.2) 95%, 
              transparent 100%
            )
          `,
          zIndex: 0,
        }}
      />

      {/* Extreme magnetic field pulsing */}
      <motion.div
        animate={{
          opacity: isKicked ? [0.4, 1, 0.4] : [0.2, 0.6, 0.2],
          scale: isKicked ? [1, 1.5, 1] : [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: isKicked ? 0.3 : 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          top: '-10px',
          left: '-10px',
          width: 'calc(100% + 20px)',
          height: 'calc(100% + 20px)',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, transparent 40%, rgba(65, 105, 225, 0.3) 60%, rgba(30, 144, 255, 0.2) 80%, transparent 100%)',
          zIndex: -1,
        }}
      />

      {/* Methane haze layers */}
      <motion.div
        animate={{
          opacity: isKicked ? [0.3, 0.8, 0.3] : [0.2, 0.5, 0.2],
          rotate: isKicked ? [0, -45] : [0, -360],
        }}
        transition={{
          opacity: {
            duration: isKicked ? 0.6 : 4,
            repeat: Infinity,
            ease: 'easeInOut',
          },
          rotate: {
            duration: isKicked ? 2 : 25,
            repeat: isKicked ? 0 : Infinity,
            ease: 'linear',
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
            radial-gradient(ellipse 60% 30% at 50% 30%, rgba(72, 61, 139, 0.3) 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 50% 70%, rgba(106, 90, 205, 0.2) 0%, transparent 65%)
          `,
          zIndex: 2,
        }}
      />

      {children}
    </motion.div>
  );
};
