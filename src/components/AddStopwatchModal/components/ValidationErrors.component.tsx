interface ValidationErrorsProps {
  errors: string[];
}

export const ValidationErrors: React.FC<ValidationErrorsProps> = ({
  errors,
}) => {
  if (errors.length === 0) return null;

  return (
    <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
      <ul className="text-sm text-red-700">
        {errors.map((error, index) => (
          <li key={index} className="flex items-center">
            <span className="mr-2">•</span>
            {error}
          </li>
        ))}
      </ul>
    </div>
  );
};
