import React, { useState, useCallback } from 'react';
import { usePortfolio } from '../hooks/usePortfolio';
import useCvGenerator from '../hooks/useCvGenerator';
import './CVDownloadButton.css';

export const CVDownloadButton: React.FC = () => {
  const portfolioData = usePortfolio();
  const [currentAction, setCurrentAction] = useState<'download' | null>(null);

  const reset = useCallback((time?: number) => {
    if (time) setTimeout(() => setCurrentAction(null), time);
    else setCurrentAction(null);
  }, []);

  const { generatePdf, isGenerating } = useCvGenerator({
    portfolioData,
    reset,
  });

  const handleDownload = useCallback((): void => {
    try {
      setCurrentAction('download');
      generatePdf();
    } catch (error) {
      console.error('Error generating CV:', error);
      setCurrentAction(null);
    }
  }, [generatePdf]);

  return (
    <div className="about-cta">
      <button
        onClick={handleDownload}
        disabled={currentAction !== null || isGenerating}
        className={`btn btn-outline ${currentAction === 'download' || isGenerating ? 'btn-loading' : ''}`}
        type="button"
        aria-label="Download CV as PDF"
      >
        {currentAction === 'download' || isGenerating
          ? 'Generating CV...'
          : 'Download Resume'}
      </button>
    </div>
  );
};

export default CVDownloadButton;
