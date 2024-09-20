import { Prisma } from "@prisma/client";
import { IRequestRepository } from "../repository/i-request-repository";

interface CreateRequestServiceProps {
    requestRepository: IRequestRepository
}
export class CreateRequestService {
    private props: CreateRequestServiceProps

    constructor(props: CreateRequestServiceProps) {
        this.props = {
            ...props
        }
    }

    async execute(endpoint: string, caller: string, request: string): Promise<void> {
        const requestData: Prisma.RequestCreateInput = {
            endpoint,
            caller,
            request,
            created_at: new Date()
        }

        await this.props.requestRepository.create(requestData)
    }
}
