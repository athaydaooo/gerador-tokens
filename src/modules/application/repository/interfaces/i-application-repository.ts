import { Application, PrismaClient } from '@prisma/client'

export abstract class IApplicationRepository {
  abstract findByToken(token: string): Promise<Application | null>;
  abstract findById(id: number): Promise<Application | null>;
  abstract create(application: Application): Promise<Application>;
  abstract update(application: Application): Promise<Application>;
}
