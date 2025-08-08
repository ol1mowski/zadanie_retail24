import { Component, type ErrorInfo, type ReactNode } from 'react';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage.component';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetOnPropsChange?: boolean;
  resetOnLocationChange?: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
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

    console.error('ErrorBoundary caught an error:', error, errorInfo);

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    this.logErrorToService(error, errorInfo);
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps): void {
    if (this.props.resetOnPropsChange && this.state.hasError) {
      const propsChanged =
        JSON.stringify(prevProps) !== JSON.stringify(this.props);
      if (propsChanged) {
        this.resetError();
      }
    }
  }

  private logErrorToService = (error: Error, errorInfo: ErrorInfo): void => {
    console.group('Error Details');
    console.error('Error:', error);
    console.error('Component Stack:', errorInfo.componentStack);
    console.error('Error Stack:', error.stack);
    console.groupEnd();
  };

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

  private handleReportError = (): void => {
    if (this.state.error) {
      console.log('Reporting error to support team...');
    }
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
              title="Coś poszło nie tak"
              message="Wystąpił nieoczekiwany błąd. Spróbuj odświeżyć stronę lub skontaktuj się z pomocą techniczną."
              type="error"
              onRetry={this.handleRetry}
              showIcon={true}
              className="mb-4"
            />

            {this.state.error && (
              <details className="mt-4 p-4 bg-gray-100 rounded-lg text-sm">
                <summary className="cursor-pointer font-medium mb-2">
                  Szczegóły błędu (tylko w trybie deweloperskim)
                </summary>
                <div className="space-y-2">
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
                  <div>
                    <strong>Stack błędu:</strong>
                    <pre className="mt-1 text-xs overflow-auto">
                      {this.state.error.stack}
                    </pre>
                  </div>
                </div>
              </details>
            )}

            <div className="mt-4 flex gap-2">
              <button
                onClick={this.handleRetry}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Spróbuj ponownie
              </button>
              <button
                onClick={this.handleReportError}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                Zgłoś błąd
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
