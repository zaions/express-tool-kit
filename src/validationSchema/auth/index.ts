// Auth Forms Validation Schema
// Login, & Register Page

import { checkSchema } from 'express-validator';

export const validateLoginRequest = checkSchema({
	email: {
		isEmail: {
			bail: true,
		},
	},
	password: {
		isStrongPassword: {
			options: {
				minLength: 6,
				minLowercase: 1,
				minUppercase: 1,
				minNumbers: 1,
				minSymbols: 1,
			},
		},
	},
});
