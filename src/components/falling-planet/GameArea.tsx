import { memo, useCallback, useMemo } from 'react';
import { LANES, LANE_COLORS, LANE_KEYS } from './constants';
import type { HitZone, Note } from './types';

interface GameAreaProps {
  notes: Note[];
  hitZones: HitZone[];
  gameAreaRef: React.RefObject<HTMLDivElement | null>;
  onTouchStart: (lane: number, event?: React.TouchEvent) => void;
  onMouseDown: (lane: number, event?: React.MouseEvent) => void;
  onHitNote: (lane: number) => void;
  isMobile: boolean;
}

const Lane = memo(({ index }: { index: number }) => (
  <div className={`lane lane-${index}`}>
    <div className="lane-bg"></div>
  </div>
));

const HitZoneComponent = memo(
  ({
    hitZone,
    index,
    onTouchStart,
    onMouseDown,
    onHitNote,
    isMobile,
  }: {
    hitZone: HitZone;
    index: number;
    onTouchStart: (lane: number, event?: React.TouchEvent) => void;
    onMouseDown: (lane: number, event?: React.MouseEvent) => void;
    onHitNote: (lane: number) => void;
    isMobile: boolean;
  }) => {
    const handleTouchStart = useCallback(
      (e: React.TouchEvent) => {
        onTouchStart(index, e);
      },
      [onTouchStart, index]
    );

    const handleMouseDown = useCallback(
      (e: React.MouseEvent) => {
        onMouseDown(index, e);
      },
      [onMouseDown, index]
    );

    const handleClick = useCallback(() => {
      if (!isMobile) onHitNote(index);
    }, [isMobile, onHitNote, index]);

    const className = useMemo(
      () => `hit-zone hit-zone-${index} ${hitZone.active ? 'active' : ''}`,
      [index, hitZone.active]
    );

    const style = useMemo(
      () => ({ '--lane-color': LANE_COLORS[index] }) as React.CSSProperties,
      [index]
    );

    return (
      <div
        className={className}
        style={style}
        onTouchStart={handleTouchStart}
        onMouseDown={handleMouseDown}
        onClick={handleClick}
      >
        <div className="hit-zone-key">
          {LANE_KEYS[index]?.toUpperCase() || ''}
        </div>
        <div className="hit-zone-glow"></div>
      </div>
    );
  }
);

const NoteComponent = memo(({ note }: { note: Note }) => {
  const lanePosition = useMemo(() => `${10 + note.lane * 20}%`, [note.lane]);

  const style = useMemo(
    () =>
      ({
        '--note-color': note.color,
        '--note-y': `${note.y}%`,
        '--note-size': `${note.size}px`,
        '--note-left': lanePosition,
      }) as React.CSSProperties,
    [note.color, note.y, note.size, lanePosition]
  );

  return (
    <div className="note" style={style}>
      <div className="note-glow"></div>
    </div>
  );
});

export const GameArea = memo<GameAreaProps>(
  ({
    notes,
    hitZones,
    gameAreaRef,
    onTouchStart,
    onMouseDown,
    onHitNote,
    isMobile,
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
            key={hz.lane}
            hitZone={hz}
            index={i}
            onTouchStart={onTouchStart}
            onMouseDown={onMouseDown}
            onHitNote={onHitNote}
            isMobile={isMobile}
          />
        )),
      [hitZones, onTouchStart, onMouseDown, onHitNote, isMobile]
    );

    const noteComponents = useMemo(
      () => notes.map(note => <NoteComponent key={note.id} note={note} />),
      [notes]
    );

    return (
      <div className="game-area" ref={gameAreaRef}>
        <div className="lanes-container">{lanes}</div>

        <div className="hit-zones-container">{hitZoneComponents}</div>

        <div className="notes-container">{noteComponents}</div>
      </div>
    );
  }
);
