import { useCallback, useEffect, useState, useMemo } from 'react';

interface UseActiveSectionOptions {
  readonly sections?: readonly string[];
  readonly scrollOffset?: number;
  readonly scrollThreshold?: number;
  readonly isScrollingRef?: React.MutableRefObject<boolean>;
}

interface UseActiveSectionReturn {
  readonly isScrolled: boolean;
  readonly activeSection: string;
}

const DEFAULT_SECTIONS = [
  'home',
  'about',
  'projects',
  'experience',
  'contact',
] as const;

export const useActiveSection = (
  options: UseActiveSectionOptions = {}
): UseActiveSectionReturn => {
  const {
    sections = DEFAULT_SECTIONS,
    scrollOffset = 100,
    scrollThreshold = 50,
    isScrollingRef,
  } = options;

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(
    () => sections[0] || 'home'
  );

  const sectionsArray = useMemo(() => [...sections], [sections]);

  const handleScroll = useCallback(() => {
    if (isScrollingRef?.current) return;

    const scrollY = window.scrollY;

    setIsScrolled(scrollY > scrollThreshold);

    const scrollPosition = scrollY + scrollOffset;
    let foundActiveSection = sectionsArray[0];

    for (const section of sectionsArray) {
      if (!section) continue;

      const element = document.getElementById(section);

      if (element) {
        const { offsetTop, offsetHeight } = element;
        const sectionStart = offsetTop;
        const sectionEnd = offsetTop + offsetHeight;

        if (scrollPosition >= sectionStart) foundActiveSection = section;

        if (scrollPosition >= sectionStart && scrollPosition < sectionEnd) {
          foundActiveSection = section;
          break;
        }
      }
    }

    if (foundActiveSection) setActiveSection(foundActiveSection);
  }, [sectionsArray, scrollOffset, scrollThreshold, isScrollingRef]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return {
    isScrolled,
    activeSection,
  };
};
