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

    it('should format seconds correctly', () => {
      expect(formatTime(65000)).toBe('00:01:05:000');
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
  });

  describe('calculateTimeLeft', () => {
    it('should calculate time left correctly for future date', () => {
      const futureDate = new Date(Date.now() + 1000);
      const result = calculateTimeLeft(futureDate);

      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThanOrEqual(1000);
    });

    it('should return zero for past date', () => {
      const pastDate = new Date(Date.now() - 1000);
      const result = calculateTimeLeft(pastDate);

      expect(result).toBe(0);
    });

    it('should return zero for current date', () => {
      const currentDate = new Date();
      const result = calculateTimeLeft(currentDate);

      expect(result).toBe(0);
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

    it('should reject past target date', () => {
      const invalidData: StopwatchFormData = {
        name: 'Test Stoper',
        targetDate: new Date(Date.now() - 1000),
      };

      const result = validateStopwatchData(invalidData);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Data docelowa musi być w przyszłości');
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

    it('should use Polish locale', () => {
      const date = new Date('2024-01-15T12:30:45.123Z');
      const result = formatDate(date);

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
  });
});
