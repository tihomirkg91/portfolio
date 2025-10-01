import { lazy } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import LazyWrapper from './components/LazyWrapper';
import { PwaModal } from './components/pwa/PwaModal';
import './components/pwa/PwaModal.css';
import { PortfolioProvider } from './context/PortfolioContext';
import ResponsiveProvider from './context/ResponsiveContext';
import { useServiceWorker } from './hooks/useServiceWorker';

const Navigation = lazy(() => import('./components/Navigation'));
const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));
const ExperienceComponent = lazy(() => import('./components/Experience'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const GamePage = lazy(() => import('./components/GamePage'));

const LazyNavigation = LazyWrapper('LazyNavigation');
const LazyHero = LazyWrapper('LazyHero');
const LazyAbout = LazyWrapper('LazyAbout');
const LazyProjects = LazyWrapper('LazyProjects');
const LazyExperience = LazyWrapper('LazyExperience');
const LazyContact = LazyWrapper('LazyContact');
const LazyFooter = LazyWrapper('LazyFooter');
const LazyGamePage = LazyWrapper('LazyGamePage');

const AppContent = () => (
  <div className="App">
    <PwaModal />
    <LazyNavigation>
      <Navigation />
    </LazyNavigation>

    <main role="main">
      <LazyHero>
        <Hero />
      </LazyHero>

      <LazyAbout>
        <About />
      </LazyAbout>

      <LazyProjects>
        <Projects />
      </LazyProjects>

      <LazyExperience>
        <ExperienceComponent />
      </LazyExperience>

      <LazyContact>
        <Contact />
      </LazyContact>
    </main>

    <LazyFooter>
      <Footer />
    </LazyFooter>
  </div>
);

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<AppContent />} />
    <Route
      path="/falling-planet-rhythm"
      element={
        <div className="game-page">
          <LazyNavigation>
            <Navigation />
          </LazyNavigation>
          <LazyGamePage>
            <GamePage />
          </LazyGamePage>
        </div>
      }
    />
  </Routes>
);

const App = () => {
  useServiceWorker();

  return (
    <Router>
      <ResponsiveProvider>
        <PortfolioProvider>
          <AppRoutes />
        </PortfolioProvider>
      </ResponsiveProvider>
    </Router>
  );
};

export default App;
