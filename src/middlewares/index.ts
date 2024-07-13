import type { Express, Request, Response } from 'express';
import cors from 'cors';
import { json, urlencoded } from 'express';
import { sendApiFailedResponse } from '@helpers/apiHelpers';
import { ResponseCodeEnum, ResponseStatusEnum } from 'zaions-tool-kit';
import { rateLimit } from 'express-rate-limit';
import { IApplyMiddlewareOptions } from 'src/types';
import { getExpressRateLimiterOptions } from '@helpers/middlewareHelpers';

const _rateLimiterOptions = getExpressRateLimiterOptions();

const limiter = rateLimit({
	windowMs: _rateLimiterOptions?.windowMs ?? 15 * 60 * 1000, // 15 minutes
	limit: _rateLimiterOptions?.limit ?? 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: _rateLimiterOptions?.standardHeaders ?? 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: _rateLimiterOptions?.legacyHeaders ?? false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
});

export const applyMiddlewaresOnApp = (
	expressApp: Express,
	{
		applyCors,
		expressJson,
		expressUrlEncoded,
		applyRateLimiter = true,
		expressRateLimiter,
	}: IApplyMiddlewareOptions
) => {
	if (applyRateLimiter) {
		if (expressRateLimiter) {
			expressApp.use(expressRateLimiter);
		} else {
			expressApp.use(limiter);
		}
	}

	if (applyCors) {
		expressApp.use(cors());
	}

	if (expressUrlEncoded) {
		expressApp.use(urlencoded());
	}

	if (expressJson) {
		expressApp.use(json());
	}
};

export const invalidRequestHandler = (app: Express) => {
	app.use('*', (_: Request, res: Response) => {
		sendApiFailedResponse(res, {
			code: ResponseCodeEnum.invalidRequest,
			status: ResponseStatusEnum.invalidRequest,
		});
	});
};
