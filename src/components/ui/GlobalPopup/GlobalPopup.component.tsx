import { useEffect } from 'react';
import { PopupContent, PopupActions, type PopupType } from './components';

interface GlobalPopupProps {
  isVisible: boolean;
  title: string;
  message: string;
  type?: PopupType;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  autoHideDuration?: number;
  showAutoHide?: boolean;
  shareLink?: string;
  children?: React.ReactNode;
}

export const GlobalPopup: React.FC<GlobalPopupProps> = ({
  isVisible,
  title,
  message,
  type = 'success',
  onClose,
  onConfirm,
  confirmText = 'OK',
  cancelText = 'Anuluj',
  autoHideDuration = 5000,
  showAutoHide = true,
  shareLink,
  children,
}) => {
  useEffect(() => {
    if (
      isVisible &&
      autoHideDuration > 0 &&
      showAutoHide &&
      !onConfirm &&
      type !== 'form'
    ) {
      const timer = setTimeout(() => {
        onClose();
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, autoHideDuration, onClose, showAutoHide, onConfirm, type]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleOverlayClick}
    >
      <div
        className={`bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-8 ${type === 'form' ? '' : 'text-center'}`}
        onClick={handleContainerClick}
      >
        {type === 'form' ? (
          children
        ) : (
          <>
            <PopupContent
              type={type}
              title={title}
              message={message}
              shareLink={shareLink}
            />
            <PopupActions
              type={type}
              onClose={onClose}
              onConfirm={onConfirm}
              confirmText={confirmText}
              cancelText={cancelText}
            />
          </>
        )}
      </div>
    </div>
  );
};
