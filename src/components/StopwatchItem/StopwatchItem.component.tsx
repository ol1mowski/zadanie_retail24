import { useState } from 'react';
import type { StopwatchItemProps } from '../../types/stopwatch';
import { isStopwatchCompleted } from '../../utils/stopwatch.utils';
import { StopwatchCard } from './components/StopwatchCard.component';
import { StopwatchStatusBadge } from './components/StopwatchStatusBadge.component';
import { StopwatchHeader } from './components/StopwatchHeader.component';
import { StopwatchTimer } from './components/StopwatchTimer.component';
import { StopwatchActions } from './components/StopwatchActions.component';
import { StopwatchCompletedMessage } from './components/StopwatchCompletedMessage.component';

export const StopwatchItem: React.FC<StopwatchItemProps> = ({
  stopwatch,
  onRemove,
  onPause,
  onResume,
}) => {
  const [isCompleted] = useState<boolean>(isStopwatchCompleted(stopwatch));

  const isActive = stopwatch.status === 'active';

  return (
    <StopwatchCard status={stopwatch.status} isCompleted={isCompleted}>
      <StopwatchStatusBadge
        status={stopwatch.status}
        isCompleted={isCompleted}
      />

      <StopwatchHeader
        name={stopwatch.name}
        targetDate={stopwatch.targetDate}
      />

      <StopwatchTimer
        targetDate={stopwatch.targetDate}
        isActive={isActive}
        isCompleted={isCompleted}
      />

      <StopwatchActions
        id={stopwatch.id}
        status={stopwatch.status}
        isCompleted={isCompleted}
        onRemove={onRemove}
        onPause={onPause}
        onResume={onResume}
      />

      <StopwatchCompletedMessage isCompleted={isCompleted} />
    </StopwatchCard>
  );
};
