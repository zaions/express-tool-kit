import { z as ZOD } from 'zod';

export const registerRequestValidationSchema: ZOD.ZodEffects<
  ZOD.ZodObject<
    {
      name: ZOD.ZodString;
      email: ZOD.ZodString;
      password: ZOD.ZodString;
      passwordConfirmation: ZOD.ZodString;
    },
    'strip',
    ZOD.ZodTypeAny,
    {
      name: string;
      email: string;
      password: string;
      passwordConfirmation: string;
    },
    {
      name: string;
      email: string;
      password: string;
      passwordConfirmation: string;
    }
  >,
  {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  },
  {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  }
> = ZOD.object({
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

export const loginRequestValidationSchema: ZOD.ZodObject<
  {
    email: ZOD.ZodString;
    password: ZOD.ZodString;
  },
  'strip',
  ZOD.ZodTypeAny,
  {
    email: string;
    password: string;
  },
  {
    email: string;
    password: string;
  }
> = ZOD.object({
  email: ZOD.string().email().max(255),
  password: ZOD.string().min(6).max(30),
});
