import { Layout } from '../Layout/Layout.component';
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
    shareStopwatch,
    popupMessage,
    popupTitle,
    popupType,
    popupOnConfirm,
    shareLink,
    isPopupVisible,
    closePopup,
  } = useStopwatches();

  const { isOpen, openModal, closeModal } = useModal();

  const handleShare = (link: string) => {
    shareStopwatch(link);
  };

  return (
    <Layout onAddStopwatch={openModal}>
      <AppMain stopwatches={stopwatches}>
        <StopwatchGrid
          stopwatches={stopwatches}
          onRemove={removeStopwatch}
          onPause={pauseStopwatch}
          onResume={resumeStopwatch}
          onShare={handleShare}
        />
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
    </Layout>
  );
};
