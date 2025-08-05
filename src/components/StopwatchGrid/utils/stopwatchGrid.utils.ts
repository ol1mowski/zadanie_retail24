export const getStopwatchText = (count: number): string => {
  if (count === 1) return 'stoper';
  if (count < 5) return 'stopery';
  return 'stoperów';
};
