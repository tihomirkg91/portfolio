import { memo, useMemo } from 'react';
import { LuKeyboard } from 'react-icons/lu';

interface GameInstructionsProps {
  gameActive: boolean;
  isMobile: boolean;
  isTransitioning?: boolean;
}

export const GameInstructions = memo<GameInstructionsProps>(
  ({ gameActive, isMobile, isTransitioning = false }) => {
    const instructions = useMemo(() => {
      if (!gameActive) {
        return {
          main: 'Press "Start Game" to begin!',
          desktop: (
            <>
              Use A, S, D, F, G keys or tap the colored zones to hit the falling
              notes!
              <div className="keyboard-hint-container">
                <span className="keyboard-hint">
                  <LuKeyboard size={14} /> Press F11 or Ctrl+F for fullscreen
                  mode!
                </span>
              </div>
            </>
          ),
          mobile: null,
        };
      }

      return {
        main: isMobile
          ? 'Tap the colored zones when notes reach them! Perfect timing = more points!'
          : 'Hit the notes when they reach the colored zones! Perfect timing = more points!',
        desktop: null,
        mobile: null,
      };
    }, [gameActive, isMobile]);

    const containerClassName = useMemo(() => {
      const classes = ['game-instructions'];
      if (isTransitioning) classes.push('transitioning');
      if (gameActive) classes.push('active');
      return classes.join(' ');
    }, [isTransitioning, gameActive]);

    return (
      <div className={containerClassName}>
        <div>
          {instructions.main} {!isMobile && instructions.desktop}
          {isMobile && instructions.mobile}
        </div>
      </div>
    );
  }
);

GameInstructions.displayName = 'GameInstructions';
