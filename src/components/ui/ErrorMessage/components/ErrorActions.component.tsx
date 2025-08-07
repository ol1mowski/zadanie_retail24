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
  );
};
