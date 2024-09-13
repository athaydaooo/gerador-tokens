
import { RequestRepository } from '@modules/request/repository/request-repository';
import { CreateRequestService } from '@modules/request/service/create-request-service';
import { Request, Response, NextFunction } from 'express';

export async function registerRequest(req: Request, res: Response, next: NextFunction) {
    const requestRepository = new RequestRepository()
    const createRequestService = new CreateRequestService({ requestRepository })

    await createRequestService.execute(req.url, req.hostname, JSON.stringify(req.body)).catch(() => {
        next();
        return;
    })

    next()
}