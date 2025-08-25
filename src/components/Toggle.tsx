import { motion } from 'framer-motion';
import { useSoundContext } from '../contexts/SoundContext';

interface ToggleProps {
  enabled: boolean;
  onClick: () => void;
  size?: number;
  disabled?: boolean;
}

export const Toggle = ({
  enabled,
  onClick,
  size = 60,
  disabled = false,
}: ToggleProps) => {
  const { playHoverSound } = useSoundContext();

  const toggleStyle = {
    width: size,
    height: size / 2,
    borderRadius: size / 4,
    position: 'relative' as const,
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: 'none',
    padding: 0,
    overflow: 'hidden',
    opacity: disabled ? 0.5 : 1,
    background: enabled
      ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)'
      : 'linear-gradient(135deg, #374151 0%, #4b5563 100%)',
    boxShadow: enabled
      ? '0 4px 20px rgba(99, 102, 241, 0.4), inset 0 1px 2px rgba(255,255,255,0.2)'
      : '0 2px 10px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255,255,255,0.1)',
  };

  const knobSize = size / 2.5;
  const knobStyle = {
    width: knobSize,
    height: knobSize,
    borderRadius: '50%',
    position: 'absolute' as const,
    top: (size / 2 - knobSize) / 2,
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.1)',
    transition: 'none', // Framer Motion handles this
  };

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => !disabled && playHoverSound()}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      style={toggleStyle}
    >
      <motion.div
        style={knobStyle}
        animate={{
          x: enabled
            ? size - knobSize - (size / 2 - knobSize) / 2
            : (size / 2 - knobSize) / 2,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 25,
        }}
      />
    </motion.button>
  );
};
