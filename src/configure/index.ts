import { setExpressRateLimiterOptions, setExpressCorsOptions } from '@helpers/middlewareHelpers';
import { IConfigureZETKOptions, IConfigureExpressBuildKitOptions } from '@zTypes/generic';

export const configureZETK = (options: IConfigureZETKOptions): void => {
  configureExpressBuildKit(options);
};

export const configureExpressBuildKit = (options: IConfigureExpressBuildKitOptions): void => {
  const { rateLimiterOptions, corsOptions } = options;

  if (rateLimiterOptions) {
    setExpressRateLimiterOptions(rateLimiterOptions);
  }

  if (corsOptions) {
    setExpressCorsOptions(corsOptions);
  }
};
