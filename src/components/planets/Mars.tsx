import { Planet } from './Planet';
import { PlanetProps } from './types';

export const Mars = (props: Omit<PlanetProps, 'planetData'>) => {
  const marsData = {
    name: 'Mars',
    color: '#cd5c5c',
    size: 0.5,
    gradient:
      'radial-gradient(circle at 30% 30%, #ff6347 0%, #dc143c 40%, #8b0000 80%, #654321 100%)',
    boxShadow:
      '0 0 20px rgba(220, 20, 60, 0.5), inset -6px -6px 12px rgba(139, 0, 0, 0.6)',
    kickedGradient:
      'radial-gradient(circle at 30% 30%, #ff7f7f 0%, #ff4500 40%, #b22222 80%, #8b4513 100%)',
    kickedBoxShadow:
      '0 0 30px rgba(255, 69, 0, 0.7), inset -4px -4px 10px rgba(178, 34, 34, 0.5)',
  };

  return <Planet {...props} planetData={marsData} />;
};
