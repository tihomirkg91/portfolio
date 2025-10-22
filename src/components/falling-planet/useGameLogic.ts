import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useDeferredValue,
  startTransition,
  useMemo,
} from 'react';
import { useResponsive } from '../../hooks/useResponsive';
import { LANES, LANE_COLORS, LANE_KEYS } from './constants';
import { Z_INDEX } from '../../utils/zIndex';
import type { HitZone, Planet } from './types';

export const useGameLogic = () => {
  const { isMobile } = useResponsive();
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [planetId, setPlanetId] = useState(0);
  const [missedPlanets, setMissedPlanets] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isExitingFullscreen, setIsExitingFullscreen] = useState(false);
  const [playingTime, setPlayingTime] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [gameOverVisible, setGameOverVisible] = useState(false);
  const [hitZones, setHitZones] = useState<HitZone[]>(
    Array.from({ length: LANES }, (_, i) => ({
      lane: i,
      active: false,
      timer: 0,
    }))
  );

  const deferredPlanets = useDeferredValue(planets);
  const deferredHitZones = useDeferredValue(hitZones);

  const gameStats = useMemo(
    () => ({
      planetsOnScreen: planets.length,
      averagePlanetSpeed:
        planets.reduce((acc, p) => acc + p.speed, 0) / (planets.length || 1),
      activeLanes: hitZones.filter(hz => hz.active).length,
    }),
    [planets, hitZones]
  );

  const scoreRef = useRef(0);
  const gameActiveRef = useRef(false);
  const planetsRef = useRef<Planet[]>([]);
  const gameRef = useRef<HTMLDivElement>(null);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastPlanetSpawnRef = useRef(0);
  const startTimeRef = useRef<number>(0);
  const timerIntervalRef = useRef<number | null>(null);
  const currentSpeedRef = useRef(1.5);
  const missedPlanetsRef = useRef(0);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    gameActiveRef.current = gameActive;
  }, [gameActive]);

  useEffect(() => {
    missedPlanetsRef.current = missedPlanets;
  }, [missedPlanets]);

  useEffect(() => {
    planetsRef.current = planets;
  }, [planets]);

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

  const hitPlanet = useCallback(
    (lane: number) => {
      if (!gameActiveRef.current) return;

      const planetsToHit = planetsRef.current.filter(planet => {
        return planet.lane === lane && planet.y >= 0 && planet.y <= 100;
      });

      if (planetsToHit.length > 0) {
        const planetToHit = planetsToHit[0];

        if (planetToHit) {
          const points = 25;
          playSound(600, 150);

          startTransition(() => {
            setScore(prev => prev + points);
            setPlanets(prev =>
              prev.filter(planet => planet.id !== planetToHit.id)
            );
          });

          setHitZones(prev =>
            prev.map(hz =>
              hz.lane === lane ? { ...hz, active: true, timer: 200 } : hz
            )
          );
        }
      } else {
        playSound(200, 100);
        setHitZones(prev =>
          prev.map(hz =>
            hz.lane === lane ? { ...hz, active: true, timer: 200 } : hz
          )
        );
      }
    },
    [playSound]
  );

  const handleGameOverClose = useCallback(() => {
    setGameOverVisible(false);
  }, []);

  const startGame = () => {
    gameActiveRef.current = true;
    missedPlanetsRef.current = 0;
    currentSpeedRef.current = 1.5;
    startTimeRef.current = Date.now();

    startTransition(() => {
      setGameActive(true);
      setScore(0);
      setPlayingTime(0);
      setCurrentLevel(1);
      setMissedPlanets(0);
      setGameOverVisible(false);
      setPlanets([]);
      setHitZones(
        Array.from({ length: LANES }, (_, i) => ({
          lane: i,
          active: false,
          timer: 0,
        }))
      );
    });

    if (isMobile && isFullscreen && gameAreaRef.current) {
      const newHeight = window.innerHeight - 200;
      gameAreaRef.current.style.height = `${newHeight}px`;
    }
  };

  const handlePlayAgain = useCallback(
    (action: 'end' | 'restart' = 'restart') => {
      setGameOverVisible(false);
      if (action !== 'end') startGame();
    },
    [startGame]
  );

  const endGame = useCallback(() => {
    gameActiveRef.current = false;

    startTransition(() => {
      setGameActive(false);
      setPlanets([]);
      setHitZones(
        Array.from({ length: LANES }, (_, i) => ({
          lane: i,
          active: false,
          timer: 0,
        }))
      );
    });
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

      if (isMobile) requestAnimationFrame(() => hitPlanet(lane));
      else hitPlanet(lane);
    },
    [hitPlanet, isMobile]
  );

  const handleMouseDown = useCallback(
    (lane: number, event?: React.MouseEvent) => {
      if (event) event.preventDefault();

      hitPlanet(lane);
    },
    [hitPlanet]
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
              style.zIndex = Z_INDEX.GAME_MODAL.toString();
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
  }, [isMobile]);

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
        hitPlanet(laneIndex);
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
    hitPlanet,
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
        hitPlanet(laneIndex);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [gameActive, hitPlanet]);

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
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;

    const missedPlanetIds = new Set<number>();

    const consolidatedGameLoop = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;

      if (deltaTime >= frameInterval) {
        if (
          currentTime - lastPlanetSpawnRef.current > 800 &&
          Math.random() < 0.4
        ) {
          const lane = Math.floor(Math.random() * LANES);
          const newPlanet: Planet = {
            id: planetId,
            lane,
            y: -10,
            speed: currentSpeedRef.current,
            size: 30,
            color: LANE_COLORS[lane] || '#ffffff',
          };

          setPlanets(prev => [...prev, newPlanet]);
          setPlanetId(prev => prev + 1);
          lastPlanetSpawnRef.current = currentTime;
        }

        setPlanets(prev => {
          const planetsToRemove: number[] = [];
          const updatedPlanets = prev
            .map(planet => ({
              ...planet,
              y: planet.y + planet.speed,
            }))
            .filter(planet => {
              if (planet.y > 105) {
                if (!missedPlanetIds.has(planet.id)) {
                  missedPlanetIds.add(planet.id);
                  planetsToRemove.push(planet.id);
                  playSound(150, 100);
                }
                return false;
              }
              return true;
            });

          if (planetsToRemove.length > 0) {
            const newMissedCount =
              missedPlanetsRef.current + planetsToRemove.length;
            setMissedPlanets(newMissedCount);

            if (newMissedCount >= 3) {
              setGameActive(false);
              setGameOverVisible(true);
            }
          }

          return updatedPlanets;
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
  }, [gameActive, planetId, playSound, isMobile]);

  return {
    planets: deferredPlanets,
    score,
    gameActive,
    isFullscreen,
    isExitingFullscreen,
    playingTime,
    currentLevel,
    hitZones: deferredHitZones,
    missedPlanets,
    gameOverVisible,
    gameRef,
    gameAreaRef,
    gameStats,
    startGame,
    endGame,
    toggleFullscreen,
    handleTouchStart,
    handleMouseDown,
    handleGameOverClose,
    handlePlayAgain,
  };
};
