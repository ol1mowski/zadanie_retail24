import { formatDate } from '../../../utils/stopwatch.utils';

interface StopwatchHeaderProps {
  name: string;
  targetDate: Date;
}

export const StopwatchHeader: React.FC<StopwatchHeaderProps> = ({
  name,
  targetDate,
}) => {
  return (
    <>
      <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 md:mb-4 text-gray-900 truncate">
        {name}
      </h3>

      <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 md:mb-4">
        Cel: {formatDate(targetDate)}
      </p>
    </>
  );
};
