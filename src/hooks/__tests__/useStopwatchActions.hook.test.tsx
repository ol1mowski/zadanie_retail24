import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useStopwatchActions } from '../useStopwatchActions.hook';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>{children}</MemoryRouter>
);

describe('useStopwatchActions', () => {
  const mockShowPopup = vi.fn();
  const mockSetStopwatches = vi.fn();

  const testStopwatch = {
    id: 'test-1',
    name: 'Test Stoper',
    targetDate: new Date('2024-02-15T12:00:00.000Z'),
    status: 'active' as const,
    createdAt: new Date(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should remove stopwatch by object', () => {
    const { result } = renderHook(
      () => useStopwatchActions(mockShowPopup, mockSetStopwatches),
      { wrapper }
    );

    act(() => {
      result.current.removeStopwatch(testStopwatch);
    });

    expect(mockShowPopup).toHaveBeenCalledWith(
      'Potwierdź usunięcie',
      expect.stringContaining('Test Stoper'),
      'confirmation',
      expect.any(Function)
    );
  });

  it('should share stopwatch', () => {
    const { result } = renderHook(() => useStopwatchActions(mockShowPopup), {
      wrapper,
    });

    act(() => {
      result.current.shareStopwatch(testStopwatch);
    });

    expect(mockShowPopup).toHaveBeenCalledWith(
      'Udostępnij stoper',
      'Link został wygenerowany. Skopiuj go i wyślij znajomym:',
      'share',
      undefined,
      expect.stringContaining('http://localhost:5173/stopwatch/')
    );
  });
});
