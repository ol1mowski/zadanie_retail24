import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../Layout/Layout.component';
import { useSharedStopwatch } from '../StopwatchApp/hooks/useSharedStopwatch.hook';
import { StopwatchItem } from '../StopwatchItem';
import { GlobalPopup } from '../ui/GlobalPopup.component';
import { generateShareLink } from '../../utils/share.utils';
import {
  saveStopwatchesToCookies,
  loadStopwatchesFromCookies,
} from '../../utils/cookies.utils';

export const SharedStopwatch: React.FC = () => {
  const navigate = useNavigate();
  const { sharedStopwatch, isLoading, error, errorType } = useSharedStopwatch();
  const [localStopwatch, setLocalStopwatch] = useState(sharedStopwatch);
  const [popupMessage, setPopupMessage] = useState<string>('');
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
  const [popupTitle, setPopupTitle] = useState<string>('');
  const [popupType, setPopupType] = useState<
    'success' | 'confirmation' | 'share'
  >('success');
  const [popupOnConfirm, setPopupOnConfirm] = useState<
    (() => void) | undefined
  >(undefined);
  const [shareLink, setShareLink] = useState<string>('');

  useEffect(() => {
    if (sharedStopwatch) {
      setLocalStopwatch(sharedStopwatch);
    }
  }, [sharedStopwatch]);

  const handleRemoveStopwatch = useCallback(() => {
    if (!sharedStopwatch) return;

    setPopupTitle('Potwierdź usunięcie');
    setPopupMessage(
      `Czy na pewno chcesz usunąć stoper "${sharedStopwatch.name}"?`
    );
    setPopupType('confirmation');
    setPopupOnConfirm(() => () => {
      const savedStopwatches = loadStopwatchesFromCookies();
      const updatedStopwatches = savedStopwatches.filter(
        stopwatch => stopwatch.id !== sharedStopwatch.id
      );
      saveStopwatchesToCookies(updatedStopwatches);
      navigate('/');
      closePopup();
    });
    setIsPopupVisible(true);
  }, [sharedStopwatch, navigate]);

  const handlePauseStopwatch = useCallback(() => {
    if (!localStopwatch) return;

    const savedStopwatches = loadStopwatchesFromCookies();
    const updatedStopwatches = savedStopwatches.map(stopwatch =>
      stopwatch.id === localStopwatch.id
        ? { ...stopwatch, status: 'paused' as const }
        : stopwatch
    );
    saveStopwatchesToCookies(updatedStopwatches);

    setLocalStopwatch(prev =>
      prev ? { ...prev, status: 'paused' as const } : null
    );
  }, [localStopwatch]);

  const handleResumeStopwatch = useCallback(() => {
    if (!localStopwatch) return;

    const savedStopwatches = loadStopwatchesFromCookies();
    const updatedStopwatches = savedStopwatches.map(stopwatch =>
      stopwatch.id === localStopwatch.id
        ? { ...stopwatch, status: 'active' as const }
        : stopwatch
    );
    saveStopwatchesToCookies(updatedStopwatches);

    setLocalStopwatch(prev =>
      prev ? { ...prev, status: 'active' as const } : null
    );
  }, [localStopwatch]);

  const handleShareStopwatch = useCallback(() => {
    if (!localStopwatch) return;

    const link = generateShareLink(localStopwatch);
    setPopupTitle('Udostępnij stoper');
    setPopupMessage('Link został wygenerowany. Skopiuj go i wyślij znajomym:');
    setPopupType('share');
    setShareLink(link);
    setIsPopupVisible(true);
  }, [localStopwatch]);

  const closePopup = useCallback(() => {
    setIsPopupVisible(false);
    setPopupMessage('');
    setPopupTitle('');
    setPopupType('success');
    setPopupOnConfirm(undefined);
    setShareLink('');
  }, []);

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
    <Layout
      title="Udostępniony stoper"
      subtitle="Ten stoper został udostępniony z Tobą"
      showAddButton={false}
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        {localStopwatch && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <StopwatchItem
              stopwatch={localStopwatch}
              onRemove={handleRemoveStopwatch}
              onPause={handlePauseStopwatch}
              onResume={handleResumeStopwatch}
              onShare={handleShareStopwatch}
              isReadOnly={false}
            />
          </div>
        )}
      </div>

      <GlobalPopup
        isVisible={isPopupVisible}
        title={popupTitle}
        message={popupMessage}
        type={popupType}
        onClose={closePopup}
        onConfirm={popupOnConfirm}
        confirmText={popupType === 'confirmation' ? 'Usuń' : 'OK'}
        cancelText="Anuluj"
        showAutoHide={popupType === 'success'}
        shareLink={shareLink}
      />
    </Layout>
  );
};
