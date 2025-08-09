import type { Stopwatch } from '../../../types/stopwatch.type';
import { Button } from '../../ui/Button/Button.component';

interface StopwatchActionsProps {
  id: string;
  isCompleted: boolean;
  stopwatch: Stopwatch;
  onRemove: (id: string) => void;
  onShare: (stopwatch: Stopwatch) => void;
  isReadOnly?: boolean;
}

export const StopwatchActions: React.FC<StopwatchActionsProps> = ({
  id,
  isCompleted,
  stopwatch,
  onRemove,
  onShare,
  isReadOnly = false,
}) => {
  if (isReadOnly) {
    return (
      <div className="flex gap-2 justify-center">
        <div className="px-2 sm:px-3 md:px-4 py-1 sm:py-2 bg-gray-100 text-gray-500 rounded-lg text-xs sm:text-sm font-medium">
          Tryb podglądu
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2 justify-center">
      {!isCompleted && (
        <Button
          variant="info"
          size="sm"
          className="sm:text-base"
          onClick={() => onShare(stopwatch)}
          title={`Udostępnij stoper "${stopwatch.name}"`}
          aria-label={`Udostępnij stoper "${stopwatch.name}"`}
        >
          <span>Udostępnij</span>
        </Button>
      )}

      <Button
        variant="error"
        size="sm"
        className="sm:text-base"
        onClick={() => onRemove(id)}
      >
        Usuń
      </Button>
    </div>
  );
};
