import { setExpressRateLimiterOptions } from '@helpers/middlewareHelpers';
import { IConfigureZETKOptions } from '@zTypes/generic';

export const configureZETK = (options: IConfigureZETKOptions): void => {
  const { rateLimiterOptions } = options;

  if (rateLimiterOptions) {
    setExpressRateLimiterOptions(rateLimiterOptions);
  }
};
