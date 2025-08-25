import { useState, useEffect, CSSProperties } from 'react';

interface RandomizingTextProps {
  text: string;
  isHovered: boolean;
  className?: string;
  style?: CSSProperties;
}

export const RandomizingText = ({
  text,
  isHovered,
  className = '',
  style,
}: RandomizingTextProps) => {
  const [displayText, setDisplayText] = useState(text);
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';

  useEffect(() => {
    if (!isHovered) {
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
  }, [isHovered, text]);

  return (
    <span className={className} style={style}>
      {displayText}
    </span>
  );
};
