interface ScrollHintProps {
  totalCount: number;
  visibleCount: number;
}

export const ScrollHint: React.FC<ScrollHintProps> = ({
  totalCount,
  visibleCount,
}) => {
  const hiddenCount = totalCount - visibleCount;

  if (hiddenCount <= 0) return null;

  return (
    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
      <div className="flex items-center gap-2 text-blue-700">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
          />
        </svg>
        <span className="text-sm font-medium">
          Przesuń w dół, aby zobaczyć więcej stoperów ({hiddenCount} więcej)
        </span>
      </div>
    </div>
  );
};
