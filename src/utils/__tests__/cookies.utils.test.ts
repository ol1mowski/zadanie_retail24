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

    it('should handle malformed cookie data gracefully', () => {
      document.cookie = 'stopwatches=invalid-json-data; path=/';

      const result = loadStopwatchesFromCookies();

      expect(result).toEqual([]);
      expect(mockConsoleError).toHaveBeenCalledWith(
        'Błąd podczas wczytywania stoperów z cookies:',
        expect.any(Error)
      );
    });
  });

  describe('clearStopwatchesFromCookies', () => {
    it('should clear stopwatches cookie correctly', () => {
      document.cookie = 'stopwatches=some-data; path=/; max-age=31536000';
      expect(document.cookie).toContain('stopwatches=');

      clearStopwatchesFromCookies();

      expect(document.cookie).not.toContain('stopwatches=some-data');
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
  });
});
