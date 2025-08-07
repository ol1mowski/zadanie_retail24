import { useLocation } from 'react-router-dom';

export const useHeaderNavigation = () => {
  const location = useLocation();
  const isSharedPage = location.pathname.includes('/stopwatch/');

  return {
    isSharedPage,
  };
};
