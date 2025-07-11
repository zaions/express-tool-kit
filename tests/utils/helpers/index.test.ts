import { describe, it, expect } from 'vitest';
import { isApiResponse } from '../../../src/utils/helpers/genericHelpers';

describe('isApiResponse', () => {
  it('should return true for Response-like objects', () => {
    const mockResponse = {
      statusCode: 200,
      statusMessage: 'OK',
      json: () => {},
      send: () => {},
    };
    
    expect(isApiResponse(mockResponse)).toBe(true);
  });

  it('should return false for non-Response objects', () => {
    expect(isApiResponse(null)).toBe(false);
    expect(isApiResponse(undefined)).toBe(false);
    expect(isApiResponse({})).toBe(false);
    expect(isApiResponse('string')).toBe(false);
    expect(isApiResponse(123)).toBe(false);
    expect(isApiResponse({ statusCode: 200 })).toBe(false); // missing statusMessage
    expect(isApiResponse({ statusMessage: 'OK' })).toBe(false); // missing statusCode
  });
});