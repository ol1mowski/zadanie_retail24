interface FormActionsProps {
  onCancel: () => void;
  isSubmitting: boolean;
  submitText: string;
  cancelText: string;
}

export const FormActions: React.FC<FormActionsProps> = ({
  onCancel,
  isSubmitting,
  submitText,
  cancelText,
}) => {
  return (
    <div className="flex gap-3 justify-end">
      <button
        type="button"
        onClick={onCancel}
        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
        disabled={isSubmitting}
      >
        {cancelText}
      </button>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isSubmitting}
      >
        {submitText}
      </button>
    </div>
  );
};
