import { generateShareLink } from '../../utils/share.utils';
import type { Stopwatch } from '../../types/stopwatch.type';
import { Button } from './Button/Button.component';

interface ExportLinkButtonProps {
  stopwatch: Stopwatch;
  onShare: (link: string) => void;
  className?: string;
}

export const ExportLinkButton: React.FC<ExportLinkButtonProps> = ({
  stopwatch,
  onShare,
  className = '',
}) => {
  const handleShare = () => {
    const shareLink = generateShareLink(stopwatch);
    onShare(shareLink);
  };

  return (
    <Button
      onClick={handleShare}
      className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all duration-200 text-sm font-medium flex items-center gap-2 ${className}`}
      title={`Udostępnij stoper "${stopwatch.name}"`}
      aria-label={`Udostępnij stoper "${stopwatch.name}"`}
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
        />
      </svg>
      <span>Udostępnij</span>
    </Button>
  );
};
