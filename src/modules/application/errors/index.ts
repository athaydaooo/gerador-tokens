import { AppError } from "@shared/errors/AppError";

export const TOKEN_NOT_FOUND = new AppError(
  'auth.bearer.1',
  400,
  'BEARER TOKEN NOT FOUND'
)