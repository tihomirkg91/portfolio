import { useState, useEffect, useCallback } from 'react';
import { useActiveDetection } from './useActiveDetection';
import { useNavigationScroll } from './useNavigationScroll';
import { getHeaderOffset } from '../utils/headerOffset';
import {
  FaBolt,
  FaUser,
  FaBullseye,
  FaTrophy,
  FaSatelliteDish,
} from 'react-icons/fa';
import type { NavItem } from '../types';

export interface UseNavItemsReturn {
  navItems: NavItem[];
  handleNavigateToSection: (sectionId: string) => void;
  selectedNavItem: string;
  activeSection: string;
}

export const useNavItems = (): UseNavItemsReturn => {
  const [scrollOffset, setScrollOffset] = useState(() => getHeaderOffset());

  const updateScrollOffset = useCallback(() => {
    setScrollOffset(getHeaderOffset());
  }, []);

  // Update scroll offset when screen size changes
  useEffect(() => {
    window.addEventListener('resize', updateScrollOffset);
    return () => window.removeEventListener('resize', updateScrollOffset);
  }, [updateScrollOffset]);

  const { scrollToSection, isNavigating, selectedSection, setSelectedSection } =
    useNavigationScroll('home');

  const { activeSection } = useActiveDetection({
    sections: ['home', 'about', 'projects', 'experience', 'contact'],
    scrollOffset,
    scrollThreshold: 50,
    isPaused: isNavigating,
  });

  useEffect(() => {
    if (!isNavigating && activeSection && activeSection !== selectedSection) {
      setSelectedSection(activeSection);
    }
  }, [activeSection, selectedSection, isNavigating, setSelectedSection]);

  const navItems: NavItem[] = [
    { id: 'home', label: 'INITIALIZE', number: '01', icon: FaBolt },
    { id: 'about', label: 'PROFILE', number: '02', icon: FaUser },
    { id: 'projects', label: 'MISSIONS', number: '03', icon: FaBullseye },
    { id: 'experience', label: 'ACHIEVEMENTS', number: '04', icon: FaTrophy },
    { id: 'contact', label: 'CONNECT', number: '05', icon: FaSatelliteDish },
  ];

  const handleNavigateToSection = useCallback(
    (sectionId: string) => {
      scrollToSection(sectionId);
    },
    [scrollToSection]
  );

  return {
    navItems,
    handleNavigateToSection,
    selectedNavItem: selectedSection,
    activeSection,
  };
};
