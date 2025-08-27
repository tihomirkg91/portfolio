import { Planet } from './Planet';
import { PlanetProps } from './types';

export const uranusData = {
  name: 'Uranus',
  color: '#4fd0e7',
  size: 1.6,
  gradient:
    'radial-gradient(circle at 30% 30%, #e0ffff 0%, #87ceeb 30%, #4682b4 60%, #2f4f4f 100%)',
  boxShadow:
    '0 0 30px rgba(135, 206, 235, 0.6), inset -10px -10px 20px rgba(47, 79, 79, 0.5)',
  kickedGradient:
    'radial-gradient(circle at 30% 30%, #f0ffff 0%, #b0e0e6 30%, #5f9ea0 60%, #4682b4 100%)',
  kickedBoxShadow:
    '0 0 40px rgba(176, 224, 230, 0.8), inset -8px -8px 15px rgba(70, 130, 180, 0.6)',
  texture:
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9InVyYW51c1RleCIgY3g9IjUwJSIgY3k9IjUwJSIgcj0iNTAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjNGZkMGU3Ii8+PHN0b3Agb2Zmc2V0PSIzMCUiIHN0b3AtY29sb3I9IiM4N2NlZWIiLz48c3RvcCBvZmZzZXQ9IjYwJSIgc3RvcC1jb2xvcj0iIzQ2ODJiNCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzJmNGY0ZiIvPjwvcmFkaWFsR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjVXJhbnVzVGV4KSIvPjxjaXJjbGUgY3g9IjcwJSIgY3k9IjMwJSIgcj0iMTIlIiBmaWxsPSJyZ2JhKDEzNSwyMDYsMjM1LDAuNikiLz48ZWxsaXBzZSBjeD0iNTAlIiBjeT0iNzAlIiByeD0iMjAlIiByeT0iOCUiIGZpbGw9InJnYmEoMTc1LDIzOCwyMzgsMC41KSIvPjwvc3ZnPg==',
};

export const Uranus = (props: Omit<PlanetProps, 'planetData'>) => {
  return <Planet {...props} planetData={uranusData} />;
};
