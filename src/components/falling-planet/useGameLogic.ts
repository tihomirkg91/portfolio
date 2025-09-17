import { useCallback, useEffect, useRef, useState } from 'react';
import { useResponsive } from '../../hooks/useResponsive';
import { LANES, LANE_COLORS, LANE_KEYS } from './constants';
import type { HitZone, Note } from './types';

export const useGameLogic = () => {
  const { isMobile } = useResponsive();
  const [notes, setNotes] = useState<Note[]>([]);
  const [score, setScore] = useState(0);
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

  const scoreRef = useRef(0);
  const gameActiveRef = useRef(false);
  const notesRef = useRef<Note[]>([]);
  const gameRef = useRef<HTMLDivElement>(null);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastNoteSpawnRef = useRef(0);
  const startTimeRef = useRef<number>(0);
  const timerIntervalRef = useRef<number | null>(null);
  const currentSpeedRef = useRef(1.5);
  const hitZoneYRef = useRef(90);
  const hitZoneCalculatedRef = useRef(false);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    gameActiveRef.current = gameActive;
  }, [gameActive]);

  useEffect(() => {
    notesRef.current = notes;
  }, [notes]);

  const playSound = useCallback((frequency: number, duration: number) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        (window as typeof window & { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext)();
    }

    const context = audioContextRef.current;
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.frequency.setValueAtTime(frequency, context.currentTime);
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.1, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      context.currentTime + duration / 1000
    );

    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + duration / 1000);
  }, []);

  const hitNote = useCallback(
    (lane: number) => {
      if (!gameActiveRef.current) return;

      const hitZoneY = hitZoneYRef.current;
      const baseTolerance = isMobile ? 40 : 25;
      const speedTolerance = currentSpeedRef.current * (isMobile ? 40 : 25);
      const tolerance = Math.max(baseTolerance, speedTolerance);

      const notesToHit = notesRef.current.filter(note => {
        const distance = Math.abs(note.y - hitZoneY);
        return note.lane === lane && distance <= tolerance;
      });

      if (notesToHit.length > 0) {
        const closestNote = notesToHit.reduce((closest, current) => {
          const closestDist = Math.abs(closest.y - hitZoneY);
          const currentDist = Math.abs(current.y - hitZoneY);
          return currentDist < closestDist ? current : closest;
        });

        const distance = Math.abs(closestNote.y - hitZoneY);
        const perfectThreshold = isMobile ? 15 : 10;
        const goodThreshold = tolerance;

        let points = 10;
        if (distance <= perfectThreshold) {
          points = 50;
          playSound(800, 200);
        } else if (distance <= goodThreshold) {
          points = 25;
          playSound(600, 150);
        } else {
          points = 10;
          playSound(400, 100);
        }

        setScore(prev => prev + points);

        setNotes(prev => prev.filter(note => note.id !== closestNote.id));

        setHitZones(prev =>
          prev.map(hz =>
            hz.lane === lane ? { ...hz, active: true, timer: 200 } : hz
          )
        );
      } else {
        playSound(200, 100);
        setHitZones(prev =>
          prev.map(hz =>
            hz.lane === lane ? { ...hz, active: true, timer: 200 } : hz
          )
        );
      }
    },
    [isMobile, playSound]
  );

  const calculateHitZoneY = useCallback(() => {
    if (hitZoneCalculatedRef.current && (!isMobile || !gameActive)) {
      return hitZoneYRef.current;
    }

    const performCalculation = () => {
      if (gameAreaRef.current) {
        try {
          const gameAreaRect = gameAreaRef.current.getBoundingClientRect();
          const hitZoneElements =
            gameAreaRef.current.querySelectorAll('.hit-zone');

          if (hitZoneElements.length > 0) {
            const firstHitZone = hitZoneElements[0];
            if (firstHitZone) {
              const hitZoneRect = firstHitZone.getBoundingClientRect();
              const relativeY =
                ((hitZoneRect.top - gameAreaRect.top) / gameAreaRect.height) *
                100;

              const minY = isMobile ? 70 : 10;
              const maxY = isMobile ? 95 : 95;

              if (relativeY > minY && relativeY < maxY) {
                const currentHitZoneY = hitZoneYRef.current;
                const difference = Math.abs(relativeY - currentHitZoneY);
                const maxDifference = isMobile ? 5 : 2;

                if (
                  currentHitZoneY === 90 ||
                  difference < maxDifference ||
                  isMobile
                ) {
                  hitZoneYRef.current = relativeY;
                  hitZoneCalculatedRef.current = true;
                  return relativeY;
                }
              }
            }
          }
        } catch (error) {
          console.warn('Hit zone calculation failed:', error);
        }
      }

      const fallback = isMobile ? 85 : 90;
      hitZoneYRef.current = fallback;
      return fallback;
    };

    if (window.requestIdleCallback) {
      window.requestIdleCallback(performCalculation);
    } else {
      setTimeout(performCalculation, 0);
    }

    return hitZoneYRef.current;
  }, [isMobile, gameActive]);

  const startGame = () => {
    setGameActive(true);
    setScore(0);
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
    hitZoneCalculatedRef.current = false;

    if (isMobile && isFullscreen && gameAreaRef.current) {
      const newHeight = window.innerHeight - 200;
      gameAreaRef.current.style.height = `${newHeight}px`;
    }

    const calculateOnce = () => {
      if (!hitZoneCalculatedRef.current) {
        const result = calculateHitZoneY();
        if (result !== 90) {
          hitZoneCalculatedRef.current = true;
        } else if (!hitZoneCalculatedRef.current) {
          setTimeout(() => {
            if (!hitZoneCalculatedRef.current) {
              hitZoneCalculatedRef.current = true;
            }
          }, 200);
        }
      }
    };

    setTimeout(calculateOnce, 300);

    if (isMobile) {
      setTimeout(() => {
        hitZoneCalculatedRef.current = false;
        calculateHitZoneY();
      }, 500);
    }
    startTimeRef.current = Date.now();
  };

  const endGame = useCallback(() => {
    setGameActive(false);
    setNotes([]);
    setHitZones(
      Array.from({ length: LANES }, (_, i) => ({
        lane: i,
        active: false,
        timer: 0,
      }))
    );
  }, []);

  const handleTouchStart = useCallback(
    (lane: number, event?: React.TouchEvent) => {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      const target = event?.currentTarget as HTMLElement;
      if (target && isMobile) {
        target.classList.add('hit-zone-pressed');
        setTimeout(() => {
          if (target) target.classList.remove('hit-zone-pressed');
        }, 150);
      }

      if (isMobile) requestAnimationFrame(() => hitNote(lane));
      else hitNote(lane);
    },
    [hitNote, isMobile]
  );

  const handleMouseDown = useCallback(
    (lane: number, event?: React.MouseEvent) => {
      if (event) event.preventDefault();

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
          } catch (error) {
            console.error('Error entering fullscreen:', error);
          }
        }

        setIsFullscreen(true);

        requestAnimationFrame(() => {
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

          const bodyStyle = document.body.style;
          const htmlStyle = document.documentElement.style;
          bodyStyle.overflow = 'hidden';
          htmlStyle.overflow = 'hidden';

          if (window.scrollTo) {
            window.scrollTo(0, 1);
          }

          setTimeout(() => {
            if (gameRef.current) {
              const gameElement = gameRef.current;
              const style = gameElement.style;
              style.position = 'fixed';
              style.top = '0';
              style.left = '0';
              style.width = '100vw';
              style.height = '100vh';
              style.zIndex = '9999';
            }

            hitZoneCalculatedRef.current = false;
            if (window.requestIdleCallback) {
              window.requestIdleCallback(() => calculateHitZoneY());
            } else {
              setTimeout(() => calculateHitZoneY(), 200);
            }
          }, 100);
        });
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
  }, [isMobile, calculateHitZoneY]);

  const exitFullscreen = useCallback(async () => {
    try {
      if (isMobile) {
        setIsExitingFullscreen(true);
        setIsFullscreen(false);

        if (gameRef.current) {
          gameRef.current.style.position = '';
          gameRef.current.style.top = '';
          gameRef.current.style.left = '';
          gameRef.current.style.width = '';
          gameRef.current.style.height = '';
          gameRef.current.style.zIndex = '';
        }

        document.body.classList.remove(
          'fullscreen-active',
          'mobile-fullscreen'
        );

        setTimeout(() => {
          setIsExitingFullscreen(false);

          if (gameAreaRef.current) {
            gameAreaRef.current.style.height = '';
          }
          // Recalculate hit zone after exiting fullscreen
          hitZoneCalculatedRef.current = false;
          setTimeout(() => calculateHitZoneY(), 200);
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
  }, [isMobile, calculateHitZoneY]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement && !isFullscreen) enterFullscreen();
    else exitFullscreen();
  }, [enterFullscreen, exitFullscreen, isFullscreen]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isNowFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isNowFullscreen);

      if (isNowFullscreen) document.body.classList.add('fullscreen-active');
      else document.body.classList.remove('fullscreen-active');

      if (!gameActive && isMobile && gameAreaRef.current) {
        if (isNowFullscreen) {
          const newHeight = window.innerHeight - 200;
          gameAreaRef.current.style.height = `${newHeight}px`;
        } else {
          gameAreaRef.current.style.height = '';
        }
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
  }, [
    toggleFullscreen,
    exitFullscreen,
    gameActive,
    hitNote,
    isFullscreen,
    isMobile,
  ]);

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
    const gameElement = gameRef.current;

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }

      if (
        audioContextRef.current &&
        audioContextRef.current.state !== 'closed'
      ) {
        try {
          audioContextRef.current.close();
        } catch (error) {
          console.warn('Error closing audio context on cleanup:', error);
        }
      }

      if (isFullscreen) {
        document.body.classList.remove(
          'fullscreen-active',
          'mobile-fullscreen'
        );
        if (gameElement) {
          const style = gameElement.style;
          style.position = '';
          style.top = '';
          style.left = '';
          style.width = '';
          style.height = '';
          style.zIndex = '';
        }
      }
    };
  }, [isFullscreen]);

  useEffect(() => {
    if (!gameActive) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    let lastTime = 0;
    let lastHitZoneUpdate = 0;
    let lastMobileRecalc = 0;
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;

    const consolidatedGameLoop = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;

      if (deltaTime >= frameInterval) {
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
            color: LANE_COLORS[lane] || '#ffffff',
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
              const hitZoneY = hitZoneYRef.current;
              const baseTolerance = isMobile ? 40 : 25;
              const speedTolerance = note.speed * (isMobile ? 40 : 25);
              const tolerance = Math.max(baseTolerance, speedTolerance);

              if (note.y > hitZoneY + tolerance) {
                playSound(150, 100);
                return false;
              }

              return true;
            });

          return updatedNotes;
        });

        if (currentTime - lastHitZoneUpdate >= 16) {
          setHitZones(prev =>
            prev.map(hz => ({
              ...hz,
              timer: Math.max(0, hz.timer - 16),
              active: hz.timer > 0,
            }))
          );
          lastHitZoneUpdate = currentTime;
        }

        if (isMobile && currentTime - lastMobileRecalc >= 5000) {
          hitZoneCalculatedRef.current = false;
          lastMobileRecalc = currentTime;
        }

        lastTime = currentTime;
      }

      if (gameActiveRef.current) {
        animationFrameRef.current = requestAnimationFrame(consolidatedGameLoop);
      }
    };

    animationFrameRef.current = requestAnimationFrame(consolidatedGameLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [gameActive, noteId, playSound, isMobile]);

  return {
    notes,
    score,
    gameActive,
    isFullscreen,
    isExitingFullscreen,
    playingTime,
    currentLevel,
    hitZones,
    gameRef,
    gameAreaRef,
    startGame,
    endGame,
    toggleFullscreen,
    handleTouchStart,
    handleMouseDown,
  };
};
