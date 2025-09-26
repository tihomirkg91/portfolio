import { useEffect, useState } from 'react';
import { convertImageToDataURL } from '../utils/imageConverter';

interface UseImageLoaderProps {
  imageUrl: string;
}

interface UseImageLoaderReturn {
  base64Img: string;
  imageLoaded: boolean;
  isLoading: boolean;
  error: string | null;
}

export const useImageLoader = ({
  imageUrl,
}: UseImageLoaderProps): UseImageLoaderReturn => {
  const [base64Img, setBase64Img] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadImage = async () => {
      if (!imageUrl) return;

      setIsLoading(true);
      setError(null);

      try {
        const base64 = await convertImageToDataURL(imageUrl);
        setBase64Img(base64);
        setImageLoaded(true);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to load image';
        setError(errorMessage);
        console.error('Error loading image:', errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    loadImage();
  }, [imageUrl]);

  return {
    base64Img,
    imageLoaded,
    isLoading,
    error,
  };
};
