import { Routes, Route } from 'react-router-dom';
import { Header } from './components/header/Header';
import { CursorTrail } from './components/cursor/CursorTrail';
import {
  CursorTrailProvider,
  useCursorTrail,
} from './contexts/CursorTrailContext';
import { SettingsProvider, useSettings } from './contexts/SettingsContext';
import { HomePage } from './pages/home-page/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ContactPage } from './pages/ContactPage';
import './App.css';

function AppContent() {
  const { trailType } = useCursorTrail();
  const { cursorTrailEnabled } = useSettings();

  return (
    <div
      className={`app ${!cursorTrailEnabled ? 'cursor-trail-disabled' : ''}`}
    >
      {cursorTrailEnabled && <CursorTrail trailType={trailType} />}
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <SettingsProvider>
      <CursorTrailProvider>
        <AppContent />
      </CursorTrailProvider>
    </SettingsProvider>
  );
}

export default App;
