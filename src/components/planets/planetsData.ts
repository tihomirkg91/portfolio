import { PlanetData } from './types';

export const planetsData: PlanetData[] = [
  {
    name: 'Mercury',
    color: '#8c7853',
    size: 0.4,
    gradient:
      'radial-gradient(circle at 30% 30%, #ffd700 0%, #cd853f 40%, #8b4513 100%)',
    boxShadow:
      '0 0 15px rgba(255, 215, 0, 0.4), inset -5px -5px 10px rgba(139, 69, 19, 0.6)',
    kickedGradient:
      'radial-gradient(circle at 30% 30%, #ffff00 0%, #ffa500 40%, #ff4500 100%)',
    kickedBoxShadow:
      '0 0 25px rgba(255, 255, 0, 0.7), inset -3px -3px 8px rgba(255, 69, 0, 0.4)',
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
];
