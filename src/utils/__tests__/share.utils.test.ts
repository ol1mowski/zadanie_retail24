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
      expect(parsed.targetDate).toBe(mockStopwatch.targetDate.toISOString());
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
      expect(result.status).toBe('active');
      expect(result.targetDate).toBeInstanceOf(Date);
      expect(result.createdAt).toBeInstanceOf(Date);
      expect(result.targetDate.getTime()).toBe(
        mockStopwatch.targetDate.getTime()
      );
      // createdAt jest generowane na nowo, więc sprawdzamy tylko że jest Date
      expect(result.createdAt.getTime()).toBeGreaterThan(0);
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
  });

  describe('isValidStopwatchData', () => {
    it('should validate correct stopwatch data', () => {
      const validData = {
        id: 'test-id',
        name: 'Test Name',
        targetDate: '2024-12-31T23:59:59.000Z',
      };

      expect(isValidStopwatchData(validData)).toBe(true);
    });

    it('should reject invalid data types', () => {
      expect(isValidStopwatchData(null)).toBe(false);
      expect(isValidStopwatchData(undefined)).toBe(false);
      expect(isValidStopwatchData('string')).toBe(false);
    });

    it('should reject missing required fields', () => {
      const invalidData = {
        id: 'test-id',
        name: 'Test Name',
      };

      expect(isValidStopwatchData(invalidData)).toBe(false);
    });

    it('should reject name too long', () => {
      const invalidData = {
        id: 'test-id',
        name: 'A'.repeat(51), // 51 znaków - za długie
        targetDate: '2024-12-31T23:59:59.000Z',
      };

      expect(isValidStopwatchData(invalidData)).toBe(false);
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
      const customBaseUrl = 'https://example.com';
      const result = generateShareLink(mockStopwatch, customBaseUrl);

      expect(result).toContain('https://example.com/stopwatch/');
      expect(result).toContain(mockStopwatch.id);
      expect(result).toContain('?data=');

      const url = new URL(result);
      const encodedData = url.searchParams.get('data');
      expect(encodedData).toBeTruthy();

      const decoded = decodeStopwatchData(encodedData!);
      expect(decoded.id).toBe(mockStopwatch.id);
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

    it('should return null for URL without data parameter', () => {
      const url = `https://example.com/stopwatch/${mockStopwatch.id}`;
      expect(parseShareUrl(url)).toBeNull();
    });
  });

  describe('validateShareUrl', () => {
    beforeEach(() => {
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
      expect(decoded.status).toBe('active');
      expect(decoded.targetDate.getTime()).toBe(
        mockStopwatch.targetDate.getTime()
      );
      expect(decoded.createdAt.getTime()).toBeGreaterThan(0);
    });
  });
});
