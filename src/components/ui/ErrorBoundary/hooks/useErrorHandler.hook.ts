import { useCallback, useState } from 'react';

interface ErrorState {
  hasError: boolean;
  error: Error | null;
}

export const useErrorHandler = () => {
  const [errorState, setErrorState] = useState<ErrorState>({
    hasError: false,
    error: null,
  });

  const handleError = useCallback((error: Error) => {
    console.error('Error caught by useErrorHandler:', error);

    setErrorState({
      hasError: true,
      error,
    });
  }, []);

  const resetError = useCallback(() => {
    setErrorState({
      hasError: false,
      error: null,
    });
  }, []);

  const throwError = useCallback(
    (error: Error) => {
      handleError(error);
      throw error;
    },
    [handleError]
  );

  return {
    hasError: errorState.hasError,
    error: errorState.error,
    handleError,
    resetError,
    throwError,
  };
};
