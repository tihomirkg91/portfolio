import { motion } from 'framer-motion';
import { Code, Trophy, Zap } from 'lucide-react';
import { useEffect } from 'react';
import { useCursorTrail } from '../../contexts/CursorTrailContext';
import './AboutPage.css';

export const AboutPage = () => {
  const { setTrailType } = useCursorTrail();

  // Set cursor trail type for about page
  useEffect(() => {
    setTrailType('about');
    return () => setTrailType('default');
  }, [setTrailType]);
  return (
    <div>
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

      {/* Player Info Section */}
      <section className="section player-info">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              type: 'spring',
              stiffness: 100,
            }}
            viewport={{ once: true }}
            className="section-title pixel-font"
          >
            PLAYER PROFILE
          </motion.h2>

          <motion.div
            className="player-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="player-avatar">
              <motion.div
                className="avatar-glow"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(255, 0, 255, 0.5)',
                    '0 0 40px rgba(0, 255, 255, 0.5)',
                    '0 0 20px rgba(255, 0, 255, 0.5)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Code size={60} />
              </motion.div>
            </div>
            <div className="player-stats">
              <h3 className="pixel-font">LEVEL: EXPERT</h3>
              <p>
                Specializing in modern web technologies and innovative solutions
              </p>
              <div className="stats-grid">
                <div className="stat">
                  <Zap size={20} />
                  <span>FRONTEND: 100%</span>
                </div>
                <div className="stat">
                  <Code size={20} />
                  <span>BACKEND: 90%</span>
                </div>
                <div className="stat">
                  <Trophy size={20} />
                  <span>PROJECTS: 50+</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
