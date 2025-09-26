import type { FC } from 'react';
import { memo, useCallback, useState } from 'react';
import { FaGamepad, FaImage } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useImageLoading } from '../hooks/useImageLoading';
import { usePortfolio } from '../hooks/usePortfolio';
import type { ProjectLink } from '../types';
import { useFeatureFlags } from '../utils/featureFlags';
import ComingSoonModal from './ComingSoonModal';
import './Projects.css';

interface ProjectLinkButtonProps {
  link: ProjectLink;
  projectTitle: string;
  onGameClick?: () => void;
  gameEnabled: boolean;
}

const ProjectLinkButton: FC<ProjectLinkButtonProps> = memo(
  ({ link, projectTitle, onGameClick, gameEnabled }) => {
    const navigate = useNavigate();

    const navigateToLink = useCallback((url: string, isInternal: boolean) => {
      if (isInternal) navigate(url);
      else window.open(url, '_blank', 'noopener,noreferrer');
    }, []);

    const handleClick = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();

        const isGameLink = link.label === 'Play Game';
        const isInternalLink = link.url.startsWith('/');

        // Handle game links with feature flag logic
        if (isGameLink) {
          if (gameEnabled) navigateToLink(link.url, isInternalLink);
          else onGameClick?.();
          return;
        }

        navigateToLink(link.url, isInternalLink);
      },
      [link.url, link.label, gameEnabled]
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
  const { gameEnabled } = useFeatureFlags();
  const project = projects[0];
  const { src, isLoading, hasError, handleLoad, handleError, imgRef } =
    useImageLoading(project?.imageUrl || '');
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);

  const handleImageLoad = useCallback(() => {
    setIsImageLoaded(true);
    handleLoad();
  }, []);

  const handleImageError = useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => handleError(event),
    []
  );
  const handleGameClick = useCallback(() => setIsGameModalOpen(true), []);
  const handleCloseModal = useCallback(() => setIsGameModalOpen(false), []);

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
                    {project.links.map(link => (
                      <ProjectLinkButton
                        key={link.url}
                        link={link}
                        projectTitle={project.title}
                        onGameClick={handleGameClick}
                        gameEnabled={gameEnabled}
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

      <ComingSoonModal
        isOpen={isGameModalOpen}
        onClose={handleCloseModal}
        title="Game Coming Soon!"
        message="The Falling Planet Rhythm Game will be available soon. Stay tuned for updates!"
      />
    </section>
  );
});

Projects.displayName = 'Projects';

export default Projects;
