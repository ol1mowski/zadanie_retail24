import React from 'react';
import { PopupIcon, type PopupType } from './PopupIcon.component';
import { ShareLinkSection } from './ShareLinkSection.component';

interface PopupContentProps {
  type: PopupType;
  title: string;
  message: string;
  shareLink?: string;
}

export const PopupContent: React.FC<PopupContentProps> = ({
  type,
  title,
  message,
  shareLink,
}) => {
  return (
    <div className="mb-6">
      <PopupIcon type={type} />
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-600 text-lg mb-4">{message}</p>

      {type === 'share' && shareLink && (
        <ShareLinkSection shareLink={shareLink} />
      )}
    </div>
  );
};
