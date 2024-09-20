import { GetApplicationServiceByToken } from '../../../modules/application/services/get-application-by-token-service';
import { TOKEN_NOT_FOUND } from '../../../modules/application/errors';
import { IApplicationRepository } from '../../../modules/application/repository/i-application-repository';
import mockedApplicationRepository from '../repository/mockedApplicationRepository';

describe('GetApplicationServiceByToken', () => {
  let applicationRepository: IApplicationRepository;
  let getApplicationServiceByToken: GetApplicationServiceByToken;

  beforeEach(() => {
    applicationRepository = mockedApplicationRepository
    getApplicationServiceByToken = new GetApplicationServiceByToken({ applicationRepository });
  });

  it('should return application when token is found', async () => {
    const token = 'valid-token';
    const application = { id: 1, name: 'Test Application' };
    (applicationRepository.findByToken as jest.Mock).mockResolvedValue(application);

    const result = await getApplicationServiceByToken.execute(token);

    expect(result).toBe(application);
    expect(applicationRepository.findByToken).toHaveBeenCalledWith(token);
  });

  it('should throw TOKEN_NOT_FOUND error when token is not found', async () => {
    const token = 'invalid-token';
    (applicationRepository.findByToken as jest.Mock).mockResolvedValue(null)

    const result = await getApplicationServiceByToken.execute(token)

    expect(result).rejects.toBe(TOKEN_NOT_FOUND);
    expect(applicationRepository.findByToken).toHaveBeenCalledWith(token)
  });
});