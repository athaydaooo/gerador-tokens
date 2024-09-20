import { GENERAL_DATABASE } from "@modules/token/errors";
import { CreateRequestService } from "../../../modules/request/service/create-request-service";
import mockedRequestsRepository from "../repository/mocked-requests-repository";
import { IRequestRepository } from "@modules/request/repository/i-request-repository";
import { AppError } from "@shared/errors/app-error";

describe('CreateRequestService', () => {
    let createRequestService: CreateRequestService;
    let requestRepository: IRequestRepository;

    beforeEach(() => {
        requestRepository = mockedRequestsRepository
        createRequestService = new CreateRequestService({ requestRepository });
    });

    it('should create a request with the correct data', async () => {
        const endpoint = 'test-endpoint';
        const caller = 'test-caller';
        const request = 'test-request';

        await createRequestService.execute(endpoint, caller, request);

        expect(requestRepository.create).toHaveBeenCalledWith({
            endpoint,
            caller,
            request,
            created_at: expect.any(Date)
        });
    });

    it('should throw an error if requestRepository.create fails', async () => {
        const endpoint = 'test-endpoint';
        const caller = 'test-caller';
        const request = 'test-request';

        (requestRepository.create as jest.Mock).mockRejectedValue(GENERAL_DATABASE);

        await expect(createRequestService.execute(endpoint, caller, request)).rejects.toThrow(AppError);
    });
});