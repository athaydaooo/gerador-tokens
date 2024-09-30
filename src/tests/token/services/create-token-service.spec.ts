import { TokenRepository } from "@modules/token/repository/token-repository"
import { CreateTokenService } from "../../../modules/token/services/create-token-service"
import { Application, Token } from "@prisma/client"
import { AppError } from "@shared/errors/app-error"
import { PENDING_TOKEN } from "@modules/token/errors"
import { addMinutes } from "@shared/helpers/date-manager"
import mockedTokenRepository from "../repository/mockedTokenRepository"
import { ITokenRepository } from "@modules/token/repository/i-token-repository"

let tokenRepository: ITokenRepository
let createTokenService: CreateTokenService

jest.mock('@modules/token/repository/token-repository')

const application: Application = {
  id: 1,
  created_at: new Date(),
  enabled: true,
  name: 'Test Application',
  token: '123456',
  updated_at: new Date(),
}

const createTokenParams = {
  tokenType: 'SMS',
  application,
  user: "tester00",
  destination: "5511911223344"
}

const pendingTokens = [{
  id: 1,
  user: createTokenParams.user,
  token: '123456',
  destination: createTokenParams.destination,
  type: createTokenParams.tokenType,
  created_at: addMinutes(new Date(), -1),
  expires_at: addMinutes(new Date(), 4),
  isVerified: false,
  id_application: 1
} as Token]


describe('Create token', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    tokenRepository = mockedTokenRepository
    createTokenService = new CreateTokenService({
      tokenRepository,
    })
  })


  it('Should create a token successfuly', async () => {

    (tokenRepository.findByCallerUser as jest.Mock).mockResolvedValue([]);

    const createdToken = await createTokenService.execute(
      createTokenParams.tokenType,
      createTokenParams.application,
      createTokenParams.user,
      createTokenParams.destination
    )

    expect(tokenRepository.findByCallerUser).toBeCalledTimes(1)
    expect(tokenRepository.findByCallerUser).toHaveBeenCalledWith(application.id, createTokenParams.user, false, createTokenParams.tokenType);

    expect(tokenRepository.create).toBeCalledTimes(1)

    expect(createdToken).toBeTruthy()

  })

  it('Should throw error because of a pending token', async () => {

    (tokenRepository.findByCallerUser as jest.Mock).mockResolvedValue(pendingTokens);

    await createTokenService.execute(
      createTokenParams.tokenType,
      createTokenParams.application,
      createTokenParams.user,
      createTokenParams.destination
    ).catch((e) => {
      expect(e).toBe(PENDING_TOKEN)
    })

    expect(tokenRepository.findByCallerUser).toBeCalledTimes(1)
    expect(tokenRepository.findByCallerUser).toHaveBeenCalledWith(application.id, createTokenParams.user, false, createTokenParams.tokenType);
    expect(tokenRepository.create).toBeCalledTimes(0)

  })

})
