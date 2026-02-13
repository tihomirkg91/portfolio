import { lazy } from 'react';
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
const Marketplace = lazy(() => import('./components/Marketplace'));
const ExperienceComponent = lazy(() => import('./components/Experience'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

const LazyNavigation = LazyWrapper('LazyNavigation');
const LazyHero = LazyWrapper('LazyHero');
const LazyAbout = LazyWrapper('LazyAbout');
const LazyMarketplace = LazyWrapper('LazyMarketplace');
const LazyExperience = LazyWrapper('LazyExperience');
const LazyContact = LazyWrapper('LazyContact');
const LazyFooter = LazyWrapper('LazyFooter');

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

      <LazyMarketplace>
        <Marketplace />
      </LazyMarketplace>

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

const App = () => {
  useServiceWorker();

  return (
    <ResponsiveProvider>
      <PortfolioProvider>
        <AppContent />
      </PortfolioProvider>
    </ResponsiveProvider>
  );
};

export default App;
