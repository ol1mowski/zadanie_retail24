import type { Stopwatch } from '../../../types/stopwatch';
import { StatisticsSection } from './StatisticsSection.component';

interface AppMainProps {
  stopwatches: Stopwatch[];
  children: React.ReactNode;
}

export const AppMain: React.FC<AppMainProps> = ({ stopwatches, children }) => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <StatisticsSection stopwatches={stopwatches} />
      {children}
    </main>
  );
};
