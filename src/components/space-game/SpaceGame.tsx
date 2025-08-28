import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import './SpaceGame.css';

interface Star {
  id: number;
  x: number;
  y: number;
  speed: number;
  size: number;
}

export const SpaceGame = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [starId, setStarId] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const gameRef = useRef<HTMLDivElement>(null);

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setStars([]);
  };

  const endGame = () => {
    setGameActive(false);
    setStars([]);
  };

  const collectStar = (id: number) => {
    setStars((prev) => prev.filter((star) => star.id !== id));
    setScore((prev) => prev + 10);
  };

  // Full screen functionality
  const enterFullscreen = () => {
    const element = gameRef.current;
    if (!element) {
      console.log('Game element not found');
      return;
    }

    console.log('Attempting to enter fullscreen');

    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if ((element as any).mozRequestFullScreen) {
      (element as any).mozRequestFullScreen();
    } else if ((element as any).webkitRequestFullscreen) {
      (element as any).webkitRequestFullscreen();
    } else if ((element as any).msRequestFullscreen) {
      (element as any).msRequestFullscreen();
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).mozCancelFullScreen) {
      (document as any).mozCancelFullScreen();
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    } else if ((document as any).msExitFullscreen) {
      (document as any).msExitFullscreen();
    }
  };

  const toggleFullscreen = () => {
    if (
      !document.fullscreenElement &&
      !(document as any).mozFullScreenElement &&
      !(document as any).webkitFullscreenElement &&
      !(document as any).msFullscreenElement
    ) {
      enterFullscreen();
    } else {
      exitFullscreen();
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).msFullscreenElement
      );
      console.log('Fullscreen change detected:', isCurrentlyFullscreen);
      setIsFullscreen(isCurrentlyFullscreen);

      // Add/remove class to body to hide other content
      if (isCurrentlyFullscreen) {
        document.body.classList.add('game-fullscreen-active');
        console.log('Added game-fullscreen-active class to body');
      } else {
        document.body.classList.remove('game-fullscreen-active');
        console.log('Removed game-fullscreen-active class from body');
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener(
        'mozfullscreenchange',
        handleFullscreenChange
      );
      document.removeEventListener(
        'webkitfullscreenchange',
        handleFullscreenChange
      );
      document.removeEventListener(
        'MSFullscreenChange',
        handleFullscreenChange
      );
      document.body.classList.remove('game-fullscreen-active');
    };
  }, []);

  useEffect(() => {
    if (!gameActive) return;

    const gameInterval = setInterval(
      () => {
        // Add new star
        const newStar: Star = {
          id: starId,
          x: Math.random() * 90 + 5, // 5% to 95% of width
          y: -10,
          speed: Math.random() * 2 + 1,
          size: Math.random() * 20 + 10,
        };
        setStars((prev) => [...prev, newStar]);
        setStarId((prev) => prev + 1);

        // Move existing stars
        setStars(
          (prev) =>
            prev
              .map((star) => ({
                ...star,
                y: star.y + star.speed,
              }))
              .filter((star) => star.y < 110) // Remove stars that fell off screen
        );
      },
      isFullscreen ? 600 : 1000
    ); // Faster star spawning in fullscreen

    return () => clearInterval(gameInterval);
  }, [gameActive, starId, isFullscreen]);

  return (
    <div
      className={`space-game ${isFullscreen ? 'fullscreen-active' : ''}`}
      ref={gameRef}
      style={
        isFullscreen
          ? {
              border: '4px solid #ff00ff',
              boxShadow: '0 0 50px rgba(255, 0, 255, 0.8)',
            }
          : {}
      }
    >
      <div className="game-header">
        <h3>Space Star Collector</h3>
        <div className="game-controls">
          <span className="score">Score: {score}</span>
          <button
            className="game-btn fullscreen-btn"
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? '🗗' : '🗖'}
          </button>
          {!gameActive ? (
            <button className="game-btn start-btn" onClick={startGame}>
              Start Game
            </button>
          ) : (
            <button className="game-btn end-btn" onClick={endGame}>
              End Game
            </button>
          )}
        </div>
      </div>

      <div className="game-area">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
              scale: { duration: 1, repeat: Infinity },
            }}
            onClick={() => collectStar(star.id)}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.8 }}
          >
            ⭐
          </motion.div>
        ))}
      </div>

      <div className="game-instructions">
        {!gameActive ? (
          <p>
            Click "Start Game" to begin collecting falling stars!{' '}
            {isFullscreen && '🎮 Fullscreen Mode Active'}
          </p>
        ) : (
          <p>
            Click on the falling stars to collect them and earn points!{' '}
            {isFullscreen && '⭐ Stars spawn faster in fullscreen!'}
          </p>
        )}
      </div>
    </div>
  );
};
