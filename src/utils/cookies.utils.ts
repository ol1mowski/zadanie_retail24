import type { Stopwatch } from '../types/stopwatch';

const STOPWATCHES_COOKIE_KEY = 'stopwatches';

export const saveStopwatchesToCookies = (stopwatches: Stopwatch[]): void => {
  try {
    const stopwatchesData = JSON.stringify(stopwatches);
    document.cookie = `${STOPWATCHES_COOKIE_KEY}=${encodeURIComponent(stopwatchesData)}; path=/; max-age=${60 * 60 * 24 * 365}`;
  } catch (error) {
    console.error('Błąd podczas zapisywania stoperów do cookies:', error);
  }
};

export const loadStopwatchesFromCookies = (): Stopwatch[] => {
  try {
    const cookies = document.cookie.split(';');
    const stopwatchesCookie = cookies.find(cookie =>
      cookie.trim().startsWith(`${STOPWATCHES_COOKIE_KEY}=`)
    );

    if (stopwatchesCookie) {
      const stopwatchesData = decodeURIComponent(
        stopwatchesCookie.split('=')[1]
      );
      const stopwatches = JSON.parse(stopwatchesData);

      return stopwatches.map(
        (
          stopwatch: Omit<Stopwatch, 'targetDate' | 'createdAt'> & {
            targetDate: string;
            createdAt: string;
          }
        ) => ({
          ...stopwatch,
          targetDate: new Date(stopwatch.targetDate),
          createdAt: new Date(stopwatch.createdAt),
        })
      );
    }
  } catch (error) {
    console.error('Błąd podczas wczytywania stoperów z cookies:', error);
  }

  return [];
};

export const clearStopwatchesFromCookies = (): void => {
  try {
    document.cookie = `${STOPWATCHES_COOKIE_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  } catch (error) {
    console.error('Błąd podczas czyszczenia cookies:', error);
  }
};
