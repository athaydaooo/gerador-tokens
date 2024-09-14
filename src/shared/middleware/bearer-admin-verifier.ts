
import { INVALID_BEARER_PARAMETER, MISSING_BEARER_PARAMETER } from '@modules/token/errors';
import { Request, Response, NextFunction } from 'express';

export async function bearerAdminVerifier(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    next(MISSING_BEARER_PARAMETER)
    return;
  }
  const bearer = authHeader.substring("Bearer ".length)

  if (bearer !== process.env.ADMIN_BEARER_TOKEN) {
    next(INVALID_BEARER_PARAMETER)
  }

  next();
}