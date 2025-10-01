import type { FC } from 'react';
import { memo, useCallback, useEffect } from 'react';
import {
  FaBullseye,
  FaClock,
  FaRedo,
  FaStar,
  FaTimes,
  FaTimesCircle,
  FaTrophy,
} from 'react-icons/fa';
import './GameOverModal.css';

interface GameOverModalProps {
  isVisible: boolean;
  score: number;
  playingTime: number;
  currentLevel: number;
  missedPlanets: number;
  onPlayAgain: (action?: 'end' | 'restart') => void;
  onClose: () => void;
}

const GameOverModal: FC<GameOverModalProps> = ({
  isVisible,
  score,
  playingTime,
  currentLevel,
  missedPlanets,
  onPlayAgain,
  onClose,
}) => {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target !== e.currentTarget) return;
      onPlayAgain('end');
      onClose();
    },
    [onPlayAgain, onClose]
  );

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onPlayAgain('end');
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isVisible, onPlayAgain, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className="game-over-modal-backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="game-over-modal">
        <button
          className="game-over-modal__close"
          onClick={() => {
            onPlayAgain('end');
            onClose();
          }}
          aria-label="Close modal without restarting"
          type="button"
        >
          <FaTimes />
        </button>

        <div className="game-over-modal__content">
          <div className="game-over-modal__header">
            <h2 id="modal-title" className="game-over-modal__title">
              GAME OVER
            </h2>
            <p className="game-over-modal__subtitle">
              Mission Failed - {missedPlanets} Planets Lost
            </p>
          </div>

          <div className="game-over-modal__stats">
            <div className="stat-item">
              <div className="stat-icon score-icon">
                <FaStar />
              </div>
              <div className="stat-info">
                <span className="stat-value">{score.toLocaleString()}</span>
                <span className="stat-label">Score</span>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon time-icon">
                <FaClock />
              </div>
              <div className="stat-info">
                <span className="stat-value">{formatTime(playingTime)}</span>
                <span className="stat-label">Time</span>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon level-icon">
                <FaTrophy />
              </div>
              <div className="stat-info">
                <span className="stat-value">{currentLevel}</span>
                <span className="stat-label">Level</span>
              </div>
            </div>

            <div className="stat-item success">
              <div className="stat-icon hit-icon">
                <FaBullseye />
              </div>
              <div className="stat-info">
                <span className="stat-value">{Math.floor(score / 25)}</span>
                <span className="stat-label">Hits</span>
              </div>
            </div>

            <div className="stat-item danger">
              <div className="stat-icon miss-icon">
                <FaTimesCircle />
              </div>
              <div className="stat-info">
                <span className="stat-value">{missedPlanets}</span>
                <span className="stat-label">Missed</span>
              </div>
            </div>
          </div>

          <div className="game-over-modal__actions">
            <button
              className="play-again-button"
              onClick={() => onPlayAgain('restart')}
              type="button"
            >
              <div className="play-again-button__content">
                <div className="play-again-button__icon">
                  <FaRedo />
                </div>
                <span className="play-again-button__text">Play Again</span>
              </div>
              <div className="play-again-button__glow"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(GameOverModal);
