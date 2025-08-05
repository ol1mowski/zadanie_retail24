import { useEffect, useState } from 'react';
import type { Stopwatch, StopwatchFormData } from '../types/stopwatch';
import { generateStopwatchId } from '../utils/stopwatch.utils';
import StopwatchGrid from './StopwatchGrid.component';
import AddStopwatchModal from './AddStopwatchModal.component';

const StopwatchApp: React.FC = () => {
  const [stopwatches, setStopwatches] = useState<Stopwatch[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const sampleStopwatches: Stopwatch[] = [
      {
        id: '1',
        name: 'Moje urodziny',
        targetDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        status: 'active',
        createdAt: new Date(),
      },
      {
        id: '2',
        name: 'Wakacje',
        targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        status: 'active',
        createdAt: new Date(),
      },
      {
        id: '3',
        name: 'Deadline projektu',
        targetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        status: 'paused',
        createdAt: new Date(),
      },
    ];
    setStopwatches(sampleStopwatches);
  }, []);

  const handleAddStopwatch = (data: StopwatchFormData) => {
    const newStopwatch: Stopwatch = {
      id: generateStopwatchId(),
      name: data.name,
      targetDate: data.targetDate,
      status: 'active',
      createdAt: new Date(),
    };

    setStopwatches(prev => [...prev, newStopwatch]);
  };

  const handleRemoveStopwatch = (id: string) => {
    setStopwatches(prev => prev.filter(stopwatch => stopwatch.id !== id));
  };

  const handlePauseStopwatch = (id: string) => {
    setStopwatches(prev =>
      prev.map(stopwatch =>
        stopwatch.id === id
          ? { ...stopwatch, status: 'paused' as const }
          : stopwatch
      )
    );
  };

  const handleResumeStopwatch = (id: string) => {
    setStopwatches(prev =>
      prev.map(stopwatch =>
        stopwatch.id === id
          ? { ...stopwatch, status: 'active' as const }
          : stopwatch
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="text-2xl mr-3">⏰</div>
              <h1 className="text-2xl font-bold text-gray-900">
                Aplikacja Stoperów
              </h1>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Dodaj stoper
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <svg
                    className="w-6 h-6 text-blue-600"
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
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Aktywne</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stopwatches.filter(s => s.status === 'active').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <svg
                    className="w-6 h-6 text-yellow-600"
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
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">
                    Wstrzymane
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stopwatches.filter(s => s.status === 'paused').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <svg
                    className="w-6 h-6 text-red-600"
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
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Ukończone</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stopwatches.filter(s => s.status === 'completed').length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <StopwatchGrid
          stopwatches={stopwatches}
          onRemove={handleRemoveStopwatch}
          onPause={handlePauseStopwatch}
          onResume={handleResumeStopwatch}
        />
      </main>

      <AddStopwatchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddStopwatch}
      />
    </div>
  );
};

export default StopwatchApp;
