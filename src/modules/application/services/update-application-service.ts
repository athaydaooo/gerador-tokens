import { Application } from "@prisma/client";
import { IApplicationRepository } from "../repository/i-application-repository";

interface UpdateApplicationProps {
    applicationRepository: IApplicationRepository
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
