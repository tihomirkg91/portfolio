import React from 'react';
import { usePortfolio } from '../hooks/usePortfolio';
import './About.css';
import { CVDownloadButton } from './CVDownloadButton';

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
              <h3>Hello!</h3>
            </div>

            <div className="about-details">
              <p>{personalInfo.aboutMe}</p>
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
