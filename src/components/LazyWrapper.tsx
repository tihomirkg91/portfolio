import { Suspense, type ReactNode, memo } from 'react';
import ErrorBoundary from './ErrorBoundary';
import LoadingSpinner from './LoadingSpinner';

interface LazyWrapperProps {
  children: ReactNode;
}

const LazyWrapper = (displayName: string) => {
  const Component = memo(({ children }: LazyWrapperProps) => (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
    </ErrorBoundary>
  ));
  Component.displayName = displayName;
  return Component;
};

export default LazyWrapper;
