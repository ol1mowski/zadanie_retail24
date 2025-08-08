import { useEffect } from 'react';

interface UsePromiseRejectionHandlerOptions {
  onUnhandledRejection?: (event: PromiseRejectionEvent) => void;
  onRejectionHandled?: (event: PromiseRejectionEvent) => void;
}

export const usePromiseRejectionHandler = (
  options: UsePromiseRejectionHandlerOptions = {}
) => {
  const { onUnhandledRejection, onRejectionHandled } = options;

  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason);

      event.preventDefault();

      if (onUnhandledRejection) {
        onUnhandledRejection(event);
      }
    };

    const handleRejectionHandled = (event: PromiseRejectionEvent) => {
      console.log('Promise rejection handled:', event.reason);

      if (onRejectionHandled) {
        onRejectionHandled(event);
      }
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('rejectionhandled', handleRejectionHandled);

    return () => {
      window.removeEventListener(
        'unhandledrejection',
        handleUnhandledRejection
      );
      window.removeEventListener('rejectionhandled', handleRejectionHandled);
    };
  }, [onUnhandledRejection, onRejectionHandled]);
};
