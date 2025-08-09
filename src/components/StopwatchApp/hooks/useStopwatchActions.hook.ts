import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Stopwatch } from '../../../types/stopwatch.type';
import { generateShareLink } from '../../../utils/share.utils';
import {
  saveStopwatchesToCookies,
  loadStopwatchesFromCookies,
} from '../../../utils/cookies.utils';

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
      try {
        const link = generateShareLink(stopwatch, currentOrigin);
        showPopup(
          'Udostępnij stoper',
          'Link został wygenerowany. Skopiuj go i wyślij znajomym:',
          'share',
          undefined,
          link
        );
      } catch (error) {
        console.error('Błąd podczas generowania linku:', error);
        showPopup(
          'Błąd',
          'Nie udało się wygenerować linku do udostępnienia. Spróbuj ponownie.',
          'confirmation'
        );
      }
    },
    [showPopup, currentOrigin]
  );

  return {
    removeStopwatch,
    shareStopwatch,
  };
};
