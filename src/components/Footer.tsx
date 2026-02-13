import { useCallback } from 'react';
import { usePortfolio } from '../hooks/usePortfolio';
import { useScrollNavigation } from '../hooks/useScrollNavigation';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const { contactInfo } = usePortfolio();
  const { scrollToTop, scrollToElement } = useScrollNavigation();
  const currentYear = new Date().getFullYear();

  const handleNavigateToSection = useCallback(
    (sectionId: string) => {
      scrollToElement(sectionId, {
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    },
    [scrollToElement]
  );

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <button
                  onClick={() => handleNavigateToSection('home')}
                  className="footer-link-button"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigateToSection('about')}
                  className="footer-link-button"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigateToSection('about')}
                  className="footer-link-button"
                >
                  Skills
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigateToSection('marketplace')}
                  className="footer-link-button"
                >
                  Marketplace
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigateToSection('experience')}
                  className="footer-link-button"
                >
                  Experience
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigateToSection('contact')}
                  className="footer-link-button"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Connect</h4>
            <div className="social-links">
              {contactInfo.github && (
                <a
                  href={contactInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="GitHub Profile"
                >
                  <FaGithub className="social-icon" />
                  GitHub
                </a>
              )}
              {contactInfo.linkedin && (
                <a
                  href={contactInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="LinkedIn Profile"
                >
                  <FaLinkedin className="social-icon" />
                  LinkedIn
                </a>
              )}
              <a
                href={`mailto:${contactInfo.email}`}
                className="social-link"
                aria-label="Send Email"
              >
                <FaEnvelope className="social-icon" />
                Email
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Let's Work Together</h4>
            <p className="footer-cta">
              Have a project in mind? Let's discuss how we can bring your ideas
              to life.
            </p>
            <a
              href="#contact"
              className="footer-btn"
              onClick={e => {
                e.preventDefault();
                document
                  .getElementById('contact')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get In Touch
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {currentYear} Tihomir. All rights reserved.
            </p>
            <p className="built-with">Built with Vite, React, TypeScript</p>
            <button
              className="back-to-top"
              onClick={scrollToTop}
              aria-label="Back to top"
            >
              <FaArrowUp />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
