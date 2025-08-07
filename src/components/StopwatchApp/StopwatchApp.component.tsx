//import { useParams } from 'react-router-dom';
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
  // const { id } = useParams<{ id: string }>();

  const { sharedStopwatch, isLoading, error } = useSharedStopwatch();

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

  // Obsługa błędów importowania
  if (error && !isPopupVisible) {
    return (
      <AppContainer>
        <AppHeader onAddStopwatch={openModal} />
        <AppMain stopwatches={stopwatches}>
          <div className="flex items-center justify-center min-h-64">
            <div className="text-center">
              <div className="text-red-500 text-lg font-medium mb-2">
                Błąd importowania stopera
              </div>
              <div className="text-gray-600 mb-4">{error}</div>
              <button
                onClick={() => (window.location.href = '/')}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Wróć do głównej strony
              </button>
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
