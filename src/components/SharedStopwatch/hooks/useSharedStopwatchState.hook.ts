import { useState, useEffect } from 'react';
import type { Stopwatch } from '../../../types/stopwatch.type';

export const useSharedStopwatchState = (sharedStopwatch: Stopwatch | null) => {
  const [localStopwatch, setLocalStopwatch] = useState(sharedStopwatch);

  useEffect(() => {
    if (sharedStopwatch) {
      setLocalStopwatch(sharedStopwatch);
    }
  }, [sharedStopwatch]);

  return {
    localStopwatch,
    setLocalStopwatch,
  };
};
