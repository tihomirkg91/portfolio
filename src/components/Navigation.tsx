import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { LuArrowLeft } from 'react-icons/lu';
import { useLocation, useNavigate } from 'react-router-dom';
import { useActiveSection } from '../hooks/useActiveSection';
import { useNavItems } from '../hooks/useNavItems';
import { useResponsive } from '../hooks/useResponsive';
import { useScrollNavigation } from '../hooks/useScrollNavigation';
import { getScrollOffset } from '../utils/headerOffset';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';
import './Navigation.css';

const SECTIONS = [
  'home',
  'about',
  'projects',
  'experience',
  'contact',
] as const;

const Navigation: React.FC = () => {
  const { isMobile } = useResponsive();
  const { selectedNavItem } = useNavItems();
  const location = useLocation();
  const navigate = useNavigate();

  const [scrollOffset, setScrollOffset] = useState(() => getScrollOffset());

  useEffect(() => {
    const updateScrollOffset = () => setScrollOffset(getScrollOffset());

    window.addEventListener('resize', updateScrollOffset);
    return () => window.removeEventListener('resize', updateScrollOffset);
  }, []);

  const { isScrolled } = useActiveSection({
    sections: SECTIONS,
    scrollOffset,
    scrollThreshold: 50,
  });

  const { scrollToElement } = useScrollNavigation({
    activeSection: selectedNavItem,
    autoScrollToActiveSection: false,
  });

  const handleEnsureActiveSectionInView = useCallback(
    () => scrollToElement('home'),
    []
  );
  const handleBackToHome = useCallback(() => navigate('/'), []);

  const isGamePage = useMemo(
    () => location.pathname === '/falling-planet-rhythm',
    [location.pathname]
  );

  return (
    <header
      className={`navigation ${isScrolled ? 'navigation--scrolled' : ''}`}
    >
      <div className="navigation__container">
        {isGamePage && (
          <button onClick={handleBackToHome} className="navigation__back-arrow">
            <LuArrowLeft size={20} />
          </button>
        )}
        <div className="navigation__logo">
          <div
            className="logo__container"
            onClick={handleEnsureActiveSectionInView}
            title="Ensure active section is in view"
            style={{ cursor: 'pointer' }}
          >
            <div className="logo__icon">
              <div className="logo__hexagon">
                <div className="hexagon__inner">
                  <span className="hexagon__symbol">{'{'}</span>
                </div>
              </div>
              <div className="logo__circuits">
                <div className="circuit circuit--1"></div>
                <div className="circuit circuit--2"></div>
                <div className="circuit circuit--3"></div>
              </div>
            </div>
            <div className="logo__text">
              <span className="logo__name">
                <span className="name__primary">T.T</span>
                <span className="name__separator">.</span>
                <span className="name__secondary">Dev</span>
              </span>
              <span className="logo__tagline">Frontend Software Engineer</span>
            </div>
          </div>
          <div className="logo__energy">
            <div className="energy__pulse"></div>
            <div className="energy__wave"></div>
          </div>
        </div>

        {location.pathname !== '/falling-planet-rhythm' &&
          (isMobile ? (
            <MobileMenu />
          ) : (
            <nav className="navigation__nav">
              <DesktopMenu />
            </nav>
          ))}
      </div>

      <div className="navigation__grid"></div>
      <div className="navigation__particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
    </header>
  );
};

export default Navigation;
