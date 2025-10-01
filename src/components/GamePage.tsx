import type { FC } from 'react';
import { FallingPlanet } from './falling-planet/FallingPlanet';
import GameOverModal from './falling-planet/GameOverModal';
import { useGameLogic } from './falling-planet/useGameLogic';
import './GamePage.css';

const GamePage: FC = () => {
  const gameLogic = useGameLogic();

  const {
    gameOverVisible,
    score,
    playingTime,
    currentLevel,
    missedPlanets,
    handleGameOverClose,
    handlePlayAgain,
  } = gameLogic;

  return (
    <div className="game-page">
      <div className="game-page__header">
        <h1 className="game-page__title">Falling Planet Rhythm Game</h1>
        <p className="game-page__subtitle">
          Test your reflexes in this interactive rhythm game built with React!
        </p>
      </div>

      <div className="game-page__container">
        <FallingPlanet gameLogic={gameLogic} />
      </div>

      <div className="game-page__instructions">
        <div className="instructions-card">
          <h3>How to Play</h3>
          <div className="instructions-content">
            <div className="instruction-item">
              <strong>Desktop:</strong> Use A, S, D, F, G keys or click the
              colored zones
            </div>
            <div className="instruction-item">
              <strong>Mobile:</strong> Tap the colored zones when notes reach
              them
            </div>
            <div className="instruction-item">
              <strong>Goal:</strong> Hit notes with perfect timing for maximum
              points
            </div>
            <div className="instruction-item">
              <strong>Features:</strong> Dynamic difficulty, fullscreen mode
            </div>
          </div>
        </div>
      </div>

      <GameOverModal
        isVisible={gameOverVisible}
        score={score}
        playingTime={playingTime}
        currentLevel={currentLevel}
        missedPlanets={missedPlanets}
        onPlayAgain={handlePlayAgain}
        onClose={handleGameOverClose}
      />
    </div>
  );
};

export default GamePage;
