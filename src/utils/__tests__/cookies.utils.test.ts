import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  saveStopwatchesToCookies,
  loadStopwatchesFromCookies,
  clearStopwatchesFromCookies,
} from '../cookies.utils';
import type { Stopwatch } from '../../types/stopwatch.type';

const mockConsoleError = vi.fn();

describe('cookies.utils', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: '',
      configurable: true,
    });

    vi.spyOn(console, 'error').mockImplementation(mockConsoleError);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('saveStopwatchesToCookies', () => {
    it('should save stopwatches to cookies correctly', () => {
      const mockStopwatches: Stopwatch[] = [
        {
          id: '1',
          name: 'Test Stoper',
          targetDate: new Date('2024-12-31T23:59:59'),
          status: 'active',
          createdAt: new Date('2024-01-01T00:00:00'),
        },
      ];

      let cookieValue = '';
      Object.defineProperty(document, 'cookie', {
        set: (value: string) => {
          cookieValue = value;
        },
        get: () => cookieValue,
        configurable: true,
      });

      saveStopwatchesToCookies(mockStopwatches);

      expect(cookieValue).toContain('stopwatches=');
      expect(cookieValue).toContain('path=/');
      expect(cookieValue).toContain('max-age=');

      const encodedData = cookieValue.split('stopwatches=')[1].split(';')[0];
      const decodedData = decodeURIComponent(encodedData);
      const parsedData = JSON.parse(decodedData);

      expect(parsedData).toHaveLength(1);
      expect(parsedData[0].id).toBe('1');
      expect(parsedData[0].name).toBe('Test Stoper');
    });

    it('should handle empty stopwatches array', () => {
      let cookieValue = '';
      Object.defineProperty(document, 'cookie', {
        set: (value: string) => {
          cookieValue = value;
        },
        get: () => cookieValue,
        configurable: true,
      });

      saveStopwatchesToCookies([]);

      expect(cookieValue).toContain('stopwatches=');
      const encodedData = cookieValue.split('stopwatches=')[1].split(';')[0];
      const decodedData = decodeURIComponent(encodedData);
      const parsedData = JSON.parse(decodedData);

      expect(parsedData).toEqual([]);
    });

    it('should handle JSON.stringify error gracefully', () => {
      const circularObject: Record<string, unknown> = {};
      circularObject.self = circularObject;

      const originalStringify = JSON.stringify;
      JSON.stringify = vi.fn().mockImplementation(() => {
        throw new Error('Circular reference');
      });

      expect(() =>
        saveStopwatchesToCookies([circularObject as unknown as Stopwatch])
      ).not.toThrow();
      expect(mockConsoleError).toHaveBeenCalledWith(
        'Błąd podczas zapisywania stoperów do cookies:',
        expect.any(Error)
      );

      JSON.stringify = originalStringify;
    });

    it('should handle document.cookie setter error', () => {
      const mockStopwatches: Stopwatch[] = [
        {
          id: '1',
          name: 'Test',
          targetDate: new Date(),
          status: 'active',
          createdAt: new Date(),
        },
      ];

      Object.defineProperty(document, 'cookie', {
        set: () => {
          throw new Error('Cookie write error');
        },
        configurable: true,
      });

      expect(() => saveStopwatchesToCookies(mockStopwatches)).not.toThrow();
      expect(mockConsoleError).toHaveBeenCalledWith(
        'Błąd podczas zapisywania stoperów do cookies:',
        expect.any(Error)
      );
    });
  });

  describe('loadStopwatchesFromCookies', () => {
    it('should load stopwatches from cookies correctly', () => {
      const mockStopwatches = [
        {
          id: '1',
          name: 'Test Stoper',
          targetDate: '2024-12-31T23:59:59.000Z',
          status: 'active' as const,
          createdAt: '2024-01-01T00:00:00.000Z',
        },
      ];

      const cookieData = JSON.stringify(mockStopwatches);
      const encodedData = encodeURIComponent(cookieData);

      document.cookie = `stopwatches=${encodedData}; path=/; max-age=31536000`;

      const result = loadStopwatchesFromCookies();

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('1');
      expect(result[0].name).toBe('Test Stoper');
      expect(result[0].targetDate).toBeInstanceOf(Date);
      expect(result[0].createdAt).toBeInstanceOf(Date);
      expect(result[0].status).toBe('active');
    });

    it('should return empty array when no cookies exist', () => {
      document.cookie = '';

      const result = loadStopwatchesFromCookies();

      expect(result).toEqual([]);
    });

    it('should return empty array when stopwatches cookie does not exist', () => {
      document.cookie = 'otherCookie=value; path=/';

      const result = loadStopwatchesFromCookies();

      expect(result).toEqual([]);
    });

    it('should handle malformed cookie data gracefully', () => {
      document.cookie = 'stopwatches=invalid-json-data; path=/';

      const result = loadStopwatchesFromCookies();

      expect(result).toEqual([]);
      expect(mockConsoleError).toHaveBeenCalledWith(
        'Błąd podczas wczytywania stoperów z cookies:',
        expect.any(Error)
      );
    });

    it('should handle URL decode error gracefully', () => {
      document.cookie = 'stopwatches=%invalid-url-encoded; path=/';

      const result = loadStopwatchesFromCookies();

      expect(result).toEqual([]);
      expect(mockConsoleError).toHaveBeenCalledWith(
        'Błąd podczas wczytywania stoperów z cookies:',
        expect.any(Error)
      );
    });

    it('should handle invalid date strings gracefully', () => {
      const mockStopwatches = [
        {
          id: '1',
          name: 'Test',
          targetDate: 'invalid-date',
          status: 'active' as const,
          createdAt: 'invalid-date',
        },
      ];

      const cookieData = JSON.stringify(mockStopwatches);
      const encodedData = encodeURIComponent(cookieData);

      document.cookie = `stopwatches=${encodedData}; path=/`;

      const result = loadStopwatchesFromCookies();

      expect(result).toHaveLength(1);
      expect(result[0].targetDate).toBeInstanceOf(Date);
      expect(result[0].createdAt).toBeInstanceOf(Date);
      expect(isNaN(result[0].targetDate.getTime())).toBe(true);
      expect(isNaN(result[0].createdAt.getTime())).toBe(true);
    });

    it('should handle multiple stopwatches correctly', () => {
      const mockStopwatches = [
        {
          id: '1',
          name: 'Stoper 1',
          targetDate: '2024-12-31T23:59:59.000Z',
          status: 'active' as const,
          createdAt: '2024-01-01T00:00:00.000Z',
        },
        {
          id: '2',
          name: 'Stoper 2',
          targetDate: '2024-06-15T12:00:00.000Z',
          status: 'paused' as const,
          createdAt: '2024-01-02T00:00:00.000Z',
        },
      ];

      const cookieData = JSON.stringify(mockStopwatches);
      const encodedData = encodeURIComponent(cookieData);

      document.cookie = `stopwatches=${encodedData}; path=/`;

      const result = loadStopwatchesFromCookies();

      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('Stoper 1');
      expect(result[1].name).toBe('Stoper 2');
      expect(result[0].status).toBe('active');
      expect(result[1].status).toBe('paused');
    });

    it('should handle cookie with additional properties', () => {
      const mockStopwatches = [
        {
          id: '1',
          name: 'Test',
          targetDate: '2024-12-31T23:59:59.000Z',
          status: 'active' as const,
          createdAt: '2024-01-01T00:00:00.000Z',
          completedAt: '2024-12-31T23:59:59.000Z',
        },
      ];

      const cookieData = JSON.stringify(mockStopwatches);
      const encodedData = encodeURIComponent(cookieData);

      document.cookie = `stopwatches=${encodedData}; path=/`;

      const result = loadStopwatchesFromCookies();

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('1');
      // Additional properties should be preserved as strings (not converted to Date)
      expect(
        (result[0] as Stopwatch & { completedAt: string }).completedAt
      ).toBe('2024-12-31T23:59:59.000Z');
    });
  });

  describe('clearStopwatchesFromCookies', () => {
    it('should clear stopwatches cookie correctly', () => {
      document.cookie = 'stopwatches=some-data; path=/; max-age=31536000';
      expect(document.cookie).toContain('stopwatches=');

      clearStopwatchesFromCookies();

      expect(document.cookie).not.toContain('stopwatches=some-data');
    });

    it('should handle document.cookie setter error gracefully', () => {
      Object.defineProperty(document, 'cookie', {
        set: () => {
          throw new Error('Cookie clear error');
        },
        configurable: true,
      });

      expect(() => clearStopwatchesFromCookies()).not.toThrow();
      expect(mockConsoleError).toHaveBeenCalledWith(
        'Błąd podczas czyszczenia cookies:',
        expect.any(Error)
      );
    });

    it('should work when no stopwatches cookie exists', () => {
      document.cookie = 'otherCookie=value; path=/';

      expect(() => clearStopwatchesFromCookies()).not.toThrow();
    });
  });

  describe('Integration tests', () => {
    it('should save and load stopwatches correctly', () => {
      const originalStopwatches: Stopwatch[] = [
        {
          id: '1',
          name: 'Integration Test',
          targetDate: new Date('2024-12-31T23:59:59'),
          status: 'active',
          createdAt: new Date('2024-01-01T00:00:00'),
        },
      ];

      saveStopwatchesToCookies(originalStopwatches);

      const loadedStopwatches = loadStopwatchesFromCookies();

      expect(loadedStopwatches).toHaveLength(1);
      expect(loadedStopwatches[0].id).toBe(originalStopwatches[0].id);
      expect(loadedStopwatches[0].name).toBe(originalStopwatches[0].name);
      expect(loadedStopwatches[0].status).toBe(originalStopwatches[0].status);

      expect(loadedStopwatches[0].targetDate).toBeInstanceOf(Date);
      expect(loadedStopwatches[0].createdAt).toBeInstanceOf(Date);
    });

    it('should handle save, load, and clear cycle', () => {
      const stopwatches: Stopwatch[] = [
        {
          id: '1',
          name: 'Cycle Test',
          targetDate: new Date(),
          status: 'active',
          createdAt: new Date(),
        },
      ];

      saveStopwatchesToCookies(stopwatches);
      expect(loadStopwatchesFromCookies()).toHaveLength(1);

      clearStopwatchesFromCookies();
      expect(loadStopwatchesFromCookies()).toHaveLength(0);
    });
  });
});
