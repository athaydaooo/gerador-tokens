import { Prisma, PrismaClient, Request } from '@prisma/client'
import { GENERAL_DATABASE } from '../../token/errors'
import { IRequestRepository } from './i-request-repository'

export class RequestRepository implements IRequestRepository {

  prisma = new PrismaClient().request

  create = async (requestData: Prisma.RequestCreateInput): Promise<void> => {

    await this.prisma.create({ data: { ...requestData } })
      .catch((err) => { console.log(err); throw GENERAL_DATABASE })

  }
}
