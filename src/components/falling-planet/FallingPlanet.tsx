import { useResponsive } from '../../hooks/useResponsive';
import './FallingPlanet.css';
import { GameArea } from './GameArea';
import { GameControls } from './GameControls';
import { GameInstructions } from './GameInstructions';
import { useGameLogic } from './useGameLogic';

export const FallingPlanet = () => {
  const { isMobile } = useResponsive();
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
  } = useGameLogic();

  return (
    <div
      className={`falling-planet ${isFullscreen ? 'fullscreen-active' : ''} ${
        isMobile && isFullscreen ? 'mobile-fullscreen' : ''
      }`}
      ref={gameRef}
    >
      <GameControls
        gameActive={gameActive}
        isFullscreen={isFullscreen}
        isExitingFullscreen={isExitingFullscreen}
        score={score}
        playingTime={playingTime}
        currentLevel={currentLevel}
        onStartGame={startGame}
        onEndGame={endGame}
        onToggleFullscreen={toggleFullscreen}
      />

      <GameArea
        notes={notes}
        hitZones={hitZones}
        gameAreaRef={gameAreaRef}
        onTouchStart={handleTouchStart}
        onMouseDown={handleMouseDown}
        onHitNote={() => {}}
        isMobile={isMobile}
      />

      <GameInstructions gameActive={gameActive} isMobile={isMobile} />
    </div>
  );
};
