import { sendApiFailedResponse } from '@helpers/apiHelpers';
import { getExpressRateLimiterOptions } from '@helpers/middlewareHelpers';
import cors from 'cors';
import type { Express, Request, Response } from 'express';
import { json, urlencoded } from 'express';
import { rateLimit } from 'express-rate-limit';
import { IApplyMiddlewareOptions } from 'src/types';
import { ResponseCodeEnum, ResponseStatusEnum } from 'zaions-tool-kit';

const _rateLimiterOptions = getExpressRateLimiterOptions();

const limiter = rateLimit({
  windowMs: _rateLimiterOptions?.windowMs ?? 15 * 60 * 1000, // 15 minutes
  limit: _rateLimiterOptions?.limit ?? 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: _rateLimiterOptions?.standardHeaders ?? 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: _rateLimiterOptions?.legacyHeaders ?? false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
  keyGenerator: (req) => {
    // Use the IP from the 'X-Forwarded-For' header or the remote address if not available
    const ip = req.headers
      ? req.headers['x-forwarded-for']
      : req.socket.remoteAddress;
    return ip ? ip.toString() : '';
  },
  handler: (_, res /*next*/) => {
    return res.status(429).json({
      error: 'Too many requests, please try again later.',
    });
  },
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
): void => {
  if (applyRateLimiter) {
    if (expressRateLimiter) {
      expressApp.use(expressRateLimiter);
    } else {
      expressApp.use(limiter);
    }
  }

  if (applyCors) {
    expressApp.use(
      cors({
        origin: '*',
      })
    );
  }

  if (expressUrlEncoded) {
    expressApp.use(urlencoded());
  }

  if (expressJson) {
    expressApp.use(json());
  }
};

export const invalidRequestHandler = (app: Express): void => {
  app.use(/(.*)/, (_: Request, res: Response) => {
    sendApiFailedResponse(res, {
      code: ResponseCodeEnum.invalidRequest,
      status: ResponseStatusEnum.invalidRequest,
    });
  });
};
