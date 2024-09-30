import { UpdateApplicationService } from "../../../modules/application/services/update-application-service";
import { IApplicationRepository } from "../../../modules/application/repository/i-application-repository";
import { Application } from "@prisma/client";
import mockedApplicationRepository from "../repository/mocked-application-repository";

describe('UpdateApplicationService', () => {
    let updateApplicationService: UpdateApplicationService;
    let applicationRepository: IApplicationRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        applicationRepository = mockedApplicationRepository
        updateApplicationService = new UpdateApplicationService({ applicationRepository });
    });

    it('should update an application with given parameters', async () => {
        const application_id = 1;
        const token = 'new-token';
        const name = 'new-name';
        const enable = true;

        const updatedApplication: Application = {
            id: application_id,
            token,
            name,
            enabled: enable,
            created_at: new Date(),
            updated_at: new Date()
        };

        (applicationRepository.update as jest.Mock).mockResolvedValue(updatedApplication);

        const result = await updateApplicationService.execute(application_id, token, name, enable);

        expect(applicationRepository.update).toHaveBeenCalledWith(application_id, { token, name, enabled: enable });
        expect(result).toEqual(updatedApplication);
    });

    it('should update an application with partial parameters', async () => {
        const application_id = 1;
        const name = 'new-name';

        const updatedApplication: Application = {
            id: application_id,
            token: 'existing-token',
            name,
            enabled: true,
            created_at: new Date(),
            updated_at: new Date()
        };

        (applicationRepository.update as jest.Mock).mockResolvedValue(updatedApplication);

        const result = await updateApplicationService.execute(application_id, undefined, name);

        expect(applicationRepository.update).toHaveBeenCalledWith(application_id, { token: undefined, name, enabled: undefined });
        expect(result).toEqual(updatedApplication);
    });
});