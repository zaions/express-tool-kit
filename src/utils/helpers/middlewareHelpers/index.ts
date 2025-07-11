import { IExpressRateLimiterOptions, IExpressCorsOptions } from '@zTypes/generic';

let _rateLimiterOptions: IExpressRateLimiterOptions | null = null;
let _corsOptions: IExpressCorsOptions | null = null;

export const getExpressRateLimiterOptions =
  (): IExpressRateLimiterOptions | null => {
    return _rateLimiterOptions;
  };

export const setExpressRateLimiterOptions = (
  _options: IExpressRateLimiterOptions
): void => {
  _rateLimiterOptions = { ..._options };
};

export const getExpressCorsOptions = (): IExpressCorsOptions | null => {
  return _corsOptions;
};

export const setExpressCorsOptions = (
  _options: IExpressCorsOptions
): void => {
  _corsOptions = { ..._options };
};
