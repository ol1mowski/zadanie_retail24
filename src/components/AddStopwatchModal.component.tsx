import { useEffect, useState } from 'react';
import type {
  AddStopwatchModalProps,
  StopwatchFormData,
} from '../types/stopwatch';
import { validateStopwatchData } from '../utils/stopwatch.utils';

const AddStopwatchModal: React.FC<AddStopwatchModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [formData, setFormData] = useState<StopwatchFormData>({
    name: '',
    targetDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        targetDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });
      setErrors([]);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleInputChange = (
    field: keyof StopwatchFormData,
    value: string | Date
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateStopwatchData(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    onAdd(formData);
    onClose();
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Dodaj nowy stoper
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            disabled={isSubmitting}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nazwa stopera *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={e => handleInputChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="np. Moje urodziny"
              maxLength={50}
              disabled={isSubmitting}
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.name.length}/50 znaków
            </p>
          </div>

          <div className="mb-6">
            <label
              htmlFor="targetDate"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Data i godzina docelowa *
            </label>
            <input
              type="datetime-local"
              id="targetDate"
              value={formData.targetDate.toISOString().slice(0, 16)}
              onChange={e =>
                handleInputChange('targetDate', new Date(e.target.value))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isSubmitting}
            />
          </div>

          {errors.length > 0 && (
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
          )}

          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Podgląd:</h4>
            <p className="text-sm text-blue-700">
              <strong>Nazwa:</strong> {formData.name || 'Nie podano'}
            </p>
            <p className="text-sm text-blue-700">
              <strong>Cel:</strong>{' '}
              {formData.targetDate.toLocaleString('pl-PL')}
            </p>
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
              disabled={isSubmitting}
            >
              Anuluj
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Dodawanie...' : 'Dodaj stoper'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStopwatchModal;
