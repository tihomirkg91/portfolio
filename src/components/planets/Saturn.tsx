import { Planet } from './Planet';
import { PlanetProps } from './types';

export const Saturn = (props: Omit<PlanetProps, 'planetData'>) => {
  const saturnData = {
    name: 'Saturn',
    color: '#fad5a5',
    size: 1.8,
    gradient:
      'radial-gradient(circle at 30% 30%, #fff8dc 0%, #f0e68c 30%, #daa520 60%, #b8860b 100%)',
    boxShadow:
      '0 0 35px rgba(240, 230, 140, 0.6), inset -12px -12px 25px rgba(184, 134, 11, 0.4)',
    kickedGradient:
      'radial-gradient(circle at 30% 30%, #fffacd 0%, #ffff99 30%, #ffd700 60%, #daa520 100%)',
    kickedBoxShadow:
      '0 0 45px rgba(255, 255, 153, 0.8), inset -10px -10px 20px rgba(218, 165, 32, 0.6)',
    rings: true,
  };

  return <Planet {...props} planetData={saturnData} />;
};
