import { Layout } from '../Layout/Layout.component';
import { useStopwatches } from './hooks/useStopwatches.hook';
import { StopwatchGrid } from '../StopwatchGrid';

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

  const handleShare = (link: string) => {
    shareStopwatch(link);
  };

  return (
    <Layout
      stopwatches={stopwatches}
      showModal={true}
      onAddStopwatchModal={addStopwatch}
      popupProps={{
        isVisible: isPopupVisible,
        title: popupTitle,
        message: popupMessage,
        type: popupType,
        onClose: closePopup,
        onConfirm: popupOnConfirm,
        shareLink,
      }}
    >
      <StopwatchGrid
        stopwatches={stopwatches}
        onRemove={removeStopwatch}
        onPause={pauseStopwatch}
        onResume={resumeStopwatch}
        onShare={handleShare}
      />
    </Layout>
  );
};
