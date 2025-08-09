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
    <div className="mb-3 sm:mb-4 md:mb-6">
      <div className="text-lg sm:text-sm md:text-base lg:text-lg xl:text-xl font-mono font-bold text-center bg-white/50 rounded-lg p-1 sm:p-2 md:p-3 lg:p-4 backdrop-blur-sm break-all">
        {isCompleted ? (
          <span className="text-red-600">Czas minął!</span>
        ) : (
          <span className="whitespace-nowrap">{formatTime(timeLeft)}</span>
        )}
      </div>
    </div>
  );
};
