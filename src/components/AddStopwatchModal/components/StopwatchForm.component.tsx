import { useState } from 'react';
import type { StopwatchFormData } from '../../../types/stopwatch.type';
import { validateStopwatchData } from '../../../utils/stopwatch.utils';
import { FormField, FormActions } from '../../ui';
import { ErrorMessage } from '../../ui/ErrorMessage.component';
import { FormPreview } from './FormPreview.component';

interface StopwatchFormProps {
  formData: StopwatchFormData;
  onFormDataChange: (data: StopwatchFormData) => void;
  onSubmit: (data: StopwatchFormData) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export const StopwatchForm: React.FC<StopwatchFormProps> = ({
  formData,
  onFormDataChange,
  onSubmit,
  onCancel,
  isSubmitting,
}) => {
  const [errors, setErrors] = useState<string[]>([]);

  const handleInputChange = (
    field: keyof StopwatchFormData,
    value: string | Date
  ) => {
    const newFormData = {
      ...formData,
      [field]: value,
    };
    onFormDataChange(newFormData);

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

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <FormField
        label="Nazwa stopera *"
        id="name"
        type="text"
        value={formData.name}
        onChange={value => handleInputChange('name', value)}
        placeholder="np. Moje urodziny"
        maxLength={50}
        disabled={isSubmitting}
      >
        <p className="text-xs text-gray-500 mt-1">
          {formData.name.length}/50 znaków
        </p>
      </FormField>

      <FormField
        label="Data i godzina docelowa *"
        id="targetDate"
        type="datetime-local"
        value={formData.targetDate.toISOString().slice(0, 16)}
        onChange={value => handleInputChange('targetDate', new Date(value))}
        disabled={isSubmitting}
      />

      {errors.length > 0 && (
        <div className="mb-6">
          <ErrorMessage
            title="Błędy walidacji"
            message={errors.join('. ')}
            type="error"
            showIcon={false}
          />
        </div>
      )}

      <FormPreview formData={formData} />

      <FormActions
        onCancel={onCancel}
        isSubmitting={isSubmitting}
        submitText={isSubmitting ? 'Dodawanie...' : 'Dodaj stoper'}
        cancelText="Anuluj"
      />
    </form>
  );
};
