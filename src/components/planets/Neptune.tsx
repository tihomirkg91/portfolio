import { Planet } from './Planet';
import { PlanetProps } from './types';

export const neptuneData = {
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
  texture:
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9Im5lcHR1bmVUZXgiIGN4PSI1MCUiIGN5PSI1MCUiIHI9IjUwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzRiNzBkZCIvPjxzdG9wIG9mZnNldD0iMzAlIiBzdG9wLWNvbG9yPSIjODdjZWZhIi8+PHN0b3Agb2Zmc2V0PSI2MCUiIHN0b3AtY29sb3I9IiM0MTY5ZTEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwMDAwY2QiLz48L3JhZGlhbEdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI25lcHR1bmVUZXgpIi8+PGNpcmNsZSBjeD0iODAlIiBjeT0iMjAlIiByPSIxOCUiIGZpbGw9InJnYmEoNjUsMTA1LDIyNSwwLjgpIi8+PGNpcmNsZSBjeD0iMjAlIiBjeT0iNzAlIiByPSIxNCUiIGZpbGw9InJnYmEoMCwwLDIwNSwwLjYpIi8+PC9zdmc+',
};

export const Neptune = (props: Omit<PlanetProps, 'planetData'>) => {
  return <Planet {...props} planetData={neptuneData} />;
};
