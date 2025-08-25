import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import { FloatingOrbs } from '../components/FloatingOrbs';
import { useCursorTrail } from '../contexts/CursorTrailContext';
import { useSettings } from '../contexts/SettingsContext';

export const HomePage = () => {
  const { setTrailType } = useCursorTrail();
  const { orbsEnabled } = useSettings();
  const { scrollY } = useScroll();
  const heroRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Set cursor trail type for home page
  useEffect(() => {
    setTrailType('hero');
    return () => setTrailType('default');
  }, [setTrailType]);

  // Enhanced Parallax effects with multiple layers
  const y1 = useTransform(scrollY, [0, 1000], [0, -100]); // Slow background layer
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]); // Medium layer
  const y3 = useTransform(scrollY, [0, 1000], [0, -400]); // Fast foreground layer
  const y4 = useTransform(scrollY, [0, 1000], [0, 50]); // Reverse parallax
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.2]);
  const rotate = useTransform(scrollY, [0, 1000], [0, 360]);
  const blurEffect = useTransform(scrollY, [0, 500], [0, 10]);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        setMousePosition({
          x: (touch.clientX - window.innerWidth / 2) / 50,
          y: (touch.clientY - window.innerHeight / 2) / 50,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring' as const,
        damping: 20,
        stiffness: 100,
      },
    },
  };

  return (
    <div className="home-page">
      {/* Parallax Background Layers */}
      <motion.div
        className="parallax-layer parallax-layer-1"
        style={{
          y: y1,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '120vh',
          zIndex: -3,
          background:
            'radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
        }}
      />

      <motion.div
        className="parallax-layer parallax-layer-2"
        style={{
          y: y2,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '120vh',
          zIndex: -2,
        }}
      >
        {/* Floating geometric shapes */}
        <motion.div
          style={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: '100px',
            height: '100px',
            background:
              'linear-gradient(45deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))',
            borderRadius: '20px',
            rotate: rotate,
          }}
        />
        <motion.div
          style={{
            position: 'absolute',
            top: '60%',
            right: '15%',
            width: '80px',
            height: '80px',
            background:
              'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(99, 102, 241, 0.1))',
            borderRadius: '50%',
            scale: scale,
          }}
        />
      </motion.div>

      <motion.div
        className="parallax-layer parallax-layer-3"
        style={{
          y: y3,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '120vh',
          zIndex: -1,
        }}
      >
        {/* Fast moving elements */}
        <motion.div
          style={{
            position: 'absolute',
            top: '30%',
            right: '30%',
            width: '60px',
            height: '60px',
            background: 'rgba(99, 102, 241, 0.2)',
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            filter: blurEffect,
          }}
        />
        <motion.div
          style={{
            position: 'absolute',
            bottom: '20%',
            left: '20%',
            width: '40px',
            height: '40px',
            background: 'rgba(139, 92, 246, 0.2)',
            borderRadius: '50%',
            y: y4, // Reverse parallax
          }}
        />
      </motion.div>

      {/* Floating Background Elements */}
      {orbsEnabled && (
        <FloatingOrbs
          orbCount={6}
          orbSize={60}
          baseKickForce={15}
          speedMultiplier={0.8}
          initialPositions={[
            { x: 20, y: 30 },
            { x: 35, y: 70 },
            { x: 50, y: 30 },
            { x: 65, y: 70 },
            { x: 80, y: 30 },
            { x: 95, y: 70 },
          ]}
        />
      )}

      {/* Hero Section */}
      <section className="hero" ref={heroRef}>
        <div className="container">
          <motion.div
            className="hero-content"
            style={{
              opacity,
              y: y1,
            }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              style={{
                x: mousePosition.x,
                y: mousePosition.y,
              }}
            >
              <motion.h1
                className="hero-title"
                initial={{ opacity: 0, rotateX: -90 }}
                animate={{ opacity: 1, rotateX: 0 }}
                transition={{ duration: 1.2, delay: 0.2 }}
              >
                Hi, I'm{' '}
                <motion.span
                  className="text-gradient"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  TT
                </motion.span>{' '}
                - Full Stack Developer
              </motion.h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="hero-subtitle"
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              I create innovative web applications and digital experiences using
              modern technologies. Passionate about clean code, user experience,
              and bringing ideas to life through technology.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="hero-actions"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <Link to="/projects" className="btn btn-primary">
                  <motion.span>View My Work</motion.span>
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight size={20} />
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated Background */}
        <motion.div
          className="hero-bg"
          style={{ y: y1 }}
          animate={{
            background: [
              'radial-gradient(circle at 30% 70%, rgba(99, 102, 241, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 70% 30%, rgba(139, 92, 246, 0.4) 0%, transparent 60%)',
              'radial-gradient(circle at 30% 70%, rgba(99, 102, 241, 0.3) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </section>

      {/* Services Section */}
      <section className="section services">
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
            className="section-title"
          >
            What I Do
          </motion.h2>

          <motion.div
            className="grid grid-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                title: 'Frontend Development',
                description:
                  'Building responsive, interactive user interfaces with React, Vue, and modern CSS.',
                icon: '�',
                delay: 0.1,
              },
              {
                title: 'Backend Development',
                description:
                  'Creating robust APIs and server-side applications with Node.js, Python, and databases.',
                icon: '⚡',
                delay: 0.2,
              },
              {
                title: 'Full Stack Solutions',
                description:
                  'End-to-end development from concept to deployment with modern tech stacks.',
                icon: '�',
                delay: 0.3,
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                className="card service-card"
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: '0 20px 40px rgba(99, 102, 241, 0.2)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <motion.div
                  className="service-icon"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                >
                  {service.icon}
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: service.delay + 0.2 }}
                >
                  {service.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: service.delay + 0.4 }}
                >
                  {service.description}
                </motion.p>

                {/* Animated border effect */}
                <motion.div
                  className="service-border"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: service.delay + 0.6, duration: 0.8 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Work Preview */}
      <section className="section featured-preview">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="section-title"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="subtitle"
          >
            A selection of my recent work showcasing different technologies and
            approaches
          </motion.p>
          <div className="grid grid-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="card project-preview"
            >
              <div className="project-image">
                <div className="placeholder-image"></div>
              </div>
              <h3>E-Commerce Platform</h3>
              <p>REACT • NODE.JS • MONGODB • STRIPE</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="card project-preview"
            >
              <div className="project-image">
                <div className="placeholder-image"></div>
              </div>
              <h3>Task Management App</h3>
              <p>VUE.JS • EXPRESS • POSTGRESQL • JWT</p>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
            style={{ marginTop: '3rem' }}
          >
            <Link to="/projects" className="btn">
              View All Projects <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="cta-content"
          >
            <h2 className="section-title">Ready to work together?</h2>
            <p className="subtitle">
              Let's discuss your next project and bring your ideas to life.
            </p>
            <Link to="/contact" className="btn">
              Get In Touch <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
