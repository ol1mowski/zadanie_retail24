import { Layout } from '../Layout/Layout.component';
import { useStopwatches } from './hooks/useStopwatches.hook';
import { StopwatchGrid } from '../StopwatchGrid';
import { SEO } from '../ui';
import type { Stopwatch } from '../../types/stopwatch.type';

export const StopwatchApp: React.FC = () => {
  const {
    stopwatches,
    isLoading,
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

  const handleShare = (stopwatch: Stopwatch) => {
    shareStopwatch(stopwatch);
  };

  return (
    <>
      <SEO
        title="Aplikacja Stoperów - Zarządzaj swoimi stoperami"
        description="Aplikacja do zarządzania stoperami. Twórz, wstrzymuj, wznawiaj i udostępniaj swoje stoperów z innymi użytkownikami."
        keywords="stoper, timer, aplikacja, zarządzanie czasem, udostępnianie"
        ogTitle="Aplikacja Stoperów"
        ogDescription="Zarządzaj swoimi stoperami i udostępniaj je z innymi użytkownikami."
        ogUrl={window.location.origin}
        twitterTitle="Aplikacja Stoperów"
        twitterDescription="Zarządzaj swoimi stoperami i udostępniaj je z innymi użytkownikami."
      />
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
          isLoading={isLoading}
        />
      </Layout>
    </>
  );
};
