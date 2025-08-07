import { useEffect, useState } from 'react';
import type {
  AddStopwatchModalProps,
  StopwatchFormData,
} from '../../types/stopwatch.type';
import { ModalOverlay, ModalContainer, ModalHeader } from '../ui';
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

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader
          title="Dodaj nowy stoper"
          onClose={handleClose}
          isSubmitting={isSubmitting}
        />
        <StopwatchForm
          formData={formData}
          onFormDataChange={handleFormDataChange}
          onSubmit={handleSubmit}
          onCancel={handleClose}
          isSubmitting={isSubmitting}
        />
      </ModalContainer>
    </ModalOverlay>
  );
};
