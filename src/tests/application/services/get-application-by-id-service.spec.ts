import { GetApplicationServiceById } from "../../../modules/application/services/get-application-by-id-service";
import { IApplicationRepository } from "@modules/application/repository/i-application-repository";
import mockedApplicationRepository from "../repository/mocked-application-repository";
import { APPLICATION_NOT_FOUND } from "@modules/application/errors";
import { AppError } from "@shared/errors/app-error";

describe('GetApplicationServiceById', () => {

  let applicationRepository: IApplicationRepository;
  let getApplicationServiceById: GetApplicationServiceById;
  const application = { id: 1, name: 'Test Application' };

  beforeEach(() => {
    applicationRepository = mockedApplicationRepository
    getApplicationServiceById = new GetApplicationServiceById({ applicationRepository });
  });

  it('should return application when found', async () => {

    (applicationRepository.findById as jest.Mock).mockResolvedValue(application);

    const result = await getApplicationServiceById.execute(1);

    expect(result).toEqual(application);
    expect(applicationRepository.findById).toHaveBeenCalledWith(1);
  });

  it('should throw APPLICATION_NOT_FOUND when application is not found', async () => {
    (applicationRepository.findById as jest.Mock).mockResolvedValue(null);

    const result = await getApplicationServiceById.execute(application.id);

    expect(applicationRepository.findById).toHaveBeenCalledWith(application.id);
    expect(result).rejects.toThrow(AppError);
    expect(result).rejects.toBe(APPLICATION_NOT_FOUND);

  });
});
