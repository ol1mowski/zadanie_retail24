import React from 'react';
import { Header } from '../Header/Header.component';

interface LayoutProps {
  children: React.ReactNode;
  onAddStopwatch?: () => void;
  showAddButton?: boolean;
  title?: string;
  subtitle?: string;
  showHeader?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  onAddStopwatch,
  showAddButton = true,
  title,
  subtitle,
  showHeader = true,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {showHeader && (
        <Header
          onAddStopwatch={onAddStopwatch}
          showAddButton={showAddButton}
          title={title}
          subtitle={subtitle}
        />
      )}

      <main className="flex-1">{children}</main>
    </div>
  );
};
