interface FormFieldProps {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
  children?: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  type,
  value,
  onChange,
  placeholder,
  maxLength,
  disabled = false,
  children,
}) => {
  return (
    <div className="mb-6">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
      />
      {children}
    </div>
  );
};
