import { Planet } from './Planet';
import { PlanetProps } from './types';
import './earth.css';

export const Earth = (props: Omit<PlanetProps, 'planetData'>) => {
  const earthData = {
    name: 'Earth',
    color: '#6b93d6',
    size: 1,
    gradient:
      'radial-gradient(circle at 30% 30%, #87ceeb 0%, #4682b4 30%, #228b22 60%, #006400 100%)',
    boxShadow:
      '0 0 25px rgba(70, 130, 180, 0.6), inset -10px -10px 20px rgba(0, 100, 0, 0.3)',
    kickedGradient:
      'radial-gradient(circle at 30% 30%, #b0e0e6 0%, #5f9ea0 30%, #32cd32 60%, #228b22 100%)',
    kickedBoxShadow:
      '0 0 35px rgba(135, 206, 235, 0.8), inset -8px -8px 15px rgba(50, 205, 50, 0.5)',
    texture: 'https://eoimages.gsfc.nasa.gov/images/imagerecords/73000/73909/world.topo.bathy.200412.3x5400x2700.jpg',
  };

  return <Planet {...props} planetData={earthData} />;
};
