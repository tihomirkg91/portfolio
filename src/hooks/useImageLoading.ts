import { useState, useCallback, useRef, useEffect } from 'react';
import type { SyntheticEvent } from 'react';

interface UseImageLoadingOptions {
  fallbackSrc?: string;
  onLoad?: () => void;
  onError?: (error: SyntheticEvent<HTMLImageElement>) => void;
  lazy?: boolean;
}

interface UseImageLoadingReturn {
  src: string | undefined;
  isLoading: boolean;
  hasError: boolean;
  handleLoad: () => void;
  handleError: (event: SyntheticEvent<HTMLImageElement>) => void;
  imgRef: React.RefObject<HTMLImageElement | null>;
}

export const useImageLoading = (
  initialSrc: string,
  options: UseImageLoadingOptions = {}
): UseImageLoadingReturn => {
  const { fallbackSrc, onLoad, onError, lazy = false } = options;

  const [src, setSrc] = useState<string | undefined>(
    lazy ? undefined : initialSrc
  );
  const [isLoading, setIsLoading] = useState<boolean>(!lazy);
  const [hasError, setHasError] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!lazy || src) return;

    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setSrc(initialSrc);
          setIsLoading(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (imgRef.current) observer.observe(imgRef.current);
    observerRef.current = observer;

    return () => {
      observer.disconnect();
    };
  }, [lazy, initialSrc, src]);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.();
  }, []);

  const handleError = useCallback(
    (event: SyntheticEvent<HTMLImageElement>) => {
      setIsLoading(false);
      setHasError(true);

      if (fallbackSrc && src !== fallbackSrc) {
        setSrc(fallbackSrc);
        setIsLoading(true);
        setHasError(false);
        return;
      }

      onError?.(event);
    },
    [fallbackSrc, src]
  );

  return {
    src,
    isLoading,
    hasError,
    handleLoad,
    handleError,
    imgRef,
  };
};
