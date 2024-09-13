import { ApplicationRepository } from '@modules/application/repository/application-repository';
import { GetApplicationServiceByToken } from '@modules/application/services/get-application-by-token';
import { INVALID_BEARER_PARAMETER, MISSING_BEARER_PARAMETER } from '@modules/token/errors';
import { Request, Response, NextFunction } from 'express';

export async function bearerVerifier(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  const applicationRepository = new ApplicationRepository()
  const getApplicationService = new GetApplicationServiceByToken({ applicationRepository })

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    next(MISSING_BEARER_PARAMETER)
    return;
  }
  const bearer = authHeader.substring("Bearer ".length)
  getApplicationService.execute(bearer)
    .then(application => {
      if (application) {
        req.headers['application-id'] = application.id.toString()
        next();
        return
      }
      next(INVALID_BEARER_PARAMETER);
    })
    .catch(error => {
      next(error);
    });
}