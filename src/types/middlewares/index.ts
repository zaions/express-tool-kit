import { RateLimitRequestHandler } from 'express-rate-limit';
import type { CorsOptions } from 'cors';

export interface IApplyMiddlewareOptions {
	applyCors?: boolean;
	corsOptions?: CorsOptions;
	expressJson?: boolean;
	expressUrlEncoded?: boolean;
	applyRateLimiter?: boolean;
	expressRateLimiter?: RateLimitRequestHandler;
}
