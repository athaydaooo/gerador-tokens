import { ApplicationRepository } from '@modules/application/repository/application-repository';
import { GetApplicationsService } from '@modules/application/services/get-applications-service';
import { INVALID_BEARER_PARAMETER, MISSING_BEARER_PARAMETER } from '@modules/token/errors';
import { Application } from '@prisma/client'
import { crypto } from '@shared/utils/crypto/crypto';
import { Request, Response, NextFunction } from 'express';

export async function bearerUserVerifier(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  const applicationRepository = new ApplicationRepository()
  const getApplicationsService = new GetApplicationsService({ applicationRepository })

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    next(MISSING_BEARER_PARAMETER)
    return;
  }
  const bearer = authHeader.substring("Bearer ".length)

  const applications = await getApplicationsService.execute().catch(error => {
    next(error);
    return;
  });


  if (!applications) {
    next(INVALID_BEARER_PARAMETER)
    return;
  }

  const application = applications.find((application: Application) =>
    crypto.decrypt({
      data: application.token
    }) === bearer);

  if (!application) {
    next(INVALID_BEARER_PARAMETER)
    return;
  }

  req.headers['application-id'] = application.id.toString()
  next();
}