import { PrismaClient, Token } from '@prisma/client'
import { GENERAL_DATABASE } from '../errors'
import { ITokenRepository } from './interfaces/i-token-repository'

export class TokenRepository implements ITokenRepository {
  prisma = new PrismaClient().token

  findByToken = async (_token: string, id_application: number, user: string) => {
    const token = await this.prisma.findFirst({
      where: {
        id_application,
        user,
        token: _token,
      },
    }).catch(() => { throw GENERAL_DATABASE })

    return token
  }

  findByCallerUser = async (id_application: number, user: string, isVerified: boolean, type: string) => {
    const token = await this.prisma.findMany({
      where: {
        type,
        isVerified,
        id_application,
        user,
        expires_at: {
          gte: new Date()
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    }).catch(() => { throw GENERAL_DATABASE })

    return token
  }

  findById = async (id: number) => {
    const token = await this.prisma.findUnique({
      where: {
        id,
      },
    }).catch(() => { throw GENERAL_DATABASE })

    return token
  }

  create = async (token: Token) => {
    const tokenData: any = token

    delete tokenData.id

    const tokenReg = await this.prisma.create({ data: { ...tokenData } })
      .catch(() => { throw GENERAL_DATABASE })

    return tokenReg
  }

  update = async (token: Token) => {
    const tokenData: any = token
    const id = token.id

    delete tokenData.id

    const tokenReg = await this.prisma.update({
      where: {
        id
      },
      data: {
        ...tokenData
      }
    })
      .catch(() => { throw GENERAL_DATABASE })

    return tokenReg
  }
}
