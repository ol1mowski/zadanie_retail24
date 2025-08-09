import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useStopwatches } from '../useStopwatches.hook';

vi.mock('../../../utils/stopwatch.utils', () => ({
  generateStopwatchId: vi.fn(() => 'test-id-123'),
  isStopwatchCompleted: vi.fn(stopwatch => {
    return stopwatch.targetDate.getTime() < Date.now();
  }),
}));

vi.mock('../../../utils/cookies.utils', () => ({
  saveStopwatchesToCookies: vi.fn(),
  loadStopwatchesFromCookies: vi.fn(() => []),
}));

describe('useStopwatches', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-01-15T12:00:00.000Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('should initialize with sample stopwatches when no saved data', () => {
    const { result } = renderHook(() => useStopwatches());

    expect(result.current.stopwatches).toHaveLength(3);
    expect(result.current.stopwatches[0].name).toBe('Wakacje');
    expect(result.current.stopwatches[1].name).toBe('Deadline projektu');
    expect(result.current.stopwatches[2].name).toBe('Mecz');
    expect(result.current.isLoading).toBe(false);
  });

  it('should add new stopwatch', () => {
    const { result } = renderHook(() => useStopwatches());

    const newStopwatchData = {
      name: 'Nowy stoper',
      targetDate: new Date('2024-02-15T12:00:00.000Z'),
    };

    act(() => {
      result.current.addStopwatch(newStopwatchData);
    });

    expect(result.current.stopwatches).toHaveLength(4);
    expect(result.current.stopwatches[0].name).toBe('Nowy stoper');
    expect(result.current.stopwatches[0].status).toBe('active');
    expect(result.current.stopwatches[0].id).toBeDefined();
  });

  it('should pause stopwatch', () => {
    const { result } = renderHook(() => useStopwatches());

    act(() => {
      result.current.pauseStopwatch('1');
    });

    const pausedStopwatch = result.current.stopwatches.find(s => s.id === '1');
    expect(pausedStopwatch?.status).toBe('paused');
  });

  it('should resume stopwatch', () => {
    const { result } = renderHook(() => useStopwatches());

    act(() => {
      result.current.pauseStopwatch('1');
    });

    act(() => {
      result.current.resumeStopwatch('1');
    });

    const resumedStopwatch = result.current.stopwatches.find(s => s.id === '1');
    expect(resumedStopwatch?.status).toBe('active');
  });

  it('should show confirmation popup when removing stopwatch', () => {
    const { result } = renderHook(() => useStopwatches());

    act(() => {
      result.current.removeStopwatch('1');
    });

    expect(result.current.isPopupVisible).toBe(true);
    expect(result.current.popupTitle).toBe('Potwierdź usunięcie');
    expect(result.current.popupMessage).toContain('stoper');
    expect(result.current.popupType).toBe('confirmation');
  });

  it('should remove stopwatch after confirmation', () => {
    const { result } = renderHook(() => useStopwatches());

    act(() => {
      result.current.removeStopwatch('1');
    });

    expect(result.current.isPopupVisible).toBe(true);

    act(() => {
      result.current.popupOnConfirm?.();
    });

    expect(result.current.stopwatches.find(s => s.id === '1')).toBeUndefined();
    expect(result.current.isPopupVisible).toBe(false);
  });

  it('should show share popup', () => {
    const { result } = renderHook(() => useStopwatches());

    const testStopwatch = {
      id: 'test-1',
      name: 'Test Stoper',
      targetDate: new Date('2024-02-15T12:00:00.000Z'),
      status: 'active' as const,
      createdAt: new Date(),
    };

    act(() => {
      result.current.shareStopwatch(testStopwatch);
    });

    expect(result.current.isPopupVisible).toBe(true);
    expect(result.current.popupTitle).toBe('Udostępnij stoper');
    expect(result.current.popupMessage).toContain('Link został wygenerowany');
    expect(result.current.popupType).toBe('share');
    expect(result.current.shareLink).toBeDefined();
  });

  it('should close popup', () => {
    const { result } = renderHook(() => useStopwatches());

    const testStopwatch = {
      id: 'test-1',
      name: 'Test Stoper',
      targetDate: new Date('2024-02-15T12:00:00.000Z'),
      status: 'active' as const,
      createdAt: new Date(),
    };

    act(() => {
      result.current.shareStopwatch(testStopwatch);
    });

    expect(result.current.isPopupVisible).toBe(true);

    act(() => {
      result.current.closePopup();
    });

    expect(result.current.isPopupVisible).toBe(false);
    expect(result.current.popupMessage).toBe('');
    expect(result.current.popupTitle).toBe('');
    expect(result.current.shareLink).toBe('');
  });

  it('should show completion popup when stopwatch completes', () => {
    const { result } = renderHook(() => useStopwatches());

    const pastDate = new Date('2024-01-14T12:00:00.000Z');

    act(() => {
      result.current.addStopwatch({
        name: 'Zakończony stoper',
        targetDate: pastDate,
      });
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.isPopupVisible).toBe(true);
    expect(result.current.popupTitle).toBe('Stoper zakończony!');
    expect(result.current.popupMessage).toContain('Zakończony stoper');
    expect(result.current.popupType).toBe('success');
  });
});
