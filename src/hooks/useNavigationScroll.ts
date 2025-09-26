import { useCallback, useRef, useState } from 'react';
import { getHeaderOffset } from '../utils/headerOffset';

interface UseNavigationScrollReturn {
  scrollToSection: (sectionId: string) => void;
  isNavigating: boolean;
  selectedSection: string;
  setSelectedSection: (sectionId: string) => void;
}

export const useNavigationScroll = (
  initialSection: string = 'home'
): UseNavigationScrollReturn => {
  const [selectedSection, setSelectedSection] =
    useState<string>(initialSection);
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const navigationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);

    if (!element) {
      console.warn(`Section with id "${sectionId}" not found`);
      return;
    }

    if (navigationTimeoutRef.current)
      clearTimeout(navigationTimeoutRef.current);

    setIsNavigating(true);
    setSelectedSection(sectionId);

    const headerOffset = getHeaderOffset();
    const elementPosition = element.getBoundingClientRect().top;
    const scrollPosition = elementPosition + window.pageYOffset - headerOffset;

    const preferReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const behavior: ScrollBehavior = preferReducedMotion ? 'auto' : 'smooth';

    window.scrollTo({
      top: Math.max(0, scrollPosition),
      left: 0,
      behavior: behavior,
    });

    navigationTimeoutRef.current = setTimeout(
      () => {
        setIsNavigating(false);
      },
      behavior === 'smooth' ? 1000 : 100
    );
  }, []);

  const handleSetSelectedSection = useCallback((sectionId: string) => {
    setSelectedSection(sectionId);
  }, []);

  return {
    scrollToSection,
    isNavigating,
    selectedSection,
    setSelectedSection: handleSetSelectedSection,
  };
};
