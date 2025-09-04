export const convertImageToBase64 = async (
  imageUrl: string
): Promise<string> => {
  try {
    const response = await fetch(imageUrl);
    if (response.ok) {
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
          const base64 = reader.result as string;
          resolve(base64);
        };

        reader.onerror = () => {
          console.error('FileReader failed');
          reject(new Error('FileReader failed'));
        };

        reader.readAsDataURL(blob);
      });
    }
    throw new Error(`Failed to fetch image: ${response.status}`);
  } catch (error) {
    console.error('Error converting image to base64:', error);
    throw error;
  }
};

export const convertImageWithCanvas = (
  imageUrl: string,
  maxWidth: number = 300,
  maxHeight: number = 300,
  quality: number = 0.9
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      const aspectRatio = img.width / img.height;
      let targetWidth = maxWidth;
      let targetHeight = maxHeight;

      if (aspectRatio > 1) {
        targetHeight = maxWidth / aspectRatio;
      } else {
        targetWidth = maxHeight * aspectRatio;
      }

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      const format = 'image/jpeg';
      const base64 = canvas.toDataURL(format, quality);
      resolve(base64);
    };

    img.onerror = () => {
      reject(new Error(`Failed to load image: ${imageUrl}`));
    };

    img.crossOrigin = 'anonymous';
    img.src = imageUrl;
  });
};

export const isValidBase64Image = (base64String: string): boolean => {
  if (!base64String) {
    return false;
  }

  const dataUrlRegex = /^data:image\/(png|jpg|jpeg|gif|webp);base64,/;
  const isValid = dataUrlRegex.test(base64String);

  if (isValid && base64String.length < 100) {
    return false;
  }

  return isValid;
};
