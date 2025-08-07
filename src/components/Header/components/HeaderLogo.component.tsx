import { Link } from 'react-router-dom';

interface HeaderLogoProps {
  title: string;
  subtitle?: string;
}

export const HeaderLogo: React.FC<HeaderLogoProps> = ({ title, subtitle }) => {
  return (
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
  );
};
