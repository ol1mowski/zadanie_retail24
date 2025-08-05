import { AppContainer } from './components/AppContainer.component';
import { AppHeader } from './components/AppHeader.component';
import { AppMain } from './components/AppMain.component';
import { useStopwatches } from './hooks/useStopwatches.hook';
import { useModal } from './hooks/useModal.hook';
import { AddStopwatchModal } from '../AddStopwatchModal';
import { StopwatchGrid } from '../StopwatchGrid';
import { GlobalPopup } from '../ui/GlobalPopup.component';

export const StopwatchApp: React.FC = () => {
  const {
    stopwatches,
    addStopwatch,
    removeStopwatch,
    pauseStopwatch,
    resumeStopwatch,
    popupMessage,
    isPopupVisible,
    closePopup,
  } = useStopwatches();

  const { isOpen, openModal, closeModal } = useModal();

  return (
    <AppContainer>
      <AppHeader onAddStopwatch={openModal} />

      <AppMain stopwatches={stopwatches}>
        <StopwatchGrid
          stopwatches={stopwatches}
          onRemove={removeStopwatch}
          onPause={pauseStopwatch}
          onResume={resumeStopwatch}
        />
      </AppMain>

      <AddStopwatchModal
        isOpen={isOpen}
        onClose={closeModal}
        onAdd={addStopwatch}
      />

      <GlobalPopup
        isVisible={isPopupVisible}
        message={popupMessage}
        onClose={closePopup}
      />
    </AppContainer>
  );
};
