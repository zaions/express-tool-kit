import { Request, Response } from 'express';
import { ZodEffects, ZodError, ZodObject } from 'zod';
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
      message: 'Error occurred in "validateRequestInputData" helper function.',
      errors: {
        ...(validationErrors?.formErrors?.fieldErrors ?? {}),
        formErrors: [...(validationErrors?.formErrors?.formErrors ?? [])],
      },
    });
  } else {
    return data satisfies T;
  }
};
