import { Planet } from './Planet';
import { PlanetProps } from './types';
import './earth.css';

export const earthData = {
  name: 'Earth',
  color: '#6b93d6',
  size: 1,
  gradient: `
    radial-gradient(circle at 50% 50%, 
      #1e40af 0%, 
      #2563eb 30%, 
      #3b82f6 60%, 
      #1e40af 100%
    )
  `,
  boxShadow: `
    0 0 30px rgba(100, 149, 237, 0.4),
    inset -15px -15px 30px rgba(25, 25, 112, 0.3),
    inset 10px 10px 20px rgba(135, 206, 235, 0.2),
    0 0 60px rgba(70, 130, 180, 0.2)
  `,
  kickedGradient: `
    radial-gradient(ellipse 45% 35% at 30% 20%, rgba(176, 224, 230, 0.9) 0%, transparent 50%),
    radial-gradient(ellipse 30% 40% at 65% 35%, rgba(50, 205, 50, 0.8) 0%, transparent 60%),
    radial-gradient(ellipse 35% 25% at 15% 65%, rgba(60, 179, 113, 0.7) 0%, transparent 50%),
    radial-gradient(ellipse 40% 30% at 80% 75%, rgba(144, 238, 144, 0.6) 0%, transparent 55%),
    radial-gradient(ellipse 25% 45% at 35% 85%, rgba(210, 180, 140, 0.5) 0%, transparent 40%),
    linear-gradient(125deg, 
      #B0E0E6 0%, 
      #5F9EA0 15%, 
      #32CD32 25%, 
      #90EE90 35%, 
      #228B22 45%, 
      #3CB371 55%, 
      #5F9EA0 65%, 
      #87CEEB 75%, 
      #B0E0E6 85%, 
      #6495ED 100%
    )
  `,
  kickedBoxShadow: `
    0 0 50px rgba(135, 206, 235, 0.6),
    inset -12px -12px 25px rgba(47, 79, 79, 0.3),
    inset 12px 12px 25px rgba(176, 224, 230, 0.3),
    0 0 80px rgba(100, 149, 237, 0.3)
  `,
  texture:
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9ImVhcnRoVGV4IiBjeD0iNTAlIiBjeT0iNTAlIiByPSI1MCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxZTQwYWYiLz48c3RvcCBvZmZzZXQ9IjMwJSIgc3RvcC1jb2xvcj0iIzI1NjNlYiIvPjxzdG9wIG9mZnNldD0iNjAlIiBzdG9wLWNvbG9yPSIjM2I4MmY2Ii8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjNmI5M2Q2Ii8+PC9yYWRpYWxHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNlYXJ0aFRleCkiLz48Y2lyY2xlIGN4PSI3MCUiIGN5PSIzMCUiIHI9IjIwJSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+',
};

export const Earth = (props: Omit<PlanetProps, 'planetData'>) => {
  return <Planet {...props} planetData={earthData} />;
};
