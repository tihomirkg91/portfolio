import React, { useState } from 'react';
import type { PortfolioData } from '../types';
import './LazyPdfGenerator.css';

interface PdfGeneratorProps {
  portfolioData: PortfolioData | null;
  showPreview?: boolean;
  className?: string;
}

const PdfGenerator: React.FC<PdfGeneratorProps> = ({
  portfolioData,
  showPreview = false,
  className = '',
}) => {
  const [currentAction, setCurrentAction] = useState<
    'download' | 'preview' | null
  >(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Dynamic import for PDF libraries
  const loadPdfLibraries = async () => {
    const [
      pdfMake,
      pdfFonts,
      { createPdfDocumentDefinition },
      { convertImageWithCanvas },
    ] = await Promise.all([
      import('pdfmake/build/pdfmake'),
      import('pdfmake/build/vfs_fonts'),
      import('../utils/pdfDocumentBuilder'),
      import('../utils/imageConverter'),
    ]);

    // Initialize PDF fonts
    pdfMake.default.vfs = pdfFonts.default.vfs;

    return {
      pdfMake: pdfMake.default,
      createPdfDocumentDefinition,
      convertImageWithCanvas,
    };
  };

  const generatePdf = async (preview: boolean = false) => {
    if (!portfolioData || Object.keys(portfolioData).length === 0) {
      console.warn('No portfolio data available for PDF generation');
      return;
    }

    setIsGenerating(true);
    setCurrentAction(preview ? 'preview' : 'download');

    try {
      // Dynamically load PDF libraries
      const { pdfMake, createPdfDocumentDefinition, convertImageWithCanvas } =
        await loadPdfLibraries();

      // Load image
      let base64Img = '';
      try {
        base64Img = await convertImageWithCanvas('/pic.jpg');
      } catch (error) {
        console.warn('Failed to load image:', error);
      }

      // Create PDF document
      const docDefinition = createPdfDocumentDefinition(
        portfolioData,
        base64Img
      );

      if (preview) {
        // Open PDF in new window for preview
        pdfMake.createPdf(docDefinition).open();
      } else {
        // Download PDF
        pdfMake
          .createPdf(docDefinition)
          .download(`${portfolioData.personalInfo.fullName}_CV.pdf`);
      }

      // Reset state after a short delay
      setTimeout(() => {
        setCurrentAction(null);
        setIsGenerating(false);
      }, 1000);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setCurrentAction(null);
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    generatePdf(false);
  };

  const handlePreview = () => {
    generatePdf(true);
  };

  const getButtonText = () => {
    if (currentAction === 'download') return 'Downloading...';
    if (currentAction === 'preview') return 'Opening Preview...';
    return 'Download CV';
  };

  const getPreviewText = () => {
    if (currentAction === 'preview') return 'Opening...';
    return 'Preview CV';
  };

  return (
    <div className={`cv-download-container ${className}`}>
      <button
        type="button"
        onClick={handleDownload}
        disabled={isGenerating}
        className={`cv-download-button ${isGenerating ? 'cv-download-button--loading' : ''}`}
        aria-label="Download CV as PDF"
      >
        <span className="cv-download-button__icon">📄</span>
        <span className="cv-download-button__text">{getButtonText()}</span>
      </button>

      {showPreview && (
        <button
          type="button"
          onClick={handlePreview}
          disabled={isGenerating}
          className={`cv-preview-button ${isGenerating ? 'cv-preview-button--loading' : ''}`}
          aria-label="Preview CV in browser"
        >
          <span className="cv-preview-button__icon">👁️</span>
          <span className="cv-preview-button__text">{getPreviewText()}</span>
        </button>
      )}
    </div>
  );
};

export default PdfGenerator;
