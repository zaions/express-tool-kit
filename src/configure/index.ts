import { setExpressRateLimiterOptions } from '@helpers/middlewareHelpers';
import { IConfigureZETKOptions } from '@zTypes/generic';

export const configureZETK = (options: IConfigureZETKOptions) => {
	const { rateLimiterOptions } = options;

	if (rateLimiterOptions) {
		setExpressRateLimiterOptions(rateLimiterOptions);
	}
};
