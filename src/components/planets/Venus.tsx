import { Planet } from './Planet';
import { PlanetProps } from './types';

export const venusData = {
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
  texture:
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9InZlbnVzVGV4IiBjeD0iNTAlIiBjeT0iNTAlIiByPSI1MCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmZmQ3MDAiLz48c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iI2ZmOGMwMCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2ZmNjM0NyIvPjwvcmFkaWFsR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjdmVudXNUZXgpIi8+PGNpcmNsZSBjeD0iODAlIiBjeT0iMjAlIiByPSIxOCUiIGZpbGw9InJnYmEoMjU1LDIxMiwwLDAuMiwiLz48Y2lyY2xlIGN4PSIyMCUiIGN5PSI4MCUiIHI9IjE0JSIgZmlsbD0icmdiYSgyNTUsMTkyLDAsMC4xKSIvPjwvc3ZnPg==',
};

export const Venus = (props: Omit<PlanetProps, 'planetData'>) => {
  return <Planet {...props} planetData={venusData} />;
};
