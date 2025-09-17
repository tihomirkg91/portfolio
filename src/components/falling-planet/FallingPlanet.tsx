import { memo, useMemo } from 'react';
import { useResponsive } from '../../hooks/useResponsive';
import './FallingPlanet.css';
import { GameArea } from './GameArea';
import { GameControls } from './GameControls';
import { GameInstructions } from './GameInstructions';
import { useGameLogic } from './useGameLogic';

const MemoizedGameArea = memo(GameArea);
const MemoizedGameControls = memo(GameControls);
const MemoizedGameInstructions = memo(GameInstructions);

export const FallingPlanet = memo(() => {
  const { isMobile } = useResponsive();
  const gameLogic = useGameLogic();

  const {
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
  } = gameLogic;

  const containerClassName = useMemo(() => {
    const classes = ['falling-planet'];

    if (isFullscreen) classes.push('fullscreen-active');

    return classes.join(' ');
  }, [isFullscreen]);

  const controlProps = useMemo(
    () => ({
      gameActive,
      isFullscreen,
      isExitingFullscreen,
      score,
      playingTime,
      currentLevel,
      onStartGame: startGame,
      onEndGame: endGame,
      onToggleFullscreen: toggleFullscreen,
    }),
    [
      gameActive,
      isFullscreen,
      isExitingFullscreen,
      score,
      playingTime,
      currentLevel,
      startGame,
      endGame,
      toggleFullscreen,
    ]
  );

  const gameAreaProps = useMemo(
    () => ({
      notes,
      hitZones,
      gameAreaRef,
      onTouchStart: handleTouchStart,
      onMouseDown: handleMouseDown,
      onHitNote: () => {},
      isMobile,
    }),
    [notes, hitZones, gameAreaRef, handleTouchStart, handleMouseDown, isMobile]
  );

  const instructionProps = useMemo(
    () => ({
      gameActive,
      isMobile,
    }),
    [gameActive, isMobile]
  );

  return (
    <div className={containerClassName} ref={gameRef}>
      <MemoizedGameControls {...controlProps} />
      <MemoizedGameArea {...gameAreaProps} />
      <MemoizedGameInstructions {...instructionProps} />
    </div>
  );
});
