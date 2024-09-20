import { AppError } from "@shared/errors/app-error";

//REPOSITORY ERRORS
export const TOKEN_MUST_BE_FILL = new AppError(
  'empty.token',
  400,
  'TOKEN IS EMPTY'
)

export const NAME_MUST_BE_FILL = new AppError(
  'empty.name',
  400,
  'NAME IS EMPTY'
)

//AUTH ERRORS
export const TOKEN_NOT_FOUND = new AppError(
  'auth.bearer.1',
  400,
  'BEARER TOKEN NOT FOUND'
)

//PARAM ERRORS

export const MISSING_ANY_PARAMETER = new AppError(
  'YOU MUST PROVIDE ANYTHING TO UPDATE',
  400,
)

export const MISSING_ENABLE_PARAMETER = new AppError(
  'PARAMETER enable IS MISSING',
  400,
)

export const INVALID_ENABLE_PARAMETER = new AppError(
  'PARAMETER enable IS INVALID',
  400,
)

export const MISSING_TOKEN_PARAMETER = new AppError(
  'PARAMETER token IS MISSING',
  400,
)

export const INVALID_TOKEN_PARAMETER = new AppError(
  'PARAMETER token IS INVALID',
  400,
)

export const MISSING_APPPLICATION_PARAMETER = new AppError(
  'PARAMETER application IS MISSING',
  400,
)

export const INVALID_APPPLICATION_PARAMETER = new AppError(
  'PARAMETER application IS INVALID',
  400,
)

export const MISSING_APPPLICATIONID_PARAMETER = new AppError(
  'PARAMETER application_id IS MISSING',
  400,
)

export const INVALID_APPPLICATIONID_PARAMETER = new AppError(
  'PARAMETER application_id IS INVALID',
  400,
)


export const MISSING_NAME_PARAMETER = new AppError(
  'PARAMETER name IS MISSING',
  400,
)

export const INVALID_NAME_PARAMETER = new AppError(
  'PARAMETER name IS INVALID',
  400,
)

//SERVICE ERRORS

export const APPLICATION_NOT_FOUND = new AppError(
  'application.service.not_found',
  400,
  'APPLICATION NOT FOUND'
)