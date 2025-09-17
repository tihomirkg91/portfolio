import { LuMaximize2, LuMinimize2, LuPlay, LuSquare } from 'react-icons/lu';
import { useResponsive } from '../../hooks/useResponsive';

interface GameControlsProps {
  gameActive: boolean;
  isFullscreen: boolean;
  isExitingFullscreen: boolean;
  score: number;
  playingTime: number;
  currentLevel: number;
  onStartGame: () => void;
  onEndGame: () => void;
  onToggleFullscreen: () => void;
}

export const GameControls = ({
  gameActive,
  isFullscreen,
  isExitingFullscreen,
  score,
  playingTime,
  currentLevel,
  onStartGame,
  onEndGame,
  onToggleFullscreen,
}: GameControlsProps) => {
  const { isMobile } = useResponsive();

  return (
    <div className="game-header">
      <div className="game-stats">
        <div className="score">
          <span className="stat-label">Score:</span>
          <span className="stat-value">{score}</span>
        </div>
        <div className="time">
          <span className="stat-label">Time:</span>
          <span className="stat-value">{playingTime}s</span>
        </div>
        <div className="level">
          <span className="stat-label">Level:</span>
          <span className="stat-value">{currentLevel}</span>
        </div>
      </div>

      <div className="game-controls">
        {!gameActive ? (
          <button className="game-btn start-btn" onClick={onStartGame}>
            <LuPlay size={isMobile ? 16 : 14} />
            {isMobile && !isFullscreen ? 'Start' : 'Start Game'}
          </button>
        ) : (
          <button className="game-btn end-btn" onClick={onEndGame}>
            <LuSquare size={isMobile ? 16 : 14} />
            {isMobile && !isFullscreen ? 'End' : 'End Game'}
          </button>
        )}

        <button
          className={`game-btn fullscreen-btn ${isFullscreen ? 'active' : ''} ${isExitingFullscreen ? 'exiting' : ''}`}
          onClick={onToggleFullscreen}
          title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        >
          {isFullscreen ? (
            <LuMinimize2 size={isMobile ? 18 : 14} />
          ) : (
            <LuMaximize2 size={isMobile ? 18 : 14} />
          )}
        </button>
      </div>
    </div>
  );
};
