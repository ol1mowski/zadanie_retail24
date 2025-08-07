import { useNavigate } from 'react-router-dom';
import { Layout } from '../Layout/Layout.component';
import { ErrorMessage, Button, SEO } from '../ui';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="404 - Strona nie została znaleziona"
        description="Strona, której szukasz, nie istnieje lub została przeniesiona."
        noIndex={true}
      />
      <Layout
        title="404 - Strona nie została znaleziona"
        subtitle="Ups! Coś poszło nie tak"
        showAddButton={false}
      >
        <div className="max-w-2xl mx-auto px-4 py-8">
          <ErrorMessage
            title="Strona nie została znaleziona"
            message="Strona, której szukasz, nie istnieje lub została przeniesiona. Sprawdź adres URL lub wróć do strony głównej."
            type="warning"
            onClose={() => navigate('/')}
            className="mb-6"
          />

          <div className="flex gap-3 justify-center">
            <Button variant="primary" size="lg" onClick={() => navigate('/')}>
              Przejdź do strony głównej
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => window.history.back()}
            >
              Wróć do poprzedniej strony
            </Button>
          </div>
        </div>
      </Layout>
    </>
  );
};
