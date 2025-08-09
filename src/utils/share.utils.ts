import type { Stopwatch } from '../types/stopwatch.type';

export const encodeStopwatchData = (stopwatch: Stopwatch): string => {
  try {
    const minimalData = {
      id: stopwatch.id,
      name: stopwatch.name.substring(0, 50),
      targetDate: stopwatch.targetDate.toISOString(),
    };
    const stopwatchData = JSON.stringify(minimalData);
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
      id: stopwatch.id,
      name: stopwatch.name,
      targetDate: new Date(stopwatch.targetDate),
      status: 'active' as const,
      createdAt: new Date(),
    };
  } catch (error) {
    console.error('Błąd podczas dekodowania danych stopera:', error);
    throw new Error('Nie udało się zdekodować danych stopera');
  }
};

export const isValidStopwatchData = (
  data: unknown
): data is {
  id: string;
  name: string;
  targetDate: string;
} => {
  if (!data || typeof data !== 'object') {
    return false;
  }

  const stopwatch = data as Record<string, unknown>;

  return (
    typeof stopwatch.id === 'string' &&
    typeof stopwatch.name === 'string' &&
    typeof stopwatch.targetDate === 'string' &&
    stopwatch.name.length <= 50 &&
    !isNaN(new Date(stopwatch.targetDate).getTime())
  );
};

export const generateShareLink = (
  stopwatch: Stopwatch,
  baseUrl: string = 'http://localhost:5173'
): string => {
  const encodedData = encodeStopwatchData(stopwatch);
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

export const validateShareUrl = (
  url: string
): {
  isValid: boolean;
  error?: string;
  errorType?: 'invalid_url' | 'invalid_data' | 'network' | 'unknown';
} => {
  try {
    const urlObj = new URL(url);

    if (!urlObj.pathname.includes('/stopwatch/')) {
      return {
        isValid: false,
        error: 'Nieprawidłowy format linku udostępniania',
        errorType: 'invalid_url',
      };
    }

    const parsedUrl = parseShareUrl(url);
    if (!parsedUrl) {
      return {
        isValid: false,
        error: 'Link udostępniania jest nieprawidłowy lub uszkodzony',
        errorType: 'invalid_url',
      };
    }

    if (!parsedUrl.encodedData || parsedUrl.encodedData.length < 10) {
      return {
        isValid: false,
        error: 'Dane stopera są nieprawidłowe lub uszkodzone',
        errorType: 'invalid_data',
      };
    }

    try {
      const decodedStopwatch = decodeStopwatchData(parsedUrl.encodedData);

      if (decodedStopwatch.id !== parsedUrl.stopwatchId) {
        return {
          isValid: false,
          error: 'Dane stopera są nieprawidłowe - ID nie zgadza się',
          errorType: 'invalid_data',
        };
      }

      const now = new Date();
      if (decodedStopwatch.targetDate < now) {
        return {
          isValid: false,
          error: 'Ten stoper już się zakończył i nie może być udostępniony',
          errorType: 'invalid_data',
        };
      }

      return { isValid: true };
    } catch {
      return {
        isValid: false,
        error: 'Dane stopera są uszkodzone lub nieprawidłowe',
        errorType: 'invalid_data',
      };
    }
  } catch {
    return {
      isValid: false,
      error: 'Nieprawidłowy URL',
      errorType: 'invalid_url',
    };
  }
};
