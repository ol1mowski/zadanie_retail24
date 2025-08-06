import type { Stopwatch } from '../types/stopwatch';

export const encodeStopwatchData = (stopwatch: Stopwatch): string => {
  try {
    const stopwatchData = JSON.stringify(stopwatch);
    return btoa(encodeURIComponent(stopwatchData));
  } catch (error) {
    console.error('Błąd podczas kodowania danych stopera:', error);
    throw new Error('Nie udało się zakodować danych stopera');
  }
};

export const decodeStopwatchData = (encodedData: string): Stopwatch => {
  try {
    const decodedData = decodeURIComponent(atob(encodedData));
    const stopwatch = JSON.parse(decodedData);

    if (!isValidStopwatchData(stopwatch)) {
      throw new Error('Nieprawidłowa struktura danych stopera');
    }

    return {
      ...stopwatch,
      targetDate: new Date(stopwatch.targetDate),
      createdAt: new Date(stopwatch.createdAt),
    };
  } catch (error) {
    console.error('Błąd podczas dekodowania danych stopera:', error);
    throw new Error('Nie udało się zdekodować danych stopera');
  }
};

export const isValidStopwatchData = (
  data: unknown
): data is Omit<Stopwatch, 'targetDate' | 'createdAt'> & {
  targetDate: string;
  createdAt: string;
} => {
  if (!data || typeof data !== 'object') {
    return false;
  }

  const stopwatch = data as Record<string, unknown>;

  return (
    typeof stopwatch.id === 'string' &&
    typeof stopwatch.name === 'string' &&
    typeof stopwatch.targetDate === 'string' &&
    typeof stopwatch.createdAt === 'string' &&
    (stopwatch.status === 'active' || stopwatch.status === 'paused') &&
    !isNaN(new Date(stopwatch.targetDate).getTime()) &&
    !isNaN(new Date(stopwatch.createdAt).getTime())
  );
};

export const generateShareLink = (stopwatch: Stopwatch): string => {
  const encodedData = encodeStopwatchData(stopwatch);
  const baseUrl = window.location.origin;
  return `${baseUrl}/stopwatch/${stopwatch.id}?data=${encodedData}`;
};

export const parseShareUrl = (
  url: string
): { stopwatchId: string; encodedData: string } | null => {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    const stopwatchId = pathParts[pathParts.length - 1];
    const encodedData = urlObj.searchParams.get('data');

    if (!stopwatchId || !encodedData) {
      return null;
    }

    return { stopwatchId, encodedData };
  } catch (error) {
    console.error('Błąd podczas parsowania URL:', error);
    return null;
  }
};
