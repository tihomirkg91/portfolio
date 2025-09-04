import React, { useState, useEffect, useCallback } from 'react';
import { useActiveSection } from '../hooks/useActiveSection';
import { useScrollNavigation } from '../hooks/useScrollNavigation';
import { useResponsive } from '../hooks/useResponsive';
import { useNavItems } from '../hooks/useNavItems';
import { getScrollOffset } from '../utils/headerOffset';
import MobileMenu from './MobileMenu';
import DesktopMenu from './DesktopMenu';
import './Navigation.css';

const Navigation: React.FC = () => {
  const { isMobile } = useResponsive();
  const { selectedNavItem } = useNavItems();

  const [scrollOffset, setScrollOffset] = useState(() => getScrollOffset());

  useEffect(() => {
    const updateScrollOffset = () => {
      setScrollOffset(getScrollOffset());
    };

    window.addEventListener('resize', updateScrollOffset);
    return () => window.removeEventListener('resize', updateScrollOffset);
  }, []);

  const { isScrolled } = useActiveSection({
    sections: ['home', 'about', 'projects', 'experience', 'contact'],
    scrollOffset,
    scrollThreshold: 50,
  });

  const { scrollToTop } = useScrollNavigation({
    activeSection: selectedNavItem,
    autoScrollToActiveSection: false,
  });

  const handleEnsureActiveSectionInView = useCallback(
    () => scrollToTop(),
    [scrollToTop]
  );

  return (
    <header
      className={`navigation ${isScrolled ? 'navigation--scrolled' : ''}`}
    >
      <div className="navigation__container">
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
              <span className="logo__tagline">Frontend Developer</span>
            </div>
          </div>
          <div className="logo__energy">
            <div className="energy__pulse"></div>
            <div className="energy__wave"></div>
          </div>
        </div>

        {isMobile ? (
          <MobileMenu />
        ) : (
          <nav className="navigation__nav">
            <DesktopMenu />
          </nav>
        )}
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
