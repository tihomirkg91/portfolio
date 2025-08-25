export interface PlanetAnimationProps {
  isKicked: boolean;
  size: number;
  children: React.ReactNode;
}

export interface AnimationConfig {
  rotation: {
    normal: number;
    kicked: number;
  };
  scale: {
    normal: number;
    kicked: number;
  };
  glow: {
    intensity: number;
    duration: number;
  };
  wobble?: {
    amplitude: number;
    frequency: number;
  };
}
