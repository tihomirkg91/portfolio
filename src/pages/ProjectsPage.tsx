import { motion } from 'framer-motion';
import { ParallaxBackground } from '../components/ParallaxBackground';
import { useCursorTrail } from '../contexts/CursorTrailContext';
import { useEffect } from 'react';

export const ProjectsPage = () => {
  const { setTrailType } = useCursorTrail();

  // Set cursor trail type for projects page
  useEffect(() => {
    setTrailType('projects');
    return () => setTrailType('default');
  }, [setTrailType]);
  return (
    <ParallaxBackground intensity="light" showShapes={true}>
      <div className="projects-page">
        <section className="section projects-hero">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="projects-hero-content"
            >
              <h1 className="section-title">Projects</h1>
            </motion.div>
          </div>
        </section>
      </div>
    </ParallaxBackground>
  );
};
