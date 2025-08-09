import { useEffect, useState } from 'react';
import { formatTime, calculateTimeLeft } from '../../../utils/stopwatch.utils';

interface StopwatchTimerProps {
  targetDate: Date;
  isActive: boolean;
  isCompleted: boolean;
}

export const StopwatchTimer: React.FC<StopwatchTimerProps> = ({
  targetDate,
  isActive,
  isCompleted,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(
    calculateTimeLeft(targetDate)
  );

  useEffect(() => {
    if (isActive && !isCompleted) {
      const interval = setInterval(() => {
        const remaining = calculateTimeLeft(targetDate);
        setTimeLeft(remaining);
      }, 16);

      return () => clearInterval(interval);
    }
  }, [targetDate, isActive, isCompleted]);

  return (
    <div className="mb-6">
      <div className="text-xs sm:text-sm md:text-lg lg:text-2xl xl:text-3xl font-mono font-bold text-center bg-white/50 rounded-lg p-2 sm:p-3 md:p-4 backdrop-blur-sm break-all">
        {isCompleted ? (
          <span className="text-red-600">Czas minął!</span>
        ) : (
          <span className="whitespace-nowrap">{formatTime(timeLeft)}</span>
        )}
      </div>
    </div>
  );
};
