import { Planet } from './Planet';
import { PlanetProps } from './types';

export const Venus = (props: Omit<PlanetProps, 'planetData'>) => {
  const venusData = {
    name: 'Venus',
    color: '#ffc649',
    size: 0.9,
    gradient:
      'radial-gradient(circle at 30% 30%, #ffd700 0%, #ff8c00 50%, #ff6347 100%)',
    boxShadow:
      '0 0 20px rgba(255, 140, 0, 0.5), inset -8px -8px 15px rgba(255, 99, 71, 0.4)',
    kickedGradient:
      'radial-gradient(circle at 30% 30%, #ffff80 0%, #ffb347 50%, #ff7f50 100%)',
    kickedBoxShadow:
      '0 0 30px rgba(255, 215, 0, 0.8), inset -5px -5px 12px rgba(255, 127, 80, 0.6)',
  };

  return <Planet {...props} planetData={venusData} />;
};
