import type { StopwatchStatus } from '../../../types/stopwatch';

interface StopwatchActionsProps {
  id: string;
  status: StopwatchStatus;
  isCompleted: boolean;
  onRemove: (id: string) => void;
  onPause: (id: string) => void;
  onResume: (id: string) => void;
}

export const StopwatchActions: React.FC<StopwatchActionsProps> = ({
  id,
  status,
  isCompleted,
  onRemove,
  onPause,
  onResume,
}) => {
  return (
    <div className="flex gap-2 justify-center">
      {!isCompleted && (
        <>
          {status === 'active' ? (
            <button
              onClick={() => onPause(id)}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200 text-sm font-medium"
            >
              Wstrzymaj
            </button>
          ) : (
            <button
              onClick={() => onResume(id)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 text-sm font-medium"
            >
              Wznów
            </button>
          )}
        </>
      )}

      <button
        onClick={() => onRemove(id)}
        className="px-4 py-2 text-white rounded-lg transition-colors duration-200 text-sm font-medium bg-red-500 hover:bg-red-600"
      >
        Usuń
      </button>
    </div>
  );
};
