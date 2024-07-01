import type { Request, Response } from 'express';
import { Result, matchedData, validationResult } from 'express-validator';
import type { Location, ValidationError } from 'express-validator';
import { sendApiFailedResponse } from './apiHelpers';

export const getFormattedErrors = (result: Result<ValidationError>) => {
	return result
		.formatWith((error) => {
			return [error.msg];
		})
		.mapped();
};

export const getValidatedData = (
	req: Request,
	options?: {
		includeBody?: boolean;
		includeCookies?: boolean;
		includeHeaders?: boolean;
		includeParams?: boolean;
		includeQuery?: boolean;
		includeOptionals?: boolean;
		onlyValidData?: boolean;
	}
) => {
	const {
		includeBody = true,
		includeCookies = false,
		includeHeaders = false,
		includeParams = true,
		includeQuery = true,
		includeOptionals = true,
		onlyValidData = true,
	} = options || {};

	const locations: Location[] = [];
	if (includeBody) {
		locations.push('body');
	}
	if (includeCookies) {
		locations.push('cookies');
	}
	if (includeHeaders) {
		locations.push('headers');
	}
	if (includeParams) {
		locations.push('params');
	}
	if (includeQuery) {
		locations.push('query');
	}

	return matchedData(req, {
		includeOptionals,
		onlyValidData,
		locations,
	});
};

export const checkValidationResult = (req: Request, res: Response) => {
	const result = validationResult(req);
	if (result.isEmpty()) {
		return getValidatedData(req);
	} else {
		const errors = getFormattedErrors(result);

		return sendApiFailedResponse(res, {
			errors,
		});
	}
};
