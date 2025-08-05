interface StopwatchCounterProps {
  count: number;
}

export const StopwatchCounter: React.FC<StopwatchCounterProps> = ({
  count,
}) => {
  const getStopwatchText = (count: number): string => {
    if (count === 1) return 'stoper';
    if (count < 5) return 'stopery';
    return 'stoperów';
  };

  return (
    <div className="px-6 pb-6">
      <p className="text-sm text-gray-500 text-center">
        {count} {getStopwatchText(count)}
      </p>
    </div>
  );
};
