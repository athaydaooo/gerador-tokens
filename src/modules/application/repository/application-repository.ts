import { Application, Prisma, PrismaClient } from '@prisma/client'
import { GENERAL_DATABASE } from '../../token/errors'
import { IApplicationRepository } from './i-application-repository'
import { crypto } from '@shared/utils/crypto/crypto'

export class ApplicationRepository implements IApplicationRepository {

  prisma = new PrismaClient().application

  getAll = async () => {
    const applications = await this.prisma.findMany().catch(() => { throw GENERAL_DATABASE })
    return applications
  }

  findByToken = async (token: string) => {
    const application = await this.prisma.findUnique({
      where: {
        token,
      },
    }).catch(() => { throw GENERAL_DATABASE })

    return application
  }

  findById = async (id: number) => {
    const application = await this.prisma.findUnique({
      where: {
        id,
      }
    }).catch(() => { throw GENERAL_DATABASE })

    return application
  }

  create = async (applicationData: Prisma.ApplicationCreateInput) => {
    const cryptoToken = crypto.encrypt({ data: applicationData.token })

    applicationData.token = cryptoToken

    const applicationReg = await this.prisma.create({ data: { ...applicationData } })
      .catch((err) => { console.log(err); throw GENERAL_DATABASE })

    return applicationReg
  }

  update = async (application_id: number, applicationData: Prisma.ApplicationUpdateInput) => {

    if (applicationData.token) {
      const cryptoToken = crypto.encrypt({ data: applicationData.token.toString() })
      applicationData.token = cryptoToken
    }

    applicationData.updated_at = new Date()

    const applicationReg = await this.prisma.update({
      where: {
        id: application_id
      },
      data: {
        ...applicationData
      }
    })
      .catch(() => { throw GENERAL_DATABASE })

    return applicationReg
  }

  delete = async (id: number) => {
    await this.prisma.delete({
      where: {
        id,
      },
    }).catch(() => { throw GENERAL_DATABASE })
  }
}
