import { useNavigate } from 'react-router-dom';
import { Layout } from '../../Layout/Layout.component';
import { ErrorMessage, Button, SEO } from '../../ui';

interface SharedStopwatchErrorProps {
  error: string;
  errorType: 'invalid_url' | 'invalid_data' | 'network' | 'unknown';
}

export const SharedStopwatchError: React.FC<SharedStopwatchErrorProps> = ({
  error,
  errorType,
}) => {
  const navigate = useNavigate();

  const getErrorTitle = () => {
    switch (errorType) {
      case 'invalid_url':
        return 'Nieprawidłowy link';
      case 'invalid_data':
        return 'Uszkodzone dane stopera';
      case 'network':
        return 'Błąd połączenia';
      default:
        return 'Błąd ładowania stopera';
    }
  };

  return (
    <>
      <SEO
        title="Błąd - Aplikacja Stoperów"
        description="Wystąpił błąd podczas ładowania udostępnionego stopera."
        noIndex={true}
      />
      <Layout
        title="Błąd"
        subtitle="Wystąpił problem podczas ładowania stopera"
        showAddButton={false}
      >
        <div className="max-w-2xl mx-auto px-4 py-8">
          <ErrorMessage
            title={getErrorTitle()}
            message={error}
            type="error"
            onRetry={() => navigate(0)}
            onClose={() => navigate('/')}
            className="mb-6"
          />

          <div className="flex gap-3 justify-center">
            <Button variant="primary" size="lg" onClick={() => navigate('/')}>
              Przejdź do głównej aplikacji
            </Button>
            <Button variant="secondary" size="lg" onClick={() => navigate(-1)}>
              Wróć do poprzedniej strony
            </Button>
          </div>
        </div>
      </Layout>
    </>
  );
};
