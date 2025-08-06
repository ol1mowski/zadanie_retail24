export type StopwatchStatus = 'active' | 'completed' | 'paused';

export interface Stopwatch {
  id: string;
  name: string;
  targetDate: Date;
  status: StopwatchStatus;
  createdAt: Date;
  completedAt?: Date;
}

export interface StopwatchFormData {
  name: string;
  targetDate: Date;
}

export interface StopwatchItemProps {
  stopwatch: Stopwatch;
  onRemove: (id: string) => void;
  onPause: (id: string) => void;
  onResume: (id: string) => void;
  onShare: (link: string) => void;
}

export interface StopwatchGridProps {
  stopwatches: Stopwatch[];
  onRemove: (id: string) => void;
  onPause: (id: string) => void;
  onResume: (id: string) => void;
  onShare: (link: string) => void;
}

export interface AddStopwatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: StopwatchFormData) => void;
}

export type StopwatchAppProps = Record<string, never>;
