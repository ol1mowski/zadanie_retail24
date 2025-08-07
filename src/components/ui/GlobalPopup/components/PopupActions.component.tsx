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
  const getButtonStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500 hover:bg-green-600';
      case 'confirmation':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'warning':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'error':
        return 'bg-red-500 hover:bg-red-600';
      case 'share':
        return 'bg-purple-500 hover:bg-purple-600';
      case 'import':
        return 'bg-green-500 hover:bg-green-600';
      default:
        return 'bg-blue-500 hover:bg-blue-600';
    }
  };

  const buttonStyles = getButtonStyles();

  return (
    <div className="flex gap-3 justify-center">
      {onConfirm && (
        <button
          onClick={onClose}
          className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 font-medium text-lg"
        >
          {cancelText}
        </button>
      )}
      <button
        onClick={onConfirm || onClose}
        className={`px-6 py-3 text-white rounded-lg transition-colors duration-200 font-medium text-lg ${buttonStyles}`}
      >
        {type === 'share' ? 'Zamknij' : confirmText}
      </button>
    </div>
  );
};
