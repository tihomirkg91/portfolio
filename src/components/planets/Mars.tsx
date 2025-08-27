import { Planet } from './Planet';
import { PlanetProps } from './types';

export const marsData = {
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
  texture:
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9Im1hcnNUZXgiIGN4PSI0MCUiIGN5PSI0MCUiIHI9IjUwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2ZmNjM0NyIvPjxzdG9wIG9mZnNldD0iNDAlIiBzdG9wLWNvbG9yPSIjZGMxNDNjIi8+PHN0b3Agb2Zmc2V0PSI4MCUiIHN0b3AtY29sb3I9IiM4YjAwMDAiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM2NTQzMjEiLz48L3JhZGlhbEdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI21hcnNUZXgpIi8+PGNpcmNsZSBjeD0iNzAlIiBjeT0iMzAlIiByPSIxNSUiIGZpbGw9InJnYmEoMTM4LDY5LDE5LDAuMykiLz48Y2lyY2xlIGN4PSIyMCUiIGN5PSI3MCUiIHI9IjEwJSIgZmlsbD0icmdiYSgxMzgsNjksMTksMC4yKSIvPjwvc3ZnPg==',
};

export const Mars = (props: Omit<PlanetProps, 'planetData'>) => {
  return <Planet {...props} planetData={marsData} />;
};
