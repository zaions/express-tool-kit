import { sendApiFailedResponse } from '@helpers/apiHelpers';
import { getExpressRateLimiterOptions, getExpressCorsOptions } from '@helpers/middlewareHelpers';
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
    // Improved IP detection with trust proxy support
    // Priority: 1. req.ip (respects trust proxy), 2. x-forwarded-for, 3. socket address
    let ip = req.ip;
    
    if (!ip && req.headers['x-forwarded-for']) {
      // Get first IP from comma-separated list
      const forwarded = req.headers['x-forwarded-for'];
      ip = Array.isArray(forwarded) ? forwarded[0] : forwarded.split(',')[0]?.trim();
    }
    
    if (!ip) {
      ip = req.socket.remoteAddress;
    }
    
    return ip || 'unknown';
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
    corsOptions,
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
    const globalCorsOptions = getExpressCorsOptions();
    const effectiveCorsOptions = corsOptions || globalCorsOptions || {
      origin: process.env.CORS_ORIGIN || '*',
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    };
    expressApp.use(cors(effectiveCorsOptions));
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
