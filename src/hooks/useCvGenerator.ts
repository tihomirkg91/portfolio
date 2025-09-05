import type { PortfolioData } from '../types';
import { useImageLoader } from './useImageLoader';
import { usePdfGenerator } from './usePdfGenerator';

interface IProps {
  portfolioData: PortfolioData | null;
  reset: (time?: number) => void;
  preview?: boolean;
}

const useCvGenerator = ({ portfolioData, reset, preview = false }: IProps) => {
  const {
    base64Img,
    imageLoaded,
    isLoading: imageLoading,
    error: imageError,
  } = useImageLoader({
    imageUrl: '/pic.webp',
  });

  const { generatePdf, isGenerating, error, retryGeneration } = usePdfGenerator(
    {
      portfolioData,
      base64Img,
      imageLoaded,
      reset,
      preview,
    }
  );

  return {
    generatePdf,
    isGenerating,
    error,
    retryGeneration,
    imageLoading,
    imageError,
    imageLoaded,
  };
};

export default useCvGenerator;
