import { motion } from 'framer-motion';
import { PlanetProps } from './types';
import { SaturnRings } from './SaturnRings';

export const Planet = ({
  planetData,
  planetSize,
  isKicked,
  index,
}: PlanetProps) => {
  const isGasGiant = ['Jupiter', 'Saturn', 'Uranus', 'Neptune'].includes(
    planetData.name
  );

  return (
    <>
      {/* Saturn's rings */}
      {planetData.rings && (
        <SaturnRings planetSize={planetSize} isKicked={isKicked} />
      )}

      {/* Planet */}
      <motion.div
        animate={{
          rotate: isKicked ? [0, 180] : [0, 360],
        }}
        transition={{
          duration: isKicked ? 1 : 15 + index * 2,
          repeat: isKicked ? 0 : Infinity,
          ease: 'linear',
        }}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: isKicked
            ? planetData.kickedGradient
            : planetData.gradient,
          boxShadow: isKicked
            ? planetData.kickedBoxShadow
            : planetData.boxShadow,
          zIndex: 1,
          overflow: 'hidden',
        }}
      >
        {/* Surface texture overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: `radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)`,
            opacity: 0.6,
          }}
        />

        {/* Atmospheric glow for gas giants */}
        {isGasGiant && (
          <div
            style={{
              position: 'absolute',
              top: '-2px',
              left: '-2px',
              width: 'calc(100% + 4px)',
              height: 'calc(100% + 4px)',
              borderRadius: '50%',
              background: `radial-gradient(circle, transparent 70%, ${planetData.color}40 100%)`,
              animation: isKicked ? 'none' : 'pulse 3s ease-in-out infinite',
            }}
          />
        )}
      </motion.div>

      {/* Planet name tooltip */}
      <div
        style={{
          position: 'absolute',
          bottom: `${planetSize + 10}px`,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: 'bold',
          opacity: 0,
          pointerEvents: 'none',
          transition: 'opacity 0.3s ease',
          whiteSpace: 'nowrap',
          zIndex: 10,
        }}
        className="planet-tooltip"
      >
        {planetData.name}
      </div>
    </>
  );
};
