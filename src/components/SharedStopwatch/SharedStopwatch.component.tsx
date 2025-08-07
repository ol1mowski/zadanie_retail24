import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../Layout/Layout.component';
import { useSharedStopwatch } from '../StopwatchApp/hooks/useSharedStopwatch.hook';
import { StopwatchItem } from '../StopwatchItem';
import { GlobalPopup, ErrorMessage, LoadingSpinner } from '../ui';
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

  const closePopup = useCallback(() => {
    setIsPopupVisible(false);
    setPopupMessage('');
    setPopupTitle('');
    setPopupType('success');
    setPopupOnConfirm(undefined);
    setShareLink('');
  }, []);

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
  }, [sharedStopwatch, navigate, closePopup]);

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

  if (isLoading) {
    return (
      <LoadingSpinner
        text="Ładowanie udostępnionego stopera..."
        fullScreen={true}
      />
    );
  }

  if (error) {
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
      <Layout
        title="Błąd"
        subtitle="Wystąpił problem podczas ładowania stopera"
        showAddButton={false}
      >
        <div className="max-w-2xl mx-auto px-4 py-8">
          <ErrorMessage
            title={getErrorTitle()}
            message={error}
            type="error"
            onRetry={() => window.location.reload()}
            onClose={() => navigate('/')}
            className="mb-6"
          />

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Przejdź do głównej aplikacji
            </button>
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
            >
              Wróć do poprzedniej strony
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (!sharedStopwatch) {
    return (
      <Layout
        title="Nie znaleziono stopera"
        subtitle="Podany stoper nie istnieje lub został usunięty"
        showAddButton={false}
      >
        <div className="max-w-2xl mx-auto px-4 py-8">
          <ErrorMessage
            title="Nie znaleziono stopera"
            message="Podany stoper nie istnieje lub został usunięty. Sprawdź link lub skontaktuj się z osobą, która go udostępniła."
            type="warning"
            onClose={() => navigate('/')}
            className="mb-6"
          />

          <div className="flex justify-center">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Przejdź do głównej aplikacji
            </button>
          </div>
        </div>
      </Layout>
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
