
import { z } from 'zod';
import { INVALID_APPPLICATIONID_PARAMETER, INVALID_TOKEN_PARAMETER, MISSING_APPPLICATIONID_PARAMETER } from '../errors';
import errorToZod from '@shared/helpers/error-to-zod';

export const changeTokenApplicationSchema = z.object({
    application_id: z.number({
        required_error: errorToZod(MISSING_APPPLICATIONID_PARAMETER),
        invalid_type_error: errorToZod(INVALID_APPPLICATIONID_PARAMETER),
    }),
    token: z.string({
        invalid_type_error: errorToZod(INVALID_TOKEN_PARAMETER),
    })
})

export default changeTokenApplicationSchema;

