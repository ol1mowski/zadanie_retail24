import type { Stopwatch } from '../../../types/stopwatch.type';
import { Layout } from '../../Layout/Layout.component';
import { StopwatchItem } from '../../StopwatchItem';
import { SEO } from '../../ui';

interface SharedStopwatchContentProps {
  stopwatch: Stopwatch | null;
  onRemove: () => void;
  onShare: () => void;
}

export const SharedStopwatchContent: React.FC<SharedStopwatchContentProps> = ({
  stopwatch,
  onRemove,
  onShare,
}) => {
  if (!stopwatch) {
    return null;
  }

  return (
    <>
      <SEO
        title={`${stopwatch.name} - Udostępniony stoper`}
        description={`Udostępniony stoper: ${stopwatch.name}. Status: ${stopwatch.status === 'active' ? 'aktywny' : 'zakończony'}.`}
        ogTitle={`${stopwatch.name} - Udostępniony stoper`}
        ogDescription={`Udostępniony stoper: ${stopwatch.name}`}
        twitterTitle={`${stopwatch.name} - Udostępniony stoper`}
        twitterDescription={`Udostępniony stoper: ${stopwatch.name}`}
      />
      <Layout
        title="Udostępniony stoper"
        subtitle="Ten stoper został udostępniony z Tobą"
        showAddButton={false}
      >
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <StopwatchItem
              stopwatch={stopwatch}
              onRemove={onRemove}
              onShare={onShare}
              isReadOnly={false}
            />
          </div>
        </div>
      </Layout>
    </>
  );
};
