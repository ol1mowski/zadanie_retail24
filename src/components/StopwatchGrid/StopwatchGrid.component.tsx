import type { StopwatchGridProps } from '../../types/stopwatch.type';
import { EmptyState } from './components/EmptyState.component';
import { StopwatchList } from './components/StopwatchList.component';
import { StopwatchCounter } from './components/StopwatchCounter.component';
import { LoadingSpinner } from '../ui';
import { isStopwatchCompleted } from '../../utils/stopwatch.utils';

export const StopwatchGrid: React.FC<StopwatchGridProps> = ({
  stopwatches,
  onRemove,
  onShare,
  isLoading = false,
}) => {
  if (isLoading) {
    return <LoadingSpinner text="Ładowanie stoperów..." size="lg" />;
  }

  if (stopwatches.length === 0) {
    return <EmptyState />;
  }

  const hasCompletedStopwatches = stopwatches.some(stopwatch =>
    isStopwatchCompleted(stopwatch)
  );

  return (
    <div className="w-full">
      <StopwatchList
        stopwatches={stopwatches}
        onRemove={onRemove}
        onShare={onShare}
        hasCompletedStopwatches={hasCompletedStopwatches}
      />
      <StopwatchCounter count={stopwatches.length} />
    </div>
  );
};
