import React, { useState, useCallback } from 'react';
import { usePortfolio } from '../hooks/usePortfolio';
import useCvGenerator from '../hooks/useCvGenerator';
import './CVDownloadButton.css';

interface CVDownloadButtonProps {
  showPreview?: boolean;
  className?: string;
}

export const CVDownloadButton: React.FC<CVDownloadButtonProps> = ({
  showPreview = false,
  className = '',
}) => {
  const portfolioData = usePortfolio();
  const [currentAction, setCurrentAction] = useState<
    'download' | 'preview' | null
  >(null);

  // Reset function to handle completion
  const reset = useCallback((time?: number) => {
    if (time) {
      setTimeout(() => setCurrentAction(null), time);
    } else {
      setCurrentAction(null);
    }
  }, []);

  // Single hook instance that handles both download and preview
  const { generatePdf, isGenerating } = useCvGenerator({
    portfolioData,
    reset,
    preview: currentAction === 'preview',
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

  const handlePreview = useCallback((): void => {
    try {
      setCurrentAction('preview');
      generatePdf();
    } catch (error) {
      console.error('Error previewing CV:', error);
      setCurrentAction(null);
      handleDownload();
    }
  }, [generatePdf, handleDownload]);

  return (
    <div className={`about-cta ${className}`}>
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

      {showPreview && (
        <button
          onClick={handlePreview}
          disabled={currentAction !== null || isGenerating}
          className={`btn btn-outline ${currentAction === 'preview' || isGenerating ? 'btn-loading' : ''}`}
          type="button"
          aria-label="Preview CV"
        >
          {currentAction === 'preview' || isGenerating
            ? 'Loading Preview...'
            : 'Preview CV'}
        </button>
      )}
    </div>
  );
};

export default CVDownloadButton;
