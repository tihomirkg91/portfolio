import { motion } from 'framer-motion';
import { Planet } from './planets/Planet';
import { PlanetMovement } from './planets/movement/PlanetMovement';
import type { OrbState as MovementOrbState } from './planets/movement/types';

interface PlanetsWrapperProps {
  orbCount: number;
  orbSize: number; // Size in pixels (width/height)
  baseKickForce: number;
  speedMultiplier: number;
  initialPositions?: Array<{ x: number; y: number }>;
}

export const PlanetsWrapper = ({
  orbCount,
  orbSize,
  baseKickForce,
  speedMultiplier,
  initialPositions,
}: PlanetsWrapperProps) => {
  return (
    <PlanetMovement
      orbCount={orbCount}
      orbSize={orbSize}
      baseKickForce={baseKickForce}
      speedMultiplier={speedMultiplier}
      initialPositions={initialPositions}
    >
      {(orbStates: MovementOrbState[]) => (
        <motion.div className="floating-elements">
          {orbStates.map((orb, i) => {
            const planetSize = orbSize * orb.planet.size;

            return (
              <motion.div
                key={orb.id}
                className="planets"
                animate={{
                  left: `${orb.position.x}%`,
                  top: `${orb.position.y}%`,
                  y: orb.isKicked ? 0 : [-10, 10, -10],
                  rotate: orb.isKicked ? [0, 360, 720] : [-5, 5, -5],
                  scale: orb.isKicked ? [1.2, 0.8, 1] : [1, 1.1, 1],
                }}
                transition={{
                  left: {
                    duration: orb.isKicked ? 0.05 : 0.3,
                    ease: orb.isKicked ? 'easeOut' : 'easeInOut',
                  },
                  top: {
                    duration: orb.isKicked ? 0.05 : 0.3,
                    ease: orb.isKicked ? 'easeOut' : 'easeInOut',
                  },
                  y: {
                    duration: orb.isKicked ? 0.5 : 6,
                    repeat: orb.isKicked ? 0 : Infinity,
                    ease: 'easeInOut',
                    delay: orb.isKicked ? 0 : i * 0.5,
                  },
                  rotate: {
                    duration: orb.isKicked ? 1 : 8,
                    repeat: orb.isKicked ? 0 : Infinity,
                    ease: orb.isKicked ? 'easeOut' : 'easeInOut',
                    delay: orb.isKicked ? 0 : i * 0.3,
                  },
                  scale: {
                    duration: orb.isKicked ? 0.8 : 4,
                    repeat: orb.isKicked ? 0 : Infinity,
                    ease: orb.isKicked ? 'backOut' : 'easeInOut',
                    delay: orb.isKicked ? 0 : i * 0.2,
                  },
                }}
                style={{
                  position: 'absolute',
                  width: `${planetSize}px`,
                  height: `${planetSize}px`,
                }}
              >
                <Planet
                  planetData={orb.planet}
                  planetSize={planetSize}
                  isKicked={orb.isKicked}
                  index={i}
                />
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </PlanetMovement>
  );
};
