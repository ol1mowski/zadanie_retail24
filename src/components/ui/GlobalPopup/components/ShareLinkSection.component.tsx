import { useState } from 'react';
import { FormField } from '../../Form/FormField.component';
import { Button } from '../../Button/Button.component';

interface ShareLinkSectionProps {
  shareLink: string;
}

export const ShareLinkSection: React.FC<ShareLinkSectionProps> = ({
  shareLink,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(shareLink)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(() => {
        throw new Error('Nie udało się skopiować linku');
      });
  };

  return (
    <div className="mb-4">
      <div className="space-y-3">
        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex-1 min-w-0">
            <FormField
              label=""
              id="share-link"
              type="text"
              value={shareLink}
              onChange={() => {}}
              disabled={true}
            />
          </div>
          <Button
            onClick={handleCopy}
            className={`px-4 py-2 text-white text-sm rounded-lg transition-all duration-200 font-medium flex items-center gap-2 ${
              isCopied
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
            title={isCopied ? 'Skopiowano!' : 'Kopiuj link'}
            disabled={isCopied}
          >
            {isCopied ? (
              <>
                <svg
                  className="w-4 h-4"
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
                Skopiowano!
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Kopiuj
              </>
            )}
          </Button>
        </div>
        <div className="text-xs text-gray-500 text-center">
          Link będzie aktywny przez 30 dni
        </div>
      </div>
    </div>
  );
};
