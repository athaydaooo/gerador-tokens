import { Application } from "@prisma/client";
import { ApplicationRepository } from "../repository/application-repository";

interface UpdateApplicationProps {
    applicationRepository: ApplicationRepository
}

export class UpdateApplicationService {

    private props: UpdateApplicationProps;
    constructor(props: UpdateApplicationProps) {
        this.props = {
            ...props
        };
    }

    async execute(application_id: number, token?: string, name?: string, enable?: boolean): Promise<Application> {

        const createdApplication = await this.props.applicationRepository.update(application_id, {
            token,
            name,
            enabled: enable
        });

        return createdApplication;
    }
}
