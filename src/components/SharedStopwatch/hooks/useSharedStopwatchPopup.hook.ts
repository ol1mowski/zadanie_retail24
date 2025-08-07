import { useState, useCallback } from 'react';

export type PopupType = 'success' | 'confirmation' | 'share';

export const useSharedStopwatchPopup = () => {
  const [popupMessage, setPopupMessage] = useState<string>('');
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
  const [popupTitle, setPopupTitle] = useState<string>('');
  const [popupType, setPopupType] = useState<PopupType>('success');
  const [popupOnConfirm, setPopupOnConfirm] = useState<
    (() => void) | undefined
  >(undefined);
  const [shareLink, setShareLink] = useState<string>('');

  const closePopup = useCallback(() => {
    setIsPopupVisible(false);
    setPopupMessage('');
    setPopupTitle('');
    setPopupType('success');
    setPopupOnConfirm(undefined);
    setShareLink('');
  }, []);

  const showPopup = useCallback(
    (
      title: string,
      message: string,
      type: PopupType,
      onConfirm?: () => void,
      link?: string
    ) => {
      setPopupTitle(title);
      setPopupMessage(message);
      setPopupType(type);
      setPopupOnConfirm(onConfirm ? () => onConfirm : undefined);
      if (link) {
        setShareLink(link);
      }
      setIsPopupVisible(true);
    },
    []
  );

  return {
    popupMessage,
    isPopupVisible,
    popupTitle,
    popupType,
    popupOnConfirm,
    shareLink,
    closePopup,
    showPopup,
  };
};
