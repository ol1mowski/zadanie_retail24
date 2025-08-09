import { useEffect, useState } from 'react';
import type { StopwatchItemProps } from '../../types/stopwatch.type';
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
  onShare,
  isReadOnly = false,
}) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(
    isStopwatchCompleted(stopwatch)
  );

  const isActive = stopwatch.status === 'active';

  useEffect(() => {
    const interval = setInterval(() => {
      const completed = isStopwatchCompleted(stopwatch);
      setIsCompleted(completed);
    }, 1000);

    return () => clearInterval(interval);
  }, [stopwatch]);

  return (
    <StopwatchCard isCompleted={isCompleted}>
      <StopwatchStatusBadge isCompleted={isCompleted} />

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
        isCompleted={isCompleted}
        stopwatch={stopwatch}
        onRemove={onRemove}
        onShare={onShare}
        isReadOnly={isReadOnly}
      />

      <StopwatchCompletedMessage isCompleted={isCompleted} />
    </StopwatchCard>
  );
};
