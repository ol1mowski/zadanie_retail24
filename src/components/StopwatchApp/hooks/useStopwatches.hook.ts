import { useEffect, useState, useRef } from 'react';
import type {
  Stopwatch,
  StopwatchFormData,
} from '../../../types/stopwatch.type';
import {
  generateStopwatchId,
  isStopwatchCompleted,
} from '../../../utils/stopwatch.utils';
import {
  saveStopwatchesToCookies,
  loadStopwatchesFromCookies,
} from '../../../utils/cookies.utils';
import { usePopup } from '../../../hooks/usePopup.hook';
import { useStopwatchActions } from '../../../hooks/useStopwatchActions.hook';

export const useStopwatches = () => {
  const [stopwatches, setStopwatches] = useState<Stopwatch[]>([]);
  const completedStopwatchesRef = useRef<Set<string>>(new Set());
  const {
    popupMessage,
    isPopupVisible,
    popupTitle,
    popupType,
    popupOnConfirm,
    shareLink,
    closePopup,
    showPopup,
  } = usePopup();

  const { pauseStopwatch, resumeStopwatch, removeStopwatch, shareStopwatch } =
    useStopwatchActions(showPopup, setStopwatches);

  useEffect(() => {
    const savedStopwatches = loadStopwatchesFromCookies();

    if (savedStopwatches.length > 0) {
      setStopwatches(savedStopwatches);
    } else {
      const sampleStopwatches: Stopwatch[] = [
        {
          id: '1',
          name: 'Wakacje',
          targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          status: 'active',
          createdAt: new Date(),
        },
        {
          id: '2',
          name: 'Deadline projektu',
          targetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          status: 'paused',
          createdAt: new Date(),
        },
        {
          id: '3',
          name: 'Mecz',
          targetDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
          status: 'active',
          createdAt: new Date(),
        },
      ];
      setStopwatches(sampleStopwatches);
    }
  }, []);

  const addStopwatch = (data: StopwatchFormData) => {
    const newStopwatch: Stopwatch = {
      id: generateStopwatchId(),
      name: data.name,
      targetDate: data.targetDate,
      status: 'active',
      createdAt: new Date(),
    };

    setStopwatches(prev => {
      const updatedStopwatches = [...prev, newStopwatch];
      saveStopwatchesToCookies(updatedStopwatches);
      return updatedStopwatches;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newlyCompleted: Stopwatch[] = [];

      stopwatches.forEach(stopwatch => {
        if (
          isStopwatchCompleted(stopwatch) &&
          !completedStopwatchesRef.current.has(stopwatch.id)
        ) {
          newlyCompleted.push(stopwatch);
          completedStopwatchesRef.current.add(stopwatch.id);
        }
      });

      if (newlyCompleted.length > 0) {
        const message =
          newlyCompleted.length === 1
            ? `Stoper "${newlyCompleted[0].name}" został zakończony!`
            : `${newlyCompleted.length} stoperów zostało zakończonych!`;

        showPopup('Stoper zakończony!', message, 'success');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [stopwatches, showPopup]);

  return {
    stopwatches,
    addStopwatch,
    removeStopwatch: (id: string) => {
      const stopwatch = stopwatches.find(s => s.id === id);
      if (stopwatch) {
        removeStopwatch(id, () => closePopup());
      }
    },
    pauseStopwatch,
    resumeStopwatch,
    shareStopwatch,
    popupMessage,
    popupTitle,
    popupType,
    popupOnConfirm,
    shareLink,
    isPopupVisible,
    closePopup,
  };
};
