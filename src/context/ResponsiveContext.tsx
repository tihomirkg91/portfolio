import React, {
  createContext,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type {
  ResponsiveContextType,
  ResponsiveProviderProps,
} from './ResponsiveContextTypes';

const ResponsiveContext = createContext<ResponsiveContextType | undefined>(
  undefined
);

const MOBILE_BREAKPOINT = 1200;
const RESIZE_DEBOUNCE_MS = 150;

const ResponsiveProvider: React.FC<ResponsiveProviderProps> = memo(
  ({ children }) => {
    const [isMobile, setIsMobile] = useState<boolean>(() => {
      if (typeof window !== 'undefined') {
        return window.innerWidth < MOBILE_BREAKPOINT;
      }
      return false;
    });

    const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

    const handleResize = useCallback(() => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(
        () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT),
        RESIZE_DEBOUNCE_MS
      );
    }, []);

    useEffect(() => {
      window.addEventListener('resize', handleResize);
      handleResize();

      return () => {
        window.removeEventListener('resize', handleResize);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }, [handleResize]);

    const contextValue = useMemo<ResponsiveContextType>(
      () => ({
        isMobile,
      }),
      [isMobile]
    );

    return (
      <ResponsiveContext value={contextValue}>{children}</ResponsiveContext>
    );
  }
);

ResponsiveProvider.displayName = 'ResponsiveProvider';

export { ResponsiveContext };
export default ResponsiveProvider;
