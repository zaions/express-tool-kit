import type { Response } from 'express';

export const isApiResponse = (value: any): value is Response => {
  return !!(
    value &&
    typeof value === 'object' &&
    'statusCode' in value &&
    'statusMessage' in value
  );
};
