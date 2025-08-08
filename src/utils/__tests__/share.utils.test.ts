import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  encodeStopwatchData,
  decodeStopwatchData,
  isValidStopwatchData,
  generateShareLink,
  parseShareUrl,
  validateShareUrl,
} from '../share.utils';
import type { Stopwatch } from '../../types/stopwatch.type';

const mockConsoleError = vi.fn();

describe('share.utils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(mockConsoleError);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockStopwatch: Stopwatch = {
    id: 'test-stopwatch-123',
    name: 'Test Stoper',
    targetDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Jutro
    status: 'active',
    createdAt: new Date('2024-01-01T00:00:00.000Z'),
  };

  describe('encodeStopwatchData', () => {
    it('should encode stopwatch data correctly', () => {
      const result = encodeStopwatchData(mockStopwatch);

      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);

      const decoded = decodeURIComponent(atob(result));
      const parsed = JSON.parse(decoded);

      expect(parsed.id).toBe(mockStopwatch.id);
      expect(parsed.name).toBe(mockStopwatch.name);
      expect(parsed.status).toBe(mockStopwatch.status);
    });

    it('should handle encoding error gracefully', () => {
      const circularObject: Record<string, unknown> = {};
      circularObject.self = circularObject;

      expect(() =>
        encodeStopwatchData(circularObject as unknown as Stopwatch)
      ).toThrow('Nie udało się zakodować danych stopera');
      expect(mockConsoleError).toHaveBeenCalledWith(
        'Błąd podczas kodowania danych stopera:',
        expect.any(Error)
      );
    });
  });

  describe('decodeStopwatchData', () => {
    it('should decode stopwatch data correctly', () => {
      const encoded = encodeStopwatchData(mockStopwatch);
      const result = decodeStopwatchData(encoded);

      expect(result.id).toBe(mockStopwatch.id);
      expect(result.name).toBe(mockStopwatch.name);
      expect(result.status).toBe(mockStopwatch.status);
      expect(result.targetDate).toBeInstanceOf(Date);
      expect(result.createdAt).toBeInstanceOf(Date);
      expect(result.targetDate.getTime()).toBe(
        mockStopwatch.targetDate.getTime()
      );
      expect(result.createdAt.getTime()).toBe(
        mockStopwatch.createdAt.getTime()
      );
    });

    it('should handle invalid base64 data', () => {
      expect(() => decodeStopwatchData('invalid-base64')).toThrow(
        'Nie udało się zdekodować danych stopera'
      );
      expect(mockConsoleError).toHaveBeenCalledWith(
        'Błąd podczas dekodowania danych stopera:',
        expect.any(Error)
      );
    });

    it('should handle invalid JSON data', () => {
      const invalidJson = btoa('invalid-json');
      expect(() => decodeStopwatchData(invalidJson)).toThrow(
        'Nie udało się zdekodować danych stopera'
      );
    });

    it('should handle invalid stopwatch structure', () => {
      const invalidData = { invalid: 'data' };
      const encoded = btoa(encodeURIComponent(JSON.stringify(invalidData)));

      expect(() => decodeStopwatchData(encoded)).toThrow(
        'Nie udało się zdekodować danych stopera'
      );
    });
  });

  describe('isValidStopwatchData', () => {
    it('should validate correct stopwatch data', () => {
      const validData = {
        id: 'test-id',
        name: 'Test Name',
        targetDate: '2024-12-31T23:59:59.000Z',
        createdAt: '2024-01-01T00:00:00.000Z',
        status: 'active' as const,
      };

      expect(isValidStopwatchData(validData)).toBe(true);
    });

    it('should reject invalid data types', () => {
      expect(isValidStopwatchData(null)).toBe(false);
      expect(isValidStopwatchData(undefined)).toBe(false);
      expect(isValidStopwatchData('string')).toBe(false);
      expect(isValidStopwatchData(123)).toBe(false);
      expect(isValidStopwatchData([])).toBe(false);
    });

    it('should reject missing required fields', () => {
      const invalidData = {
        id: 'test-id',
        name: 'Test Name',
      };

      expect(isValidStopwatchData(invalidData)).toBe(false);
    });

    it('should reject invalid status values', () => {
      const invalidData = {
        id: 'test-id',
        name: 'Test Name',
        targetDate: '2024-12-31T23:59:59.000Z',
        createdAt: '2024-01-01T00:00:00.000Z',
        status: 'invalid-status',
      };

      expect(isValidStopwatchData(invalidData)).toBe(false);
    });

    it('should reject invalid date strings', () => {
      const invalidData = {
        id: 'test-id',
        name: 'Test Name',
        targetDate: 'invalid-date',
        createdAt: '2024-01-01T00:00:00.000Z',
        status: 'active' as const,
      };

      expect(isValidStopwatchData(invalidData)).toBe(false);
    });

    it('should accept both active and paused status', () => {
      const activeData = {
        id: 'test-id',
        name: 'Test Name',
        targetDate: '2024-12-31T23:59:59.000Z',
        createdAt: '2024-01-01T00:00:00.000Z',
        status: 'active' as const,
      };

      const pausedData = {
        id: 'test-id',
        name: 'Test Name',
        targetDate: '2024-12-31T23:59:59.000Z',
        createdAt: '2024-01-01T00:00:00.000Z',
        status: 'paused' as const,
      };

      expect(isValidStopwatchData(activeData)).toBe(true);
      expect(isValidStopwatchData(pausedData)).toBe(true);
    });
  });

  describe('generateShareLink', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'location', {
        value: {
          origin: 'https://example.com',
        },
        writable: true,
        configurable: true,
      });
    });

    it('should generate correct share link', () => {
      const result = generateShareLink(mockStopwatch);

      expect(result).toContain('https://example.com/stopwatch/');
      expect(result).toContain(mockStopwatch.id);
      expect(result).toContain('?data=');

      const url = new URL(result);
      const encodedData = url.searchParams.get('data');
      expect(encodedData).toBeTruthy();

      const decoded = decodeStopwatchData(encodedData!);
      expect(decoded.id).toBe(mockStopwatch.id);
    });

    it('should handle different origins', () => {
      Object.defineProperty(window, 'location', {
        value: {
          origin: 'http://localhost:3000',
        },
        writable: true,
        configurable: true,
      });

      const result = generateShareLink(mockStopwatch);
      expect(result).toContain('http://localhost:3000/stopwatch/');
    });
  });

  describe('parseShareUrl', () => {
    it('should parse valid share URL correctly', () => {
      const encodedData = encodeStopwatchData(mockStopwatch);
      const url = `https://example.com/stopwatch/${mockStopwatch.id}?data=${encodedData}`;

      const result = parseShareUrl(url);

      expect(result).toEqual({
        stopwatchId: mockStopwatch.id,
        encodedData,
      });
    });

    it('should return null for invalid URL', () => {
      expect(parseShareUrl('invalid-url')).toBeNull();
      expect(mockConsoleError).toHaveBeenCalledWith(
        'Błąd podczas parsowania URL:',
        expect.any(Error)
      );
    });

    it('should return null for URL without stopwatch path', () => {
      const url = 'https://example.com/something-else';
      expect(parseShareUrl(url)).toBeNull();
    });

    it('should return null for URL without data parameter', () => {
      const url = `https://example.com/stopwatch/${mockStopwatch.id}`;
      expect(parseShareUrl(url)).toBeNull();
    });

    it('should return null for URL without stopwatch ID', () => {
      const encodedData = encodeStopwatchData(mockStopwatch);
      const url = `https://example.com/stopwatch/?data=${encodedData}`;
      expect(parseShareUrl(url)).toBeNull();
    });

    it('should handle complex URL paths', () => {
      const encodedData = encodeStopwatchData(mockStopwatch);
      const url = `https://example.com/app/stopwatch/${mockStopwatch.id}?data=${encodedData}&other=param`;

      const result = parseShareUrl(url);

      expect(result).toEqual({
        stopwatchId: mockStopwatch.id,
        encodedData,
      });
    });
  });

  describe('validateShareUrl', () => {
    beforeEach(() => {
      // Mock window.location
      Object.defineProperty(window, 'location', {
        value: {
          origin: 'https://example.com',
        },
        writable: true,
        configurable: true,
      });
    });

    it('should validate correct share URL', () => {
      const encodedData = encodeStopwatchData(mockStopwatch);
      const url = `https://example.com/stopwatch/${mockStopwatch.id}?data=${encodedData}`;

      const result = validateShareUrl(url);

      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
      expect(result.errorType).toBeUndefined();
    });

    it('should reject URL without stopwatch path', () => {
      const url = 'https://example.com/something-else';

      const result = validateShareUrl(url);

      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Nieprawidłowy format linku udostępniania');
      expect(result.errorType).toBe('invalid_url');
    });

    it('should reject URL with invalid data', () => {
      const url = `https://example.com/stopwatch/${mockStopwatch.id}?data=invalid-data`;

      const result = validateShareUrl(url);

      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Dane stopera są uszkodzone lub nieprawidłowe');
      expect(result.errorType).toBe('invalid_data');
    });

    it('should reject URL with too short data', () => {
      const url = `https://example.com/stopwatch/${mockStopwatch.id}?data=short`;

      const result = validateShareUrl(url);

      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Dane stopera są nieprawidłowe lub uszkodzone');
      expect(result.errorType).toBe('invalid_data');
    });

    it('should reject URL with mismatched ID', () => {
      const encodedData = encodeStopwatchData(mockStopwatch);
      const url = `https://example.com/stopwatch/different-id?data=${encodedData}`;

      const result = validateShareUrl(url);

      expect(result.isValid).toBe(false);
      expect(result.error).toBe(
        'Dane stopera są nieprawidłowe - ID nie zgadza się'
      );
      expect(result.errorType).toBe('invalid_data');
    });

    it('should reject URL with expired stopwatch', () => {
      const expiredStopwatch: Stopwatch = {
        ...mockStopwatch,
        targetDate: new Date('2020-01-01T00:00:00.000Z'),
      };

      const encodedData = encodeStopwatchData(expiredStopwatch);
      const url = `https://example.com/stopwatch/${expiredStopwatch.id}?data=${encodedData}`;

      const result = validateShareUrl(url);

      expect(result.isValid).toBe(false);
      expect(result.error).toBe(
        'Ten stoper już się zakończył i nie może być udostępniony'
      );
      expect(result.errorType).toBe('invalid_data');
    });

    it('should reject invalid URL format', () => {
      const result = validateShareUrl('not-a-url');

      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Nieprawidłowy URL');
      expect(result.errorType).toBe('invalid_url');
    });

    it('should handle URL with additional parameters', () => {
      const encodedData = encodeStopwatchData(mockStopwatch);
      const url = `https://example.com/stopwatch/${mockStopwatch.id}?data=${encodedData}&utm_source=test&ref=123`;

      const result = validateShareUrl(url);

      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
      expect(result.errorType).toBeUndefined();
    });
  });

  describe('Integration tests', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'location', {
        value: {
          origin: 'https://example.com',
        },
        writable: true,
        configurable: true,
      });
    });

    it('should handle complete encode -> generate -> parse -> decode cycle', () => {
      const link = generateShareLink(mockStopwatch);

      const parsed = parseShareUrl(link);
      expect(parsed).toBeTruthy();

      const validation = validateShareUrl(link);
      expect(validation.isValid).toBe(true);

      const decoded = decodeStopwatchData(parsed!.encodedData);

      expect(decoded.id).toBe(mockStopwatch.id);
      expect(decoded.name).toBe(mockStopwatch.name);
      expect(decoded.status).toBe(mockStopwatch.status);
      expect(decoded.targetDate.getTime()).toBe(
        mockStopwatch.targetDate.getTime()
      );
      expect(decoded.createdAt.getTime()).toBe(
        mockStopwatch.createdAt.getTime()
      );
    });

    it('should handle stopwatch with completedAt property', () => {
      const stopwatchWithCompleted: Stopwatch = {
        ...mockStopwatch,
        completedAt: new Date('2024-12-31T23:59:59.000Z'),
      };

      const link = generateShareLink(stopwatchWithCompleted);
      const parsed = parseShareUrl(link);
      const decoded = decodeStopwatchData(parsed!.encodedData);

      expect(decoded.completedAt).toBe('2024-12-31T23:59:59.000Z');
    });
  });
});
