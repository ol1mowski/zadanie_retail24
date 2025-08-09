import { useSharedStopwatch } from './hooks/useSharedStopwatch.hook';
import { useSharedStopwatchState } from './hooks/useSharedStopwatchState.hook';
import { LoadingSpinner } from '../ui';
import {
  SharedStopwatchError,
  SharedStopwatchNotFound,
  SharedStopwatchContent,
} from './components';

export const SharedStopwatch: React.FC = () => {
  const { sharedStopwatch, isLoading, error, errorType } = useSharedStopwatch();
  const { localStopwatch } = useSharedStopwatchState(sharedStopwatch);

  if (isLoading) {
    return (
      <LoadingSpinner
        text="Ładowanie udostępnionego stopera..."
        fullScreen={true}
      />
    );
  }

  if (error) {
    return (
      <SharedStopwatchError error={error} errorType={errorType || 'unknown'} />
    );
  }

  if (!sharedStopwatch) {
    return <SharedStopwatchNotFound />;
  }

  return <SharedStopwatchContent stopwatch={localStopwatch} />;
};
