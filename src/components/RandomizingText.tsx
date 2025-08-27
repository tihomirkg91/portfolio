import { useState, useEffect, CSSProperties } from 'react';

interface RandomizingTextProps {
  text: string;
  isHovered?: boolean;
  isClicked?: boolean;
  triggerType?: 'hover' | 'click';
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

export const RandomizingText = ({
  text,
  isHovered = false,
  isClicked = false,
  triggerType = 'hover',
  className = '',
  style,
  onClick,
}: RandomizingTextProps) => {
  const [displayText, setDisplayText] = useState(text);
  const [internalClicked, setInternalClicked] = useState(false);
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';

  // Determine if animation should trigger based on trigger type
  const shouldAnimate =
    triggerType === 'hover' ? isHovered : isClicked || internalClicked;

  const handleClick = () => {
    if (triggerType === 'click') {
      setInternalClicked(true);
      // Reset after animation completes
      setTimeout(() => setInternalClicked(false), text.length * 80 + 500);
    }
    onClick?.();
  };

  useEffect(() => {
    if (!shouldAnimate) {
      setDisplayText(text);
      return;
    }

    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        prev
          .split('')
          .map((_, index) => {
            if (index < iterations) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('')
      );

      if (iterations >= text.length) {
        clearInterval(interval);
      }

      iterations += 1 / 3;
    }, 80);

    return () => clearInterval(interval);
  }, [shouldAnimate, text]);

  return (
    <span
      className={className}
      style={style}
      onClick={triggerType === 'click' ? handleClick : undefined}
      role={triggerType === 'click' ? 'button' : undefined}
      tabIndex={triggerType === 'click' ? 0 : undefined}
    >
      {displayText}
    </span>
  );
};
