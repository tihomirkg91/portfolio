import type { FC } from 'react';
import { memo, useCallback, useState } from 'react';
import { FaGamepad, FaImage, FaTools } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useImageLoading } from '../hooks/useImageLoading';
import { usePortfolio } from '../hooks/usePortfolio';
import type { ProjectLink } from '../types';
import './Projects.css';

interface ProjectLinkButtonProps {
  link: ProjectLink;
  projectTitle: string;
}

const ProjectLinkButton: FC<ProjectLinkButtonProps> = memo(
  ({ link, projectTitle }) => {
    const navigate = useNavigate();

    const handleClick = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        if (link.url.startsWith('/')) navigate(link.url);
        else window.open(link.url, '_blank', 'noopener,noreferrer');
      },
      [link.url, navigate]
    );

    return (
      <button
        onClick={handleClick}
        className="project-link"
        aria-label={`${link.label} for ${projectTitle}`}
        type="button"
      >
        {link.label === 'Play Game' && (
          <FaGamepad className="project-link-icon" />
        )}
        <span className="project-link-text">{link.label}</span>
      </button>
    );
  }
);

ProjectLinkButton.displayName = 'ProjectLinkButton';

const Projects: FC = memo(() => {
  const { projects } = usePortfolio();
  const project = projects[0];
  const { src, isLoading, hasError, handleLoad, handleError, imgRef } =
    useImageLoading(project?.imageUrl || '');
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = useCallback(() => {
    setIsImageLoaded(true);
    handleLoad();
  }, [handleLoad]);

  const handleImageError = useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => handleError(event),
    [handleError]
  );

  if (!project) {
    return (
      <section id="projects" className="projects">
        <div className="projects-container">
          <header className="projects-header">
            <h2 className="projects-title">
              <span className="title-accent">02.</span> Projects
            </h2>
            <p className="projects-subtitle">Coming Soon</p>
          </header>
          <div className="empty-state">
            <div className="empty-state-icon">
              <FaTools />
            </div>
            <p>Projects are being prepared. Check back soon!</p>
          </div>
        </div>
      </section>
    );
  }

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
                {!hasError && src && (
                  <img
                    ref={imgRef}
                    src={src}
                    alt={project.imageAlt || `${project.title} screenshot`}
                    className={`project-image ${isImageLoaded ? 'loaded' : ''}`}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    loading="lazy"
                  />
                )}
                {(isLoading || !isImageLoaded) && !hasError && (
                  <div className="project-image-skeleton" />
                )}
                {hasError && (
                  <div className="project-image-fallback">
                    <FaImage />
                  </div>
                )}
                {project.featured && (
                  <div className="featured-badge">Featured</div>
                )}
                <div className="project-overlay">
                  <div className="project-links">
                    {project.links.map((link, linkIndex) => (
                      <ProjectLinkButton
                        key={`${link.type}-${linkIndex}`}
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
                  {project.technologies.map((tech, techIndex) => (
                    <span key={`${tech}-${techIndex}`} className="tech-chip">
                      {tech}
                    </span>
                  ))}
                </div>

                {project.tags && project.tags.length > 0 && (
                  <div className="project-tags">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={`${tag}-${tagIndex}`} className="project-tag">
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
});

Projects.displayName = 'Projects';

export default Projects;
