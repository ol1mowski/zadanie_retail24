import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import type { Stopwatch } from '../../../types/stopwatch.type';
import { decodeStopwatchData } from '../../../utils/share.utils';

export const useSharedStopwatch = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [sharedStopwatch, setSharedStopwatch] = useState<Stopwatch | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<
    'invalid_url' | 'invalid_data' | 'network' | 'unknown' | null
  >(null);

  useEffect(() => {
    const handleSharedStopwatch = async () => {
      if (!id) return;

      setIsLoading(true);
      setError(null);
      setErrorType(null);

      try {
        if (!location.pathname.includes('/stopwatch/')) {
          setError('Nieprawidłowy format linku udostępniania');
          setErrorType('invalid_url');
          setIsLoading(false);
          return;
        }

        const encodedData = new URLSearchParams(location.search).get('data');
        const stopwatchId = id;

        if (!encodedData || !stopwatchId) {
          setError('Link udostępniania jest nieprawidłowy lub uszkodzony');
          setErrorType('invalid_url');
          setIsLoading(false);
          return;
        }

        if (!encodedData || encodedData.length < 10) {
          setError('Dane stopera są nieprawidłowe lub uszkodzone');
          setErrorType('invalid_data');
          setIsLoading(false);
          return;
        }

        const decodedStopwatch = decodeStopwatchData(encodedData);

        if (decodedStopwatch.id !== id) {
          setError('Dane stopera są nieprawidłowe - ID nie zgadza się');
          setErrorType('invalid_data');
          setIsLoading(false);
          return;
        }

        const deletedStopwatches = JSON.parse(
          localStorage.getItem('deletedSharedStopwatches') || '[]'
        );
        if (deletedStopwatches.includes(decodedStopwatch.id)) {
          setError('Ten stoper został usunięty i nie jest już dostępny');
          setErrorType('invalid_data');
          setIsLoading(false);
          return;
        }

        const now = new Date();
        if (decodedStopwatch.targetDate < now) {
          setError('Ten stoper już się zakończył i nie może być udostępniony');
          setErrorType('invalid_data');
          setIsLoading(false);
          return;
        }

        setSharedStopwatch(decodedStopwatch);
      } catch (err) {
        console.error('Błąd podczas importowania udostępnionego stopera:', err);

        let errorMessage = 'Nie udało się zaimportować stopera';
        let errorTypeValue:
          | 'invalid_url'
          | 'invalid_data'
          | 'network'
          | 'unknown' = 'unknown';

        if (err instanceof Error) {
          if (err.message.includes('Nie udało się zdekodować')) {
            errorMessage = 'Dane stopera są uszkodzone lub nieprawidłowe';
            errorTypeValue = 'invalid_data';
          } else if (err.message.includes('Nieprawidłowa struktura')) {
            errorMessage = 'Format danych stopera jest nieprawidłowy';
            errorTypeValue = 'invalid_data';
          } else {
            errorMessage = err.message;
          }
        }

        setError(errorMessage);
        setErrorType(errorTypeValue);
      } finally {
        setIsLoading(false);
      }
    };

    handleSharedStopwatch();
  }, [id]);

  const clearSharedStopwatch = () => {
    setSharedStopwatch(null);
    setError(null);
    setErrorType(null);
  };

  return {
    sharedStopwatch,
    isLoading,
    error,
    errorType,
    clearSharedStopwatch,
  };
};
