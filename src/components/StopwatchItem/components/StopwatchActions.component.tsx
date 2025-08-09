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
        <div className="px-4 py-2 bg-gray-100 text-gray-500 rounded-lg text-sm font-medium">
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
          onClick={() => onShare(stopwatch)}
          title={`Udostępnij stoper "${stopwatch.name}"`}
          aria-label={`Udostępnij stoper "${stopwatch.name}"`}
        >
          <span>Udostępnij</span>
        </Button>
      )}

      <Button variant="error" size="sm" onClick={() => onRemove(id)}>
        Usuń
      </Button>
    </div>
  );
};
