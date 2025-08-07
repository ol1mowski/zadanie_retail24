import React from 'react';
import { useHeaderNavigation } from './hooks/useHeaderNavigation.hook';
import { HeaderLogo, HeaderActions } from './components';

interface HeaderProps {
  onAddStopwatch?: () => void;
  showAddButton?: boolean;
  title?: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onAddStopwatch,
  showAddButton = true,
  title = 'Aplikacja Stoperów',
  subtitle,
}) => {
  const { isSharedPage } = useHeaderNavigation();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <HeaderLogo title={title} subtitle={subtitle} />
          <HeaderActions
            isSharedPage={isSharedPage}
            showAddButton={showAddButton}
            onAddStopwatch={onAddStopwatch}
          />
        </div>
      </div>
    </header>
  );
};
