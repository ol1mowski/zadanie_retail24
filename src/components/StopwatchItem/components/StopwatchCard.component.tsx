import type { StopwatchStatus } from '../../../types/stopwatch.type';

interface StopwatchCardProps {
  status: StopwatchStatus;
  isCompleted: boolean;
  children: React.ReactNode;
}

export const StopwatchCard: React.FC<StopwatchCardProps> = ({
  status,
  isCompleted,
  children,
}) => {
  const getStatusColor = (): string => {
    if (isCompleted) return 'bg-red-100 border-red-300 text-red-800';
    if (status === 'paused')
      return 'bg-yellow-100 border-yellow-300 text-yellow-800';
    return 'bg-blue-100 border-blue-300 text-blue-800';
  };

  return (
    <div
      className={`relative p-6 rounded-lg border-2 ${getStatusColor()} shadow-lg transition-all duration-300 hover:shadow-xl`}
    >
      {children}
    </div>
  );
};
