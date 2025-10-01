import { describe, it, expect, beforeEach, vi } from 'vitest';
import { generateShortId } from '../../src/utils/generateId';

describe('generateShortId', () => {
  beforeEach(() => {
    // Reset Date.now and Math.random mocks before each test
    vi.restoreAllMocks();
  });

  it('should generate a unique ID with default prefix', () => {
    const id = generateShortId();
    expect(id).toMatch(/^item-[\w]+-[\w]+$/);
  });

  it('should generate an ID with custom prefix', () => {
    const customPrefix = 'test';
    const id = generateShortId(customPrefix);
    expect(id).toMatch(/^test-[\w]+-[\w]+$/);
  });

  it('should generate different IDs on multiple calls', () => {
    const id1 = generateShortId();
    const id2 = generateShortId();
    expect(id1).not.toBe(id2);
  });

  it('should handle empty prefix gracefully', () => {
    const id = generateShortId('');
    expect(id).toMatch(/^-[\w]+-[\w]+$/);
  });

  it('should generate ID with timestamp component', () => {
    const mockTimestamp = 1640995200000; // January 1, 2022
    vi.spyOn(Date, 'now').mockReturnValue(mockTimestamp);

    const id = generateShortId('test');
    const timestampBase36 = mockTimestamp.toString(36);
    expect(id).toContain(timestampBase36);
  });

  it('should generate ID with random component', () => {
    const mockRandom = 0.123456789;
    vi.spyOn(Math, 'random').mockReturnValue(mockRandom);

    const id = generateShortId('test');
    const randomComponent = mockRandom.toString(36).substr(2, 5);
    expect(id).toContain(randomComponent);
  });

  it('should create predictable ID when both timestamp and random are mocked', () => {
    const mockTimestamp = 1640995200000;
    const mockRandom = 0.123456789;

    vi.spyOn(Date, 'now').mockReturnValue(mockTimestamp);
    vi.spyOn(Math, 'random').mockReturnValue(mockRandom);

    const id = generateShortId('test');
    const expectedTimestamp = mockTimestamp.toString(36);
    const expectedRandom = mockRandom.toString(36).substr(2, 5);
    const expectedId = `test-${expectedTimestamp}-${expectedRandom}`;

    expect(id).toBe(expectedId);
  });
});
