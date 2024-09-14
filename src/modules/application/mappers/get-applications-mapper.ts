import { Application } from "@prisma/client";

export interface GetApplicationResponse {
    id: number;
    name: string;
    enabled: boolean;
}

export class GetApplicationsMapper {
    static toResponse(applications: Application[]): GetApplicationResponse[] {
        return applications.map(application => ({
            id: application.id,
            name: application.name,
            enabled: application.enabled
        }));
    }
}