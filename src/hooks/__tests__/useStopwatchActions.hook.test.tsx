import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useStopwatchActions } from '../useStopwatchActions.hook';
import type { Stopwatch } from '../../types/stopwatch.type';

vi.mock('../../utils/cookies.utils', () => ({
  saveStopwatchesToCookies: vi.fn(),
  loadStopwatchesFromCookies: vi.fn(() => []),
}));

vi.mock('../../utils/share.utils', () => ({
  generateShareLink: vi.fn(() => 'https://example.com/share/123'),
}));

const mockShowPopup = vi.fn();
const mockSetStopwatches = vi.fn();
const mockSetLocalStopwatch = vi.fn();

const testStopwatch: Stopwatch = {
  id: 'test-1',
  name: 'Test Stoper',
  targetDate: new Date('2024-02-15T12:00:00.000Z'),
  status: 'active',
  createdAt: new Date(),
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>{children}</MemoryRouter>
);

describe('useStopwatchActions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should pause stopwatch by ID', () => {
    const { result } = renderHook(
      () => useStopwatchActions(mockShowPopup, mockSetStopwatches),
      { wrapper }
    );

    act(() => {
      result.current.pauseStopwatch('test-1');
    });

    expect(mockSetStopwatches).toHaveBeenCalled();
  });

  it('should pause stopwatch by object', () => {
    const { result } = renderHook(
      () =>
        useStopwatchActions(mockShowPopup, undefined, mockSetLocalStopwatch),
      { wrapper }
    );

    act(() => {
      result.current.pauseStopwatch(testStopwatch);
    });

    expect(mockSetLocalStopwatch).toHaveBeenCalledWith({
      ...testStopwatch,
      status: 'paused',
    });
  });

  it('should resume stopwatch by object', () => {
    const { result } = renderHook(
      () =>
        useStopwatchActions(mockShowPopup, undefined, mockSetLocalStopwatch),
      { wrapper }
    );

    act(() => {
      result.current.resumeStopwatch(testStopwatch);
    });

    expect(mockSetLocalStopwatch).toHaveBeenCalledWith({
      ...testStopwatch,
      status: 'active',
    });
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
      'Czy na pewno chcesz usunąć stoper "Test Stoper"?',
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
      'https://example.com/share/123'
    );
  });
});
