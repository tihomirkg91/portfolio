import type { FC } from 'react';
import { memo, useCallback } from 'react';
import { FaShoppingBag, FaStore, FaUsers } from 'react-icons/fa';
import { usePortfolio } from '../hooks/usePortfolio';
import type { ProjectLink } from '../types';
import './Projects.css';

interface ProjectLinkButtonProps {
  link: ProjectLink;
  projectTitle: string;
}

const ProjectLinkButton: FC<ProjectLinkButtonProps> = memo(
  ({ link, projectTitle }) => {
    const handleLinkClick = () => {
      window.open(link.url, '_blank', 'noopener,noreferrer');
    };

    return (
      <button
        onClick={handleLinkClick}
        className="project-link"
        aria-label={`${link.label} for ${projectTitle}`}
        type="button"
      >
        <span className="project-link-text">{link.label}</span>
      </button>
    );
  }
);

ProjectLinkButton.displayName = 'ProjectLinkButton';

const Projects: FC = () => {
  const { projects } = usePortfolio();
  const project = projects[0];

  const handleViewMarketplace = useCallback(() => {
    window.open(project?.links[0]?.url || '', '_blank', 'noopener,noreferrer');
  }, [project]);

  if (!project) return null;

  return (
    <section id="projects" className="projects">
      <div className="projects-container">
        <header className="projects-header">
          <h2 className="projects-title">Featured Project</h2>
          <p className="projects-subtitle">
            Showcasing my latest work and creative solutions
          </p>
        </header>

        <div className="single-project-container">
          <article className="project-card featured-project">
            <div className="project-card-inner">
              <div className="project-image-container">
                <div className="marketplace-preview">
                  <div className="marketplace-content">
                    <div className="marketplace-features">
                      <div className="feature-item">
                        <FaShoppingBag className="feature-icon" />
                        <span className="feature-label">Smart Shopping</span>
                      </div>
                      <div className="feature-item">
                        <FaStore className="feature-icon" />
                        <span className="feature-label">Multi-Vendor</span>
                      </div>
                      <div className="feature-item">
                        <FaUsers className="feature-icon" />
                        <span className="feature-label">Community</span>
                      </div>
                    </div>
                    <button
                      className="marketplace-button"
                      onClick={handleViewMarketplace}
                      aria-label="Open marketplace website"
                    >
                      Visit Marketplace
                    </button>
                  </div>
                </div>
                {project.featured && (
                  <div className="featured-badge">Featured</div>
                )}
                <div className="project-overlay">
                  <div className="project-links">
                    {project.links.map(link => (
                      <ProjectLinkButton
                        key={link.url}
                        link={link}
                        projectTitle={project.title}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="project-content">
                <header className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                </header>

                <p className="project-description">
                  {project.longDescription || project.description}
                </p>

                <div className="project-tech">
                  {project.technologies.map(tech => (
                    <span key={tech} className="tech-chip">
                      {tech}
                    </span>
                  ))}
                </div>

                {project.tags && project.tags.length > 0 && (
                  <div className="project-tags">
                    {project.tags.map(tag => (
                      <span key={tag} className="project-tag">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Projects;
