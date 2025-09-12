export interface Note {
  id: number;
  lane: number;
  y: number;
  speed: number;
  size: number;
  color: string;
}

export interface HitZone {
  lane: number;
  active: boolean;
  timer: number;
}
