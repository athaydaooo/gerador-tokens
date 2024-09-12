import { Token } from '@prisma/client'

export abstract class ITokenRepository {
  abstract findByToken(_token: string, id_application: number, user: string): Promise<Token | null>;
  abstract findByCallerUser(id_application: number, user: string, isVerified: boolean, type: string): Promise<Token[]>;
  abstract findById(id: number): Promise<Token | null>;
  abstract create(token: Token): Promise<Token>;
  abstract update(token: Token): Promise<Token>;
}