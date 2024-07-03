import { RateLimitRequestHandler } from 'express-rate-limit';

export interface IApplyMiddlewareOptions {
	applyCors?: boolean;
	expressJson?: boolean;
	expressUrlEncoded?: boolean;
	applyRateLimiter?: boolean;
	expressRateLimiter?: RateLimitRequestHandler;
}
