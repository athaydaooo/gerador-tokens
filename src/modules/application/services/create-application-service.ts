import { Application, Prisma } from "@prisma/client";
import { ApplicationRepository } from "../repository/application-repository";

interface CreateApplicationProps {
    applicationRepository: ApplicationRepository
}

export class CreateApplicationService {

    private props: CreateApplicationProps;
    constructor(props: CreateApplicationProps) {
        this.props = {
            ...props
        };
    }

    async execute(enable: boolean, token: string, name: string): Promise<Application> {
        const application: Prisma.ApplicationCreateInput = {
            name,
            token,
            created_at: new Date(),
            updated_at: new Date(),
            enabled: enable
        };

        const createdApplication = await this.props.applicationRepository.create(application);

        return createdApplication;
    }
}
