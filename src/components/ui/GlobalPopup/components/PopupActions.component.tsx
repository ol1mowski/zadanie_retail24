import { Button } from '../../Button/Button.component';
import type { PopupType } from './PopupIcon.component';

interface PopupActionsProps {
  type: PopupType;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const PopupActions: React.FC<PopupActionsProps> = ({
  type,
  onClose,
  onConfirm,
  confirmText = 'OK',
  cancelText = 'Anuluj',
}) => {
  const getButtonVariant = ():
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
    | 'primary' => {
    switch (type) {
      case 'success':
        return 'success';
      case 'confirmation':
        return 'primary';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      case 'share':
        return 'info';
      case 'import':
        return 'success';
      default:
        return 'primary';
    }
  };

  const buttonVariant = getButtonVariant();

  return (
    <div className="flex gap-3 justify-center">
      {onConfirm && (
        <Button variant="secondary" size="lg" onClick={onClose}>
          {cancelText}
        </Button>
      )}
      <Button variant={buttonVariant} size="lg" onClick={onConfirm || onClose}>
        {type === 'share' ? 'Zamknij' : confirmText}
      </Button>
    </div>
  );
};
