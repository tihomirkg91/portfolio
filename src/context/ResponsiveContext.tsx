import React, {
  createContext,
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

const ResponsiveProvider: React.FC<ResponsiveProviderProps> = ({
  children,
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 1200;
    }
    return false;
  });

  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleResize = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsMobile(window.innerWidth < 1200);
    }, 150);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleResize]);

  const contextValue = useMemo<ResponsiveContextType>(
    () => ({
      isMobile,
    }),
    [isMobile]
  );

  return <ResponsiveContext value={contextValue}>{children}</ResponsiveContext>;
};

export { ResponsiveContext };
export default ResponsiveProvider;
