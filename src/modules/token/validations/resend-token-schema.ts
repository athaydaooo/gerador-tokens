import { z } from 'zod';
import { INVALID_DESTINATION_PARAMETER, INVALID_TOKENTYPE_PARAMETER, INVALID_USER_PARAMETER, MISSING_CALLER_PARAMETER, MISSING_DESTINATION_PARAMETER, MISSING_TOKENTYPE_PARAMETER, MISSING_USER_PARAMETER } from '../errors';
import errorToZod from '@shared/helpers/error-to-zod';
import tokenRegex from '@shared/helpers/token-regex';

export const resendTokenSchema = z.object({
  user: z.string({
    required_error: errorToZod(MISSING_USER_PARAMETER),
    invalid_type_error: errorToZod(INVALID_USER_PARAMETER),
  }),
  token_type: z.enum(Object.keys(tokenRegex) as [keyof typeof tokenRegex], {
    required_error: errorToZod(MISSING_TOKENTYPE_PARAMETER),
    invalid_type_error: errorToZod(INVALID_TOKENTYPE_PARAMETER),
  }),
  destination: z.string({
    required_error: errorToZod(MISSING_DESTINATION_PARAMETER),
    invalid_type_error: errorToZod(INVALID_DESTINATION_PARAMETER),
  })
})
  .refine(({ token_type, destination }) => {
    return tokenRegex[token_type].test(destination);
  },
    {
      message: errorToZod(INVALID_DESTINATION_PARAMETER),
      path: ['destination'],
    });

export default resendTokenSchema;