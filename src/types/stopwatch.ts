// Status stopera
export type StopwatchStatus = 'active' | 'completed' | 'paused';

// Główny interfejs stopera
export interface Stopwatch {
  id: string;
  name: string;
  targetDate: Date;
  status: StopwatchStatus;
  createdAt: Date;
  completedAt?: Date;
}

// Dane formularza do dodawania stopera
export interface StopwatchFormData {
  name: string;
  targetDate: Date;
}

// Props dla komponentów
export interface StopwatchItemProps {
  stopwatch: Stopwatch;
  onRemove: (id: string) => void;
  onPause: (id: string) => void;
  onResume: (id: string) => void;
}

export interface StopwatchGridProps {
  stopwatches: Stopwatch[];
  onRemove: (id: string) => void;
  onPause: (id: string) => void;
  onResume: (id: string) => void;
}

export interface AddStopwatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: StopwatchFormData) => void;
}

// Główny komponent aplikacji nie potrzebuje props
export type StopwatchAppProps = Record<string, never>;
