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
      <h3 className="text-xl font-bold mb-4 text-gray-900 truncate">{name}</h3>

      <p className="text-sm text-gray-600 mb-4">
        Cel: {formatDate(targetDate)}
      </p>
    </>
  );
};
