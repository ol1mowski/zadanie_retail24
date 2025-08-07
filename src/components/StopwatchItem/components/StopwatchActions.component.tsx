import type { Stopwatch, StopwatchStatus } from '../../../types/stopwatch.type';
import { Button } from '../../ui/Button/Button.component';
import { generateShareLink } from '../../../utils/share.utils';

interface StopwatchActionsProps {
  id: string;
  status: StopwatchStatus;
  isCompleted: boolean;
  stopwatch: Stopwatch;
  onRemove: (id: string) => void;
  onPause: (id: string) => void;
  onResume: (id: string) => void;
  onShare: (link: string) => void;
  isReadOnly?: boolean;
}

export const StopwatchActions: React.FC<StopwatchActionsProps> = ({
  id,
  status,
  isCompleted,
  stopwatch,
  onRemove,
  onPause,
  onResume,
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
        <>
          {status === 'active' ? (
            <Button variant="warning" size="sm" onClick={() => onPause(id)}>
              Wstrzymaj
            </Button>
          ) : (
            <Button variant="success" size="sm" onClick={() => onResume(id)}>
              Wznów
            </Button>
          )}
        </>
      )}

      {!isCompleted && (
        <Button
          variant="info"
          size="sm"
          onClick={() => onShare(generateShareLink(stopwatch))}
          title={`Udostępnij stoper "${stopwatch.name}"`}
          aria-label={`Udostępnij stoper "${stopwatch.name}"`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
            />
          </svg>
          <span>Udostępnij</span>
        </Button>
      )}

      <Button variant="error" size="sm" onClick={() => onRemove(id)}>
        Usuń
      </Button>
    </div>
  );
};
