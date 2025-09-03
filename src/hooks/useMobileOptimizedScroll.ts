import { useCallback, useRef } from "react";
import { useResponsive } from "./useResponsive";
import { getHeaderOffset } from "../utils/headerOffset";

interface MobileScrollOptions {
  headerOffset?: number;
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
}

interface UseMobileOptimizedScrollReturn {
  scrollToSection: (elementId: string, options?: MobileScrollOptions) => void;
  isScrolling: React.MutableRefObject<boolean>;
}

/**
 * Custom hook for mobile-optimized scrolling
 * Provides instant scrolling on mobile for better performance and UX
 */
export const useMobileOptimizedScroll = (): UseMobileOptimizedScrollReturn => {
  const { isMobile } = useResponsive();
  const isScrolling = useRef<boolean>(false);

  const scrollToSection = useCallback(
    (elementId: string, options: MobileScrollOptions = {}) => {
      const { headerOffset = getHeaderOffset(), behavior = isMobile ? "auto" : "smooth", block = "start" } = options;

      const element = document.getElementById(elementId);

      if (!element) {
        console.warn(`Element with id "${elementId}" not found`);
        return;
      }

      if (isScrolling.current) {
        return;
      }

      isScrolling.current = true;

      try {
        if (isMobile) {
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          requestAnimationFrame(() => {
            window.scrollTo({
              top: Math.max(0, offsetPosition),
              left: 0,
              behavior: "auto",
            });

            setTimeout(() => {
              isScrolling.current = false;
            }, 100);
          });
        } else {
          element.scrollIntoView({
            behavior,
            block,
            inline: "nearest",
          });

          setTimeout(() => {
            isScrolling.current = false;
          }, 1000);
        }
      } catch (error) {
        console.error("Error during mobile optimized scroll:", error);
        isScrolling.current = false;
      }
    },
    [isMobile]
  );

  return {
    scrollToSection,
    isScrolling,
  };
};
