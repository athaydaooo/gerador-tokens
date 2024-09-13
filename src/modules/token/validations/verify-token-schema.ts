import { z } from 'zod';
import { INVALID_TOKEN_PARAMETER, INVALID_TOKENTYPE_PARAMETER, INVALID_USER_PARAMETER, MISSING_TOKEN_PARAMETER, MISSING_USER_PARAMETER } from '../errors';
import errorToZod from '@shared/helpers/error-to-zod';

export const verifyTokenSchema = z.object({
  user: z.string({
    required_error: errorToZod(MISSING_USER_PARAMETER),
    invalid_type_error: errorToZod(INVALID_USER_PARAMETER),
  }),
  token: z.string({
    required_error: errorToZod(MISSING_TOKEN_PARAMETER),
    invalid_type_error: errorToZod(INVALID_TOKEN_PARAMETER),
  }),
});

export default verifyTokenSchema;