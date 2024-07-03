import { IExpressRateLimiterOptions } from '@zTypes/generic';

let _rateLimiterOptions: IExpressRateLimiterOptions | null = null;

export const getExpressRateLimiterOptions = () => {
	return _rateLimiterOptions;
};

export const setExpressRateLimiterOptions = (
	_options: IExpressRateLimiterOptions
) => {
	_rateLimiterOptions = { ..._options };
};
