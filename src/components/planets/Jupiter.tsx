import { Planet } from './Planet';
import { PlanetProps } from './types';

export const Jupiter = (props: Omit<PlanetProps, 'planetData'>) => {
  const jupiterData = {
    name: 'Jupiter',
    color: '#d8ca9d',
    size: 2.2,
    gradient:
      'radial-gradient(ellipse at 30% 30%, #f4a460 0%, #daa520 25%, #b8860b 50%, #8b4513 75%, #654321 100%)',
    boxShadow:
      '0 0 40px rgba(218, 165, 32, 0.7), inset -15px -15px 30px rgba(139, 69, 19, 0.4)',
    kickedGradient:
      'radial-gradient(ellipse at 30% 30%, #ffd700 0%, #ff8c00 25%, #ff6347 50%, #dc143c 75%, #8b0000 100%)',
    kickedBoxShadow:
      '0 0 50px rgba(255, 215, 0, 0.9), inset -12px -12px 25px rgba(220, 20, 60, 0.6)',
  };

  return <Planet {...props} planetData={jupiterData} />;
};
