import { Request, Response } from 'express';
import { ZodObject, ZodError, ZodEffects } from 'zod';
import { sendBadRequestResponse } from '..';

export const validateRequestInputData = async <T extends object>({
	req,
	res,
	validationSchema,
}: {
	req: Request;
	// eslint-disable-next-line
	validationSchema: ZodObject<any> | ZodEffects<any>;
	res: Response;
}): Promise<T | Response> => {
	const data = { ...req.body };

	let validationErrors;
	try {
		validationSchema.parse(data);
	} catch (error) {
		validationErrors = error as ZodError;
	}

	if (validationErrors?.formErrors?.fieldErrors) {
		return sendBadRequestResponse(res, {
			errors: validationErrors?.formErrors?.fieldErrors,
		});
	} else {
		return data satisfies T;
	}
};
