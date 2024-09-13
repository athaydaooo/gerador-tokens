import { ApplicationControllerProps } from "../entities/application-controller-props"
import { Request, Response } from 'express';
import createApplicationSchema from "../validations/create-application-schema";
import { changeTokenApplicationSchema } from "../validations/change-token-application-schema";
import enableApplicationSchema from "../validations/enable-application-schema";
import { GetApplicationsMapper } from "../mappers/get-applications-mapper";
import changeNameApplicationSchema from "../validations/change-name-application-schema";

export class ApplicationController {
    private props: ApplicationControllerProps
    constructor(props: ApplicationControllerProps) {
        this.props = props
    }

    async getApplications(request: Request, response: Response) {

        const applications = await this.props.getApplicationsService.execute()

        response.status(200).json(GetApplicationsMapper.toResponse(applications))
    }

    async createApplication(request: Request, response: Response) {
        const {
            enable,
            name,
            token
        } = createApplicationSchema.parse(request.body)

        await this.props.createApplicationService.execute(
            enable,
            token,
            name
        )

        response.status(201).json()

    }

    async changeTokenApplication(request: Request, response: Response) {
        const {
            application_id,
            token
        } = changeTokenApplicationSchema.parse(request.body)

        await this.props.updateApplicationService.execute(
            application_id,
            token
        )

        response.status(200).json()
    }

    async changeNameApplication(request: Request, response: Response) {
        const {
            application_id,
            name
        } = changeNameApplicationSchema.parse(request.body)

        await this.props.updateApplicationService.execute(
            application_id,
            undefined,
            name
        )

        response.status(200).json()
    }

    async enableApplication(request: Request, response: Response) {
        const {
            application_id,
            enable
        } = enableApplicationSchema.parse(request.body)

        await this.props.updateApplicationService.execute(
            application_id,
            undefined,
            undefined,
            enable
        )

        response.status(200).json()
    }

}
