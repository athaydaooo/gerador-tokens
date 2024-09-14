import { ITokenRepository } from "@modules/token/repository/i-token-repository";
import { Token, PrismaClient } from "@prisma/client"


export class FakeTokenRepository implements ITokenRepository {
  prisma = new PrismaClient().token
  findByToken = async (_token: string, id_application: number, user: string) => {
    const tokens = [{
      id: 1,
      user: 'A',
      token: 'ED23SD',
      destination: '139546985',
      type: 'SMS',
      created_at: new Date(),
      expires_at: new Date(),
      isVerified: false,
      id_application: 1,
    }]

    const foundToken = tokens.find((element) => element.token === _token && element.id_application === id_application && element.user === user)

    return foundToken as Token
  }

  findByCallerUser = async (id_application: number, user: string, isVerified: boolean, type: string) => {
    const tokens = [{
      id: 1,
      user: 'A',
      token: 'D58E45',
      destination: '139546985',
      type: 'SMS',
      created_at: new Date(),
      expires_at: new Date(),
      isVerified: false,
      id_application: 1,
    }]

    const foundTokens = [] as Token[]
    const foundToken = tokens.find((element) => element.user === user && element.id_application === id_application && element.isVerified === isVerified && element.type === type)

    if (foundToken) foundTokens.push(foundToken as Token)

    return foundTokens
  }

  findById = async (id: number) => {
    const tokens = [{
      id: 1,
      user: 'A',
      token: 'D58E45',
      destination: '139546985',
      type: 'SMS',
      created_at: new Date(),
      expires_at: new Date(),
      isVerified: false,
      id_application: 1,
    }]

    return tokens[0] as Token
  }

  create = async (token: Token) => {
    return token
  }

  update = async (token: Token) => {
    return token
  }
}
