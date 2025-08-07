import { useEffect, useState, useRef } from 'react';
import type { Stopwatch, StopwatchFormData } from '../../../types/stopwatch';
import {
  generateStopwatchId,
  isStopwatchCompleted,
} from '../../../utils/stopwatch.utils';
import {
  saveStopwatchesToCookies,
  loadStopwatchesFromCookies,
} from '../../../utils/cookies.utils';

export const useStopwatches = () => {
  const [stopwatches, setStopwatches] = useState<Stopwatch[]>([]);
  const [popupMessage, setPopupMessage] = useState<string>('');
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
  const [popupTitle, setPopupTitle] = useState<string>('');
  const [popupType, setPopupType] = useState<
    'success' | 'confirmation' | 'share' | 'import'
  >('success');
  const [popupOnConfirm, setPopupOnConfirm] = useState<
    (() => void) | undefined
  >(undefined);
  const [shareLink, setShareLink] = useState<string>('');
  const completedStopwatchesRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const savedStopwatches = loadStopwatchesFromCookies();

    if (savedStopwatches.length > 0) {
      setStopwatches(savedStopwatches);
    } else {
      const sampleStopwatches: Stopwatch[] = [
        {
          id: '1',
          name: 'Test - zakończy się za 5 sekund',
          targetDate: new Date(Date.now() + 5 * 1000),
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

  const removeStopwatch = (id: string) => {
    const stopwatch = stopwatches.find(s => s.id === id);
    if (stopwatch) {
      setPopupTitle('Potwierdź usunięcie');
      setPopupMessage(`Czy na pewno chcesz usunąć stoper "${stopwatch.name}"?`);
      setPopupType('confirmation');
      setPopupOnConfirm(() => () => {
        setStopwatches(prev => {
          const updatedStopwatches = prev.filter(
            stopwatch => stopwatch.id !== id
          );
          saveStopwatchesToCookies(updatedStopwatches);
          return updatedStopwatches;
        });
        closePopup();
      });
      setIsPopupVisible(true);
    }
  };

  const pauseStopwatch = (id: string) => {
    setStopwatches(prev => {
      const updatedStopwatches = prev.map(stopwatch =>
        stopwatch.id === id
          ? { ...stopwatch, status: 'paused' as const }
          : stopwatch
      );
      saveStopwatchesToCookies(updatedStopwatches);
      return updatedStopwatches;
    });
  };

  const resumeStopwatch = (id: string) => {
    setStopwatches(prev => {
      const updatedStopwatches = prev.map(stopwatch =>
        stopwatch.id === id
          ? { ...stopwatch, status: 'active' as const }
          : stopwatch
      );
      saveStopwatchesToCookies(updatedStopwatches);
      return updatedStopwatches;
    });
  };

  const shareStopwatch = (link: string) => {
    setPopupTitle('Udostępnij stoper');
    setPopupMessage('Link został wygenerowany. Skopiuj go i wyślij znajomym:');
    setPopupType('share');
    setShareLink(link);
    setPopupOnConfirm(undefined);
    setIsPopupVisible(true);
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

        setPopupTitle('Stoper zakończony!');
        setPopupMessage(message);
        setPopupType('success');
        setPopupOnConfirm(undefined);
        setIsPopupVisible(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [stopwatches]);

  const closePopup = () => {
    setIsPopupVisible(false);
    setPopupMessage('');
    setPopupTitle('');
    setPopupType('success');
    setPopupOnConfirm(undefined);
    setShareLink('');
  };

  return {
    stopwatches,
    addStopwatch,
    removeStopwatch,
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
