import { PrismaClient, Request } from '@prisma/client'
import { FIND_DATABASE_REQUEST, GENERAL_DATABASE } from '../errors'

class RequestRepository {
  prisma = new PrismaClient().request

  findById = async (id : number) => {
    
    const request = await this.prisma.findUnique({
      where: {
        id,
      },
    }).catch(() => {throw GENERAL_DATABASE})

    if(!request) throw FIND_DATABASE_REQUEST

    return request
  }

  create = async (request: Request) => {

    const requestData : any = request

    delete requestData.id

    const requestReg = await this.prisma.create({ data: { ...requestData } })
      .catch(() => {throw GENERAL_DATABASE})

    return requestReg
  }
}

export default RequestRepository
