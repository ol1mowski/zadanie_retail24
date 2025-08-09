interface StopwatchStatusBadgeProps {
  isCompleted: boolean;
}

export const StopwatchStatusBadge: React.FC<StopwatchStatusBadgeProps> = ({
  isCompleted,
}) => {
  const getStatusText = (): string => {
    if (isCompleted) return 'Ukończony';

    return 'Aktywny';
  };

  return (
    <div className="absolute top-2 right-2">
      <span className="px-2 py-1 text-xs font-medium rounded-full bg-white/80 backdrop-blur-sm">
        {getStatusText()}
      </span>
    </div>
  );
};
