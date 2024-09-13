
import { z } from 'zod';
import { INVALID_APPPLICATIONID_PARAMETER, INVALID_NAME_PARAMETER, MISSING_APPPLICATIONID_PARAMETER } from '../errors';
import errorToZod from '@shared/helpers/error-to-zod';

export const changeNameApplicationSchema = z.object({
    application_id: z.number({
        required_error: errorToZod(MISSING_APPPLICATIONID_PARAMETER),
        invalid_type_error: errorToZod(INVALID_APPPLICATIONID_PARAMETER),
    }),
    name: z.string({
        invalid_type_error: errorToZod(INVALID_NAME_PARAMETER),
    })
})

export default changeNameApplicationSchema;

