import type { ReactNode, ErrorInfo } from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import './ErrorBoundary.css';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <div className="error-boundary" role="alert">
      <div className="error-boundary__content">
        <h2 className="error-boundary__title">Something went wrong</h2>
        <p className="error-boundary__message">
          We're sorry, but something unexpected happened. Please try refreshing
          the page.
        </p>
        <div className="error-boundary__actions">
          <button
            onClick={resetErrorBoundary}
            className="btn btn-primary"
            type="button"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-secondary"
            type="button"
          >
            Refresh Page
          </button>
        </div>
        {import.meta.env.DEV && error && (
          <details className="error-boundary__details">
            <summary>Error Details (Development Only)</summary>
            <pre className="error-boundary__stack">
              {error.toString()}
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
};

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  children,
  fallback,
  onError,
}) => {
  const handleError = (error: Error, errorInfo: ErrorInfo) => {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    onError?.(error, errorInfo);
  };

  return (
    <ReactErrorBoundary
      FallbackComponent={fallback ? () => <>{fallback}</> : ErrorFallback}
      onError={handleError}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
