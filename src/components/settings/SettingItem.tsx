import { motion } from 'framer-motion';
import { Toggle } from '../Toggle';

interface SettingItemProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  enabled: boolean;
  onClick: () => void;
  disabled?: boolean;
  description?: string | React.ReactNode;
  isMobile?: boolean;
}

export const SettingItem = ({
  icon: IconComponent,
  label,
  enabled,
  onClick,
  disabled = false,
  description,
  isMobile = false,
}: SettingItemProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    style={{
      background: isMobile
        ? 'rgba(255, 255, 255, 0.1)'
        : 'rgba(99, 102, 241, 0.05)',
      borderRadius: isMobile ? '20px' : '12px',
      padding: isMobile ? '24px' : '12px 16px',
      border: isMobile
        ? '2px solid rgba(255, 255, 255, 0.2)'
        : '1px solid rgba(99, 102, 241, 0.2)',
      backdropFilter: isMobile ? 'blur(10px)' : 'none',
      marginBottom: isMobile ? '0' : '20px',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: isMobile ? 'flex-start' : 'center',
    }}
  >
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: isMobile && description ? '12px' : 0,
      }}
    >
      <span
        style={{
          color: '#ffffff',
          fontSize: isMobile ? '18px' : '15px',
          fontWeight: isMobile ? 'bold' : '500',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <IconComponent size={isMobile ? 20 : 18} /> {label}
      </span>
      <Toggle
        enabled={enabled}
        onClick={onClick}
        size={isMobile ? 80 : 60}
        disabled={disabled}
      />
    </div>
    {description && (
      <p
        style={{
          color: '#ff9800',
          fontSize: '14px',
          margin: 0,
          fontStyle: 'italic',
        }}
      >
        {description}
      </p>
    )}
  </motion.div>
);
