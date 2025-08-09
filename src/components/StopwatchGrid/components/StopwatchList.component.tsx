import type { StopwatchGridProps } from '../../../types/stopwatch.type';
import { StopwatchItem } from '../../StopwatchItem';

export const StopwatchList: React.FC<StopwatchGridProps> = ({
  stopwatches,
  onRemove,
  onShare,
}) => {
  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <div className="min-w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {stopwatches.map(stopwatch => (
              <StopwatchItem
                key={stopwatch.id}
                onShare={onShare}
                stopwatch={stopwatch}
                onRemove={onRemove}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
