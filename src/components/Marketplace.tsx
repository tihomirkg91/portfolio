import type { FC } from 'react';
import { memo, useCallback } from 'react';
import { FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa';
import './Marketplace.css';

const Marketplace: FC = memo(() => {
  const marketplaceUrl = 'https://marketplace-xi-teal.vercel.app/';

  const handleVisitMarketplace = useCallback(() => {
    window.open(marketplaceUrl, '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <section id="marketplace" className="marketplace">
      <div className="marketplace-container">
        <div className="marketplace-section-header">
          <h2 className="marketplace-title">Featured Project</h2>
          <p className="marketplace-subtitle">
            Showcasing my latest work and creative solutions
          </p>
        </div>

        <div className="marketplace-content-wrapper">
          <div className="marketplace-preview-container">
            <div className="marketplace-preview">
              <div className="preview-header">
                <div className="preview-url-bar">
                  <span className="url-text">{marketplaceUrl}</span>
                </div>
              </div>
              <div className="preview-body">
                <div className="preview-content">
                  <h3>Marketplace Platform</h3>
                  <p>
                    A modern, full-featured e-commerce platform built with
                    React, TypeScript, and Next.js. Designed to connect buyers
                    and sellers with an intuitive interface and seamless
                    shopping experience.
                  </p>
                  <div className="features-list">
                    <div className="feature">
                      <span className="feature-bullet">✓</span>
                      <span>Product discovery & search</span>
                    </div>
                    <div className="feature">
                      <span className="feature-bullet">✓</span>
                      <span>Featured products showcase</span>
                    </div>
                    <div className="feature">
                      <span className="feature-bullet">✓</span>
                      <span>Seller connections</span>
                    </div>
                    <div className="feature">
                      <span className="feature-bullet">✓</span>
                      <span>Responsive design</span>
                    </div>
                  </div>
                  <button
                    className="visit-button"
                    onClick={handleVisitMarketplace}
                    aria-label="Visit marketplace website"
                  >
                    Visit Live Site
                    <FaExternalLinkAlt className="button-icon" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="marketplace-info">
            <div className="info-card">
              <h4>Tech Stack</h4>
              <div className="tech-tags">
                <span className="tech-tag">React</span>
                <span className="tech-tag">TypeScript</span>
                <span className="tech-tag">Next.js</span>
                <span className="tech-tag">Tailwind CSS</span>
                <span className="tech-tag">PostgreSQL</span>
                <span className="tech-tag">Supabase</span>
                <span className="tech-tag">Prisma</span>
              </div>
            </div>

            <div className="info-card">
              <h4>Key Features</h4>
              <ul className="features-info">
                <li>
                  <FaArrowRight className="check-icon" />
                  Advanced product search & discovery
                </li>
                <li>
                  <FaArrowRight className="check-icon" />
                  Featured products showcase
                </li>
                <li>
                  <FaArrowRight className="check-icon" />
                  Community seller connections
                </li>
                <li>
                  <FaArrowRight className="check-icon" />
                  Multi-language support
                </li>
                <li>
                  <FaArrowRight className="check-icon" />
                  Fully responsive mobile & desktop design
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Marketplace.displayName = 'Marketplace';

export default Marketplace;
