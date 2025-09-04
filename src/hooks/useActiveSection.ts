import { useCallback, useEffect, useState } from 'react';

interface UseActiveSectionOptions {
  sections?: string[];
  scrollOffset?: number;
  scrollThreshold?: number;
  isScrollingRef?: React.MutableRefObject<boolean>;
}

interface UseActiveSectionReturn {
  isScrolled: boolean;
  activeSection: string;
}

export const useActiveSection = (
  options: UseActiveSectionOptions = {}
): UseActiveSectionReturn => {
  const {
    sections = ['home', 'about', 'projects', 'experience', 'contact'],
    scrollOffset = 100,
    scrollThreshold = 50,
    isScrollingRef,
  } = options;

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(sections[0] || 'home');

  const handleScroll = useCallback(() => {
    if (isScrollingRef?.current) {
      return;
    }

    const scrollY = window.scrollY;

    setIsScrolled(scrollY > scrollThreshold);

    const scrollPosition = scrollY + scrollOffset;
    let foundActiveSection = sections[0];

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
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

    setActiveSection(foundActiveSection);
  }, [sections, scrollOffset, scrollThreshold, isScrollingRef]);

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
