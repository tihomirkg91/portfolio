import { useEffect, useRef, useState, useCallback } from 'react';
import './FallingPlanet.css';
import { useSettings } from '../../contexts/SettingsContext';
import {
  Maximize2,
  Minimize2,
  Gamepad2,
  Smartphone,
  Keyboard,
} from 'lucide-react';

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

export const FallingPlanet = () => {
  const { isMobile } = useSettings();
  const [notes, setNotes] = useState<Note[]>([]);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [noteId, setNoteId] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playingTime, setPlayingTime] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [hitZones, setHitZones] = useState<HitZone[]>(
    Array.from({ length: LANES }, (_, i) => ({
      lane: i,
      active: false,
      timer: 0,
    }))
  );

  // Use refs for immediate access to avoid state delays
  const comboRef = useRef(0);
  const scoreRef = useRef(0);
  const gameActiveRef = useRef(false);
  const notesRef = useRef<Note[]>([]);
  const hitZonesRef = useRef<HitZone[]>(
    Array.from({ length: LANES }, (_, i) => ({
      lane: i,
      active: false,
      timer: 0,
    }))
  );

  const gameRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastNoteSpawnRef = useRef(0);
  const startTimeRef = useRef<number>(0);
  const timerIntervalRef = useRef<number | null>(null);
  const currentSpeedRef = useRef(2);

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
    setPlayingTime(0);
    setCurrentLevel(1);
    currentSpeedRef.current = 2;
    setNotes([]);
    setHitZones(
      Array.from({ length: LANES }, (_, i) => ({
        lane: i,
        active: false,
        timer: 0,
      }))
    );
    startTimeRef.current = Date.now();
  };

  const endGame = () => {
    setGameActive(false);
    setNotes([]);
    setHitZones(
      Array.from({ length: LANES }, (_, i) => ({
        lane: i,
        active: false,
        timer: 0,
      }))
    );
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  };

  const playSound = useCallback((frequency: number, duration: number = 200) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext)();
    }
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      ctx.currentTime + duration / 1000
    );

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration / 1000);
  }, []);

  const hitNote = useCallback(
    (lane: number) => {
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
        setNotes((prev) => prev.filter((_, index) => index !== bestNoteIndex));
      } else {
        // Missed note - reset combo
        setCombo(0);
        comboRef.current = 0;
        playSound(150, 100);
      }

      // Activate hit zone animation with shorter duration
      setHitZones((prev) =>
        prev.map((hz) =>
          hz.lane === lane ? { ...hz, active: true, timer: 100 } : hz
        )
      );
    },
    [playSound]
  );

  // Handle touch events for mobile
  const handleTouchStart = useCallback(
    (lane: number) => {
      hitNote(lane);
    },
    [hitNote]
  );

  // Full screen functionality
  const enterFullscreen = useCallback(async () => {
    try {
      if (isMobile) {
        // For mobile devices, try different approaches
        if (document.documentElement.requestFullscreen) {
          // Try standard fullscreen first
          try {
            await document.documentElement.requestFullscreen();
            setIsFullscreen(true);
            document.body.classList.add('fullscreen-active');
            return;
          } catch (error) {
            console.log(
              'Standard fullscreen failed, trying mobile-specific methods'
            );
          }
        }

        // For iOS Safari and other mobile browsers that don't support fullscreen
        // We'll simulate fullscreen by maximizing the viewport
        setIsFullscreen(true);
        document.body.classList.add('fullscreen-active', 'mobile-fullscreen');

        // Add viewport meta tag for better mobile fullscreen experience
        let viewport = document.querySelector('meta[name=viewport]');
        if (!viewport) {
          viewport = document.createElement('meta');
          viewport.setAttribute('name', 'viewport');
          document.head.appendChild(viewport);
        }
        viewport.setAttribute(
          'content',
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
        );

        // Prevent scrolling and hide address bar
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        // Try to hide mobile browser UI
        if (window.scrollTo) {
          window.scrollTo(0, 1);
        }

        console.log('Mobile fullscreen mode activated (simulated)');
      } else {
        // Desktop fullscreen
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
          setIsFullscreen(true);
          document.body.classList.add('fullscreen-active');
        }
      }
    } catch (error) {
      console.error('Error entering fullscreen:', error);
    }
  }, []);

  const exitFullscreen = useCallback(async () => {
    try {
      if (isMobile) {
        // Exit mobile fullscreen simulation
        setIsFullscreen(false);
        document.body.classList.remove(
          'fullscreen-active',
          'mobile-fullscreen'
        );

        // Restore viewport
        const viewport = document.querySelector('meta[name=viewport]');
        if (viewport) {
          viewport.setAttribute(
            'content',
            'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes'
          );
        }

        // Restore scrolling
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';

        console.log('Mobile fullscreen mode deactivated');
      } else {
        // Desktop exit fullscreen
        if (document.exitFullscreen) {
          await document.exitFullscreen();
          setIsFullscreen(false);
          document.body.classList.remove('fullscreen-active');
        }
      }
    } catch (error) {
      console.error('Error exiting fullscreen:', error);
    }
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      enterFullscreen();
    } else {
      exitFullscreen();
    }
  }, [enterFullscreen, exitFullscreen]);

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isNowFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isNowFullscreen);

      // Manage body class based on fullscreen state
      if (isNowFullscreen) {
        document.body.classList.add('fullscreen-active');
      } else {
        document.body.classList.remove('fullscreen-active');
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'F11') {
        event.preventDefault();
        toggleFullscreen();
      } else if (
        event.key === 'Escape' &&
        (document.fullscreenElement || isFullscreen)
      ) {
        exitFullscreen();
      } else if (event.key === 'f' && event.ctrlKey) {
        event.preventDefault();
        toggleFullscreen();
      }

      // On mobile, we don't need keyboard handling for game controls
      if (isMobile) return;

      // Don't prevent default for game keys when not in fullscreen
      if (!isFullscreen) return;

      // Handle game keys only in fullscreen mode
      if (!gameActive) return;

      const key = event.key.toLowerCase();
      const laneIndex = LANE_KEYS.indexOf(key);

      if (laneIndex !== -1) {
        event.preventDefault();
        hitNote(laneIndex);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleFullscreen, exitFullscreen]);

  // Handle playing time timer
  useEffect(() => {
    if (gameActive) {
      timerIntervalRef.current = window.setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        setPlayingTime(elapsed);

        // Increase speed every 10 seconds
        const speedLevel = Math.floor(elapsed / 10) + 1;
        const newSpeed = 2 + (speedLevel - 1) * 0.3; // Start at 2, increase by 0.3 every 10s
        setCurrentLevel(speedLevel);
        currentSpeedRef.current = newSpeed;
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, [gameActive]);

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
        if (
          currentTime - lastNoteSpawnRef.current > 800 &&
          Math.random() < 0.4
        ) {
          const lane = Math.floor(Math.random() * LANES);
          const newNote: Note = {
            id: noteId,
            lane,
            y: -10,
            speed: currentSpeedRef.current, // Dynamic speed that increases every 20 seconds
            size: 30,
            color: LANE_COLORS[lane],
          };

          setNotes((prev) => [...prev, newNote]);
          setNoteId((prev) => prev + 1);
          lastNoteSpawnRef.current = currentTime;
        }

        // Move notes and remove missed ones
        setNotes((prev) => {
          const updatedNotes = prev
            .map((note) => ({
              ...note,
              y: note.y + note.speed,
            }))
            .filter((note) => {
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
      if (currentTime - lastTime >= 16) {
        // ~60fps
        setHitZones((prev) =>
          prev.map((hz) => ({
            ...hz,
            timer: Math.max(0, hz.timer - 16),
            active: hz.timer > 0,
          }))
        );
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
      className={`falling-planet ${isFullscreen ? 'fullscreen-active' : ''}`}
      ref={gameRef}
    >
      <div className="game-header">
        <h3>
          Falling Planet{' '}
          {isFullscreen && (
            <span className="fullscreen-indicator">
              <Gamepad2 size={16} /> FULLSCREEN
            </span>
          )}
        </h3>
        <div className="game-controls">
          <span className="score">Score: {score}</span>
          <span className="combo">Combo: {combo}x</span>
          <span className="level">Level: {currentLevel}</span>
          <span className="time">Time: {playingTime}s</span>
          <button
            className="game-btn fullscreen-btn"
            onClick={toggleFullscreen}
            title={
              isFullscreen
                ? 'Exit Fullscreen (F11 or Ctrl+F)'
                : 'Enter Fullscreen (F11 or Ctrl+F)'
            }
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
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
          <div key={i} className={`lane lane-${i}`}>
            <div className="lane-bg"></div>
          </div>
        ))}

        {/* Hit zones */}
        {hitZones.map((hz, i) => (
          <div
            key={i}
            className={`hit-zone hit-zone-${i} ${hz.active ? 'active' : ''}`}
            style={{ '--lane-color': LANE_COLORS[i] } as React.CSSProperties}
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
            className={`note note-lane-${note.lane}`}
            style={
              {
                '--note-color': note.color,
                '--note-y': `${note.y}%`,
                '--note-size': `${note.size}px`,
              } as React.CSSProperties
            }
          >
            <div className="note-glow"></div>
          </div>
        ))}
      </div>

      <div className="game-instructions">
        {!gameActive ? (
          <p>
            Press "Start Game" to begin!{' '}
            {isMobile ? (
              <>
                Tap the colored zones to hit the falling notes!{' '}
                <span className="mobile-hint">
                  <Smartphone size={14} /> Mobile Mode: Tap fullscreen button
                  for immersive experience!
                </span>
              </>
            ) : (
              <>
                Use A, S, D, F, G keys or tap the colored zones to hit the
                falling notes!{' '}
                <span className="keyboard-hint">
                  <Keyboard size={14} /> Press F11 or Ctrl+F for fullscreen
                  mode!
                </span>
              </>
            )}
          </p>
        ) : (
          <p>
            {isMobile ? (
              <>
                Tap the colored zones when notes reach them! Perfect timing =
                more points!{' '}
                {isFullscreen && (
                  <span className="fullscreen-hint">
                    <Smartphone size={14} /> Mobile Fullscreen: Tap zones to
                    play!
                  </span>
                )}
              </>
            ) : (
              <>
                Hit the notes when they reach the colored zones! Perfect timing
                = more points!{' '}
                {isFullscreen && (
                  <span className="fullscreen-hint">
                    <Gamepad2 size={14} /> Fullscreen Mode: Press Escape to exit
                  </span>
                )}
              </>
            )}
          </p>
        )}
      </div>
    </div>
  );
};
