import { useNavigate } from 'react-router-dom';
import { Layout } from '../../Layout/Layout.component';
import { ErrorMessage, Button } from '../../ui';

export const SharedStopwatchNotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout
      title="Nie znaleziono stopera"
      subtitle="Podany stoper nie istnieje lub został usunięty"
      showAddButton={false}
    >
      <div className="max-w-2xl mx-auto px-4 py-8">
        <ErrorMessage
          title="Nie znaleziono stopera"
          message="Podany stoper nie istnieje lub został usunięty. Sprawdź link lub skontaktuj się z osobą, która go udostępniła."
          type="warning"
          onClose={() => navigate('/')}
          className="mb-6"
        />

        <div className="flex justify-center">
          <Button variant="primary" size="lg" onClick={() => navigate('/')}>
            Przejdź do głównej aplikacji
          </Button>
        </div>
      </div>
    </Layout>
  );
};
