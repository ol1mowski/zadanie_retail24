export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'ghost';

export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const getVariantClasses = () => {
    const baseClasses =
      'font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

    switch (variant) {
      case 'primary':
        return `${baseClasses} bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed`;
      case 'secondary':
        return `${baseClasses} bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed`;
      case 'success':
        return `${baseClasses} bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed`;
      case 'warning':
        return `${baseClasses} bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed`;
      case 'error':
        return `${baseClasses} bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed`;
      case 'info':
        return `${baseClasses} bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed`;
      case 'ghost':
        return `${baseClasses} bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed`;
      default:
        return `${baseClasses} bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed`;
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm rounded-md';
      case 'lg':
        return 'px-6 py-3 text-lg rounded-lg';
      default:
        return 'px-4 py-2 text-base rounded-lg';
    }
  };

  const buttonClasses = `${getVariantClasses()} ${getSizeClasses()} ${className}`;

  return (
    <button
      className={buttonClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!isLoading && leftIcon && leftIcon}
        <span>{children}</span>
        {!isLoading && rightIcon && rightIcon}
      </div>
    </button>
  );
};
