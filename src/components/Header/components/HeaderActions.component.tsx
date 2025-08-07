import { Link } from 'react-router-dom';
import { Button } from '../../ui/Button/Button.component';

interface HeaderActionsProps {
  isSharedPage: boolean;
  showAddButton: boolean;
  onAddStopwatch?: () => void;
}

export const HeaderActions: React.FC<HeaderActionsProps> = ({
  isSharedPage,
  showAddButton,
  onAddStopwatch,
}) => {
  return (
    <div className="flex items-center gap-3">
      {isSharedPage && (
        <Link to="/">
          <Button
            variant="primary"
            leftIcon={
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            }
          >
            Główna aplikacja
          </Button>
        </Link>
      )}

      {showAddButton && onAddStopwatch && (
        <Button
          variant="primary"
          onClick={onAddStopwatch}
          leftIcon={
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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          }
        >
          Dodaj stoper
        </Button>
      )}
    </div>
  );
};
