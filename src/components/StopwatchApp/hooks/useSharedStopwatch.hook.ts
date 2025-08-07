import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Stopwatch } from '../../../types/stopwatch';
import { parseShareUrl, decodeStopwatchData } from '../../../utils/share.utils';

export const useSharedStopwatch = () => {
  const { id } = useParams<{ id: string }>();
  //const [searchParams] = useSearchParams();
  const [sharedStopwatch, setSharedStopwatch] = useState<Stopwatch | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleSharedStopwatch = async () => {
      if (!id) return;

      setIsLoading(true);
      setError(null);

      try {
        const currentUrl = window.location.href;
        const parsedUrl = parseShareUrl(currentUrl);

        if (!parsedUrl) {
          setError('Nieprawidłowy link udostępniania');
          setIsLoading(false);
          return;
        }

        if (parsedUrl.stopwatchId !== id) {
          setError('Nieprawidłowy identyfikator stopera');
          setIsLoading(false);
          return;
        }

        const decodedStopwatch = decodeStopwatchData(parsedUrl.encodedData);

        if (decodedStopwatch.id !== id) {
          setError('Nieprawidłowe dane stopera');
          setIsLoading(false);
          return;
        }

        setSharedStopwatch(decodedStopwatch);
      } catch (err) {
        console.error('Błąd podczas importowania udostępnionego stopera:', err);
        setError(
          err instanceof Error
            ? err.message
            : 'Nie udało się zaimportować stopera'
        );
      } finally {
        setIsLoading(false);
      }
    };

    handleSharedStopwatch();
  }, [id]);

  const clearSharedStopwatch = () => {
    setSharedStopwatch(null);
    setError(null);
  };

  return {
    sharedStopwatch,
    isLoading,
    error,
    clearSharedStopwatch,
  };
};
