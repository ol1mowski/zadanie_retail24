import { useEffect } from 'react';
import type { PopupType } from '../components/PopupIcon.component';

interface UseGlobalPopupProps {
  isVisible: boolean;
  autoHideDuration?: number;
  showAutoHide?: boolean;
  onConfirm?: () => void;
  type?: PopupType;
  onClose: () => void;
}

export const useGlobalPopup = ({
  isVisible,
  autoHideDuration = 5000,
  showAutoHide = true,
  onConfirm,
  type = 'success',
  onClose,
}: UseGlobalPopupProps) => {
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

  return {
    handleOverlayClick,
    handleContainerClick,
  };
};
