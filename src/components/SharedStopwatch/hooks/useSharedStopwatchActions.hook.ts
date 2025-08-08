import type { Stopwatch } from '../../../types/stopwatch.type';
import { useStopwatchActions } from '../../../hooks/useStopwatchActions.hook';

export const useSharedStopwatchActions = (
  sharedStopwatch: Stopwatch | null,
  localStopwatch: Stopwatch | null,
  setLocalStopwatch: (stopwatch: Stopwatch | null) => void,
  showPopup: (
    title: string,
    message: string,
    type: 'success' | 'confirmation' | 'share',
    onConfirm?: () => void,
    link?: string
  ) => void
) => {
  const { pauseStopwatch, resumeStopwatch, removeStopwatch, shareStopwatch } =
    useStopwatchActions(showPopup, undefined, setLocalStopwatch);

  return {
    handleRemoveStopwatch: () => {
      if (!sharedStopwatch) return;
      removeStopwatch(sharedStopwatch, () => {
        window.location.href = '/';
      });
    },
    handlePauseStopwatch: () => {
      if (!localStopwatch) return;
      pauseStopwatch(localStopwatch);
    },
    handleResumeStopwatch: () => {
      if (!localStopwatch) return;
      resumeStopwatch(localStopwatch);
    },
    handleShareStopwatch: () => {
      if (!localStopwatch) return;
      shareStopwatch(localStopwatch);
    },
  };
};
