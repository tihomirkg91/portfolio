import { type FC } from 'react';
import { memo, startTransition, useMemo } from 'react';
import { useImageLoading } from '../hooks/useImageLoading';
import { usePortfolio } from '../hooks/usePortfolio';
import { useScrollNavigation } from '../hooks/useScrollNavigation';
import './Hero.css';

interface HeroActionButtonProps {
  onClick: () => void;
  variant: 'primary' | 'secondary';
  ariaLabel: string;
  children: React.ReactNode;
}

const HeroActionButton: FC<HeroActionButtonProps> = memo(
  ({ onClick, variant, ariaLabel, children }) => {
    const handleClick = () => startTransition(() => onClick());

    return (
      <button
        onClick={handleClick}
        className={`btn btn-${variant}`}
        aria-label={ariaLabel}
        type="button"
      >
        {children}
      </button>
    );
  }
);

HeroActionButton.displayName = 'HeroActionButton';

interface HeroAvatarProps {
  src: string;
  alt: string;
  fallbackText: string;
}

const HeroAvatar: FC<HeroAvatarProps> = memo(({ src, alt, fallbackText }) => {
  const {
    src: imageSrc,
    isLoading,
    hasError,
    handleLoad,
    handleError,
    imgRef,
  } = useImageLoading(src, {
    lazy: true,
    onError: error => {
      console.warn('Hero avatar failed to load:', error);
    },
  });

  if (hasError || !imageSrc) {
    return (
      <div className="avatar-placeholder" role="img" aria-label={alt}>
        {fallbackText}
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div className="avatar-loading" aria-label="Loading avatar">
          <div className="loading-spinner" />
        </div>
      )}
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={isLoading ? 'loading' : ''}
        loading="lazy"
      />
    </>
  );
});

HeroAvatar.displayName = 'HeroAvatar';

const Hero: FC = () => {
  const { scrollToElement } = useScrollNavigation();
  const { personalInfo } = usePortfolio();

  const handleViewWork = useMemo(
    () => () => scrollToElement('projects'),
    [scrollToElement]
  );
  const handleGetInTouch = useMemo(
    () => () => scrollToElement('contact'),
    [scrollToElement]
  );
  const avatarFallback = useMemo(
    () => `${personalInfo.firstName[0]}${personalInfo.lastName[0]}`,
    [personalInfo.firstName, personalInfo.lastName]
  );

  const heroData = useMemo(
    () => ({
      name: personalInfo?.fullName,
      title: personalInfo?.title,
      bio: personalInfo?.bio,
      avatar: personalInfo?.avatar,
      avatarAlt: personalInfo?.avatarAlt,
    }),
    [personalInfo]
  );

  return (
    <section
      id="home"
      className="hero"
      aria-labelledby="hero-title"
      role="banner"
    >
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 id="hero-title" className="hero-title">
              <span className="hero-name">Hi, I'm {heroData.name}</span>
            </h1>
            <h2 className="hero-subtitle">{heroData.title}</h2>
            <p className="hero-description">{heroData.bio}</p>
            <div
              className="hero-buttons"
              role="group"
              aria-label="Hero actions"
            >
              <HeroActionButton
                onClick={handleViewWork}
                variant="primary"
                ariaLabel="Navigate to projects section to view my work"
              >
                View My Work
              </HeroActionButton>
              <HeroActionButton
                onClick={handleGetInTouch}
                variant="secondary"
                ariaLabel="Navigate to contact section to get in touch"
              >
                Get In Touch
              </HeroActionButton>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-avatar">
              <HeroAvatar
                src={heroData.avatar}
                alt={heroData.avatarAlt || 'Avatar'}
                fallbackText={avatarFallback}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
