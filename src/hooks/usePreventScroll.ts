import { useEffect } from 'react';

/**
 * Custom hook to prevent body scroll when a mobile overlay is open
 * @param isOpen - Whether the overlay is currently open
 */
export const usePreventScroll = (isOpen: boolean) => {
  useEffect(() => {
    if (isOpen) {
      // Store original styles
      const originalOverflow = document.body.style.overflow;
      const originalPosition = document.body.style.position;
      const originalTop = document.body.style.top;
      const originalWidth = document.body.style.width;

      // Prevent scroll
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = '0';
      document.body.style.width = '100%';

      // Restore original styles when overlay closes
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.position = originalPosition;
        document.body.style.top = originalTop;
        document.body.style.width = originalWidth;
      };
    }
  }, [isOpen]);
};
