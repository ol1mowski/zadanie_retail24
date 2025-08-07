import { useSharedStopwatch } from './hooks/useSharedStopwatch.hook';
import { useSharedStopwatchState } from './hooks/useSharedStopwatchState.hook';
import { useSharedStopwatchPopup } from './hooks/useSharedStopwatchPopup.hook';
import { useSharedStopwatchActions } from './hooks/useSharedStopwatchActions.hook';
import { GlobalPopup, LoadingSpinner } from '../ui';
import {
  SharedStopwatchError,
  SharedStopwatchNotFound,
  SharedStopwatchContent,
} from './components';

export const SharedStopwatch: React.FC = () => {
  const { sharedStopwatch, isLoading, error, errorType } = useSharedStopwatch();
  const { localStopwatch, setLocalStopwatch } =
    useSharedStopwatchState(sharedStopwatch);
  const {
    popupMessage,
    isPopupVisible,
    popupTitle,
    popupType,
    popupOnConfirm,
    shareLink,
    closePopup,
    showPopup,
  } = useSharedStopwatchPopup();

  const {
    handleRemoveStopwatch,
    handlePauseStopwatch,
    handleResumeStopwatch,
    handleShareStopwatch,
  } = useSharedStopwatchActions(
    sharedStopwatch,
    localStopwatch,
    setLocalStopwatch,
    showPopup
  );

  if (isLoading) {
    return (
      <LoadingSpinner
        text="Ładowanie udostępnionego stopera..."
        fullScreen={true}
      />
    );
  }

  if (error) {
    return (
      <SharedStopwatchError error={error} errorType={errorType || 'unknown'} />
    );
  }

  if (!sharedStopwatch) {
    return <SharedStopwatchNotFound />;
  }

  return (
    <>
      <SharedStopwatchContent
        stopwatch={localStopwatch!}
        onRemove={handleRemoveStopwatch}
        onPause={handlePauseStopwatch}
        onResume={handleResumeStopwatch}
        onShare={handleShareStopwatch}
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
    </>
  );
};
