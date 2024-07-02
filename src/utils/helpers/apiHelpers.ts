import type { Response } from 'express';
import {
	ResponseCodeEnum,
	ResponseStatusEnum,
	ztkMessages,
} from 'zaions-tool-kit';

export const sendApiResponse = (
	res: Response,
	options?: {
		success?: boolean;
		message?: string;
		data?: unknown;
		errors?: unknown;
		code?: ResponseCodeEnum;
		status?: ResponseStatusEnum;
	}
) => {
	const {
		success = true,
		message = ztkMessages.general.success,
		data = null,
		errors = null,
		code = ResponseCodeEnum.success,
		status = ResponseStatusEnum.success,
	} = options || {};
	return res.json({ success, message, data, errors, code, status });
};

export const sendApiSuccessResponse = (
	res: Response,
	options?: {
		message?: string;
		data?: unknown;
		code?: ResponseCodeEnum;
		status?: ResponseStatusEnum;
	}
) => {
	const {
		message = ztkMessages.general.success,
		data = null,
		code = ResponseCodeEnum.success,
		status = ResponseStatusEnum.success,
	} = options || {};

	return sendApiResponse(res, {
		success: true,
		message,
		data,
		errors: null,
		code,
		status,
	});
};

export const sendApiFailedResponse = (
	res: Response,
	options?: {
		message?: string;
		errors?: unknown;
		code?: ResponseCodeEnum;
		status?: ResponseStatusEnum;
	}
) => {
	const {
		message = ztkMessages.general.failed,
		errors = null,
		code = ResponseCodeEnum.failed,
		status = ResponseStatusEnum.failed,
	} = options || {};

	return sendApiResponse(res, {
		success: false,
		message,
		data: null,
		errors,
		code,
		status,
	});
};
