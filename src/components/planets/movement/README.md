# Planet Movement System

This folder contains the movement and physics logic for the floating planets.

## Structure

```
movement/
├── types.ts           # Movement-related TypeScript interfaces
├── PlanetMovement.tsx # Main movement logic component
└── README.md          # Documentation
```

## Overview

The `PlanetMovement` component is a render prop component that handles all the physics, cursor interaction, and state management for the floating planets. It separates the movement logic from the visual presentation.

## Features

- **Physics Simulation**: Realistic movement with friction, bouncing, and momentum
- **Cursor Interaction**: Detects cursor proximity and applies kick forces
- **Touch Support**: Full touch device compatibility
- **Configurable Parameters**: Customizable kick force, speed, and physics
- **Render Props Pattern**: Flexible rendering through children function

## Usage

```tsx
import { PlanetMovement } from './planets/movement/PlanetMovement';

<PlanetMovement
  orbCount={8}
  orbSize={50}
  baseKickForce={10}
  speedMultiplier={0.5}
  initialPositions={[
    { x: 20, y: 30 },
    { x: 40, y: 60 },
    // ... more positions
  ]}
>
  {(orbStates) => (
    <div>
      {orbStates.map((orb, i) => (
        <div key={orb.id}>{/* Render your planet here */}</div>
      ))}
    </div>
  )}
</PlanetMovement>;
```

## Props

### PlanetMovement Props

- `orbCount`: Number of planets to create
- `orbSize`: Base size for collision detection (in pixels)
- `baseKickForce`: Base force applied when cursor hits a planet
- `speedMultiplier`: Multiplier for cursor speed bonus
- `initialPositions`: Optional array of initial positions
- `children`: Render function that receives `orbStates` array

### OrbState Structure

Each orb state contains:

```tsx
{
  id: number; // Unique identifier
  velocity: {
    x: number;
    y: number;
  } // Current velocity
  position: {
    x: number;
    y: number;
  } // Position (percentage)
  isKicked: boolean; // Whether currently kicked
  kickTime: number; // Timestamp of last kick
  restPosition: {
    x: number;
    y: number;
  } // Rest position
  wasNearCursor: boolean; // Previous cursor proximity
  planet: PlanetData; // Planet configuration
}
```

## Physics Parameters

### Configurable Values

- **Friction**: `0.94` - Controls how quickly planets slow down
- **Stop Threshold**: `0.25` - Minimum velocity before stopping
- **Bounce Energy**: `0.85` - Energy retained after wall collision
- **Physics Scale**: `0.09` - Movement scaling factor

### Boundary Behavior

- Planets bounce off screen edges with energy retention
- Random variation added to prevent predictable patterns
- Collision detection with `orbSize / 2 + 5px` trigger radius

## Event Handling

- **Mouse Events**: `mousemove` with immediate kick detection
- **Touch Events**: `touchmove` for mobile device support
- **Animation Frame**: Continuous physics updates at 60fps
- **Passive Events**: Disabled to ensure fast movement capture
