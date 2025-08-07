import { Button } from '../../Button/Button.component';

interface ErrorActionsProps {
  onRetry?: () => void;
  onClose?: () => void;
}

export const ErrorActions: React.FC<ErrorActionsProps> = ({
  onRetry,
  onClose,
}) => {
  if (!onRetry && !onClose) return null;

  return (
    <div className="flex gap-2 mt-3">
      {onRetry && (
        <Button variant="ghost" size="sm" onClick={onRetry}>
          Spróbuj ponownie
        </Button>
      )}
      {onClose && (
        <Button variant="ghost" size="sm" onClick={onClose}>
          Zamknij
        </Button>
      )}
    </div>
  );
};
