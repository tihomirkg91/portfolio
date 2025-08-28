import { useEffect, useRef, useState, useCallback } from 'react';
import './SpaceGame.css';

interface Note {
  id: number;
  lane: number;
  y: number;
  speed: number;
  size: number;
  color: string;
}

interface HitZone {
  lane: number;
  active: boolean;
  timer: number;
}

const LANES = 5;
const LANE_KEYS = ['a', 's', 'd', 'f', 'g'];
const LANE_COLORS = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b'];

export const SpaceGame = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [noteId, setNoteId] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hitZones, setHitZones] = useState<HitZone[]>(
    Array.from({ length: LANES }, (_, i) => ({ lane: i, active: false, timer: 0 }))
  );

  // Use refs for immediate access to avoid state delays
  const comboRef = useRef(0);
  const scoreRef = useRef(0);
  const gameActiveRef = useRef(false);
  const notesRef = useRef<Note[]>([]);
  const hitZonesRef = useRef<HitZone[]>(Array.from({ length: LANES }, (_, i) => ({ lane: i, active: false, timer: 0 })));

  const gameRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastNoteSpawnRef = useRef(0);

  // Sync refs with state
  useEffect(() => {
    comboRef.current = combo;
  }, [combo]);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    gameActiveRef.current = gameActive;
  }, [gameActive]);

  useEffect(() => {
    notesRef.current = notes;
  }, [notes]);

  useEffect(() => {
    hitZonesRef.current = hitZones;
  }, [hitZones]);

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setCombo(0);
    setNotes([]);
    setHitZones(Array.from({ length: LANES }, (_, i) => ({ lane: i, active: false, timer: 0 })));
  };

  const endGame = () => {
    setGameActive(false);
    setNotes([]);
    setHitZones(Array.from({ length: LANES }, (_, i) => ({ lane: i, active: false, timer: 0 })));
  };

  const playSound = useCallback((frequency: number, duration: number = 200) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration / 1000);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration / 1000);
  }, []);

  const hitNote = useCallback((lane: number) => {
    const hitZoneY = 85;
    const tolerance = 15;
    const currentNotes = notesRef.current;
    const currentCombo = comboRef.current;

    // Find the note to hit using more efficient search
    let bestNoteIndex = -1;
    let bestAccuracy = tolerance + 1;

    for (let i = 0; i < currentNotes.length; i++) {
      const note = currentNotes[i];
      if (note.lane === lane) {
        const accuracy = Math.abs(note.y - hitZoneY);
        if (accuracy <= tolerance) {
          if (accuracy < bestAccuracy) {
            bestAccuracy = accuracy;
            bestNoteIndex = i;
          }
        }
      }
    }

    if (bestNoteIndex !== -1) {
      const note = currentNotes[bestNoteIndex];
      const accuracy = Math.abs(note.y - hitZoneY);
      let points = 100;

      if (accuracy <= 5) {
        points = 300;
      } else if (accuracy <= 10) {
        points = 200;
      }

      const newScore = scoreRef.current + points * (currentCombo + 1);
      const newCombo = currentCombo + 1;

      // Batch state updates for better performance
      setScore(newScore);
      setCombo(newCombo);

      // Update refs immediately
      scoreRef.current = newScore;
      comboRef.current = newCombo;

      playSound(440 + lane * 110, 150);

      // Remove the hit note efficiently
      setNotes(prev => prev.filter((_, index) => index !== bestNoteIndex));
    } else {
      // Missed note - reset combo
      setCombo(0);
      comboRef.current = 0;
      playSound(150, 100);
    }

    // Activate hit zone animation with shorter duration
    setHitZones(prev => prev.map(hz =>
      hz.lane === lane ? { ...hz, active: true, timer: 100 } : hz
    ));
  }, [playSound]);

  // Handle touch events for mobile
  const handleTouchStart = useCallback((lane: number) => {
    hitNote(lane);
  }, [hitNote]);

  // Full screen functionality
  const enterFullscreen = async () => {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      }
    } catch (error) {
      console.error('Error entering fullscreen:', error);
    }
  };

  const exitFullscreen = async () => {
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error('Error exiting fullscreen:', error);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      enterFullscreen();
    } else {
      exitFullscreen();
    }
  };

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'F11') {
        event.preventDefault();
        toggleFullscreen();
      } else if (event.key === 'Escape' && document.fullscreenElement) {
        exitFullscreen();
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!gameActive) return;

      const key = event.key.toLowerCase();
      const laneIndex = LANE_KEYS.indexOf(key);

      if (laneIndex !== -1) {
        event.preventDefault();
        hitNote(laneIndex);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [gameActive, hitNote]);

  // Optimized game loop using requestAnimationFrame
  useEffect(() => {
    if (!gameActive) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    let lastTime = 0;
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;

    const gameLoop = (currentTime: number) => {
      if (currentTime - lastTime >= frameInterval) {
        // Spawn new notes less frequently for better performance
        if (currentTime - lastNoteSpawnRef.current > 800 && Math.random() < 0.4) {
          const lane = Math.floor(Math.random() * LANES);
          const newNote: Note = {
            id: noteId,
            lane,
            y: -10,
            speed: 3, // Slightly faster for more challenge
            size: 30,
            color: LANE_COLORS[lane],
          };

          setNotes(prev => [...prev, newNote]);
          setNoteId(prev => prev + 1);
          lastNoteSpawnRef.current = currentTime;
        }

        // Move notes and remove missed ones
        setNotes(prev => {
          const updatedNotes = prev
            .map(note => ({
              ...note,
              y: note.y + note.speed,
            }))
            .filter(note => {
              if (note.y > 100) {
                // Missed note - reset combo
                setCombo(0);
                comboRef.current = 0;
                playSound(150, 100);
                return false;
              }
              return true;
            });

          return updatedNotes;
        });

        lastTime = currentTime;
      }

      if (gameActive) {
        animationFrameRef.current = requestAnimationFrame(gameLoop);
      }
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameActive, noteId, playSound]);

  // Optimized hit zone animation using requestAnimationFrame
  useEffect(() => {
    if (!gameActive) return;

    let animationId: number;
    let lastTime = 0;

    const animateHitZones = (currentTime: number) => {
      if (currentTime - lastTime >= 16) { // ~60fps
        setHitZones(prev => prev.map(hz => ({
          ...hz,
          timer: Math.max(0, hz.timer - 16),
          active: hz.timer > 0
        })));
        lastTime = currentTime;
      }

      animationId = requestAnimationFrame(animateHitZones);
    };

    animationId = requestAnimationFrame(animateHitZones);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [gameActive]);

  return (
    <div
      className={`space-game ${isFullscreen ? 'fullscreen-active' : ''}`}
      ref={gameRef}
    >
      <div className="game-header">
        <h3>Rhythm Hero</h3>
        <div className="game-controls">
          <span className="score">Score: {score}</span>
          <span className="combo">Combo: {combo}x</span>
          <button
            className="game-btn fullscreen-btn"
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? '🗗' : '🗖'}
          </button>
          {!gameActive ? (
            <button className="game-btn start-btn" onClick={startGame}>
              Start Game
            </button>
          ) : (
            <button className="game-btn end-btn" onClick={endGame}>
              End Game
            </button>
          )}
        </div>
      </div>

      <div className="game-area">
        {/* Lane backgrounds */}
        {Array.from({ length: LANES }, (_, i) => (
          <div key={i} className="lane" style={{ left: `${i * 20}%` }}>
            <div className="lane-bg"></div>
          </div>
        ))}

        {/* Hit zones */}
        {hitZones.map((hz, i) => (
          <div
            key={i}
            className={`hit-zone ${hz.active ? 'active' : ''}`}
            style={{
              left: `${i * 20}%`,
              backgroundColor: LANE_COLORS[i],
            }}
            onTouchStart={(e) => {
              e.preventDefault();
              handleTouchStart(i);
            }}
            onClick={() => handleTouchStart(i)}
          >
            <div className="hit-zone-key">{LANE_KEYS[i].toUpperCase()}</div>
          </div>
        ))}

        {/* Falling notes - optimized with CSS animations */}
        {notes.map((note) => (
          <div
            key={note.id}
            className="note"
            style={{
              left: `${note.lane * 20 + 10}%`,
              top: `${note.y}%`,
              backgroundColor: note.color,
              width: `${note.size}px`,
              height: `${note.size}px`,
            }}
          >
            <div className="note-glow" style={{ backgroundColor: note.color }}></div>
          </div>
        ))}
      </div>

      <div className="game-instructions">
        {!gameActive ? (
          <p>
            Press "Start Game" to begin! Use A, S, D, F, G keys or tap the colored zones to hit the falling notes!{' '}
            {isFullscreen && '🎮 Fullscreen Mode Active'}
          </p>
        ) : (
          <p>
            Hit the notes when they reach the colored zones! Perfect timing = more points!{' '}
            {isFullscreen && '⭐ Faster notes in fullscreen!'}
          </p>
        )}
      </div>
    </div>
  );
};
