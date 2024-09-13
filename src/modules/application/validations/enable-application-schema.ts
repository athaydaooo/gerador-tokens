
import { z } from 'zod';
import { INVALID_APPPLICATIONID_PARAMETER, INVALID_ENABLE_PARAMETER, MISSING_APPPLICATIONID_PARAMETER, MISSING_ENABLE_PARAMETER } from '../errors';
import errorToZod from '@shared/helpers/error-to-zod';

export const enableApplicationSchema = z.object({
    application_id: z.number({
        required_error: errorToZod(MISSING_APPPLICATIONID_PARAMETER),
        invalid_type_error: errorToZod(INVALID_APPPLICATIONID_PARAMETER),
    }),
    enable: z.boolean({
        required_error: errorToZod(MISSING_ENABLE_PARAMETER),
        invalid_type_error: errorToZod(INVALID_ENABLE_PARAMETER),
    })

})
export default enableApplicationSchema;