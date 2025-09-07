import { useCallback, useEffect, useRef, useState } from 'react';
import {
  LuKeyboard,
  LuMaximize2,
  LuMinimize2,
  LuPlay,
  LuSquare,
} from 'react-icons/lu';

import { useResponsive } from '../../hooks/useResponsive';
import './FallingPlanet.css';

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
  const { isMobile } = useResponsive();
  const [notes, setNotes] = useState<Note[]>([]);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [noteId, setNoteId] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isExitingFullscreen, setIsExitingFullscreen] = useState(false);
  const [playingTime, setPlayingTime] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [hitZones, setHitZones] = useState<HitZone[]>(
    Array.from({ length: LANES }, (_, i) => ({
      lane: i,
      active: false,
      timer: 0,
    }))
  );

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
  const currentSpeedRef = useRef(1.5);

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
    currentSpeedRef.current = 1.5;
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
      const hitZoneY = 90;
      const tolerance = 20;
      const currentNotes = notesRef.current;
      const currentCombo = comboRef.current;

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

        setScore(newScore);
        setCombo(newCombo);

        scoreRef.current = newScore;
        comboRef.current = newCombo;

        playSound(440 + lane * 110, 150);

        setNotes(prev => prev.filter((_, index) => index !== bestNoteIndex));
      } else {
        setCombo(0);
        comboRef.current = 0;
        playSound(150, 100);
      }

      setHitZones(prev =>
        prev.map(hz =>
          hz.lane === lane ? { ...hz, active: true, timer: 100 } : hz
        )
      );
    },
    [playSound]
  );

  const handleTouchStart = useCallback(
    (lane: number, event?: React.TouchEvent) => {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      const target = event?.currentTarget as HTMLElement;
      if (target && isMobile) {
        target.style.transform = 'scale(0.95)';
        setTimeout(() => {
          if (target) target.style.transform = '';
        }, 150);
      }

      hitNote(lane);
    },
    [hitNote, isMobile]
  );

  const handleMouseDown = useCallback(
    (lane: number, event?: React.MouseEvent) => {
      if (event) {
        event.preventDefault();
      }
      hitNote(lane);
    },
    [hitNote]
  );

  const enterFullscreen = useCallback(async () => {
    try {
      if (isMobile) {
        if (document.documentElement.requestFullscreen) {
          try {
            await document.documentElement.requestFullscreen();
            setIsFullscreen(true);
            document.body.classList.add('fullscreen-active');
            return;
          } catch (error) {}
        }

        setIsFullscreen(true);
        document.body.classList.add('fullscreen-active', 'mobile-fullscreen');

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

        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        if (window.scrollTo) {
          window.scrollTo(0, 1);
        }

        setTimeout(() => {
          if (gameRef.current) {
            gameRef.current.style.position = 'fixed';
            gameRef.current.style.top = '0';
            gameRef.current.style.left = '0';
            gameRef.current.style.width = '100vw';
            gameRef.current.style.height = '100vh';
            gameRef.current.style.zIndex = '9999';
          }
        }, 100);
      } else {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
          setIsFullscreen(true);
          document.body.classList.add('fullscreen-active');
        }
      }
    } catch (error) {
      console.error('Error entering fullscreen:', error);
    }
  }, [isMobile]);

  const exitFullscreen = useCallback(async () => {
    try {
      if (isMobile) {
        setIsExitingFullscreen(true);

        if (gameRef.current) {
          gameRef.current.style.position = '';
          gameRef.current.style.top = '';
          gameRef.current.style.left = '';
          gameRef.current.style.width = '';
          gameRef.current.style.height = '';
          gameRef.current.style.zIndex = '';
        }

        setTimeout(() => {
          setIsFullscreen(false);
          setIsExitingFullscreen(false);
          document.body.classList.remove(
            'fullscreen-active',
            'mobile-fullscreen'
          );
        }, 50);

        const viewport = document.querySelector('meta[name=viewport]');
        if (viewport) {
          viewport.setAttribute(
            'content',
            'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes'
          );
        }

        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
          setIsFullscreen(false);
          document.body.classList.remove('fullscreen-active');
        }
      }
    } catch (error) {
      console.error('Error exiting fullscreen:', error);
    }
  }, [isMobile]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement && !isFullscreen) enterFullscreen();
    else exitFullscreen();
  }, [enterFullscreen, exitFullscreen, isFullscreen, isMobile]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isNowFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isNowFullscreen);

      if (isNowFullscreen) document.body.classList.add('fullscreen-active');
      else document.body.classList.remove('fullscreen-active');
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

      if (isMobile) return;
      if (!isFullscreen) return;
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

  useEffect(() => {
    if (gameActive) {
      timerIntervalRef.current = window.setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        setPlayingTime(elapsed);

        const speedLevel = Math.floor(elapsed / 10) + 1;
        const newSpeed = 1 + (speedLevel - 1) * 0.3;
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
        if (
          currentTime - lastNoteSpawnRef.current > 800 &&
          Math.random() < 0.4
        ) {
          const lane = Math.floor(Math.random() * LANES);
          const newNote: Note = {
            id: noteId,
            lane,
            y: -10,
            speed: currentSpeedRef.current,
            size: 30,
            color: LANE_COLORS[lane],
          };

          setNotes(prev => [...prev, newNote]);
          setNoteId(prev => prev + 1);
          lastNoteSpawnRef.current = currentTime;
        }

        setNotes(prev => {
          const updatedNotes = prev
            .map(note => ({
              ...note,
              y: note.y + note.speed,
            }))
            .filter(note => {
              if (note.y > 100) {
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

      if (gameActive)
        animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
    };
  }, [gameActive, noteId, playSound]);

  useEffect(() => {
    if (!gameActive) return;

    let animationId: number;
    let lastTime = 0;

    const animateHitZones = (currentTime: number) => {
      if (currentTime - lastTime >= 16) {
        setHitZones(prev =>
          prev.map(hz => ({
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
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [gameActive]);

  return (
    <div
      className={`falling-planet ${isFullscreen ? 'fullscreen-active' : ''}`}
      ref={gameRef}
    >
      <div className="game-header">
        <div className="game-controls">
          <span className="score">Score: {score}</span>
          <span className="combo">Combo: {combo}x</span>
          <span className="level">Level: {currentLevel}</span>
          <span className="time">Time: {playingTime}s</span>
        </div>

        <div className="fullscreen-controls">
          {!gameActive ? (
            <button className="game-btn start-btn" onClick={startGame}>
              <LuPlay size={14} />
              Start Game
            </button>
          ) : (
            <button className="game-btn end-btn" onClick={endGame}>
              <LuSquare size={14} />
              End Game
            </button>
          )}
          <button
            className={`game-btn fullscreen-btn ${
              isFullscreen ? 'active' : ''
            } ${isExitingFullscreen ? 'exiting' : ''}`}
            onClick={() => {
              toggleFullscreen();
            }}
            title={
              isFullscreen
                ? 'Exit Fullscreen (F11 or Ctrl+F)'
                : 'Enter Fullscreen (F11 or Ctrl+F)'
            }
          >
            {isFullscreen ? (
              <LuMinimize2 size={14} />
            ) : (
              <LuMaximize2 size={14} />
            )}
          </button>
        </div>
      </div>

      <div className="game-area">
        {/* Lane backgrounds */}
        <div className="lanes-container">
          {Array.from({ length: LANES }, (_, i) => (
            <div key={i} className={`lane lane-${i}`}>
              <div className="lane-bg"></div>
            </div>
          ))}
        </div>

        {/* Hit zones */}
        <div className="hit-zones-container">
          {hitZones.map((hz, i) => (
            <div
              key={i}
              className={`hit-zone hit-zone-${i} ${hz.active ? 'active' : ''}`}
              style={{ '--lane-color': LANE_COLORS[i] } as React.CSSProperties}
              onTouchStart={e => handleTouchStart(i, e)}
              onMouseDown={e => handleMouseDown(i, e)}
              onClick={() => {
                if (!isMobile) hitNote(i);
              }}
            >
              <div className="hit-zone-key">{LANE_KEYS[i].toUpperCase()}</div>
              <div className="hit-zone-glow"></div>
            </div>
          ))}
        </div>

        {/* Falling notes - optimized with CSS animations */}
        <div className="notes-container">
          {notes.map(note => {
            const lanePositions = ['10%', '30%', '50%', '70%', '90%'];
            return (
              <div
                key={note.id}
                className="note"
                style={
                  {
                    '--note-color': note.color,
                    '--note-y': `${note.y}%`,
                    '--note-size': `${note.size}px`,
                    '--note-left': lanePositions[note.lane],
                  } as React.CSSProperties
                }
              >
                <div className="note-glow"></div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="game-instructions">
        {!gameActive ? (
          <div>
            Press "Start Game" to begin!{' '}
            {isMobile ? null : (
              <>
                Use A, S, D, F, G keys or tap the colored zones to hit the
                falling notes!
                <div className="keyboard-hint-container">
                  <span className="keyboard-hint">
                    <LuKeyboard size={14} /> Press F11 or Ctrl+F for fullscreen
                    mode!
                  </span>
                </div>
              </>
            )}
          </div>
        ) : (
          <div>
            {isMobile ? (
              <>
                Tap the colored zones when notes reach them! Perfect timing =
                more points!{' '}
              </>
            ) : (
              <>
                Hit the notes when they reach the colored zones! Perfect timing
                = more points!
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
