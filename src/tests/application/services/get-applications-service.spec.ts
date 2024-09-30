import { GetApplicationsService } from "../../../modules/application/services/get-applications-service";
import { IApplicationRepository } from "../../../modules/application/repository/i-application-repository";
import mockedApplicationRepository from "../repository/mocked-application-repository";
import { Application } from "@prisma/client";
import { APPLICATION_NOT_FOUND } from "@modules/application/errors";

describe('GetApplicationsService', () => {
  let getApplicationsService: GetApplicationsService;
  let applicationRepository: jest.Mocked<IApplicationRepository>;

  beforeEach(() => {
    jest.clearAllMocks();
    applicationRepository = mockedApplicationRepository
    getApplicationsService = new GetApplicationsService({ applicationRepository });
  });

  it('should return applications when they exist', async () => {
    const mockApplications: Application[] = [{ id: 1, name: 'App1' } as Application, { id: 2, name: 'App2' } as Application];

    (applicationRepository.getAll as jest.Mock).mockResolvedValue(mockApplications)

    const result = await getApplicationsService.execute();

    expect(result).toEqual(mockApplications);
    expect(applicationRepository.getAll).toHaveBeenCalledTimes(1);
  });

  it('should throw APPLICATION_NOT_FOUND when no applications exist', async () => {

    (applicationRepository.getAll as jest.Mock).mockResolvedValue(null)


    await getApplicationsService.execute().catch((e) => {
      expect(e).toBe(APPLICATION_NOT_FOUND);
    })

    expect(applicationRepository.getAll).toHaveBeenCalledTimes(1);

  });
});