import { LuKeyboard } from 'react-icons/lu';

interface GameInstructionsProps {
  gameActive: boolean;
  isMobile: boolean;
}

export const GameInstructions = ({
  gameActive,
  isMobile,
}: GameInstructionsProps) => {
  return (
    <div className="game-instructions">
      {!gameActive ? (
        <div>
          Press "Start Game" to begin!{' '}
          {isMobile ? null : (
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
          )}
        </div>
      ) : (
        <div>
          {isMobile ? (
            <>
              Tap the colored zones when notes reach them! Perfect timing = more
              points!{' '}
            </>
          ) : (
            <>
              Hit the notes when they reach the colored zones! Perfect timing =
              more points!
            </>
          )}
        </div>
      )}
    </div>
  );
};
