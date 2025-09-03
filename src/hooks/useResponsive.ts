import { useState, useEffect, useContext, useCallback, useRef } from "react";
import { ResponsiveContext } from "../context/ResponsiveContext";
import type { ResponsiveContextType } from "../context/ResponsiveContextTypes";

/**
 * Custom hook to consume ResponsiveContext
 * @returns ResponsiveContextType with isMobile and breakpoint info
 */
export const useResponsive = (): ResponsiveContextType => {
  const context = useContext(ResponsiveContext);
  if (!context) {
    throw new Error("useResponsive must be used within a ResponsiveProvider");
  }
  return context;
};

/**
 * Simplified hook that returns only mobile detection
 * @param mobileBreakpoint - Custom mobile breakpoint (default: 768px)
 * @returns boolean indicating if device is mobile
 */
export const useIsMobile = (mobileBreakpoint: number = 768): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < mobileBreakpoint;
    }
    return false;
  });

  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleResize = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    }, 150);
  }, [mobileBreakpoint]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleResize]);

  return isMobile;
};

export default useIsMobile;
