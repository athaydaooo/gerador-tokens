import { NAME_MUST_BE_FILL, TOKEN_MUST_BE_FILL } from "@modules/application/errors";
import { IApplicationRepository } from "@modules/application/repository/i-application-repository";
import { CreateApplicationService } from "@modules/application/services/create-application-service";
import { Application } from "@prisma/client";
import mockedApplicationRepository from "../repository/mocked-application-repository";

let applicationRepository: IApplicationRepository;
let createApplicationService: CreateApplicationService;
const createApplicationParams = {
    enable: true,
    token: '123456',
    name: 'Test Application'
};
const createdApplication: Application = {
    id: 1,
    created_at: new Date(),
    enabled: createApplicationParams.enable,
    name: createApplicationParams.name,
    token: createApplicationParams.token,
    updated_at: new Date(),
};

describe('Create application', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        applicationRepository = mockedApplicationRepository;
        createApplicationService = new CreateApplicationService({ applicationRepository });
    });

    it('Should create an application successfully', async () => {
        (applicationRepository.create as jest.Mock).mockResolvedValue(createdApplication);

        const application = await createApplicationService.execute(
            createApplicationParams.enable,
            createApplicationParams.token,
            createApplicationParams.name
        );

        expect(applicationRepository.create).toBeCalledTimes(1);
        expect(applicationRepository.create).toHaveBeenCalledWith(expect.objectContaining({
            name: createApplicationParams.name,
            token: createApplicationParams.token,
            enabled: createApplicationParams.enable,
        }));

        expect(application).toBeTruthy();
        expect(application).toEqual(createdApplication);
    });

    it('Should throw an error if name is empty', async () => {
        (applicationRepository.create as jest.Mock).mockRejectedValue(NAME_MUST_BE_FILL);

        await createApplicationService.execute(
            createApplicationParams.enable,
            createApplicationParams.token,
            ''
        ).catch((e) => {
            expect(e).toBe(NAME_MUST_BE_FILL);
        })

        expect(applicationRepository.create).toBeCalledTimes(1);
        expect(applicationRepository.create).toHaveBeenCalledWith(expect.objectContaining({
            name: '',
            token: createApplicationParams.token,
            enabled: createApplicationParams.enable,
            created_at: expect.any(Date),
            updated_at: expect.any(Date)
        }))

    });

    it('Should throw an error if token is empty', async () => {

        (applicationRepository.create as jest.Mock).mockRejectedValue(TOKEN_MUST_BE_FILL);

        await createApplicationService.execute(
            createApplicationParams.enable,
            '',
            createApplicationParams.name
        ).catch((e) => {
            expect(e).toBe(TOKEN_MUST_BE_FILL);
        });

        expect(applicationRepository.create).toBeCalledTimes(1);
        expect(applicationRepository.create).toHaveBeenCalledWith(expect.objectContaining({
            name: createApplicationParams.name,
            token: '',
            enabled: createApplicationParams.enable,
            created_at: expect.any(Date),
            updated_at: expect.any(Date)
        }))

    });
});