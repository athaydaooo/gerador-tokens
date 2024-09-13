import { Application, PrismaClient } from '@prisma/client'
import { GENERAL_DATABASE } from '../../token/errors'
import { IApplicationRepository } from './interfaces/i-application-repository'

export class ApplicationRepository implements IApplicationRepository {
  prisma = new PrismaClient().application

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

  create = async (application: Application) => {
    const applicationData: any = application

    delete applicationData.id

    const applicationReg = await this.prisma.create({ data: { ...applicationData } })
      .catch(() => { throw GENERAL_DATABASE })

    return applicationReg
  }

  update = async (application: Application) => {
    const applicationData: any = application
    const id = application.id

    delete applicationData.id

    const applicationReg = await this.prisma.update({
      where: {
        id
      },
      data: {
        ...applicationData
      }
    })
      .catch(() => { throw GENERAL_DATABASE })

    return applicationReg
  }
}
