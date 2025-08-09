import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Stopwatch } from '../types/stopwatch.type';
import { generateShareLink } from '../utils/share.utils';
import {
  saveStopwatchesToCookies,
  loadStopwatchesFromCookies,
} from '../utils/cookies.utils';

export type PopupShowFunction = (
  title: string,
  message: string,
  type: 'success' | 'confirmation' | 'share',
  onConfirm?: () => void,
  link?: string
) => void;

export const useStopwatchActions = (
  showPopup: PopupShowFunction,
  setStopwatches?: (updater: (prev: Stopwatch[]) => Stopwatch[]) => void,
  setLocalStopwatch?: (stopwatch: Stopwatch | null) => void,
  navigate?: () => void
) => {
  let routerNavigate: (path?: string) => void;
  const currentOrigin = 'http://localhost:5173';

  try {
    const navigate = useNavigate();
    routerNavigate = (path?: string) => navigate(path || '/');
  } catch {
    routerNavigate = navigate || (() => {});
  }

  const pauseStopwatch = useCallback(
    (stopwatch: Stopwatch | string) => {
      const stopwatchId =
        typeof stopwatch === 'string' ? stopwatch : stopwatch.id;
      const targetStopwatch = typeof stopwatch === 'string' ? null : stopwatch;

      const savedStopwatches = loadStopwatchesFromCookies();
      const updatedStopwatches = savedStopwatches.map(sw =>
        sw.id === stopwatchId ? { ...sw, status: 'paused' as const } : sw
      );
      saveStopwatchesToCookies(updatedStopwatches);

      if (setStopwatches) {
        setStopwatches(prev =>
          prev.map(sw =>
            sw.id === stopwatchId ? { ...sw, status: 'paused' as const } : sw
          )
        );
      }

      if (setLocalStopwatch && targetStopwatch) {
        setLocalStopwatch({ ...targetStopwatch, status: 'paused' as const });
      }
    },
    [setStopwatches, setLocalStopwatch]
  );

  const resumeStopwatch = useCallback(
    (stopwatch: Stopwatch | string) => {
      const stopwatchId =
        typeof stopwatch === 'string' ? stopwatch : stopwatch.id;
      const targetStopwatch = typeof stopwatch === 'string' ? null : stopwatch;

      const savedStopwatches = loadStopwatchesFromCookies();
      const updatedStopwatches = savedStopwatches.map(sw =>
        sw.id === stopwatchId ? { ...sw, status: 'active' as const } : sw
      );
      saveStopwatchesToCookies(updatedStopwatches);

      if (setStopwatches) {
        setStopwatches(prev =>
          prev.map(sw =>
            sw.id === stopwatchId ? { ...sw, status: 'active' as const } : sw
          )
        );
      }

      if (setLocalStopwatch && targetStopwatch) {
        setLocalStopwatch({ ...targetStopwatch, status: 'active' as const });
      }
    },
    [setStopwatches, setLocalStopwatch]
  );

  const removeStopwatch = useCallback(
    (stopwatch: Stopwatch | string, onConfirm?: () => void) => {
      const stopwatchId =
        typeof stopwatch === 'string' ? stopwatch : stopwatch.id;
      const stopwatchName =
        typeof stopwatch === 'string' ? 'stoper' : stopwatch.name;

      showPopup(
        'Potwierdź usunięcie',
        `Czy na pewno chcesz usunąć stoper "${stopwatchName}"?`,
        'confirmation',
        () => {
          const savedStopwatches = loadStopwatchesFromCookies();
          const updatedStopwatches = savedStopwatches.filter(
            sw => sw.id !== stopwatchId
          );
          saveStopwatchesToCookies(updatedStopwatches);

          if (setStopwatches) {
            setStopwatches(prev => prev.filter(sw => sw.id !== stopwatchId));
          }

          if (onConfirm) {
            onConfirm();
          } else if (navigate) {
            navigate();
          } else {
            routerNavigate();
          }
        }
      );
    },
    [showPopup, setStopwatches, navigate, routerNavigate]
  );

  const shareStopwatch = useCallback(
    (stopwatch: Stopwatch) => {
      const link = generateShareLink(stopwatch, currentOrigin);
      showPopup(
        'Udostępnij stoper',
        'Link został wygenerowany. Skopiuj go i wyślij znajomym:',
        'share',
        undefined,
        link
      );
    },
    [showPopup, currentOrigin]
  );

  return {
    pauseStopwatch,
    resumeStopwatch,
    removeStopwatch,
    shareStopwatch,
  };
};
