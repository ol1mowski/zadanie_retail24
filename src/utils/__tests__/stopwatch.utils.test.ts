import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  formatTime,
  calculateTimeLeft,
  generateStopwatchId,
  validateStopwatchData,
  isStopwatchCompleted,
  formatDate,
} from '../stopwatch.utils';
import type { Stopwatch, StopwatchFormData } from '../../types/stopwatch.type';

describe('stopwatch.utils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('formatTime', () => {
    it('should format zero milliseconds correctly', () => {
      expect(formatTime(0)).toBe('00:00:00:000');
    });

    it('should format negative milliseconds correctly', () => {
      expect(formatTime(-1000)).toBe('00:00:00:000');
    });

    it('should format milliseconds correctly', () => {
      expect(formatTime(1234)).toBe('00:00:01:234');
    });

    it('should format seconds correctly', () => {
      expect(formatTime(65000)).toBe('00:01:05:000');
    });

    it('should format minutes correctly', () => {
      expect(formatTime(3661000)).toBe('01:01:01:000');
    });

    it('should format hours correctly', () => {
      expect(formatTime(7323000)).toBe('02:02:03:000');
    });

    it('should format days correctly', () => {
      const oneDay = 24 * 60 * 60 * 1000;
      const oneHour = 60 * 60 * 1000;
      const oneMinute = 60 * 1000;
      const oneSecond = 1000;

      const time = oneDay + oneHour + oneMinute + oneSecond;
      expect(formatTime(time)).toBe('01:01:01:01');
    });

    it('should handle edge cases with exact values', () => {
      expect(formatTime(1000)).toBe('00:00:01:000');
      expect(formatTime(60000)).toBe('00:01:00:000');
      expect(formatTime(3600000)).toBe('01:00:00:000');
    });

    it('should handle large values', () => {
      const largeTime =
        999 * 24 * 60 * 60 * 1000 +
        23 * 60 * 60 * 1000 +
        59 * 60 * 1000 +
        59 * 1000;
      expect(formatTime(largeTime)).toBe('999:23:59:59');
    });
  });

  describe('calculateTimeLeft', () => {
    it('should calculate time left correctly for future date', () => {
      const futureDate = new Date(Date.now() + 1000); // 1 second in future
      const result = calculateTimeLeft(futureDate);

      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThanOrEqual(1000);
    });

    it('should return zero for past date', () => {
      const pastDate = new Date(Date.now() - 1000); // 1 second in past
      const result = calculateTimeLeft(pastDate);

      expect(result).toBe(0);
    });

    it('should return zero for current date', () => {
      const currentDate = new Date();
      const result = calculateTimeLeft(currentDate);

      expect(result).toBe(0);
    });

    it('should handle exact time differences', () => {
      const futureDate = new Date(Date.now() + 5000); // 5 seconds in future
      const result = calculateTimeLeft(futureDate);

      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThanOrEqual(5000);
    });

    it('should handle very large time differences', () => {
      const futureDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 year in future
      const result = calculateTimeLeft(futureDate);

      expect(result).toBeGreaterThan(0);
      expect(result).toBeCloseTo(365 * 24 * 60 * 60 * 1000, -2);
    });
  });

  describe('generateStopwatchId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateStopwatchId();
      const id2 = generateStopwatchId();

      expect(id1).not.toBe(id2);
    });

    it('should generate IDs with correct format', () => {
      const id = generateStopwatchId();

      expect(id).toMatch(/^stopwatch_\d+_[a-z0-9]{9}$/);
    });

    it('should include timestamp in ID', () => {
      const before = Date.now();
      const id = generateStopwatchId();
      const after = Date.now();

      const timestamp = parseInt(id.split('_')[1]);
      expect(timestamp).toBeGreaterThanOrEqual(before);
      expect(timestamp).toBeLessThanOrEqual(after);
    });

    it('should generate multiple unique IDs', () => {
      const ids = new Set();
      for (let i = 0; i < 100; i++) {
        ids.add(generateStopwatchId());
      }

      expect(ids.size).toBe(100);
    });
  });

  describe('validateStopwatchData', () => {
    it('should validate correct data', () => {
      const validData: StopwatchFormData = {
        name: 'Test Stoper',
        targetDate: new Date(Date.now() + 1000),
      };

      const result = validateStopwatchData(validData);

      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    it('should reject empty name', () => {
      const invalidData: StopwatchFormData = {
        name: '',
        targetDate: new Date(Date.now() + 1000),
      };

      const result = validateStopwatchData(invalidData);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Nazwa stopera jest wymagana');
    });

    it('should reject whitespace-only name', () => {
      const invalidData: StopwatchFormData = {
        name: '   ',
        targetDate: new Date(Date.now() + 1000),
      };

      const result = validateStopwatchData(invalidData);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Nazwa stopera jest wymagana');
    });

    it('should reject name longer than 50 characters', () => {
      const invalidData: StopwatchFormData = {
        name: 'A'.repeat(51),
        targetDate: new Date(Date.now() + 1000),
      };

      const result = validateStopwatchData(invalidData);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        'Nazwa stopera nie może być dłuższa niż 50 znaków'
      );
    });

    it('should accept name with exactly 50 characters', () => {
      const validData: StopwatchFormData = {
        name: 'A'.repeat(50),
        targetDate: new Date(Date.now() + 1000),
      };

      const result = validateStopwatchData(validData);

      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    it('should reject missing target date', () => {
      const invalidData = {
        name: 'Test Stoper',
        targetDate: null,
      } as unknown as StopwatchFormData;

      const result = validateStopwatchData(invalidData);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Data docelowa jest wymagana');
    });

    it('should reject past target date', () => {
      const invalidData: StopwatchFormData = {
        name: 'Test Stoper',
        targetDate: new Date(Date.now() - 1000),
      };

      const result = validateStopwatchData(invalidData);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Data docelowa musi być w przyszłości');
    });

    it('should reject current target date', () => {
      const invalidData: StopwatchFormData = {
        name: 'Test Stoper',
        targetDate: new Date(),
      };

      const result = validateStopwatchData(invalidData);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Data docelowa musi być w przyszłości');
    });

    it('should handle multiple validation errors', () => {
      const invalidData = {
        name: '',
        targetDate: new Date(Date.now() - 1000),
      } as unknown as StopwatchFormData;

      const result = validateStopwatchData(invalidData);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Nazwa stopera jest wymagana');
      expect(result.errors).toContain('Data docelowa musi być w przyszłości');
      expect(result.errors).toHaveLength(2);
    });

    it('should accept future target date', () => {
      const validData: StopwatchFormData = {
        name: 'Test Stoper',
        targetDate: new Date(Date.now() + 1000),
      };

      const result = validateStopwatchData(validData);

      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    it('should handle edge case with very small future time', () => {
      const validData: StopwatchFormData = {
        name: 'Test Stoper',
        targetDate: new Date(Date.now() + 1),
      };

      const result = validateStopwatchData(validData);

      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual([]);
    });
  });

  describe('isStopwatchCompleted', () => {
    it('should return true for completed stopwatch', () => {
      const completedStopwatch: Stopwatch = {
        id: '1',
        name: 'Completed Stoper',
        targetDate: new Date(Date.now() - 1000),
        status: 'active',
        createdAt: new Date(),
      };

      const result = isStopwatchCompleted(completedStopwatch);

      expect(result).toBe(true);
    });

    it('should return false for active stopwatch', () => {
      const activeStopwatch: Stopwatch = {
        id: '1',
        name: 'Active Stoper',
        targetDate: new Date(Date.now() + 1000),
        status: 'active',
        createdAt: new Date(),
      };

      const result = isStopwatchCompleted(activeStopwatch);

      expect(result).toBe(false);
    });

    it('should return false for paused stopwatch with future date', () => {
      const pausedStopwatch: Stopwatch = {
        id: '1',
        name: 'Paused Stoper',
        targetDate: new Date(Date.now() + 1000),
        status: 'paused',
        createdAt: new Date(),
      };

      const result = isStopwatchCompleted(pausedStopwatch);

      expect(result).toBe(false);
    });

    it('should return true for paused stopwatch with past date', () => {
      const pausedStopwatch: Stopwatch = {
        id: '1',
        name: 'Paused Stoper',
        targetDate: new Date(Date.now() - 1000),
        status: 'paused',
        createdAt: new Date(),
      };

      const result = isStopwatchCompleted(pausedStopwatch);

      expect(result).toBe(true);
    });

    it('should handle exact current time', () => {
      const currentStopwatch: Stopwatch = {
        id: '1',
        name: 'Current Stoper',
        targetDate: new Date(),
        status: 'active',
        createdAt: new Date(),
      };

      const result = isStopwatchCompleted(currentStopwatch);

      expect(result).toBe(true);
    });

    it('should handle very small time differences', () => {
      const almostCompletedStopwatch: Stopwatch = {
        id: '1',
        name: 'Almost Completed Stoper',
        targetDate: new Date(Date.now() - 1),
        status: 'active',
        createdAt: new Date(),
      };

      const result = isStopwatchCompleted(almostCompletedStopwatch);

      expect(result).toBe(true);
    });
  });

  describe('formatDate', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2024-01-15T12:30:45.123Z'));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should format date correctly', () => {
      const date = new Date('2024-01-15T12:30:45.123Z');
      const result = formatDate(date);

      expect(result).toMatch(/^\d{2}\.\d{2}\.\d{4}, \d{2}:\d{2}$/);
    });

    it('should handle different dates', () => {
      const date1 = new Date('2023-12-31T23:59:59.999Z');
      const date2 = new Date('2024-02-29T00:00:00.000Z');

      expect(formatDate(date1)).toMatch(/^\d{2}\.\d{2}\.\d{4}, \d{2}:\d{2}$/);
      expect(formatDate(date2)).toMatch(/^\d{2}\.\d{2}\.\d{4}, \d{2}:\d{2}$/);
    });

    it('should handle edge cases', () => {
      const date1 = new Date('2024-01-01T00:00:00.000Z');
      const date2 = new Date('2024-12-31T23:59:59.999Z');

      expect(formatDate(date1)).toMatch(/^\d{2}\.\d{2}\.\d{4}, \d{2}:\d{2}$/);
      expect(formatDate(date2)).toMatch(/^\d{2}\.\d{2}\.\d{4}, \d{2}:\d{2}$/);
    });

    it('should use Polish locale', () => {
      const date = new Date('2024-01-15T12:30:45.123Z');
      const result = formatDate(date);

      expect(result).toMatch(/^\d{2}\.\d{2}\.\d{4}, \d{2}:\d{2}$/);
    });

    it('should handle leap year dates', () => {
      const leapYearDate = new Date('2024-02-29T15:30:00.000Z');
      const result = formatDate(leapYearDate);

      expect(result).toMatch(/^\d{2}\.\d{2}\.\d{4}, \d{2}:\d{2}$/);
    });
  });

  describe('Integration tests', () => {
    it('should work together for a complete stopwatch lifecycle', () => {
      const stopwatchId = generateStopwatchId();
      const targetDate = new Date(Date.now() + 5000);

      const stopwatch: Stopwatch = {
        id: stopwatchId,
        name: 'Integration Test Stoper',
        targetDate,
        status: 'active',
        createdAt: new Date(),
      };

      const validation = validateStopwatchData({
        name: stopwatch.name,
        targetDate: stopwatch.targetDate,
      });
      expect(validation.isValid).toBe(true);

      expect(isStopwatchCompleted(stopwatch)).toBe(false);

      const timeLeft = calculateTimeLeft(stopwatch.targetDate);
      expect(timeLeft).toBeGreaterThan(0);
      expect(timeLeft).toBeLessThanOrEqual(5000);

      const formattedTime = formatTime(timeLeft);
      expect(formattedTime).toMatch(/^\d{2}:\d{2}:\d{2}:\d{3}$/);

      const formattedDate = formatDate(stopwatch.targetDate);
      expect(formattedDate).toMatch(/^\d{2}\.\d{2}\.\d{4}, \d{2}:\d{2}$/);
    });

    it('should handle completed stopwatch scenario', () => {
      const stopwatch: Stopwatch = {
        id: generateStopwatchId(),
        name: 'Completed Test Stoper',
        targetDate: new Date(Date.now() - 1000),
        status: 'active',
        createdAt: new Date(),
      };

      expect(isStopwatchCompleted(stopwatch)).toBe(true);

      const timeLeft = calculateTimeLeft(stopwatch.targetDate);
      expect(timeLeft).toBe(0);

      const formattedTime = formatTime(timeLeft);
      expect(formattedTime).toBe('00:00:00:000');
    });
  });
});
