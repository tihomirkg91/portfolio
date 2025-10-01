import { memo, useMemo, useCallback } from 'react';
import { LuMaximize2, LuMinimize2, LuPlay, LuSquare } from 'react-icons/lu';
import { useResponsive } from '../../hooks/useResponsive';

interface GameControlsProps {
  gameActive: boolean;
  isFullscreen: boolean;
  isExitingFullscreen: boolean;
  score: number;
  playingTime: number;
  currentLevel: number;
  missedPlanets: number;
  onStartGame: () => void;
  onEndGame: () => void;
  onToggleFullscreen: () => void;
  isTransitioning?: boolean;
}

export const GameControls = memo<GameControlsProps>(
  ({
    gameActive,
    isFullscreen,
    isExitingFullscreen,
    score,
    playingTime,
    currentLevel,
    missedPlanets,
    onStartGame,
    onEndGame,
    onToggleFullscreen,
    isTransitioning = false,
  }) => {
    const { isMobile } = useResponsive();

    const gameStats = useMemo(
      () => ({
        scoreFormatted: score.toLocaleString(),
        timeFormatted: `${playingTime}s`,
        levelFormatted: currentLevel.toString(),
        missedFormatted: `${missedPlanets}/3`,
        missedWarning: missedPlanets >= 2,
      }),
      [score, playingTime, currentLevel, missedPlanets]
    );

    const buttonConfig = useMemo(
      () => ({
        iconSize: isMobile ? 16 : 14,
        fullscreenIconSize: isMobile ? 18 : 14,
        startText: isMobile && !isFullscreen ? 'Start' : 'Start Game',
        endText: isMobile && !isFullscreen ? 'End' : 'End Game',
      }),
      [isMobile, isFullscreen]
    );

    const classNames = useMemo(
      () => ({
        missed: `missed ${gameStats.missedWarning ? 'warning' : ''}`,
        fullscreenBtn: `game-btn fullscreen-btn ${isFullscreen ? 'active' : ''} ${isExitingFullscreen ? 'exiting' : ''} ${isTransitioning ? 'transitioning' : ''}`,
        startBtn: `game-btn start-btn ${isTransitioning ? 'transitioning' : ''}`,
        endBtn: `game-btn end-btn ${isTransitioning ? 'transitioning' : ''}`,
      }),
      [
        gameStats.missedWarning,
        isFullscreen,
        isExitingFullscreen,
        isTransitioning,
      ]
    );

    const handleStartGame = useCallback(() => {
      if (!isTransitioning) onStartGame();
    }, [onStartGame, isTransitioning]);

    const handleEndGame = useCallback(() => {
      if (!isTransitioning) onEndGame();
    }, [onEndGame, isTransitioning]);

    const handleToggleFullscreen = useCallback(() => {
      if (!isTransitioning) onToggleFullscreen();
    }, [onToggleFullscreen, isTransitioning]);

    const fullscreenTitle = useMemo(
      () => (isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'),
      [isFullscreen]
    );

    return (
      <div className="game-header">
        <div className="game-stats">
          <div className="score">
            <span className="stat-label">Score:</span>
            <span className="stat-value">{gameStats.scoreFormatted}</span>
          </div>
          <div className="time">
            <span className="stat-label">Time:</span>
            <span className="stat-value">{gameStats.timeFormatted}</span>
          </div>
          <div className="level">
            <span className="stat-label">Level:</span>
            <span className="stat-value">{gameStats.levelFormatted}</span>
          </div>
          <div className={classNames.missed}>
            <span className="stat-label">Missed:</span>
            <span className="stat-value">{gameStats.missedFormatted}</span>
          </div>
        </div>

        <div className="game-controls">
          {!gameActive ? (
            <button
              className={classNames.startBtn}
              onClick={handleStartGame}
              disabled={isTransitioning}
            >
              <LuPlay size={buttonConfig.iconSize} />
              {buttonConfig.startText}
            </button>
          ) : (
            <button
              className={classNames.endBtn}
              onClick={handleEndGame}
              disabled={isTransitioning}
            >
              <LuSquare size={buttonConfig.iconSize} />
              {buttonConfig.endText}
            </button>
          )}

          <button
            className={classNames.fullscreenBtn}
            onClick={handleToggleFullscreen}
            title={fullscreenTitle}
            disabled={isTransitioning}
          >
            {isFullscreen ? (
              <LuMinimize2 size={buttonConfig.fullscreenIconSize} />
            ) : (
              <LuMaximize2 size={buttonConfig.fullscreenIconSize} />
            )}
          </button>
        </div>
      </div>
    );
  }
);

GameControls.displayName = 'GameControls';
