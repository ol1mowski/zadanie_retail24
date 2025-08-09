import type { StopwatchGridProps } from '../../../types/stopwatch.type';
import { StopwatchItem } from '../../StopwatchItem';

export const StopwatchList: React.FC<StopwatchGridProps> = ({
  stopwatches,
  onRemove,
  onShare,
}) => {
  return (
    <div className="w-full">
      <div className="overflow-y-auto overflow-x-hidden scroll-smooth max-h-[280px]">
        <div className="p-6">
          <div className="grid grid-cols-3 gap-4 min-h-0">
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
