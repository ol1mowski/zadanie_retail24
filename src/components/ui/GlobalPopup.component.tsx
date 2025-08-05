import { useEffect } from 'react';

interface GlobalPopupProps {
  isVisible: boolean;
  message: string;
  onClose: () => void;
  autoHideDuration?: number;
}

export const GlobalPopup: React.FC<GlobalPopupProps> = ({
  isVisible,
  message,
  onClose,
  autoHideDuration = 5000,
}) => {
  useEffect(() => {
    if (isVisible && autoHideDuration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, autoHideDuration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center p-4 z-[100] animate-popup-fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
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
          </div>
          <h2 className="text-2xl font-bold text-gray-900  mb-2">
            Stoper zakończony!
          </h2>
          <p className="text-gray-600 text-lg">{message}</p>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium text-lg"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};
