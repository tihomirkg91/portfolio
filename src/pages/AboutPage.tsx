import { motion } from 'framer-motion';
import { ParallaxBackground } from '../components/ParallaxBackground';
import { useCursorTrail } from '../contexts/CursorTrailContext';
import { useEffect } from 'react';

export const AboutPage = () => {
  const { setTrailType } = useCursorTrail();

  // Set cursor trail type for about page
  useEffect(() => {
    setTrailType('about');
    return () => setTrailType('default');
  }, [setTrailType]);
  return (
    <ParallaxBackground intensity="medium" showShapes={true}>
      <div className="about-page">
        <section className="section about-hero">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="about-hero-content"
            >
              <h1 className="section-title">About</h1>
            </motion.div>
          </div>
        </section>
      </div>
    </ParallaxBackground>
  );
};
