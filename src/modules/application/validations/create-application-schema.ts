
import { z } from 'zod';
import { INVALID_ENABLE_PARAMETER, INVALID_NAME_PARAMETER, INVALID_TOKEN_PARAMETER, MISSING_ENABLE_PARAMETER, MISSING_NAME_PARAMETER, MISSING_TOKEN_PARAMETER } from '../errors';
import errorToZod from '@shared/helpers/error-to-zod';

export const createApplicationSchema = z.object({
    enable: z.boolean({
        required_error: errorToZod(MISSING_ENABLE_PARAMETER),
        invalid_type_error: errorToZod(INVALID_ENABLE_PARAMETER),
    }),
    name: z.string({
        required_error: errorToZod(MISSING_NAME_PARAMETER),
        invalid_type_error: errorToZod(INVALID_NAME_PARAMETER),
    }),
    token: z.string({
        required_error: errorToZod(MISSING_TOKEN_PARAMETER),
        invalid_type_error: errorToZod(INVALID_TOKEN_PARAMETER),
    }),
})
export default createApplicationSchema;