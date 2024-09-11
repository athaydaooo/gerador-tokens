import { ApplicationRepository } from '@modules/application/repository/application-repository';
import { GetApplicationServiceByToken } from '@modules/application/services/get-application-token-by-token';
import { INVALID_BEARER_PARAMETER, MISSING_BEARER_PARAMETER } from '@modules/token/errors';
import e, { Request, Response, NextFunction } from 'express';

export async function bearerVerifier(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  const applicationRepository = new ApplicationRepository()
  const getApplicationService = new GetApplicationServiceByToken({applicationRepository}) 

  if (authHeader && authHeader.startsWith('Bearer ')) {

    const bearer = authHeader.substring("Bearer ".length)
     
    if(!bearer) throw MISSING_BEARER_PARAMETER

    const application = await getApplicationService.execute(bearer).catch(() => {
      throw INVALID_BEARER_PARAMETER
    })
    
    req.headers['application-id'] = application.id.toString()
    next();
  } else {
    throw MISSING_BEARER_PARAMETER
  }
}