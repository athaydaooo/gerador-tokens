import { Prisma } from '@prisma/client'

export abstract class IRequestRepository {
  abstract create(requestData: Prisma.RequestCreateInput): Promise<void>;
}
