import { Request } from '@prisma/client'

export abstract class IRequestRepository {
  abstract findById(id: number): Promise<Request | null>;
  abstract create(request: Request): Promise<Request>;
}