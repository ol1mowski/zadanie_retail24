import type { StopwatchGridProps } from '../../../types/stopwatch.type';
import { StopwatchItem } from '../../StopwatchItem';

export const StopwatchList: React.FC<StopwatchGridProps> = ({
  stopwatches,
  onRemove,
  onShare,
  hasCompletedStopwatches = false,
}) => {
  return (
    <div className="w-full">
      <div
        className={`overflow-x-hidden scroll-smooth ${
          stopwatches.length > 3
            ? `overflow-y-auto ${hasCompletedStopwatches ? 'max-h-[350px]' : 'max-h-[280px]'}`
            : 'overflow-y-visible'
        }`}
      >
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">
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
