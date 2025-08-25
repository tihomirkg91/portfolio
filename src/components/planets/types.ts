export interface PlanetData {
  name: string;
  color: string;
  size: number;
  gradient: string;
  boxShadow: string;
  kickedGradient: string;
  kickedBoxShadow: string;
  rings?: boolean;
  moons?: number;
}

export interface PlanetProps {
  planetData: PlanetData;
  planetSize: number;
  isKicked: boolean;
  index: number;
}
