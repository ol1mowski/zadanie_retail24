import { useNavigate } from 'react-router-dom';
import { Layout } from '../Layout/Layout.component';
import { Button, SEO } from '../ui';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="404 - Strona nie została znaleziona"
        description="Strona, której szukasz, nie istnieje lub została przeniesiona."
        noIndex={true}
      />
      <Layout title="404 - Strona nie została znaleziona" showAddButton={false}>
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="text-8xl font-bold text-blue-500 mb-4">404</div>
            <div className="text-6xl mb-4">🔍</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Strona nie została znaleziona
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Strona, której szukasz, nie istnieje lub została przeniesiona.
              Sprawdź adres URL lub wróć do strony głównej.
            </p>
          </div>

          <div className="flex flex-row gap-4 justify-center items-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/')}
              className="w-full sm:w-auto px-8 py-3"
            >
              Przejdź do strony głównej
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto px-8 py-3"
            >
              Wróć do poprzedniej strony
            </Button>
          </div>
        </div>
      </Layout>
    </>
  );
};
