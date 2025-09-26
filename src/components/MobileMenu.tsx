import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNavItems } from '../hooks/useNavItems';
import { useResponsive } from '../hooks/useResponsive';
import './MobileMenu.css';

const MobileMenu: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const {
    navItems,
    selectedNavItem,
    handleNavigateToSection: navHandleNavigateToSection,
  } = useNavItems();
  const { isMobile } = useResponsive();

  const handleToggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => setIsOpen(false), []);

  const preventTouchMove = useCallback((e: TouchEvent) => {
    e.preventDefault();
  }, []);

  const handleNavigateToSection = useCallback((sectionId: string) => {
    if (sectionId === 'game') {
      handleClose();
      navigate('/falling-planet-rhythm');
    } else {
      // Trigger navigation and close menu
      navHandleNavigateToSection(sectionId);
      handleClose();
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      if (isMobile) {
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100vh';

        document.addEventListener('touchmove', preventTouchMove, {
          passive: false,
        });
      }
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
      if (isMobile) document.removeEventListener('touchmove', preventTouchMove);
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
      if (isMobile) document.removeEventListener('touchmove', preventTouchMove);
    };
  }, [isOpen, isMobile]);

  return (
    <>
      <button
        className={`mobile-menu__toggle ${isOpen ? 'mobile-menu__toggle--active' : ''}`}
        onClick={handleToggle}
        aria-label={isOpen ? 'Close mobile menu' : 'Open mobile menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <div className="hamburger">
          <span className="hamburger__line"></span>
          <span className="hamburger__line"></span>
          <span className="hamburger__line"></span>
        </div>
        <div className="toggle__glow"></div>
      </button>

      {isOpen && (
        <div
          className="mobile-menu__overlay"
          onClick={handleClose}
          aria-hidden="true"
        />
      )}

      <nav
        className={`mobile-menu ${isOpen ? 'mobile-menu--open' : ''}`}
        id="mobile-menu"
        inert={!isOpen}
      >
        <div className="mobile-menu__container">
          <div className="mobile-menu__header">
            <button
              className="mobile-menu__close"
              onClick={handleClose}
              aria-label="Close mobile menu"
            >
              ×
            </button>
            <div className="menu-header__logo">
              <div className="menu-logo__hexagon">
                <div className="menu-hexagon__inner">
                  <span className="menu-hexagon__symbol">{'{'}</span>
                </div>
              </div>
              <div className="menu-header__text">
                <span className="menu-header__name">T.T.Dev</span>
                <span className="menu-header__title">Frontend Developer</span>
              </div>
            </div>
            <div className="menu-header__status">
              <div className="status__indicator"></div>
              <span className="status__text">ONLINE</span>
            </div>
          </div>

          <div className="mobile-menu__nav">
            <ul className="mobile-nav__list">
              {navItems.map(item => (
                <li key={item.id} className="mobile-nav__item">
                  <button
                    onClick={() => handleNavigateToSection(item.id)}
                    className={`mobile-nav__link ${selectedNavItem === item.id ? 'mobile-nav__link--active' : ''}`}
                    aria-label={`Navigate to ${item.label} section`}
                  >
                    <div className="mobile-nav__content">
                      <div className="mobile-nav__left">
                        <span className="mobile-nav__number">
                          {item.number}
                        </span>
                        {item.icon && (
                          <span className="mobile-nav__icon">
                            {typeof item.icon === 'string' ? (
                              item.icon
                            ) : (
                              <item.icon />
                            )}
                          </span>
                        )}
                      </div>
                      <div className="mobile-nav__center">
                        <span className="mobile-nav__text">{item.label}</span>
                        <div className="mobile-nav__underline"></div>
                      </div>
                      <div className="mobile-nav__right">
                        <div className="mobile-nav__arrow">→</div>
                      </div>
                    </div>
                    <div className="mobile-nav__glow"></div>
                    <div className="mobile-nav__particles">
                      <div className="nav-particle"></div>
                      <div className="nav-particle"></div>
                      <div className="nav-particle"></div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="mobile-menu__footer">
            <div className="menu-footer__grid">
              <div className="grid__line"></div>
              <div className="grid__line"></div>
              <div className="grid__line"></div>
            </div>
            <div className="menu-footer__text">
              <span className="footer__version">v2.0.1</span>
              <span className="footer__status">System Ready</span>
            </div>
          </div>
        </div>

        <div className="mobile-menu__bg-effects">
          <div className="bg-circuit bg-circuit--1"></div>
          <div className="bg-circuit bg-circuit--2"></div>
          <div className="bg-circuit bg-circuit--3"></div>
          <div className="bg-pulse"></div>
        </div>
      </nav>
    </>
  );
};

export default MobileMenu;
