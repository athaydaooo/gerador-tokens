import { Application, Prisma } from '@prisma/client'

export abstract class IApplicationRepository {
  abstract getAll(): Promise<Application[] | null>;
  abstract findByToken(token: string): Promise<Application | null>;
  abstract findById(id: number): Promise<Application | null>;
  abstract create(application: Prisma.ApplicationCreateInput): Promise<Application>;
  abstract update(application_id: number, applicationData: Prisma.ApplicationUpdateInput): Promise<Application>;
  abstract delete(applicationId: number): Promise<void>;
}
