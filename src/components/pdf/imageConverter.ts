export const convertImageToDataURL = async (
  imageUrl: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Failed to get canvas context'));
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/jpeg', 0.9));
    };
    img.onerror = () => reject(new Error(`Failed to load image: ${imageUrl}`));
    img.src = imageUrl;
  });
};

export const isValidBase64Image = (base64String: string): boolean => {
  if (!base64String) return false;

  const dataUrlRegex = /^data:image\/(png|jpg|jpeg|gif|webp);base64,/;
  const isValid = dataUrlRegex.test(base64String);

  if (isValid && base64String.length < 100) return false;

  return isValid;
};
