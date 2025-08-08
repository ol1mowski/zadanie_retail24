import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useSharedStopwatch } from '../useSharedStopwatch.hook';

vi.mock('../../../../utils/share.utils', () => ({
  parseShareUrl: vi.fn(),
  decodeStopwatchData: vi.fn(),
}));

describe('useSharedStopwatch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(window, 'location', {
      value: {
        href: 'http://localhost:3000/stopwatch/test-id-123?data=encoded-data',
      },
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize with correct state', () => {
    const { result } = renderHook(() => useSharedStopwatch(), {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={['/stopwatch/test-id-123']}>
          {children}
        </MemoryRouter>
      ),
    });

    expect(result.current.sharedStopwatch).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.errorType).toBeNull();
  });

  it('should clear shared stopwatch', () => {
    const { result } = renderHook(() => useSharedStopwatch(), {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={['/stopwatch/test-id-123']}>
          {children}
        </MemoryRouter>
      ),
    });

    result.current.clearSharedStopwatch();

    expect(result.current.sharedStopwatch).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.errorType).toBeNull();
  });

  it('should return all required properties', () => {
    const { result } = renderHook(() => useSharedStopwatch(), {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={['/stopwatch/test-id-123']}>
          {children}
        </MemoryRouter>
      ),
    });

    expect(result.current.sharedStopwatch).toBeDefined();
    expect(result.current.isLoading).toBeDefined();
    expect(result.current.error).toBeDefined();
    expect(result.current.errorType).toBeDefined();
    expect(result.current.clearSharedStopwatch).toBeDefined();
  });
});
