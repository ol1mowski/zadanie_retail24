interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'white' | 'gray';
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'blue',
  text,
  fullScreen = false,
  className = '',
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-6 h-6';
      case 'lg':
        return 'w-16 h-16';
      default:
        return 'w-12 h-12';
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case 'white':
        return 'border-white';
      case 'gray':
        return 'border-gray-500';
      default:
        return 'border-blue-500';
    }
  };

  const getContainerClasses = () => {
    const baseClasses = 'flex items-center justify-center';

    if (fullScreen) {
      return `${baseClasses} min-h-screen bg-gray-50 ${className}`;
    }

    return `${baseClasses} ${className}`;
  };

  const spinner = (
    <div
      className={`animate-spin rounded-full border-b-2 ${getSizeClasses()} ${getColorClasses()}`}
    />
  );

  if (fullScreen) {
    return (
      <div className={getContainerClasses()}>
        <div className="text-center">
          {spinner}
          {text && <div className="text-gray-600 text-lg mt-4">{text}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className={getContainerClasses()}>
      <div className="text-center">
        {spinner}
        {text && <div className="text-gray-600 text-sm mt-2">{text}</div>}
      </div>
    </div>
  );
};
