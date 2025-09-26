import type { FC } from 'react';
import { useEffect } from 'react';
import { FaGamepad, FaTimes } from 'react-icons/fa';
import './ComingSoonModal.css';

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

const ComingSoonModal: FC<ComingSoonModalProps> = ({
  isOpen,
  onClose,
  title = 'Game Coming Soon!',
  message = 'This game will be available soon. Stay tuned for updates!',
}) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="coming-soon-modal-backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="coming-soon-modal">
        <button
          className="coming-soon-modal__close"
          onClick={onClose}
          aria-label="Close modal"
          type="button"
        >
          <FaTimes />
        </button>

        <div className="coming-soon-modal__content">
          <div className="coming-soon-modal__icon">
            <FaGamepad />
          </div>

          <h2 id="modal-title" className="coming-soon-modal__title">
            {title}
          </h2>

          <p className="coming-soon-modal__message">{message}</p>

          <button
            className="coming-soon-modal__button"
            onClick={onClose}
            type="button"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonModal;
