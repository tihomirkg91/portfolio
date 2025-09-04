import React from 'react';
import { CVDownloadButton } from './CVDownloadButton';
import { usePortfolio } from '../hooks/usePortfolio';
import './About.css';

const About: React.FC = () => {
  const { personalInfo } = usePortfolio();

  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="section-header">
          <h2 className="section-title">About Me</h2>
        </div>

        <div className="about-content">
          <div className="about-text">
            <div className="about-intro">
              <h3>Hello! I'm Tihomir</h3>
              <p>
                I'm a passionate Frontend Developer with over 4 years of
                experience creating engaging and user-friendly web applications.
                I love turning complex problems into simple, beautiful, and
                intuitive solutions.
              </p>
            </div>

            <div className="about-details">
              <p>
                My journey in web development started in 2019, and since then
                I've had the privilege of working with various companies, from
                startups to established tech firms. I specialize in React,
                TypeScript, and modern CSS, always staying up-to-date with the
                latest industry trends and best practices.
              </p>

              <p>
                When I'm not coding, you can find me exploring new technologies,
                contributing to open-source projects, or sharing my knowledge
                through blog posts and mentoring fellow developers.
              </p>
            </div>

            <CVDownloadButton />
          </div>

          <div className="about-image">
            <div className="about-tech-stack">
              <h4>Current Tech Stack</h4>
              <div className="tech-icons">
                {personalInfo.currentTechStack?.map(tech => (
                  <span key={tech} className="tech-item">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
