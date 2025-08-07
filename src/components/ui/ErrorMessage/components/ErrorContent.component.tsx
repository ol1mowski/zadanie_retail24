import { ErrorIcon, type ErrorType } from './ErrorIcon.component';
import { ErrorActions } from './ErrorActions.component';

interface ErrorContentProps {
  type: ErrorType;
  title: string;
  message: string;
  showIcon?: boolean;
  onRetry?: () => void;
  onClose?: () => void;
}

export const ErrorContent: React.FC<ErrorContentProps> = ({
  type,
  title,
  message,
  showIcon = true,
  onRetry,
  onClose,
}) => {
  return (
    <>
      <ErrorIcon type={type} showIcon={showIcon} />
      <div className="flex-1">
        <h3 className="font-medium mb-1">{title}</h3>
        <p className="text-sm opacity-90">{message}</p>
        <ErrorActions onRetry={onRetry} onClose={onClose} />
      </div>
    </>
  );
};
