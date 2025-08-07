import { AppContainer } from './components/AppContainer.component';
import { AppHeader } from './components/AppHeader.component';
import { AppMain } from './components/AppMain.component';
import { useStopwatches } from './hooks/useStopwatches.hook';
import { useSharedStopwatch } from './hooks/useSharedStopwatch.hook';
import { useModal } from './hooks/useModal.hook';
import { AddStopwatchModal } from '../AddStopwatchModal';
import { StopwatchGrid } from '../StopwatchGrid';
import { GlobalPopup } from '../ui/GlobalPopup.component';

export const StopwatchApp: React.FC = () => {
  const { sharedStopwatch, isLoading, error, errorType } = useSharedStopwatch();

  const {
    stopwatches,
    addStopwatch,
    removeStopwatch,
    pauseStopwatch,
    resumeStopwatch,
    shareStopwatch,
    popupMessage,
    popupTitle,
    popupType,
    popupOnConfirm,
    shareLink,
    isPopupVisible,
    closePopup,
  } = useStopwatches(sharedStopwatch);

  const { isOpen, openModal, closeModal } = useModal();

  const handleShare = (link: string) => {
    shareStopwatch(link);
  };

  if (error && !isPopupVisible) {
    const getErrorIcon = () => {
      switch (errorType) {
        case 'invalid_url':
          return (
            <svg
              className="w-12 h-12 text-red-500 mx-auto mb-4"
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
              className="w-12 h-12 text-red-500 mx-auto mb-4"
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
              className="w-12 h-12 text-red-500 mx-auto mb-4"
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
          return 'Błąd importowania stopera';
      }
    };

    return (
      <AppContainer>
        <AppHeader onAddStopwatch={openModal} />
        <AppMain stopwatches={stopwatches}>
          <div className="flex items-center justify-center min-h-64">
            <div className="text-center max-w-md mx-auto">
              {getErrorIcon()}
              <div className="text-red-500 text-xl font-bold mb-2">
                {getErrorTitle()}
              </div>
              <div className="text-gray-600 mb-6 leading-relaxed">{error}</div>
              <div className="space-y-3">
                <button
                  onClick={() => (window.location.href = '/')}
                  className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                >
                  Wróć do głównej strony
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
        </AppMain>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <AppHeader onAddStopwatch={openModal} />

      <AppMain stopwatches={stopwatches}>
        {isLoading ? (
          <div className="flex items-center justify-center min-h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
              <div className="text-gray-600">
                Ładowanie udostępnionego stopera...
              </div>
            </div>
          </div>
        ) : (
          <StopwatchGrid
            stopwatches={stopwatches}
            onRemove={removeStopwatch}
            onPause={pauseStopwatch}
            onResume={resumeStopwatch}
            onShare={handleShare}
          />
        )}
      </AppMain>

      <AddStopwatchModal
        isOpen={isOpen}
        onClose={closeModal}
        onAdd={addStopwatch}
      />

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
    </AppContainer>
  );
};
