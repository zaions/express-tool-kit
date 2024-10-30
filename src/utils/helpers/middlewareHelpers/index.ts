import { IExpressRateLimiterOptions } from '@zTypes/generic';

let _rateLimiterOptions: IExpressRateLimiterOptions | null = null;

export const getExpressRateLimiterOptions =
  (): IExpressRateLimiterOptions | null => {
    return _rateLimiterOptions;
  };

export const setExpressRateLimiterOptions = (
  _options: IExpressRateLimiterOptions
): void => {
  _rateLimiterOptions = { ..._options };
};
