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
    className={`setting-item ${isMobile ? 'setting-item--mobile' : ''}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <div className={`setting-item__header`}>
      <span
        className={`setting-item__label ${
          isMobile ? 'setting-item__label--mobile' : ''
        }`}
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
    {description && <p className="setting-item__description">{description}</p>}
  </motion.div>
);
