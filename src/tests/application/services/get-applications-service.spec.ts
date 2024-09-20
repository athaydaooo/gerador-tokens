import { GetApplicationsService } from "../../../modules/application/services/get-applications-service";
import { IApplicationRepository } from "../../../modules/application/repository/i-application-repository";
import mockedApplicationRepository from "../repository/mocked-application-repository";
import { Application } from "@prisma/client";
import { APPLICATION_NOT_FOUND } from "@modules/application/errors";

describe('GetApplicationsService', () => {
  let getApplicationsService: GetApplicationsService;
  let applicationRepository: jest.Mocked<IApplicationRepository>;

  beforeEach(() => {
    applicationRepository = mockedApplicationRepository

    getApplicationsService = new GetApplicationsService({ applicationRepository });
  });

  it('should return applications when they exist', async () => {
    const mockApplications = [{ id: 1, name: 'App1' } as Application, { id: 2, name: 'App2' } as Application];
    applicationRepository.getAll.mockResolvedValue(mockApplications);

    const result = await getApplicationsService.execute();

    expect(result).toEqual(mockApplications);
    expect(applicationRepository.getAll).toHaveBeenCalledTimes(1);
  });

  it('should throw APPLICATION_NOT_FOUND when no applications exist', async () => {
    applicationRepository.getAll.mockResolvedValue(null);

    const result = await getApplicationsService.execute();

    expect(applicationRepository.getAll).toHaveBeenCalledTimes(1);
    expect(result).rejects.toBe(APPLICATION_NOT_FOUND);

  });
});