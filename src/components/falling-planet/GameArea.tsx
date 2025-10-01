import { memo, useCallback, useMemo, startTransition } from 'react';
import { LANES, LANE_COLORS, LANE_KEYS } from './constants';
import type { HitZone, Planet } from './types';

interface GameAreaProps {
  planets: Planet[];
  hitZones: HitZone[];
  gameAreaRef: React.RefObject<HTMLDivElement | null>;
  onTouchStart: (lane: number, event?: React.TouchEvent) => void;
  onMouseDown: (lane: number, event?: React.MouseEvent) => void;
  onHitPlanet: (lane: number) => void;
  isMobile: boolean;
  isTransitioning?: boolean;
}

const Lane = memo(({ index }: { index: number }) => {
  const laneStyle = useMemo(
    () => ({ '--lane-index': index }) as React.CSSProperties,
    [index]
  );

  return (
    <div className={`lane lane-${index}`} style={laneStyle}>
      <div className="lane-bg"></div>
    </div>
  );
});

Lane.displayName = 'Lane';

const HitZoneComponent = memo(
  ({
    hitZone,
    index,
    onTouchStart,
    onMouseDown,
    onHitPlanet,
    isMobile,
    isTransitioning = false,
  }: {
    hitZone: HitZone;
    index: number;
    onTouchStart: (lane: number, event?: React.TouchEvent) => void;
    onMouseDown: (lane: number, event?: React.MouseEvent) => void;
    onHitPlanet: (lane: number) => void;
    isMobile: boolean;
    isTransitioning?: boolean;
  }) => {
    const handleTouchStart = useCallback(
      (e: React.TouchEvent) => {
        if (isTransitioning) return;
        startTransition(() => {
          onTouchStart(index, e);
        });
      },
      [onTouchStart, index, isTransitioning]
    );

    const handleMouseDown = useCallback(
      (e: React.MouseEvent) => {
        if (isTransitioning) return;
        startTransition(() => {
          onMouseDown(index, e);
        });
      },
      [onMouseDown, index, isTransitioning]
    );

    const handleClick = useCallback(() => {
      if (!isMobile && !isTransitioning) {
        startTransition(() => {
          onHitPlanet(index);
        });
      }
    }, [isMobile, onHitPlanet, index, isTransitioning]);

    const className = useMemo(() => {
      const classes = [`hit-zone`, `hit-zone-${index}`];
      if (hitZone.active) classes.push('active');
      if (isTransitioning) classes.push('transitioning');
      return classes.join(' ');
    }, [index, hitZone.active, isTransitioning]);

    const style = useMemo(
      () =>
        ({
          '--lane-color': LANE_COLORS[index],
          '--hit-zone-opacity': isTransitioning ? 0.7 : 1,
        }) as React.CSSProperties,
      [index, isTransitioning]
    );

    const keyDisplay = useMemo(
      () => LANE_KEYS[index]?.toUpperCase() || '',
      [index]
    );

    return (
      <div
        className={className}
        style={style}
        onTouchStart={handleTouchStart}
        onMouseDown={handleMouseDown}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label={`Hit zone ${index + 1}, Key: ${keyDisplay}`}
      >
        <div className="hit-zone-key">{keyDisplay}</div>
        <div className="hit-zone-glow"></div>
      </div>
    );
  }
);

HitZoneComponent.displayName = 'HitZoneComponent';

HitZoneComponent.displayName = 'HitZoneComponent';

const PlanetComponent = memo(({ planet }: { planet: Planet }) => {
  const lanePosition = useMemo(
    () => `${10 + planet.lane * 20}%`,
    [planet.lane]
  );

  const style = useMemo(
    () =>
      ({
        '--planet-color': planet.color,
        '--planet-y': `${planet.y}%`,
        '--planet-size': `${planet.size}px`,
        '--planet-left': lanePosition,
        '--planet-id': planet.id,
      }) as React.CSSProperties,
    [planet.color, planet.y, planet.size, lanePosition, planet.id]
  );

  return (
    <div className="planet" style={style} data-planet-id={planet.id}>
      <div className="planet-glow"></div>
    </div>
  );
});

PlanetComponent.displayName = 'PlanetComponent';

export const GameArea = memo<GameAreaProps>(
  ({
    planets,
    hitZones,
    gameAreaRef,
    onTouchStart,
    onMouseDown,
    onHitPlanet,
    isMobile,
    isTransitioning = false,
  }) => {
    const lanes = useMemo(
      () =>
        Array.from({ length: LANES }, (_, i) => (
          <Lane key={`lane-${i}`} index={i} />
        )),
      []
    );

    const hitZoneComponents = useMemo(
      () =>
        hitZones.map((hz, i) => (
          <HitZoneComponent
            key={`hitzone-${hz.lane}`}
            hitZone={hz}
            index={i}
            onTouchStart={onTouchStart}
            onMouseDown={onMouseDown}
            onHitPlanet={onHitPlanet}
            isMobile={isMobile}
            isTransitioning={isTransitioning}
          />
        )),
      [
        hitZones,
        onTouchStart,
        onMouseDown,
        onHitPlanet,
        isMobile,
        isTransitioning,
      ]
    );

    const planetComponents = useMemo(
      () =>
        planets.map(planet => (
          <PlanetComponent key={`planet-${planet.id}`} planet={planet} />
        )),
      [planets]
    );

    const containerClassName = useMemo(() => {
      const classes = ['game-area'];
      if (isTransitioning) classes.push('transitioning');
      return classes.join(' ');
    }, [isTransitioning]);

    return (
      <div className={containerClassName} ref={gameAreaRef}>
        <div className="lanes-container">{lanes}</div>
        <div className="hit-zones-container">{hitZoneComponents}</div>
        <div className="planets-container">{planetComponents}</div>
      </div>
    );
  }
);

GameArea.displayName = 'GameArea';
