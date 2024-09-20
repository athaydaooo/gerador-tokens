import { NAME_MUST_BE_FILL, TOKEN_MUST_BE_FILL } from "@modules/application/errors";
import { IApplicationRepository } from "@modules/application/repository/i-application-repository";
import { CreateApplicationService } from "@modules/application/services/create-application-service";
import { Application } from "@prisma/client";
import { AppError } from "@shared/errors/app-error";
import mockedApplicationRepository from "../repository/mockedApplicationRepository";

jest.mock('../../../application/repository/i-application-repository');

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
        const application = await createApplicationService.execute(
            createApplicationParams.enable,
            createApplicationParams.token,
            ''
        );

        expect(applicationRepository.create).toBeCalledTimes(1);
        expect(applicationRepository.create).toHaveBeenCalledWith(expect.objectContaining({
            name: createApplicationParams.name,
            token: createApplicationParams.token,
            enabled: createApplicationParams.enable,
        }))

        expect(application).rejects.toThrow(AppError)
        expect(application).rejects.toBe(NAME_MUST_BE_FILL)
    });

    it('Should throw an error if token is empty', async () => {
        const application = await createApplicationService.execute(
            createApplicationParams.enable,
            '',
            createApplicationParams.name
        );

        expect(applicationRepository.create).toBeCalledTimes(1);
        expect(applicationRepository.create).toHaveBeenCalledWith(expect.objectContaining({
            name: createApplicationParams.name,
            token: createApplicationParams.token,
            enabled: createApplicationParams.enable,
        }))

        expect(application).rejects.toThrow(AppError)
        expect(application).rejects.toBe(TOKEN_MUST_BE_FILL)
    });
});