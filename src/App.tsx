import type { FC } from 'react';
import { lazy, Suspense, memo } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import { PortfolioProvider } from './context/PortfolioContext';
import ResponsiveProvider from './context/ResponsiveContext';

const Navigation = lazy(() => import('./components/Navigation'));
const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));
const ExperienceComponent = lazy(() => import('./components/Experience'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const GamePage = lazy(() => import('./components/GamePage'));

const AppContent: FC = memo(() => (
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
));

const AppRoutes: FC = memo(() => {
  return (
    <Routes>
      <Route path="/" element={<AppContent />} />
      <Route
        path="/falling-planet-rhythm"
        element={
          <Suspense fallback={<LoadingSpinner />}>
            <div className="game-page">
              <ErrorBoundary>
                <Navigation />
              </ErrorBoundary>
              <ErrorBoundary>
                <GamePage />
              </ErrorBoundary>
            </div>
          </Suspense>
        }
      />
    </Routes>
  );
});

const App: FC = () => (
  <ErrorBoundary
    onError={(error, errorInfo) =>
      console.error('Application Error:', error, errorInfo)
    }
  >
    <Router>
      <ResponsiveProvider>
        <PortfolioProvider>
          <AppRoutes />
        </PortfolioProvider>
      </ResponsiveProvider>
    </Router>
  </ErrorBoundary>
);

export default App;
