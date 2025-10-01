import {
  memo,
  useMemo,
  startTransition,
  useActionState,
  useOptimistic,
  useCallback,
} from 'react';
import { useResponsive } from '../../hooks/useResponsive';
import './FallingPlanet.css';
import { GameArea } from './GameArea';
import { GameControls } from './GameControls';
import { GameInstructions } from './GameInstructions';
import type { useGameLogic } from './useGameLogic';

interface FallingPlanetProps {
  gameLogic: ReturnType<typeof useGameLogic>;
}

export const FallingPlanet = memo(({ gameLogic }: FallingPlanetProps) => {
  const { isMobile } = useResponsive();

  const {
    planets,
    score,
    gameActive,
    isFullscreen,
    isExitingFullscreen,
    playingTime,
    currentLevel,
    hitZones,
    missedPlanets,
    gameRef,
    gameAreaRef,
    startGame,
    endGame,
    toggleFullscreen,
    handleTouchStart,
    handleMouseDown,
  } = gameLogic;

  const [optimisticScore, addOptimisticScore] = useOptimistic(
    score,
    (state, increment: number) => state + increment
  );

  const [gameState, gameAction] = useActionState(
    async (
      prevState: { isTransitioning: boolean },
      action: 'start' | 'end' | 'toggle-fullscreen'
    ) => {
      switch (action) {
        case 'start':
          startTransition(() => {
            startGame();
          });
          return { isTransitioning: false };
        case 'end':
          startTransition(() => {
            endGame();
          });
          return { isTransitioning: false };
        case 'toggle-fullscreen':
          startTransition(() => {
            toggleFullscreen();
          });
          return { isTransitioning: false };
        default:
          return prevState;
      }
    },
    { isTransitioning: false }
  );

  const handleStartGame = useCallback(() => {
    startTransition(() => {
      gameAction('start');
    });
  }, []);

  const handleEndGame = useCallback(() => {
    startTransition(() => {
      gameAction('end');
    });
  }, []);

  const handleToggleFullscreen = useCallback(() => {
    startTransition(() => {
      gameAction('toggle-fullscreen');
    });
  }, []);

  const optimizedTouchStart = useCallback(
    (lane: number, event?: React.TouchEvent) => {
      addOptimisticScore(10);
      startTransition(() => {
        handleTouchStart(lane, event);
      });
    },
    []
  );

  const optimizedMouseDown = useCallback(
    (lane: number, event?: React.MouseEvent) => {
      addOptimisticScore(10);
      startTransition(() => {
        handleMouseDown(lane, event);
      });
    },
    []
  );

  const containerClassName = useMemo(() => {
    const classes = ['falling-planet'];
    if (isFullscreen) classes.push('fullscreen-active');
    if (gameState.isTransitioning) classes.push('transitioning');
    return classes.join(' ');
  }, [isFullscreen, gameState.isTransitioning]);

  const controlProps = useMemo(
    () => ({
      gameActive,
      isFullscreen,
      isExitingFullscreen,
      score: optimisticScore,
      playingTime,
      currentLevel,
      missedPlanets,
      onStartGame: handleStartGame,
      onEndGame: handleEndGame,
      onToggleFullscreen: handleToggleFullscreen,
      isTransitioning: gameState.isTransitioning,
    }),
    [
      gameActive,
      isFullscreen,
      isExitingFullscreen,
      optimisticScore,
      playingTime,
      currentLevel,
      missedPlanets,
      gameState.isTransitioning,
    ]
  );

  const gameAreaProps = useMemo(
    () => ({
      planets,
      hitZones,
      gameAreaRef,
      onTouchStart: optimizedTouchStart,
      onMouseDown: optimizedMouseDown,
      onHitPlanet: () => {},
      isMobile,
      isTransitioning: gameState.isTransitioning,
    }),
    [
      planets,
      hitZones,
      gameAreaRef,
      optimizedTouchStart,
      optimizedMouseDown,
      isMobile,
      gameState.isTransitioning,
    ]
  );

  const instructionProps = useMemo(
    () => ({
      gameActive,
      isMobile,
      isTransitioning: gameState.isTransitioning,
    }),
    [gameActive, isMobile, gameState.isTransitioning]
  );

  return (
    <div className={containerClassName} ref={gameRef}>
      <GameControls {...controlProps} />
      <GameArea {...gameAreaProps} />
      <GameInstructions {...instructionProps} />
    </div>
  );
});
