import { Planet } from './Planet';
import { PlanetProps } from './types';

export const Neptune = (props: Omit<PlanetProps, 'planetData'>) => {
  const neptuneData = {
    name: 'Neptune',
    color: '#4b70dd',
    size: 1.5,
    gradient:
      'radial-gradient(circle at 30% 30%, #87cefa 0%, #4169e1 30%, #0000cd 60%, #191970 100%)',
    boxShadow:
      '0 0 30px rgba(65, 105, 225, 0.6), inset -10px -10px 20px rgba(25, 25, 112, 0.5)',
    kickedGradient:
      'radial-gradient(circle at 30% 30%, #b0c4de 0%, #6495ed 30%, #4169e1 60%, #0000ff 100%)',
    kickedBoxShadow:
      '0 0 40px rgba(100, 149, 237, 0.8), inset -8px -8px 15px rgba(0, 0, 255, 0.6)',
  };

  return <Planet {...props} planetData={neptuneData} />;
};
