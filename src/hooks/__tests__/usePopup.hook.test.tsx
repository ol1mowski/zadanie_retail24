import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePopup } from '../usePopup.hook';

describe('usePopup', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => usePopup());

    expect(result.current.popupMessage).toBe('');
    expect(result.current.isPopupVisible).toBe(false);
    expect(result.current.popupTitle).toBe('');
    expect(result.current.popupType).toBe('success');
    expect(result.current.popupOnConfirm).toBeUndefined();
    expect(result.current.shareLink).toBe('');
  });

  it('should show popup with confirmation type and callback', () => {
    const { result } = renderHook(() => usePopup());
    const mockCallback = vi.fn();

    act(() => {
      result.current.showPopup(
        'Potwierdź',
        'Czy na pewno chcesz kontynuować?',
        'confirmation',
        mockCallback
      );
    });

    expect(result.current.isPopupVisible).toBe(true);
    expect(result.current.popupTitle).toBe('Potwierdź');
    expect(result.current.popupType).toBe('confirmation');
    expect(result.current.popupOnConfirm).toBeDefined();

    act(() => {
      result.current.popupOnConfirm?.();
    });

    expect(mockCallback).toHaveBeenCalled();
  });

  it('should show popup with share type and link', () => {
    const { result } = renderHook(() => usePopup());

    act(() => {
      result.current.showPopup(
        'Udostępnij',
        'Link został wygenerowany:',
        'share',
        undefined,
        'https://example.com/share/123'
      );
    });

    expect(result.current.isPopupVisible).toBe(true);
    expect(result.current.popupType).toBe('share');
    expect(result.current.shareLink).toBe('https://example.com/share/123');
  });

  it('should close popup and reset all values', () => {
    const { result } = renderHook(() => usePopup());

    act(() => {
      result.current.showPopup('Test', 'Test message', 'confirmation');
    });

    expect(result.current.isPopupVisible).toBe(true);

    act(() => {
      result.current.closePopup();
    });

    expect(result.current.isPopupVisible).toBe(false);
    expect(result.current.popupMessage).toBe('');
    expect(result.current.popupTitle).toBe('');
    expect(result.current.popupType).toBe('success');
  });
});
