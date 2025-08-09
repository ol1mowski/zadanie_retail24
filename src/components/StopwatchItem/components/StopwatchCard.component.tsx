interface StopwatchCardProps {
  isCompleted: boolean;
  children: React.ReactNode;
}

export const StopwatchCard: React.FC<StopwatchCardProps> = ({
  isCompleted,
  children,
}) => {
  const getStatusColor = (): string => {
    if (isCompleted) return 'bg-red-100 border-red-300 text-red-800';
    return 'bg-blue-100 border-blue-300 text-blue-800';
  };

  return (
    <div
      className={`relative p-6 cursor-pointer rounded-lg border-2 ${getStatusColor()} shadow-lg transition-all duration-300 hover:shadow-xl`}
    >
      {children}
    </div>
  );
};
