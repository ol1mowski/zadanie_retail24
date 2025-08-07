import React from 'react';

interface ErrorMessageProps {
  title: string;
  message: string;
  type?: 'error' | 'warning' | 'info';
  onRetry?: () => void;
  onClose?: () => void;
  showIcon?: boolean;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title,
  message,
  type = 'error',
  onRetry,
  onClose,
  showIcon = true,
  className = '',
}) => {
  const getIcon = () => {
    if (!showIcon) return null;

    const iconClasses = 'w-6 h-6 mr-3';

    switch (type) {
      case 'warning':
        return (
          <svg
            className={`${iconClasses} text-yellow-500`}
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
        );
      case 'info':
        return (
          <svg
            className={`${iconClasses} text-blue-500`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      default:
        return (
          <svg
            className={`${iconClasses} text-red-500`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  const getContainerClasses = () => {
    const baseClasses = 'rounded-lg p-4 border flex items-start';

    switch (type) {
      case 'warning':
        return `${baseClasses} bg-yellow-50 border-yellow-200 text-yellow-800 ${className}`;
      case 'info':
        return `${baseClasses} bg-blue-50 border-blue-200 text-blue-800 ${className}`;
      default:
        return `${baseClasses} bg-red-50 border-red-200 text-red-800 ${className}`;
    }
  };

  return (
    <div className={getContainerClasses()}>
      {getIcon()}

      <div className="flex-1">
        <h3 className="font-medium mb-1">{title}</h3>
        <p className="text-sm opacity-90">{message}</p>

        {(onRetry || onClose) && (
          <div className="flex gap-2 mt-3">
            {onRetry && (
              <button
                onClick={onRetry}
                className="px-3 py-1 text-xs font-medium rounded bg-white border border-current hover:bg-opacity-10 transition-colors"
              >
                Spróbuj ponownie
              </button>
            )}
            {onClose && (
              <button
                onClick={onClose}
                className="px-3 py-1 text-xs font-medium rounded bg-white border border-current hover:bg-opacity-10 transition-colors"
              >
                Zamknij
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
