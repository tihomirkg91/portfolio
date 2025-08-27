import { Planet } from './Planet';
import { PlanetProps } from './types';

export const saturnData = {
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
  texture:
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9InNhdHVyblRleCIgY3g9IjUwJSIgY3k9IjUwJSIgcj0iNTAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjZmFkNWE1Ii8+PHN0b3Agb2Zmc2V0PSIzMCUiIHN0b3AtY29sb3I9IiNmMGU2OGMiLz48c3RvcCBvZmZzZXQ9IjYwJSIgc3RvcC1jb2xvcj0iI2RhYTUyMCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2I4ODYwYiIvPjwvcmFkaWFsR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjU2F0dXJuVGV4KSIvPjxjaXJjbGUgY3g9IjgwJSIgY3k9IjIwJSIgcj0iMTUlIiBmaWxsPSJyZ2JhKDI0MCwyMzAsMTQwLDAuNikiLz48ZWxsaXBzZSBjeD0iNTAlIiBjeT0iNzUlIiByeD0iMjUlIiByeT0iMTAlIiBmaWxsPSJyZ2JhKDIxOCwxNjUsMzIsMC40KSIvPjwvc3ZnPg==',
};

export const Saturn = (props: Omit<PlanetProps, 'planetData'>) => {
  return <Planet {...props} planetData={saturnData} />;
};
