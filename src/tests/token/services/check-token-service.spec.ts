import { TokenRepository } from "@modules/token/repository/token-repository"
import { Application, Token } from "@prisma/client"
import { AppError } from "@shared/errors/app-error"
import { NO_PENDING_TOKEN, PENDING_TOKEN } from "@modules/token/errors"
import { addMinutes } from "@shared/helpers/date-manager"
import { CheckTokenService } from "@modules/token/services/check-token-service"

let tokenRepository: TokenRepository
let checkTokenService: CheckTokenService

jest.mock('@modules/token/repository/token-repository')

const application: Application = {
  id: 1,
  created_at: new Date(),
  enabled: true,
  name: 'Test Application',
  token: '123456',
  updated_at: new Date(),
}

const checkTokenParams = {
  tokenType: 'SMS',
  application,
  user: "tester00"
}

const pendingTokens = [{
  id: 1,
  user: checkTokenParams.user,
  token: '123456',
  destination: "5511911223344",
  type: checkTokenParams.tokenType,
  created_at: addMinutes(new Date(), -1),
  expires_at: addMinutes(new Date(), 4),
  isVerified: false,
  id_application: 1
} as Token]


describe('Check token', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    tokenRepository = new TokenRepository()
    checkTokenService = new CheckTokenService({
      tokenRepository,
    })
  })


  it('Should create a token successfuly', async () => {

    (tokenRepository.findByCallerUser as jest.Mock).mockResolvedValue(pendingTokens);

    const checkedToken = await checkTokenService.execute(
      checkTokenParams.tokenType,
      checkTokenParams.application,
      checkTokenParams.user,
    )

    expect(tokenRepository.findByCallerUser).toBeCalledTimes(1)
    expect(tokenRepository.findByCallerUser).toHaveBeenCalledWith(application.id, checkTokenParams.user, false, checkTokenParams.tokenType)

    expect(checkedToken).toBeTruthy()

  })

  it('Should throw error because of a pending token', async () => {

    (tokenRepository.findByCallerUser as jest.Mock).mockResolvedValue([]);

    const checkedToken = await checkTokenService.execute(
      checkTokenParams.tokenType,
      checkTokenParams.application,
      checkTokenParams.user
    )

    expect(tokenRepository.findByCallerUser).toBeCalledTimes(1)
    expect(tokenRepository.findByCallerUser).toHaveBeenCalledWith(application.id, checkTokenParams.user, false, checkTokenParams.tokenType);

    expect(checkedToken).toThrow(AppError)
    expect(checkedToken).toBe(NO_PENDING_TOKEN)

  })

})
