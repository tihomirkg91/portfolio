export const getHeaderOffset = (): number => {
  if (typeof window === 'undefined') return 80;

  const width = window.innerWidth;
  if (width <= 480) return 65;
  if (width <= 768) return 70;
  return 80;
};

export const getScrollOffset = (): number => {
  const baseOffset = getHeaderOffset();
  return baseOffset === 80 ? 100 : baseOffset;
};
