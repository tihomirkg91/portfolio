import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useCursorTrail } from '../../contexts/CursorTrailContext';
import { useSettings } from '../../contexts/SettingsContext';
import { PlanetsWrapper } from '../../components/PlanetsWrapper';
import './PlanetsPage.css';

export const PlanetsPage = () => {
  const { setTrailType } = useCursorTrail();
  const { usePlanets } = useSettings();

  // Set cursor trail type for planets page
  useEffect(() => {
    setTrailType('planets');
    return () => setTrailType('default');
  }, [setTrailType]);

  return (
    <div className="planets-page">
      {/* Floating Background Planets */}
      {usePlanets && (
        <PlanetsWrapper
          orbCount={8}
          orbSize={80}
          baseKickForce={20}
          speedMultiplier={1.0}
          initialPositions={[
            { x: 15, y: 20 },
            { x: 30, y: 60 },
            { x: 45, y: 25 },
            { x: 60, y: 65 },
            { x: 75, y: 30 },
            { x: 90, y: 55 },
            { x: 25, y: 80 },
            { x: 70, y: 15 },
          ]}
        />
      )}

      {/* Planets Page Content */}
      <section className="section planets-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="planets-hero-content"
          >
            <motion.h1
              className="section-title pixel-font"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              PLANETS EXPLORED
            </motion.h1>
            <motion.p
              className="planets-subtitle pixel-font"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Welcome to the planetary system! Navigate through the cosmos.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Game Instructions */}
      <section className="section planets-info">
        <div className="container">
          <motion.div
            className="planets-card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="pixel-font">GAME CONTROLS</h2>
            <div className="controls-grid">
              <div className="control-item">
                <span className="control-key">MOUSE</span>
                <span className="control-desc">
                  Move to interact with planets
                </span>
              </div>
              <div className="control-item">
                <span className="control-key">CLICK</span>
                <span className="control-desc">Click planets to explore</span>
              </div>
              <div className="control-item">
                <span className="control-key">SCROLL</span>
                <span className="control-desc">Navigate through space</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
