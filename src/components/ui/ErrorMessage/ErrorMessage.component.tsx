import { ErrorContent, type ErrorType } from './components';

interface ErrorMessageProps {
  title: string;
  message: string;
  type?: ErrorType;
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
      <ErrorContent
        type={type}
        title={title}
        message={message}
        showIcon={showIcon}
        onRetry={onRetry}
        onClose={onClose}
      />
    </div>
  );
};
