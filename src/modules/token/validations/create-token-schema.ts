import { z } from 'zod';
import { INVALID_TOKENTYPE_PARAMETER, MISSING_CALLER_PARAMETER, MISSING_DESTINATION_PARAMETER, MISSING_TOKENTYPE_PARAMETER, MISSING_USER_PARAMETER } from '../errors';
import errorToZod from '@shared/helpers/error-to-zod';

const tokenRegex = {
  WHATSAPP: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  SMS: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
}

export const createTokenSchema = z.object({
  user: z.string({
    required_error: errorToZod(MISSING_USER_PARAMETER),
  }),
  tokenType: z.enum(Object.keys(tokenRegex) as [keyof typeof tokenRegex], {
    required_error: errorToZod(MISSING_TOKENTYPE_PARAMETER),
    invalid_type_error: errorToZod(INVALID_TOKENTYPE_PARAMETER),
  }),
  destination: z.string({
    required_error: errorToZod(MISSING_DESTINATION_PARAMETER),
    invalid_type_error: errorToZod(INVALID_TOKENTYPE_PARAMETER),
  }),
  caller: z.string({
    required_error: errorToZod(MISSING_CALLER_PARAMETER),
  }),
})
.refine(({ tokenType, destination }) => {
  return tokenRegex[tokenType].test(destination);
},
{
  message: errorToZod(INVALID_TOKENTYPE_PARAMETER),
  path: ['destination'], 
});

export default createTokenSchema;