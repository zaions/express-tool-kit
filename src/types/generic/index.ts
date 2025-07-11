import type { Response } from 'express';
import type { Options } from 'express-rate-limit';
import type { CorsOptions } from 'cors';
import { FormFieldsEnum, PermissionEnum, RoleEnum } from 'zaions-tool-kit';

export interface IExpressRateLimiterOptions extends Partial<Options> {}

export interface IExpressCorsOptions extends CorsOptions {}

export interface IConfigureExpressBuildKitOptions {
  rateLimiterOptions?: IExpressRateLimiterOptions;
  corsOptions?: IExpressCorsOptions;
  trustProxy?: boolean | string | number | string[] | ((ip: string) => boolean);
}

export interface IConfigureZETKOptions extends IConfigureExpressBuildKitOptions {}

export interface IApiResponse extends Response<any, Record<string, any>> {}

export interface IAuthCheckResultGeneric<A, B> {
  user: A;
  userRecord: B;
  isAdmin: boolean;
  isPlayer: boolean;
  isEngager: boolean;
  userId: string;
  userEmail: string;
  userPhoneNumber: string;
  userRole: RoleEnum;
  userPermissions: PermissionEnum[];
  [FormFieldsEnum.uniqueId]?: string;
}
