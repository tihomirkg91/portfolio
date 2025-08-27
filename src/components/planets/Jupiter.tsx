import { Planet } from './Planet';
import { PlanetProps } from './types';

export const jupiterData = {
  name: 'Jupiter',
  color: '#d8ca9d',
  size: 2.2,
  gradient:
    'radial-gradient(ellipse at 30% 30%, #f4a460 0%, #daa520 25%, #b8860b 50%, #8b4513 75%, #654321 100%)',
  boxShadow:
    '0 0 40px rgba(218, 165, 32, 0.7), inset -15px -15px 30px rgba(139, 69, 19, 0.4)',
  kickedGradient:
    'radial-gradient(ellipse at 30% 30%, #ffd700 0%, #ff8c00 25%, #ff6347 50%, #dc143c 75%, #8b0000 100%)',
  kickedBoxShadow:
    '0 0 50px rgba(255, 215, 0, 0.9), inset -12px -12px 25px rgba(220, 20, 60, 0.6)',
  texture:
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9Imp1cGl0ZXJUZXgiIGN4PSI1MCUiIGN5PSI1MCUiIHI9IjUwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2ZhZDZhNSIvPjxzdG9wIG9mZnNldD0iMjUlIiBzdG9wLWNvbG9yPSIjZGFhNTIwIi8+PHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9IiNiODgwZGIiLz48c3RvcCBvZmZzZXQ9Ijc1JSIgc3RvcC1jb2xvcj0iIzhCNDUxMyIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzY1NDMyMSIvPjwvcmFkaWFsR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjSnVwaXRlclRleCkiLz48ZWxsaXBzZSBjeD0iNTAlIiBjeT0iNzAlIiByeD0iMzAlIiByeT0iMTUlIiBmaWxsPSJyZ2JhKDIxOCwxNjUsMzIsMC4zKSIvPjxjaXJjbGUgY3g9IjMwJSIgY3k9IjMwJSIgcj0iMTUlIiBmaWxsPSJyZ2JhKDI1NSwyMTUsMCwwLjIpIi8+PC9zdmc+',
};

export const Jupiter = (props: Omit<PlanetProps, 'planetData'>) => {
  return <Planet {...props} planetData={jupiterData} />;
};
