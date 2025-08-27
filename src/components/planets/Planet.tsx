import { motion } from 'framer-motion';
import { PlanetProps } from './types';
import { SaturnRings } from './SaturnRings';
import './planet.css';
import './earth.css';

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
          duration: isKicked
            ? 1
            : planetData.name === 'Earth'
            ? 30
            : 15 + index * 2,
          repeat: isKicked ? 0 : Infinity,
          ease: 'linear',
        }}
        className="planet"
        style={{
          background: isKicked
            ? planetData.kickedGradient
            : planetData.gradient,
          boxShadow: isKicked
            ? planetData.kickedBoxShadow
            : planetData.boxShadow,
        }}
      >
        {/* Earth-specific enhancements */}
        {planetData.name === 'Earth' && (
          <>
            {/* Base ocean layer */}
            <div className="earth-ocean" />

            {/* Continental landmasses */}
            <div className="earth-continents" />

            {/* Mountain ranges and terrain details */}
            <div className="earth-mountains" />

            {/* Realistic cloud formations */}
            <motion.div
              animate={{
                rotate: isKicked ? [0, -90] : [0, -360],
              }}
              transition={{
                duration: isKicked ? 2 : 50,
                repeat: isKicked ? 0 : Infinity,
                ease: 'linear',
              }}
              className="earth-clouds"
            />

            {/* Atmospheric glow with multiple layers */}
            <div
              className="earth-atmospheric-glow"
              style={{
                animation: isKicked
                  ? 'none'
                  : 'earth-pulse 5s ease-in-out infinite',
              }}
            />

            {/* Day/night terminator with realistic lighting */}
            <div className="earth-terminator" />

            {/* City lights on dark side */}
            <div className="earth-city-lights" />

            {/* Sun reflection highlight */}
            <div className="earth-sun-reflection" />
          </>
        )}{' '}
        {/* Surface texture overlay for all planets */}
        <div
          className={
            planetData.name === 'Earth'
              ? 'earth-surface-texture'
              : 'planet-surface-texture other'
          }
        />
        {/* Atmospheric glow for gas giants */}
        {isGasGiant && (
          <div
            className="gas-giant-atmosphere"
            style={{
              background: `radial-gradient(circle, transparent 70%, ${planetData.color}40 100%)`,
              animation: isKicked ? 'none' : 'pulse 3s ease-in-out infinite',
            }}
          />
        )}
      </motion.div>

      {/* Planet name tooltip */}
      <div
        className="planet-tooltip"
        style={{
          bottom: `${planetSize + 10}px`,
        }}
      >
        {planetData.name}
      </div>
    </>
  );
};
