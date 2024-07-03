import { Options } from 'express-rate-limit';

export interface IExpressRateLimiterOptions extends Partial<Options> {}

export interface IConfigureZETKOptions {
	rateLimiterOptions?: IExpressRateLimiterOptions;
}
