import type { Response } from 'express';
import type { Options } from 'express-rate-limit';

export interface IExpressRateLimiterOptions extends Partial<Options> {}

export interface IConfigureZETKOptions {
	rateLimiterOptions?: IExpressRateLimiterOptions;
}

export interface IApiResponse extends Response<any, Record<string, any>> {}

export interface IAuthCheckResultGeneric<A, B> {
	user: A;
	userRecord: B;
	isAdmin: boolean;
	isPlayer: boolean;
	isEngager: boolean;
	userId: string;
	userEmail: string;
	userPhoneNumber: string;
}
