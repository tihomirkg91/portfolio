import { useCallback, useRef, useEffect, useState } from "react";
import { getHeaderOffset } from "../utils/headerOffset";

interface ScrollToOptions {
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
  inline?: ScrollLogicalPosition;
  headerOffset?: number;
}

interface UseScrollNavigationOptions {
  activeSection?: string;
  autoScrollToActiveSection?: boolean;
}

interface UseScrollNavigationReturn {
  scrollToElement: (elementId: string, options?: ScrollToOptions) => void;
  scrollToTop: () => void;
  ensureActiveSectionInView: () => void;
  isScrolling: React.MutableRefObject<boolean>;
  setSelectedNavItem: React.Dispatch<React.SetStateAction<string>>;
  selectedNavItem: string;
}

/**
 * Custom hook for smooth scroll navigation with enhanced features
 * Provides utilities for scrolling to elements and managing scroll state
 */
export const useScrollNavigation = (options: UseScrollNavigationOptions = {}): UseScrollNavigationReturn => {
  const { activeSection, autoScrollToActiveSection = false } = options;
  const [selectedNavItem, setSelectedNavItem] = useState<string>(activeSection || "home");
  const isScrolling = useRef<boolean>(false);
  const userNavigatedRef = useRef<boolean>(false);
  const pendingScrollTarget = useRef<string | null>(null);

  /**
   * Synchronize navigation selection with active section based on scroll position.
   * Only updates when user hasn't manually navigated to prevent conflicts.
   */
  useEffect(() => {
    if (activeSection && activeSection !== selectedNavItem && !userNavigatedRef.current && !isScrolling.current) {
      /** Update navigation immediately for natural scroll-based section changes */
      setSelectedNavItem(activeSection);
    }
  }, [activeSection, selectedNavItem]);

  const scrollToElement = useCallback((elementId: string, options: ScrollToOptions = {}) => {
    const element = document.getElementById(elementId);

    if (!element) {
      console.warn(`Element with id "${elementId}" not found`);
      return;
    }

    /**
     * Queue scroll requests when already scrolling to prevent conflicts.
     * The pending target will be processed after current scroll completes.
     */
    if (isScrolling.current) {
      pendingScrollTarget.current = elementId;
      return;
    }

    isScrolling.current = true;
    pendingScrollTarget.current = null;

    const { behavior = "smooth", headerOffset = getHeaderOffset() } = options;

    try {
      // Respect user's motion preferences
      const preferReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const scrollBehavior: ScrollBehavior = preferReducedMotion ? "auto" : behavior;

      // Use precise scroll positioning with header offset
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

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

        /** Process queued scroll request if one exists */
        if (pendingScrollTarget.current) {
          const targetId = pendingScrollTarget.current;
          pendingScrollTarget.current = null;
          scrollToElement(targetId, options);
        }
      }, 1000); /** Approximate duration for smooth scroll animation */
    } catch (error) {
      console.error("Error during scroll navigation:", error);
      isScrolling.current = false;
      pendingScrollTarget.current = null;
    }
  }, []);

  const ensureActiveSectionInView = useCallback(() => {
    if (!activeSection) return;

    const element = document.getElementById(activeSection);
    if (!element) return;

    // Check if element is already properly in view accounting for header
    const rect = element.getBoundingClientRect();
    const headerOffset = getHeaderOffset();
    const isInView = rect.top >= headerOffset && rect.bottom <= window.innerHeight;

    if (!isInView && !isScrolling.current) {
      scrollToElement(activeSection, {
        behavior: "smooth",
        headerOffset,
      });
    }
  }, [activeSection, scrollToElement]);

  // Auto-scroll to active section if autoScrollToActiveSection is enabled
  useEffect(() => {
    if (autoScrollToActiveSection && activeSection) {
      ensureActiveSectionInView();
    }
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
        behavior: "smooth",
      });

      setTimeout(() => {
        isScrolling.current = false;
      }, 1000);
    } catch (error) {
      console.error("Error during scroll to top:", error);
      isScrolling.current = false;
    }
  }, []);

  // Wrapper for setSelectedNavItem that marks user-initiated navigation
  const handleSetSelectedNavItem = useCallback(
    (value: React.SetStateAction<string>) => {
      userNavigatedRef.current = true;
      const currentValue = typeof value === "function" ? value(selectedNavItem) : value;

      // Always update the selected nav item immediately for UI responsiveness
      setSelectedNavItem(currentValue);

      // Don't trigger automatic scroll if we're already scrolling
      // This prevents double-scrolling when manual navigation is used
      if (currentValue !== activeSection && !isScrolling.current) {
        scrollToElement(currentValue);
      }

      // Reset user navigation flag after a short delay to allow natural sync again
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
