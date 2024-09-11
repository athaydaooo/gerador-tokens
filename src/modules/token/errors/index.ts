import { AppError } from "@shared/errors/AppError";

export const GENERAL_DATABASE = new AppError(
  'general.database.1',
  500,
  'CANT COMUNICATE WITH DATABASE'
)

export const MISSING_USER_PARAMETER = new AppError(
  'tokens.param.1',
  400,
  'PARAMETER user IS MISSING'
)

export const MISSING_TOKENTYPE_PARAMETER = new AppError(
  'tokens.param.2',
  400,
  'PARAMETER tokenType IS MISSING'
)

export const MISSING_DESTINATION_PARAMETER = new AppError(
  'tokens.param.3',
  400,
  'PARAMETER destination IS MISSING'
)

export const MISSING_CALLER_PARAMETER = new AppError(
  'tokens.param.4',
  400,
  'PARAMETER caller IS MISSING'
)

export const INVALID_TOKENTYPE_PARAMETER = new AppError(
  'tokens.param.5',
  400,
  'TOKEN TYPE NOT FOUND'
)

export const INVALID_DESTINATION_PARAMETER = new AppError(
  'tokens.param.6',
  400,
  'DESTINATION DOES NOT MATCH WITH THE TOKEN TYPE'
)

export const MISSING_TOKEN_PARAMETER = new AppError(
  'tokens.param.7',
  400,
  'PARAMETER token IS MISSING'
)

export const MISSING_BEARER_PARAMETER = new AppError(
  'tokens.param.7',
  400,
  'BEARER TOKEN IS MISSING'
)

export const INVALID_BEARER_PARAMETER = new AppError(
  'tokens.param.8',
  401,
  'BEARER TOKEN IS INVALID'
)

export const FIND_DATABASE_TOKEN = new AppError(
  'tokens.database.1',
  500,
  'CANT GET TOKEN FROM DATABASE'
)

export const CREATE_TOKEN_ACTIVE = new AppError(
  'tokens.database.2',
  500,
  'THERE IS AN ACTIVE TOKEN FOR THIS USER'
)

export const FIND_DATABASE_REQUEST = new AppError(
  'requests.database.1',
  500,
  'CANT GET REQUEST FROM DATABASE'
)

export const FIND_TOKEN_VERIFY = new AppError(
  'tokens.database.3',
  404,
  'TOKEN NOT FOUND'
)

export const SEND_TOKEN_SMS = new AppError(
  'tokens.send.1',
  500,
  'CANT SEND TOKEN TO PHONE'
)

export const SEND_TOKEN_EMAIL = new AppError(
  'tokens.send.2',
  500,
  'CANT SEND TOKEN TO EMAIL'
)

export const SEND_TOKEN_WHATSAPP = new AppError(
  'tokens.send.3',
  500,
  'CANT SEND TOKEN TO WHATSAPP'
)


