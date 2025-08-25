import type { PlanetData } from '../types';

export interface OrbState {
  id: number;
  velocity: { x: number; y: number };
  position: { x: number; y: number };
  isKicked: boolean;
  kickTime: number;
  restPosition: { x: number; y: number };
  wasNearCursor: boolean;
  planet: PlanetData;
}

export interface MovementProps {
  orbCount: number;
  orbSize: number;
  baseKickForce: number;
  speedMultiplier: number;
  initialPositions?: Array<{ x: number; y: number }>;
  children: (orbStates: OrbState[]) => React.ReactNode;
}

export interface CursorPosition {
  x: number;
  y: number;
}
