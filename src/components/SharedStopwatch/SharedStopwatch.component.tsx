import { useNavigate } from 'react-router-dom';
import { useSharedStopwatch } from './hooks/useSharedStopwatch.hook';
import { useSharedStopwatchState } from './hooks/useSharedStopwatchState.hook';
import { useStopwatchActions } from '../../hooks/useStopwatchActions.hook';
import { usePopup } from '../../hooks/usePopup.hook';
import { GlobalPopup, LoadingSpinner } from '../ui';
import {
  SharedStopwatchError,
  SharedStopwatchNotFound,
  SharedStopwatchContent,
} from './components';

export const SharedStopwatch: React.FC = () => {
  const navigate = useNavigate();
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
  } = usePopup();

  const { removeStopwatch, pauseStopwatch, resumeStopwatch, shareStopwatch } =
    useStopwatchActions(showPopup, undefined, setLocalStopwatch);

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
        stopwatch={localStopwatch}
        onRemove={() => {
          if (!sharedStopwatch) return;
          removeStopwatch(sharedStopwatch, () => {
            navigate('/');
          });
        }}
        onPause={() => {
          if (!localStopwatch) return;
          pauseStopwatch(localStopwatch);
        }}
        onResume={() => {
          if (!localStopwatch) return;
          resumeStopwatch(localStopwatch);
        }}
        onShare={() => {
          if (!localStopwatch) return;
          shareStopwatch(localStopwatch);
        }}
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
