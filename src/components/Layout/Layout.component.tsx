import { useState } from 'react';
import { Header } from '../Header/Header.component';
import { AddStopwatchModal } from '../AddStopwatchModal';
import { GlobalPopup } from '../ui/GlobalPopup';
import { StatisticsSection } from '../StatisticsSection/StatisticsSection.component';
import type { Stopwatch, StopwatchFormData } from '../../types/stopwatch.type';

interface LayoutProps {
  children: React.ReactNode;
  onAddStopwatch?: () => void;
  showAddButton?: boolean;
  title?: string;
  subtitle?: string;
  showHeader?: boolean;
  showModal?: boolean;
  stopwatches?: Stopwatch[];
  onAddStopwatchModal?: (data: StopwatchFormData) => void;
  popupProps?: {
    isVisible: boolean;
    title: string;
    message: string;
    type: 'success' | 'confirmation' | 'share' | 'import' | 'form';
    onClose: () => void;
    onConfirm?: () => void;
    shareLink?: string;
  };
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  onAddStopwatch,
  showAddButton = true,
  title,
  subtitle,
  showHeader = true,
  showModal = false,
  stopwatches,
  onAddStopwatchModal,
  popupProps,
}) => {
  const [isFormPopupOpen, setIsFormPopupOpen] = useState<boolean>(false);

  const openFormPopup = () => setIsFormPopupOpen(true);
  const closeFormPopup = () => setIsFormPopupOpen(false);

  const handleAddStopwatch = () => {
    if (onAddStopwatch) {
      onAddStopwatch();
    } else {
      openFormPopup();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {showHeader && (
        <Header
          onAddStopwatch={handleAddStopwatch}
          showAddButton={showAddButton}
          title={title}
          subtitle={subtitle}
        />
      )}

      <main className="flex-1">
        {stopwatches ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <StatisticsSection stopwatches={stopwatches} />
            {children}
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        )}
      </main>

      {showModal && (
        <AddStopwatchModal
          isOpen={isFormPopupOpen}
          onClose={closeFormPopup}
          onAdd={onAddStopwatchModal || (() => {})}
        />
      )}

      {popupProps && (
        <GlobalPopup
          isVisible={popupProps.isVisible}
          title={popupProps.title}
          message={popupProps.message}
          type={popupProps.type}
          onClose={popupProps.onClose}
          onConfirm={popupProps.onConfirm}
          confirmText={popupProps.type === 'confirmation' ? 'Usuń' : 'OK'}
          cancelText="Anuluj"
          showAutoHide={popupProps.type === 'success'}
          shareLink={popupProps.shareLink}
        />
      )}
    </div>
  );
};
