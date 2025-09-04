import type { FC } from 'react';
import { lazy, Suspense } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import { PortfolioProvider } from './context/PortfolioContext';
import ResponsiveProvider from './context/ResponsiveContext';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import './App.css';

const Navigation = lazy(() => import('./components/Navigation'));
const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));
const ExperienceComponent = lazy(() => import('./components/Experience'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

const AppContent: FC = () => {
  useScrollAnimation();

  return (
    <div className="App">
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <Navigation />
        </Suspense>
      </ErrorBoundary>

      <main role="main">
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <Hero />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <About />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <Projects />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <ExperienceComponent />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <Contact />
          </Suspense>
        </ErrorBoundary>
      </main>

      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <Footer />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

const App: FC = () => {
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        console.error('Application Error:', error, errorInfo);
      }}
    >
      <ResponsiveProvider>
        <PortfolioProvider>
          <AppContent />
        </PortfolioProvider>
      </ResponsiveProvider>
    </ErrorBoundary>
  );
};

export default App;
