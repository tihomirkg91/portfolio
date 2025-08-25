import { motion } from 'framer-motion';

interface SaturnRingsProps {
  planetSize: number;
  isKicked: boolean;
}

export const SaturnRings = ({ planetSize, isKicked }: SaturnRingsProps) => {
  return (
    <>
      {/* Outer ring */}
      <motion.div
        animate={{
          rotate: isKicked ? [0, 720] : [0, 360],
        }}
        transition={{
          duration: isKicked ? 2 : 25,
          repeat: isKicked ? 0 : Infinity,
          ease: 'linear',
        }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: `${planetSize * 2.4}px`,
          height: `${planetSize * 0.12}px`,
          border: `1px solid rgba(218, 165, 32, 0.4)`,
          borderRadius: '50%',
          background: `linear-gradient(90deg, 
            transparent 0%, 
            rgba(218, 165, 32, 0.2) 25%, 
            rgba(255, 215, 0, 0.3) 50%, 
            rgba(218, 165, 32, 0.2) 75%, 
            transparent 100%
          )`,
          zIndex: -1,
        }}
      />
      {/* Inner ring */}
      <motion.div
        animate={{
          rotate: isKicked ? [0, -720] : [0, -360],
        }}
        transition={{
          duration: isKicked ? 1.5 : 20,
          repeat: isKicked ? 0 : Infinity,
          ease: 'linear',
        }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: `${planetSize * 2.0}px`,
          height: `${planetSize * 0.08}px`,
          border: `2px solid rgba(218, 165, 32, 0.6)`,
          borderRadius: '50%',
          background: `linear-gradient(90deg, 
            transparent 0%, 
            rgba(218, 165, 32, 0.3) 25%, 
            rgba(255, 215, 0, 0.5) 50%, 
            rgba(218, 165, 32, 0.3) 75%, 
            transparent 100%
          )`,
          boxShadow:
            'inset 0 0 8px rgba(218, 165, 32, 0.4), 0 0 12px rgba(218, 165, 32, 0.3)',
          zIndex: -1,
        }}
      />
    </>
  );
};
