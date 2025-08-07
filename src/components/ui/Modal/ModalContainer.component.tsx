import React from 'react';

interface ModalContainerProps {
  children: React.ReactNode;
}

export const ModalContainer: React.FC<ModalContainerProps> = ({ children }) => {
  return (
    <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
      {children}
    </div>
  );
};
