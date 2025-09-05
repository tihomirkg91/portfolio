import { useEffect, useState } from 'react';
import type { PortfolioData } from '../types';
import { convertImageWithCanvas } from '../utils/imageConverter';
import { createPdfDocumentDefinition } from '../utils/pdfDocumentBuilder';

interface UsePdfGeneratorProps {
  portfolioData: PortfolioData | null;
  base64Img: string;
  imageLoaded: boolean;
  reset: (time?: number) => void;
  preview?: boolean;
}

interface UsePdfGeneratorReturn {
  generatePdf: () => Promise<void>;
  isGenerating: boolean;
  error: string | null;
  retryGeneration: () => Promise<void>;
}

export const usePdfGenerator = ({
  portfolioData,
  base64Img,
  imageLoaded,
  reset,
  preview = false,
}: UsePdfGeneratorProps): UsePdfGeneratorReturn => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 2;

  useEffect(() => {
    const loadPdfMake = async () => {
      const pdfMakeModule = await import('pdfmake/build/pdfmake');
      const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
      pdfMakeModule.vfs = pdfFontsModule.vfs;
    };
    loadPdfMake();
  }, []);

  const ensureImageReady = async (): Promise<string> => {
    if (imageLoaded && base64Img) {
      return base64Img;
    }

    try {
      const fallbackBase64 = await convertImageWithCanvas(
        '/pic.webp',
        300,
        300,
        0.8
      );
      return fallbackBase64;
    } catch (error) {
      console.warn('Failed to load fallback image:', error);
      return '';
    }
  };

  const generatePdfInternal = async (): Promise<void> => {
    if (!portfolioData || Object.keys(portfolioData).length === 0) {
      const errorMsg = 'No portfolio data available for PDF generation';
      console.warn(errorMsg);
      setError(errorMsg);
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const finalBase64Img = await ensureImageReady();

      await new Promise(resolve => setTimeout(resolve, 100));

      const { default: pdfMake } = await import('pdfmake/build/pdfmake');

      const documentDefinition = createPdfDocumentDefinition(
        portfolioData,
        finalBase64Img
      );
      const filename = `${portfolioData.personalInfo.firstName}_${portfolioData.personalInfo.lastName}_CV.pdf`;

      if (preview) {
        pdfMake.createPdf(documentDefinition).open();
      } else {
        pdfMake.createPdf(documentDefinition).download(filename);
      }

      setRetryCount(0);
      reset();
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : 'Error generating PDF';
      console.error('Error generating PDF:', error);
      setError(errorMsg);

      if (retryCount < maxRetries) {
        console.log(
          `Retrying PDF generation (attempt ${retryCount + 1}/${maxRetries})`
        );
        setRetryCount(prev => prev + 1);
        setTimeout(() => generatePdfInternal(), 1000);
        return;
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const generatePdf = async (): Promise<void> => {
    setRetryCount(0);
    await generatePdfInternal();
  };

  const retryGeneration = async (): Promise<void> => {
    setError(null);
    setRetryCount(0);
    await generatePdfInternal();
  };

  return {
    generatePdf,
    isGenerating,
    error,
    retryGeneration,
  };
};
