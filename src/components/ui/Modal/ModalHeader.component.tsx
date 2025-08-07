import { Button } from '../Button/Button.component';

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
  isSubmitting: boolean;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  onClose,
  isSubmitting,
}) => {
  return (
    <div className="flex items-center justify-between p-6 border-b border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      <Button
        variant="ghost"
        size="sm"
        onClick={onClose}
        disabled={isSubmitting}
        className="text-gray-400 hover:text-gray-600 p-1"
      >
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </Button>
    </div>
  );
};
