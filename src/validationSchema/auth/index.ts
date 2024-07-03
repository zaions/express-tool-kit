// Auth Forms Validation Schema
// Login, & Register Page

import { z as ZOD } from 'zod';

export const registerRequestValidationSchema = ZOD.object({
	name: ZOD.string().trim().min(1, { message: 'Name is Required.' }).max(255),
	email: ZOD.string().email().max(255),
	password: ZOD.string().min(6).max(30),
	passwordConfirmation: ZOD.string().min(6).max(30),
}).superRefine((values, ctx) => {
	if (values.passwordConfirmation !== values.password) {
		ctx.addIssue({
			code: 'custom',
			message: 'The passwords did not match',
			path: ['passwordConfirmation'],
		});
	}
});

export const loginRequestValidationSchema = ZOD.object({
	email: ZOD.string().email().max(255),
	password: ZOD.string().min(6).max(30),
});

// how to validate
// try {
// 	validateLoginRequest.parse({});
// } catch (error) {
// 	if (error instanceof ZodError) {
// 		return error.formErrors.fieldErrors;
// 	}
// }
