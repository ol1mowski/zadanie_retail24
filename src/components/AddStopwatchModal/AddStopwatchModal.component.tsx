import { useEffect, useState } from 'react';
import type {
  AddStopwatchModalProps,
  StopwatchFormData,
} from '../../types/stopwatch.type';
import { GlobalPopup } from '../ui/GlobalPopup';
import { StopwatchForm } from './components/StopwatchForm.component';

export const AddStopwatchModal: React.FC<AddStopwatchModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [formData, setFormData] = useState<StopwatchFormData>({
    name: '',
    targetDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        targetDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleFormDataChange = (data: StopwatchFormData) => {
    setFormData(data);
  };

  const handleSubmit = (data: StopwatchFormData) => {
    setIsSubmitting(true);
    onAdd(data);
    onClose();
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  return (
    <GlobalPopup
      isVisible={isOpen}
      title="Dodaj nowy stoper"
      message=""
      type="form"
      onClose={handleClose}
      showAutoHide={false}
    >
      <div className="mb-6">
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          Dodaj nowy stoper
        </h2>
      </div>

      <StopwatchForm
        formData={formData}
        onFormDataChange={handleFormDataChange}
        onSubmit={handleSubmit}
        onCancel={handleClose}
        isSubmitting={isSubmitting}
      />
    </GlobalPopup>
  );
};
