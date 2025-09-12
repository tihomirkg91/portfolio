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

export const GameArea = ({
  notes,
  hitZones,
  gameAreaRef,
  onTouchStart,
  onMouseDown,
  onHitNote,
  isMobile,
}: GameAreaProps) => {
  return (
    <div className="game-area" ref={gameAreaRef}>
      <div className="lanes-container">
        {Array.from({ length: LANES }, (_, i) => (
          <div key={i} className={`lane lane-${i}`}>
            <div className="lane-bg"></div>
          </div>
        ))}
      </div>

      <div className="hit-zones-container">
        {hitZones.map((hz, i) => (
          <div
            key={i}
            className={`hit-zone hit-zone-${i} ${hz.active ? 'active' : ''}`}
            style={{ '--lane-color': LANE_COLORS[i] } as React.CSSProperties}
            onTouchStart={e => onTouchStart(i, e)}
            onMouseDown={e => onMouseDown(i, e)}
            onClick={() => {
              if (!isMobile) onHitNote(i);
            }}
          >
            <div className="hit-zone-key">{LANE_KEYS[i].toUpperCase()}</div>
            <div className="hit-zone-glow"></div>
          </div>
        ))}
      </div>

      <div className="notes-container">
        {notes.map(note => {
          const lanePosition = `${10 + note.lane * 20}%`;

          return (
            <div
              key={note.id}
              className="note"
              style={
                {
                  '--note-color': note.color,
                  '--note-y': `${note.y}%`,
                  '--note-size': `${note.size}px`,
                  '--note-left': lanePosition,
                } as React.CSSProperties
              }
            >
              <div className="note-glow"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
