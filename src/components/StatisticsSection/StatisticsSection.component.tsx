import type { Stopwatch } from '../../types/stopwatch.type';
import { StatisticCard } from './components/StatisticCard.component';

interface StatisticsSectionProps {
  stopwatches: Stopwatch[];
}

export const StatisticsSection: React.FC<StatisticsSectionProps> = ({
  stopwatches,
}) => {
  const activeCount = stopwatches.filter(s => s.status === 'active').length;
  const pausedCount = stopwatches.filter(s => s.status === 'paused').length;
  const completedCount = stopwatches.filter(
    s => s.status === 'completed'
  ).length;

  const activeIcon = (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  const pausedIcon = (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  const completedIcon = (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatisticCard
          title="Aktywne"
          count={activeCount}
          icon={activeIcon}
          bgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatisticCard
          title="Wstrzymane"
          count={pausedCount}
          icon={pausedIcon}
          bgColor="bg-yellow-100"
          iconColor="text-yellow-600"
        />
        <StatisticCard
          title="Ukończone"
          count={completedCount}
          icon={completedIcon}
          bgColor="bg-red-100"
          iconColor="text-red-600"
        />
      </div>
    </div>
  );
};
