import type { Stopwatch, StopwatchFormData } from '../types/stopwatch';

export const formatTime = (milliseconds: number): string => {
  if (milliseconds <= 0) {
    return '00:00:00:000';
  }

  const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
  const ms = milliseconds % 1000;

  if (days > 0) {
    return `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${ms.toString().padStart(3, '0')}`;
};

export const calculateTimeLeft = (targetDate: Date): number => {
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();
  return Math.max(0, difference);
};

export const generateStopwatchId = (): string => {
  return `stopwatch_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const validateStopwatchData = (
  data: StopwatchFormData
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.name.trim()) {
    errors.push('Nazwa stopera jest wymagana');
  }

  if (data.name.trim().length > 50) {
    errors.push('Nazwa stopera nie może być dłuższa niż 50 znaków');
  }

  if (!data.targetDate) {
    errors.push('Data docelowa jest wymagana');
  } else if (data.targetDate <= new Date()) {
    errors.push('Data docelowa musi być w przyszłości');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const isStopwatchCompleted = (stopwatch: Stopwatch): boolean => {
  return calculateTimeLeft(stopwatch.targetDate) <= 0;
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};
