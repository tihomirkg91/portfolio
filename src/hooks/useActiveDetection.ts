import { useState, useEffect, useCallback } from 'react';

interface UseActiveDetectionOptions {
  sections?: string[];
  scrollOffset?: number;
  scrollThreshold?: number;
  isPaused?: boolean;
}

interface UseActiveDetectionReturn {
  isScrolled: boolean;
  activeSection: string;
}

export const useActiveDetection = (
  options: UseActiveDetectionOptions = {}
): UseActiveDetectionReturn => {
  const {
    sections = ['home', 'about', 'projects', 'experience', 'contact'],
    scrollOffset = 100,
    scrollThreshold = 50,
    isPaused = false,
  } = options;

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(sections[0] || 'home');

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setIsScrolled(scrollY > scrollThreshold);

    if (isPaused) {
      return;
    }

    const scrollPosition = scrollY + scrollOffset;
    let foundActiveSection = sections[0];

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      if (!section) continue;

      const element = document.getElementById(section);

      if (element) {
        const { offsetTop, offsetHeight } = element;
        const sectionStart = offsetTop;
        const sectionEnd = offsetTop + offsetHeight;

        if (scrollPosition >= sectionStart) {
          foundActiveSection = section;
        }

        if (scrollPosition >= sectionStart && scrollPosition < sectionEnd) {
          foundActiveSection = section;
          break;
        }
      }
    }

    if (foundActiveSection) setActiveSection(foundActiveSection);
  }, [sections, scrollOffset, scrollThreshold, isPaused]);

  useEffect(() => {
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return {
    isScrolled,
    activeSection,
  };
};
