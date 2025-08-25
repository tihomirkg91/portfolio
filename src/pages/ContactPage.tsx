import { motion } from 'framer-motion';
import { ParallaxBackground } from '../components/ParallaxBackground';
import { useCursorTrail } from '../contexts/CursorTrailContext';
import { useEffect } from 'react';

export const ContactPage = () => {
  const { setTrailType } = useCursorTrail();

  // Set cursor trail type for contact page
  useEffect(() => {
    setTrailType('contact');
    return () => setTrailType('default');
  }, [setTrailType]);
  return (
    <ParallaxBackground intensity="strong" showShapes={true}>
      <div className="contact-page">
        <section className="section contact-hero">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="contact-hero-content"
            >
              <h1 className="section-title">Contact</h1>
            </motion.div>
          </div>
        </section>
      </div>
    </ParallaxBackground>
  );
};
