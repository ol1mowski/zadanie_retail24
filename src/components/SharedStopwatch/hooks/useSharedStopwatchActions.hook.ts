import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Stopwatch } from '../../../types/stopwatch.type';
import { generateShareLink } from '../../../utils/share.utils';
import {
  saveStopwatchesToCookies,
  loadStopwatchesFromCookies,
} from '../../../utils/cookies.utils';

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
  const navigate = useNavigate();

  const handleRemoveStopwatch = useCallback(() => {
    if (!sharedStopwatch) return;

    showPopup(
      'Potwierdź usunięcie',
      `Czy na pewno chcesz usunąć stoper "${sharedStopwatch.name}"?`,
      'confirmation',
      () => {
        const savedStopwatches = loadStopwatchesFromCookies();
        const updatedStopwatches = savedStopwatches.filter(
          stopwatch => stopwatch.id !== sharedStopwatch.id
        );
        saveStopwatchesToCookies(updatedStopwatches);
        navigate('/');
      }
    );
  }, [sharedStopwatch, showPopup, navigate]);

  const handlePauseStopwatch = useCallback(() => {
    if (!localStopwatch) return;

    const savedStopwatches = loadStopwatchesFromCookies();
    const updatedStopwatches = savedStopwatches.map(stopwatch =>
      stopwatch.id === localStopwatch.id
        ? { ...stopwatch, status: 'paused' as const }
        : stopwatch
    );
    saveStopwatchesToCookies(updatedStopwatches);

    setLocalStopwatch(
      localStopwatch ? { ...localStopwatch, status: 'paused' as const } : null
    );
  }, [localStopwatch, setLocalStopwatch]);

  const handleResumeStopwatch = useCallback(() => {
    if (!localStopwatch) return;

    const savedStopwatches = loadStopwatchesFromCookies();
    const updatedStopwatches = savedStopwatches.map(stopwatch =>
      stopwatch.id === localStopwatch.id
        ? { ...stopwatch, status: 'active' as const }
        : stopwatch
    );
    saveStopwatchesToCookies(updatedStopwatches);

    setLocalStopwatch(
      localStopwatch ? { ...localStopwatch, status: 'active' as const } : null
    );
  }, [localStopwatch, setLocalStopwatch]);

  const handleShareStopwatch = useCallback(() => {
    if (!localStopwatch) return;

    const link = generateShareLink(localStopwatch);
    showPopup(
      'Udostępnij stoper',
      'Link został wygenerowany. Skopiuj go i wyślij znajomym:',
      'share',
      undefined,
      link
    );
  }, [localStopwatch, showPopup]);

  return {
    handleRemoveStopwatch,
    handlePauseStopwatch,
    handleResumeStopwatch,
    handleShareStopwatch,
  };
};
