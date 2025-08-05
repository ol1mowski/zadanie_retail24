import type { StopwatchFormData } from '../../../types/stopwatch';

interface FormPreviewProps {
  formData: StopwatchFormData;
}

export const FormPreview: React.FC<FormPreviewProps> = ({ formData }) => {
  return (
    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <h4 className="text-sm font-medium text-blue-900 mb-2">Podgląd:</h4>
      <p className="text-sm text-blue-700">
        <strong>Nazwa:</strong> {formData.name || 'Nie podano'}
      </p>
      <p className="text-sm text-blue-700">
        <strong>Cel:</strong> {formData.targetDate.toLocaleString('pl-PL')}
      </p>
    </div>
  );
};
