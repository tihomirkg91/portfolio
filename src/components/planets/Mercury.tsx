import { Planet } from './Planet';
import { PlanetProps } from './types';

export const Mercury = (props: Omit<PlanetProps, 'planetData'>) => {
  const mercuryData = {
    name: 'Mercury',
    color: '#8c7853',
    size: 0.4,
    gradient:
      'radial-gradient(circle at 30% 30%, #ffd700 0%, #cd853f 40%, #8b4513 100%)',
    boxShadow:
      '0 0 15px rgba(255, 215, 0, 0.4), inset -5px -5px 10px rgba(139, 69, 19, 0.6)',
    kickedGradient:
      'radial-gradient(circle at 30% 30%, #ffff00 0%, #ffa500 40%, #ff4500 100%)',
    kickedBoxShadow:
      '0 0 25px rgba(255, 255, 0, 0.7), inset -3px -3px 8px rgba(255, 69, 0, 0.4)',
  };

  return <Planet {...props} planetData={mercuryData} />;
};
