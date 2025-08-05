import { useEffect, useState } from 'react';
import type { Stopwatch, StopwatchFormData } from '../../../types/stopwatch';
import { generateStopwatchId } from '../../../utils/stopwatch.utils';

export const useStopwatches = () => {
  const [stopwatches, setStopwatches] = useState<Stopwatch[]>([]);

  useEffect(() => {
    const sampleStopwatches: Stopwatch[] = [
      {
        id: '1',
        name: 'Moje urodziny',
        targetDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
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

  return {
    stopwatches,
    addStopwatch,
    removeStopwatch,
    pauseStopwatch,
    resumeStopwatch,
  };
};
