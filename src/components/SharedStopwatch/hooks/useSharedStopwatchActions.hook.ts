import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Stopwatch } from '../../../types/stopwatch';
import {
  saveStopwatchesToCookies,
  loadStopwatchesFromCookies,
} from '../../../utils/cookies.utils';
import { generateShareLink } from '../../../utils/share.utils';

interface UseSharedStopwatchActionsProps {
  sharedStopwatch: Stopwatch;
}

export const useSharedStopwatchActions = ({
  sharedStopwatch,
}: UseSharedStopwatchActionsProps) => {
  const navigate = useNavigate();

  const removeStopwatch = useCallback(() => {
    const savedStopwatches = loadStopwatchesFromCookies();
    const updatedStopwatches = savedStopwatches.filter(
      stopwatch => stopwatch.id !== sharedStopwatch.id
    );
    saveStopwatchesToCookies(updatedStopwatches);
    navigate('/');
  }, [sharedStopwatch.id, navigate]);

  const pauseStopwatch = useCallback(() => {
    const savedStopwatches = loadStopwatchesFromCookies();
    const updatedStopwatches = savedStopwatches.map(stopwatch =>
      stopwatch.id === sharedStopwatch.id
        ? { ...stopwatch, status: 'paused' as const }
        : stopwatch
    );
    saveStopwatchesToCookies(updatedStopwatches);
  }, [sharedStopwatch.id]);

  const resumeStopwatch = useCallback(() => {
    const savedStopwatches = loadStopwatchesFromCookies();
    const updatedStopwatches = savedStopwatches.map(stopwatch =>
      stopwatch.id === sharedStopwatch.id
        ? { ...stopwatch, status: 'active' as const }
        : stopwatch
    );
    saveStopwatchesToCookies(updatedStopwatches);
  }, [sharedStopwatch.id]);

  const shareStopwatch = useCallback(() => {
    const shareLink = generateShareLink(sharedStopwatch);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareLink);
      alert('Link został skopiowany do schowka!');
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = shareLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Link został skopiowany do schowka!');
    }
  }, [sharedStopwatch]);

  return {
    removeStopwatch,
    pauseStopwatch,
    resumeStopwatch,
    shareStopwatch,
  };
};
