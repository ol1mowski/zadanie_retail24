import React from 'react';

interface ModalOverlayProps {
  children: React.ReactNode;
}

export const ModalOverlay: React.FC<ModalOverlayProps> = ({ children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      {children}
    </div>
  );
};
