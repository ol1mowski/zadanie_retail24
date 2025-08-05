export const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-6xl mb-4">⏰</div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        Brak stoperów
      </h3>
      <p className="text-gray-500 max-w-md">
        Dodaj swój pierwszy stoper, aby rozpocząć odliczanie czasu do ważnych
        wydarzeń.
      </p>
    </div>
  );
};
