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
		dataList?: unknown;
		authToken?: unknown;
		errors?: unknown;
		code?: ResponseCodeEnum;
		status?: ResponseStatusEnum;
	}
) => {
	const {
		success = true,
		message = ztkMessages.general.success,
		data = null,
		dataList = null,
		authToken = null,
		errors = null,
		code = ResponseCodeEnum.success,
		status = ResponseStatusEnum.success,
	} = options || {};
	return res.json({
		success,
		message,
		data,
		dataList,
		authToken,
		errors,
		code,
		status,
	});
};

export const sendApiSuccessResponse = (
	res: Response,
	options?: {
		message?: string;
		data?: unknown;
		dataList?: unknown;
		authToken?: unknown;
		code?: ResponseCodeEnum;
		status?: ResponseStatusEnum;
	}
) => {
	const {
		message = ztkMessages.general.success,
		data = null,
		dataList = null,
		authToken = null,
		code = ResponseCodeEnum.success,
		status = ResponseStatusEnum.success,
	} = options || {};

	return sendApiResponse(res, {
		success: true,
		message,
		data,
		dataList,
		authToken,
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

export const sendBadRequestResponse = (
	res: Response,
	options?: {
		message?: string;
		errors?: unknown;
		code?: ResponseCodeEnum;
		status?: ResponseStatusEnum;
	}
) => {
	const {
		message = ztkMessages.general.badRequest,
		errors = null,
		code = ResponseCodeEnum.badRequest,
		status = ResponseStatusEnum.badRequest,
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

export const sendUnAuthenticatedErrorResponse = (
	res: Response,
	options?: {
		message?: string;
		errors?: unknown;
		code?: ResponseCodeEnum;
		status?: ResponseStatusEnum;
	}
) => {
	const {
		message = ztkMessages.general.unAuthenticated,
		errors = null,
		code = ResponseCodeEnum.unAuthenticated,
		status = ResponseStatusEnum.unAuthenticated,
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

export const sendUnAuthorizedErrorResponse = (
	res: Response,
	options?: {
		message?: string;
		errors?: unknown;
		code?: ResponseCodeEnum;
		status?: ResponseStatusEnum;
	}
) => {
	const {
		message = ztkMessages.general.unAuthorized,
		errors = null,
		code = ResponseCodeEnum.unAuthorized,
		status = ResponseStatusEnum.unAuthorized,
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

export const sendNotFoundErrorResponse = (
	res: Response,
	options?: {
		message?: string;
		errors?: unknown;
		code?: ResponseCodeEnum;
		status?: ResponseStatusEnum;
	}
) => {
	const {
		message = ztkMessages.general.notFound,
		errors = null,
		code = ResponseCodeEnum.notFound,
		status = ResponseStatusEnum.notFound,
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

export const sendTooManyRequestsErrorResponse = (
	res: Response,
	options?: {
		message?: string;
		errors?: unknown;
		code?: ResponseCodeEnum;
		status?: ResponseStatusEnum;
	}
) => {
	const {
		message = ztkMessages.general.tooManyRequests,
		errors = null,
		code = ResponseCodeEnum.tooManyRequests,
		status = ResponseStatusEnum.tooManyRequests,
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

export const sendItemExistsErrorResponse = (
	res: Response,
	options?: {
		message?: string;
		errors?: unknown;
		code?: ResponseCodeEnum;
		status?: ResponseStatusEnum;
	}
) => {
	const {
		message = ztkMessages.general.itemExists,
		errors = null,
		code = ResponseCodeEnum.itemExists,
		status = ResponseStatusEnum.itemExists,
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
