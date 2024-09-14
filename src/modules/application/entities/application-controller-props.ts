import { CreateApplicationService } from "../services/create-application-service";
import { GetApplicationsService } from "../services/get-applications-service";
import { UpdateApplicationService } from "../services/update-application-service";

export interface ApplicationControllerProps {
    getApplicationsService: GetApplicationsService;
    createApplicationService: CreateApplicationService;
    updateApplicationService: UpdateApplicationService;
}