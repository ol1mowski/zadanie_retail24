interface AppHeaderProps {
  onAddStopwatch: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ onAddStopwatch }) => {
  return (
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
            onClick={onAddStopwatch}
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
  );
};
