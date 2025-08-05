interface StopwatchCompletedMessageProps {
  isCompleted: boolean;
}

export const StopwatchCompletedMessage: React.FC<
  StopwatchCompletedMessageProps
> = ({ isCompleted }) => {
  if (!isCompleted) return null;

  return (
    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
      <p className="text-sm text-red-700 text-center">
        🎉 Czas minął! Możesz usunąć ten stoper.
      </p>
    </div>
  );
};
