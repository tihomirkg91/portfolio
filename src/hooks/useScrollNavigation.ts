import { useCallback, useEffect, useRef, useState } from 'react';
import { getHeaderOffset } from '../utils/headerOffset';

interface ScrollToOptions {
  readonly behavior?: ScrollBehavior;
  readonly block?: ScrollLogicalPosition;
  readonly inline?: ScrollLogicalPosition;
  readonly headerOffset?: number;
}

interface UseScrollNavigationOptions {
  readonly activeSection?: string;
  readonly autoScrollToActiveSection?: boolean;
}

interface UseScrollNavigationReturn {
  readonly scrollToElement: (
    elementId: string,
    options?: ScrollToOptions
  ) => void;
  readonly scrollToTop: () => void;
  readonly ensureActiveSectionInView: () => void;
  readonly isScrolling: React.MutableRefObject<boolean>;
  readonly setSelectedNavItem: React.Dispatch<React.SetStateAction<string>>;
  readonly selectedNavItem: string;
}

const SCROLL_TIMEOUT_MS = 1000;

export const useScrollNavigation = (
  options: UseScrollNavigationOptions = {}
): UseScrollNavigationReturn => {
  const { activeSection, autoScrollToActiveSection = false } = options;
  const [selectedNavItem, setSelectedNavItem] = useState<string>(
    activeSection || 'home'
  );
  const isScrolling = useRef<boolean>(false);
  const userNavigatedRef = useRef<boolean>(false);
  const pendingScrollTarget = useRef<string | null>(null);

  useEffect(() => {
    if (
      activeSection &&
      activeSection !== selectedNavItem &&
      !userNavigatedRef.current &&
      !isScrolling.current
    ) {
      setSelectedNavItem(activeSection);
    }
  }, [activeSection, selectedNavItem]);

  const scrollToElement = useCallback(
    (elementId: string, options: ScrollToOptions = {}) => {
      const element = document.getElementById(elementId);

      if (!element) {
        return;
      }

      if (isScrolling.current) {
        pendingScrollTarget.current = elementId;
        return;
      }

      isScrolling.current = true;
      pendingScrollTarget.current = null;

      const { behavior = 'smooth', headerOffset = getHeaderOffset() } = options;

      try {
        const preferReducedMotion = window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches;
        const scrollBehavior: ScrollBehavior = preferReducedMotion
          ? 'auto'
          : behavior;

        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          left: 0,
          behavior: scrollBehavior,
        });

        /**
         * Reset scrolling state and process any queued scroll requests.
         * Timeout duration matches smooth scroll animation timing.
         */
        setTimeout(() => {
          isScrolling.current = false;

          if (pendingScrollTarget.current) {
            const targetId = pendingScrollTarget.current;
            pendingScrollTarget.current = null;
            scrollToElement(targetId, options);
          }
        }, SCROLL_TIMEOUT_MS);
      } catch (error) {
        console.error('Error during scroll navigation:', error);
        isScrolling.current = false;
        pendingScrollTarget.current = null;
      }
    },
    []
  );

  const ensureActiveSectionInView = useCallback(() => {
    if (!activeSection) return;

    const element = document.getElementById(activeSection);
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const headerOffset = getHeaderOffset();
    const isInView =
      rect.top >= headerOffset && rect.bottom <= window.innerHeight;

    if (!isInView && !isScrolling.current) {
      scrollToElement(activeSection, {
        behavior: 'smooth',
        headerOffset,
      });
    }
  }, [activeSection, scrollToElement]);

  useEffect(() => {
    if (autoScrollToActiveSection && activeSection) ensureActiveSectionInView();
  }, [activeSection, autoScrollToActiveSection, ensureActiveSectionInView]);

  const scrollToTop = useCallback(() => {
    if (isScrolling.current) {
      return;
    }

    isScrolling.current = true;

    try {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });

      setTimeout(() => {
        isScrolling.current = false;
      }, SCROLL_TIMEOUT_MS);
    } catch (error) {
      console.error('Error during scroll to top:', error);
      isScrolling.current = false;
    }
  }, []);

  const handleSetSelectedNavItem = useCallback(
    (value: React.SetStateAction<string>) => {
      userNavigatedRef.current = true;
      const currentValue =
        typeof value === 'function' ? value(selectedNavItem) : value;

      setSelectedNavItem(currentValue);

      if (currentValue !== activeSection && !isScrolling.current) {
        scrollToElement(currentValue);
      }

      setTimeout(() => {
        userNavigatedRef.current = false;
      }, 100);
    },
    [selectedNavItem, activeSection, scrollToElement]
  );

  return {
    scrollToElement,
    scrollToTop,
    ensureActiveSectionInView,
    isScrolling,
    setSelectedNavItem: handleSetSelectedNavItem,
    selectedNavItem,
  };
};
