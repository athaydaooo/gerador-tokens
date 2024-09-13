import { AppError } from "@shared/errors/app-error";

//DATABASE ERRORS
export const GENERAL_DATABASE = new AppError(
  'CANT COMUNICATE WITH DATABASE',
  500
)

export const FIND_DATABASE_TOKEN = new AppError(
  'CANT GET TOKEN FROM DATABASE',
  500,
)

export const CREATE_TOKEN_ACTIVE = new AppError(
  'THERE IS AN ACTIVE TOKEN FOR THIS USER',
  500,
)

export const FIND_DATABASE_REQUEST = new AppError(
  'CANT GET REQUEST FROM DATABASE',
  500,
)

export const FIND_TOKEN_VERIFY = new AppError(
  'TOKEN NOT FOUND',
  404,
)



//PARAMETER ERRORS
export const MISSING_USER_PARAMETER = new AppError(
  'PARAMETER user IS MISSING',
  400,
)

export const MISSING_TOKENTYPE_PARAMETER = new AppError(
  'PARAMETER token_type IS MISSING',
  400,
)

export const MISSING_DESTINATION_PARAMETER = new AppError(
  'PARAMETER destination IS MISSING',
  400,
)

export const MISSING_CALLER_PARAMETER = new AppError(
  'PARAMETER caller IS MISSING',
  400,
)

export const INVALID_TOKENTYPE_PARAMETER = new AppError(
  'PARAMETER tokenType IS INVALID',
  400,
)

export const INVALID_USER_PARAMETER = new AppError(
  'PARAMETER user IS INVALID',
  400,
)

export const INVALID_DESTINATION_PARAMETER = new AppError(
  'DESTINATION DOES NOT MATCH WITH THE TOKEN TYPE',
  400,
)

export const MISSING_TOKEN_PARAMETER = new AppError(
  'PARAMETER token IS MISSING',
  400,
)

export const MISSING_BEARER_PARAMETER = new AppError(
  'BEARER TOKEN IS MISSING',
  400,
)

export const INVALID_BEARER_PARAMETER = new AppError(
  'BEARER TOKEN IS INVALID',
  401,
)

export const INVALID_TOKEN_PARAMETER = new AppError(
  'PARAMETER token IS INVALID',
  400,
)

//SERVICE ERRORS
export const SEND_TOKEN_SMS = new AppError(
  'CANT SEND TOKEN TO PHONE',
  500,
)

export const SEND_TOKEN_EMAIL = new AppError(
  'CANT SEND TOKEN TO EMAIL',
  500,
)

export const SEND_TOKEN_WHATSAPP = new AppError(
  'CANT SEND TOKEN TO WHATSAPP',
  500,
)

export const PENDING_TOKEN = new AppError(
  'create_token.service.pending_token',
  409,
  'THIS USER HAS AN PENDING TOKEN, TRY RESEND IT'
)

export const NO_PENDING_TOKEN = new AppError(
  'resend_token.service.no_pending_token',
  409,
  'NO PENDING TOKEN FOUND FOR THIS USER, TRY CREATE A NEW ONE'
)


