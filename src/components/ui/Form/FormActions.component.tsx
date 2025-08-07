import { Button } from '../Button/Button.component';

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
      <Button
        type="button"
        variant="ghost"
        onClick={onCancel}
        disabled={isSubmitting}
      >
        {cancelText}
      </Button>
      <Button
        type="submit"
        variant="primary"
        isLoading={isSubmitting}
        disabled={isSubmitting}
      >
        {submitText}
      </Button>
    </div>
  );
};
