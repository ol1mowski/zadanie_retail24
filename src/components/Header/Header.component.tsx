import React from 'react';
import { Link, useLocation } from 'react-router-dom';

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
  const location = useLocation();
  const isSharedPage = location.pathname.includes('/stopwatch/');

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <div className="text-2xl mr-3">⏰</div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                {subtitle && (
                  <p className="text-sm text-gray-600 -mt-1">{subtitle}</p>
                )}
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {isSharedPage && (
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium shadow-sm"
              >
                <svg
                  className="w-5 h-5 mr-2"
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
                Główna aplikacja
              </Link>
            )}

            {showAddButton && onAddStopwatch && (
              <button
                onClick={onAddStopwatch}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm"
              >
                <svg
                  className="w-5 h-5 mr-2"
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
                Dodaj stoper
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
