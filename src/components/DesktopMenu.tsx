import React from 'react';

import { useNavItems } from '../hooks/useNavItems';
import './DesktopMenu.css';

const DesktopMenu: React.FC = () => {
  const { navItems, handleNavigateToSection, selectedNavItem } = useNavItems();

  return (
    <nav className="desktop-menu">
      <ul className="desktop-menu__list">
        {navItems.map(item => (
          <li key={item.id} className="desktop-menu__item">
            <button
              onClick={() => handleNavigateToSection(item.id)}
              className={`desktop-menu__link ${selectedNavItem === item.id ? 'desktop-menu__link--active' : ''}`}
              aria-label={`Navigate to ${item.label} section`}
            >
              {item.icon && (
                <div className="desktop-menu__icon">
                  {React.createElement(item.icon as React.ComponentType)}
                </div>
              )}
              <span className="desktop-menu__number">{item.number}</span>
              <span className="desktop-menu__text">{item.label}</span>
              <div className="desktop-menu__glow"></div>
              <div className="desktop-menu__indicator">
                <div className="indicator__pulse"></div>
                <div className="indicator__core"></div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DesktopMenu;
