import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useStopwatchActions } from '../useStopwatchActions.hook';
import type { Stopwatch } from '../../../../types/stopwatch.type';
import { generateShareLink } from '../../../../utils/share.utils';

const mockShowPopup = vi.fn();
const mockSetStopwatches = vi.fn();
const mockNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock('../../../../utils/share.utils', () => ({
  generateShareLink: vi.fn(() => 'http://localhost:5173/stopwatch/test-123'),
}));

vi.mock('../../../../utils/cookies.utils', () => ({
  saveStopwatchesToCookies: vi.fn(),
  loadStopwatchesFromCookies: vi.fn(() => [
    {
      id: '1',
      name: 'Test Stoper',
      targetDate: new Date('2024-12-31'),
      status: 'active',
      createdAt: new Date(),
    },
  ]),
}));

vi.mock('../../../../utils/stopwatch.utils', () => ({
  generateStopwatchId: vi.fn(() => 'new-id-123'),
}));

describe('useStopwatchActions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should remove stopwatch and show confirmation popup', () => {
    const { result } = renderHook(() =>
      useStopwatchActions(mockShowPopup, mockSetStopwatches)
    );

    const testStopwatch: Stopwatch = {
      id: 'test-1',
      name: 'Test Stoper',
      targetDate: new Date('2024-12-31'),
      status: 'active',
      createdAt: new Date(),
    };

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

  it('should share stopwatch and show share popup', () => {
    const { result } = renderHook(() =>
      useStopwatchActions(mockShowPopup, mockSetStopwatches)
    );

    const testStopwatch: Stopwatch = {
      id: 'test-1',
      name: 'Test Stoper',
      targetDate: new Date('2024-12-31'),
      status: 'active',
      createdAt: new Date(),
    };

    act(() => {
      result.current.shareStopwatch(testStopwatch);
    });

    expect(mockShowPopup).toHaveBeenCalledWith(
      'Udostępnij stoper',
      'Link został wygenerowany. Skopiuj go i wyślij znajomym:',
      'share',
      undefined,
      'http://localhost:5173/stopwatch/test-123'
    );
  });

  it('should add new stopwatch', () => {
    const { result } = renderHook(() =>
      useStopwatchActions(mockShowPopup, mockSetStopwatches)
    );

    const formData = {
      name: 'Nowy Stoper',
      targetDate: new Date('2024-12-31'),
    };

    act(() => {
      result.current.addStopwatch(formData);
    });

    expect(mockSetStopwatches).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should handle share error gracefully', () => {
    const { result } = renderHook(() =>
      useStopwatchActions(mockShowPopup, mockSetStopwatches)
    );

    const testStopwatch: Stopwatch = {
      id: 'test-1',
      name: 'Test Stoper',
      targetDate: new Date('2024-12-31'),
      status: 'active',
      createdAt: new Date(),
    };

    vi.mocked(generateShareLink).mockImplementation(() => {
      throw new Error('Share error');
    });

    act(() => {
      result.current.shareStopwatch(testStopwatch);
    });

    expect(mockShowPopup).toHaveBeenCalledWith(
      'Błąd',
      'Nie udało się wygenerować linku do udostępnienia. Spróbuj ponownie.',
      'confirmation'
    );
  });
});
