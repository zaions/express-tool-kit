import type { Express, Request, Response } from 'express';
import cors from 'cors';
import { json, urlencoded } from 'express';
import { sendApiFailedResponse } from '@helpers/apiHelpers';
import { ResponseCodeEnum, ResponseStatusEnum } from 'zaions-tool-kit';

export const applyMiddlewaresOnApp = (
	expressApp: Express,
	{
		applyCors,
		expressJson,
		expressUrlEncoded,
	}: { applyCors?: boolean; expressJson?: boolean; expressUrlEncoded?: boolean }
) => {
	if (applyCors) {
		expressApp.use(cors({ origin: true }));
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
