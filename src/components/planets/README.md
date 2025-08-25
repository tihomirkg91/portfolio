# Planets Components

This folder contains modular planet components for the solar system floating orbs.

## Structure

```
planets/
├── types.ts              # TypeScript interfaces
├── planetsData.ts        # Planet data configuration
├── Planet.tsx            # Generic planet component
├── SaturnRings.tsx       # Saturn rings component
└── individual planets:
    ├── Mercury.tsx
    ├── Venus.tsx
    ├── Earth.tsx
    ├── Mars.tsx
    ├── Jupiter.tsx
    ├── Saturn.tsx
    ├── Uranus.tsx
    └── Neptune.tsx
```

## Usage

### Import All Planets Data

```tsx
import { planetsData } from './planets/planetsData';
```

### Import Generic Planet Component

```tsx
import { Planet } from './planets/Planet';

<Planet planetData={planetData} planetSize={50} isKicked={false} index={0} />;
```

### Import Individual Planet Components

```tsx
import { Mars } from './planets/Mars';
import { Jupiter } from './planets/Jupiter';
import { Saturn } from './planets/Saturn';

<Mars planetSize={30} isKicked={false} index={0} />
<Jupiter planetSize={60} isKicked={true} index={1} />
<Saturn planetSize={55} isKicked={false} index={2} />
```

## Features

- **Modular Design**: Each planet is a separate component
- **Type Safety**: Full TypeScript support
- **Realistic Appearance**: Authentic colors and gradients
- **Special Effects**: Saturn has animated rings, gas giants have atmospheric glow
- **Interactive**: Hover tooltips and kick animations
- **Scalable**: Planet sizes are proportional to real solar system

## Planet Properties

Each planet includes:

- `name`: Planet name
- `color`: Primary color
- `size`: Relative size multiplier
- `gradient`: CSS gradient for normal state
- `boxShadow`: Shadow effects for normal state
- `kickedGradient`: Enhanced gradient when kicked
- `kickedBoxShadow`: Enhanced shadow when kicked
- `rings`: Boolean for Saturn's rings
- `moons`: Future feature for moon count
