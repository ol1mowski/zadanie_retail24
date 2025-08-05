import { useEffect, useState, useRef } from 'react';
import type { Stopwatch, StopwatchFormData } from '../../../types/stopwatch';
import {
  generateStopwatchId,
  isStopwatchCompleted,
} from '../../../utils/stopwatch.utils';

export const useStopwatches = () => {
  const [stopwatches, setStopwatches] = useState<Stopwatch[]>([]);
  const [popupMessage, setPopupMessage] = useState<string>('');
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
  const completedStopwatchesRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const sampleStopwatches: Stopwatch[] = [
      {
        id: '1',
        name: 'Test - zakończy się za 5 sekund',
        targetDate: new Date(Date.now() + 5 * 1000), // 5 sekund
        status: 'active',
        createdAt: new Date(),
      },
      {
        id: '2',
        name: 'Wakacje',
        targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        status: 'active',
        createdAt: new Date(),
      },
      {
        id: '3',
        name: 'Deadline projektu',
        targetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        status: 'paused',
        createdAt: new Date(),
      },
    ];
    setStopwatches(sampleStopwatches);
  }, []);

  const addStopwatch = (data: StopwatchFormData) => {
    const newStopwatch: Stopwatch = {
      id: generateStopwatchId(),
      name: data.name,
      targetDate: data.targetDate,
      status: 'active',
      createdAt: new Date(),
    };

    setStopwatches(prev => [...prev, newStopwatch]);
  };

  const removeStopwatch = (id: string) => {
    setStopwatches(prev => prev.filter(stopwatch => stopwatch.id !== id));
  };

  const pauseStopwatch = (id: string) => {
    setStopwatches(prev =>
      prev.map(stopwatch =>
        stopwatch.id === id
          ? { ...stopwatch, status: 'paused' as const }
          : stopwatch
      )
    );
  };

  const resumeStopwatch = (id: string) => {
    setStopwatches(prev =>
      prev.map(stopwatch =>
        stopwatch.id === id
          ? { ...stopwatch, status: 'active' as const }
          : stopwatch
      )
    );
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

        setPopupMessage(message);
        setIsPopupVisible(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [stopwatches]);

  const closePopup = () => {
    setIsPopupVisible(false);
    setPopupMessage('');
  };

  return {
    stopwatches,
    addStopwatch,
    removeStopwatch,
    pauseStopwatch,
    resumeStopwatch,
    popupMessage,
    isPopupVisible,
    closePopup,
  };
};
