import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage.component';

interface RouteErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

interface RouteErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

const RouteErrorBoundaryWrapper: React.FC<RouteErrorBoundaryProps> = props => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <RouteErrorBoundaryInner
      {...props}
      navigate={navigate}
      location={location}
    />
  );
};

interface RouteErrorBoundaryInnerProps extends RouteErrorBoundaryProps {
  navigate: (to: string) => void;
  location: { pathname: string };
}

class RouteErrorBoundaryInner extends Component<
  RouteErrorBoundaryInnerProps,
  RouteErrorBoundaryState
> {
  constructor(props: RouteErrorBoundaryInnerProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(
    error: Error
  ): Partial<RouteErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      error,
      errorInfo,
    });

    console.error('RouteErrorBoundary caught an error:', error, errorInfo);

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  componentDidUpdate(prevProps: RouteErrorBoundaryInnerProps): void {
    if (
      this.state.hasError &&
      prevProps.location.pathname !== this.props.location.pathname
    ) {
      this.resetError();
    }
  }

  private resetError = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  private handleRetry = (): void => {
    this.resetError();
  };

  private handleGoHome = (): void => {
    this.props.navigate('/');
  };

  private handleGoBack = (): void => {
    this.props.navigate(-1 as unknown as string);
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <ErrorMessage
              title="Błąd podczas ładowania strony"
              message="Wystąpił problem podczas ładowania tej strony. Możesz spróbować ponownie lub wrócić do poprzedniej strony."
              type="error"
              onRetry={this.handleRetry}
              showIcon={true}
              className="mb-4"
            />

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-4 p-4 bg-gray-100 rounded-lg text-sm">
                <summary className="cursor-pointer font-medium mb-2">
                  Szczegóły błędu (tylko w trybie deweloperskim)
                </summary>
                <div className="space-y-2">
                  <div>
                    <strong>Ścieżka:</strong> {this.props.location.pathname}
                  </div>
                  <div>
                    <strong>Błąd:</strong> {this.state.error.message}
                  </div>
                  {this.state.errorInfo && (
                    <div>
                      <strong>Stack komponentu:</strong>
                      <pre className="mt-1 text-xs overflow-auto">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              </details>
            )}

            <div className="mt-4 flex gap-2 flex-wrap">
              <button
                onClick={this.handleRetry}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Spróbuj ponownie
              </button>
              <button
                onClick={this.handleGoBack}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                Wróć
              </button>
              <button
                onClick={this.handleGoHome}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Strona główna
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export { RouteErrorBoundaryWrapper as RouteErrorBoundary };
