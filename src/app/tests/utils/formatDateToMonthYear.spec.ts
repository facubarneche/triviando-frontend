import { formatDateToMonthYear } from '../../utils/formatDateToMonthYear';
import { handleError } from '../../utils/errorHandler';

jest.mock('../../utils/errorHandler', () => ({
  handleError: jest.fn(),
}));

describe('formatDateToMonthYear', () => {
  it('should format a valid ISO date to "Marzo 2023"', () => {
    expect(formatDateToMonthYear('2023-03-15')).toBe('Marzo 2023');
  });

  it('should format a valid ISO date with time to "Enero 2022"', () => {
    expect(formatDateToMonthYear('2022-01-10T12:34:56Z')).toBe('Enero 2022');
  });

  it('should return empty string for empty input', () => {
    expect(formatDateToMonthYear('')).toBe('');
  });

  it('should return empty string for invalid date', () => {
    expect(formatDateToMonthYear('invalid-date')).toBe('');
  });

  it('should format a date in May', () => {
    expect(formatDateToMonthYear('2020-05-20')).toBe('Mayo 2020');
  });

  it('should handle null input gracefully', () => {
    // @ts-expect-error testing null input
    expect(formatDateToMonthYear(null)).toBe('');
  });

  it('should handle undefined input gracefully', () => {
    // @ts-expect-error testing undefined input
    expect(formatDateToMonthYear(undefined)).toBe('');
  });
  it('should call handleError if an exception is thrown', () => {
    const originalDate = global.Date;
    // Force Date constructor to throw
    // @ts-expect-error: Intentionally override Date constructor for test
    global.Date = () => {
      throw new Error('Test error');
    };
    expect(formatDateToMonthYear('2023-03-15')).toBe('');
    expect(handleError).toHaveBeenCalled();
    global.Date = originalDate;
  });
});
