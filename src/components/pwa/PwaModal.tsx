import { useInstallPrompt } from './useInstallPrompt';
import React, {
  useEffect,
  useState,
  startTransition,
  useOptimistic,
} from 'react';
import { pwaStorage } from '../../utils/pwaStorage';
import './PwaModal.css';

const MESSAGES = {
  INSTALLING: 'Installing...',
  INSTALL_SUCCESS: 'Installed successfully!',
  INSTALL_ERROR: 'Installation failed. Please try again.',
  INSTALL_APP: 'Install App',
  ADD_TO_HOME: 'Add to home screen for quick access',
  INSTALL: 'Install',
  MAYBE_LATER: 'Maybe Later',
  CLOSE_PROMPT: 'Close install prompt',
} as const;

export const PwaModal = () => {
  const { isInstallable, isInstalled, promptInstall } = useInstallPrompt();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasShownOnce, setHasShownOnce] = useState(false);
  const [optimisticInstallState, setOptimisticInstallState] = useOptimistic(
    { isInstalling: false, message: '' },
    (
      state,
      action: { type: 'installing' | 'success' | 'error'; message?: string }
    ) => {
      switch (action.type) {
        case 'installing':
          return { isInstalling: true, message: MESSAGES.INSTALLING };
        case 'success':
          return { isInstalling: false, message: MESSAGES.INSTALL_SUCCESS };
        case 'error':
          return {
            isInstalling: false,
            message: MESSAGES.INSTALL_ERROR,
          };
        default:
          return state;
      }
    }
  );

  useEffect(() => {
    if (
      isInstallable &&
      !isInstalled &&
      !hasShownOnce &&
      pwaStorage.shouldShowModal()
    ) {
      startTransition(() => {
        setIsModalOpen(true);
        setHasShownOnce(true);
      });
    }
  }, [isInstallable, isInstalled, hasShownOnce]);

  if (isInstalled || !isInstallable || !isModalOpen) return null;

  const handleInstall = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOptimisticInstallState({ type: 'installing' });

    try {
      const success = await promptInstall();
      if (success) {
        startTransition(() => {
          setOptimisticInstallState({ type: 'success' });

          setTimeout(() => {
            setIsModalOpen(false);
          }, 1500);
        });
      } else {
        startTransition(() => setOptimisticInstallState({ type: 'error' }));
      }
    } catch (error) {
      startTransition(() => {
        setOptimisticInstallState({ type: 'error' });
        console.error('Installation error:', error);
      });
    }
  };

  const closeModal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    startTransition(() => {
      setIsModalOpen(false);
    });
  };

  const handleMaybeLater = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    startTransition(() => {
      pwaStorage.setMaybeLater();
      setIsModalOpen(false);
    });
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      e.preventDefault();
      e.stopPropagation();
      closeModal(e);
    }
  };

  return (
    <div className="pwa-modal-overlay" onClick={handleOverlayClick}>
      <div
        className={`pwa-modal ${optimisticInstallState.isInstalling ? 'installing' : ''}`}
        onClick={e => e.stopPropagation()}
      >
        <button
          type="button"
          className="pwa-modal__close"
          onClick={closeModal}
          aria-label={MESSAGES.CLOSE_PROMPT}
          disabled={optimisticInstallState.isInstalling}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div className="pwa-modal__content">
          <div className="pwa-modal__icon">
            {optimisticInstallState.isInstalling ? (
              <svg
                className="spinning"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            ) : (
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7,10 12,15 17,10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            )}
          </div>
          <h4 className="pwa-modal__title">
            {optimisticInstallState.isInstalling
              ? MESSAGES.INSTALLING
              : MESSAGES.INSTALL_APP}
          </h4>
          <p className="pwa-modal__description">
            {optimisticInstallState.message || MESSAGES.ADD_TO_HOME}
          </p>
          <div className="pwa-modal__actions">
            <button
              type="button"
              className={`pwa-modal__install-btn ${optimisticInstallState.isInstalling ? 'loading' : ''}`}
              onClick={handleInstall}
              disabled={optimisticInstallState.isInstalling}
            >
              {optimisticInstallState.isInstalling
                ? MESSAGES.INSTALLING
                : MESSAGES.INSTALL}
            </button>
            <button
              type="button"
              className="pwa-modal__cancel-btn"
              onClick={handleMaybeLater}
              disabled={optimisticInstallState.isInstalling}
            >
              {MESSAGES.MAYBE_LATER}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
