import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSharedStopwatch } from '../StopwatchApp/hooks/useSharedStopwatch.hook';
import { StopwatchItem } from '../StopwatchItem';

export const SharedStopwatch: React.FC = () => {
  const navigate = useNavigate();
  const { sharedStopwatch, isLoading, error, errorType } = useSharedStopwatch();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <div className="text-gray-600 text-lg">
            Ładowanie udostępnionego stopera...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    const getErrorIcon = () => {
      switch (errorType) {
        case 'invalid_url':
          return (
            <svg
              className="w-16 h-16 text-red-500 mx-auto mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          );
        case 'invalid_data':
          return (
            <svg
              className="w-16 h-16 text-red-500 mx-auto mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          );
        default:
          return (
            <svg
              className="w-16 h-16 text-red-500 mx-auto mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          );
      }
    };

    const getErrorTitle = () => {
      switch (errorType) {
        case 'invalid_url':
          return 'Nieprawidłowy link';
        case 'invalid_data':
          return 'Uszkodzone dane stopera';
        case 'network':
          return 'Błąd połączenia';
        default:
          return 'Błąd ładowania stopera';
      }
    };

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto">
          {getErrorIcon()}
          <div className="text-red-500 text-2xl font-bold mb-3">
            {getErrorTitle()}
          </div>
          <div className="text-gray-600 mb-8 leading-relaxed">{error}</div>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/')}
              className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Przejdź do głównej aplikacji
            </button>
            <button
              onClick={() => window.history.back()}
              className="w-full px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
            >
              Wróć do poprzedniej strony
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!sharedStopwatch) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-600 text-lg mb-4">
            Nie znaleziono stopera
          </div>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Przejdź do głównej aplikacji
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Udostępniony stoper
              </h1>
              <p className="text-gray-600 mt-1">
                Ten stoper został udostępniony z Tobą
              </p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Przejdź do aplikacji
            </button>
          </div>
        </div>
      </div>

      {/* Stoper */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <StopwatchItem
            stopwatch={sharedStopwatch}
            onRemove={() => {}} // Brak akcji usuwania w trybie udostępnionym
            onPause={() => {}} // Brak akcji pauzowania w trybie udostępnionym
            onResume={() => {}} // Brak akcji wznawiania w trybie udostępnionym
            onShare={() => {}} // Brak akcji udostępniania w trybie udostępnionym
            isReadOnly={true}
          />
        </div>

        {/* Informacje */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-blue-500 mt-0.5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h3 className="text-blue-900 font-medium mb-1">Tryb podglądu</h3>
              <p className="text-blue-700 text-sm">
                Ten stoper jest w trybie podglądu. Aby móc go edytować, dodaj go
                do swojej listy stoperów w głównej aplikacji.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
