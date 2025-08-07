import { useEffect } from 'react';

export type PopupType =
  | 'success'
  | 'confirmation'
  | 'warning'
  | 'error'
  | 'share'
  | 'import';

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
}) => {
  useEffect(() => {
    if (isVisible && autoHideDuration > 0 && showAutoHide && !onConfirm) {
      const timer = setTimeout(() => {
        onClose();
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, autoHideDuration, onClose, showAutoHide, onConfirm]);

  if (!isVisible) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          iconBg: 'bg-green-500',
          icon: (
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ),
          buttonBg: 'bg-green-500 hover:bg-green-600',
        };
      case 'confirmation':
        return {
          iconBg: 'bg-blue-500',
          icon: (
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ),
          buttonBg: 'bg-blue-500 hover:bg-blue-600',
        };
      case 'warning':
        return {
          iconBg: 'bg-yellow-500',
          icon: (
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          ),
          buttonBg: 'bg-yellow-500 hover:bg-yellow-600',
        };
      case 'error':
        return {
          iconBg: 'bg-red-500',
          icon: (
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ),
          buttonBg: 'bg-red-500 hover:bg-red-600',
        };
      case 'share':
        return {
          iconBg: 'bg-purple-500',
          icon: (
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
              />
            </svg>
          ),
          buttonBg: 'bg-purple-500 hover:bg-purple-600',
        };
      case 'import':
        return {
          iconBg: 'bg-green-500',
          icon: (
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
              />
            </svg>
          ),
          buttonBg: 'bg-green-500 hover:bg-green-600',
        };
      default:
        return {
          iconBg: 'bg-blue-500',
          icon: (
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ),
          buttonBg: 'bg-blue-500 hover:bg-blue-600',
        };
    }
  };

  const typeStyles = getTypeStyles();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-8 text-center">
        <div className="mb-6">
          <div
            className={`w-16 h-16 ${typeStyles.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}
          >
            {typeStyles.icon}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600 text-lg mb-4">{message}</p>

          {type === 'share' && shareLink && (
            <div className="mb-4">
              <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-lg border">
                <input
                  type="text"
                  value={shareLink}
                  readOnly
                  className="flex-1 bg-transparent text-sm text-gray-700 outline-none"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(shareLink).then(() => {
                      // TODO: dodać feedback o skopiowaniu
                    });
                  }}
                  className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                  title="Kopiuj link"
                >
                  Kopiuj
                </button>
              </div>
            </div>
          )}
        </div>

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
            className={`px-6 py-3 text-white rounded-lg transition-colors duration-200 font-medium text-lg ${typeStyles.buttonBg}`}
          >
            {type === 'share' ? 'Zamknij' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
