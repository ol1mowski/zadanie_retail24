import type { StopwatchGridProps } from '../../types/stopwatch.type';
import { EmptyState } from './components/EmptyState.component';
import { StopwatchList } from './components/StopwatchList.component';
import { StopwatchCounter } from './components/StopwatchCounter.component';
import { LoadingSpinner } from '../ui';

export const StopwatchGrid: React.FC<StopwatchGridProps> = ({
  stopwatches,
  onRemove,
  onPause,
  onResume,
  onShare,
  isLoading = false,
}) => {
  if (isLoading) {
    return <LoadingSpinner text="Ładowanie stoperów..." size="lg" />;
  }

  if (stopwatches.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="w-full">
      <StopwatchList
        stopwatches={stopwatches}
        onRemove={onRemove}
        onPause={onPause}
        onResume={onResume}
        onShare={onShare}
      />
      <StopwatchCounter count={stopwatches.length} />
    </div>
  );
};
