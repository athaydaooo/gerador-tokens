import { TokenRepository } from "@modules/token/repository/token-repository"
import { Application, Token } from "@prisma/client"
import { AppError } from "@shared/errors/app-error"
import { FIND_TOKEN_VERIFY, PENDING_TOKEN } from "@modules/token/errors"
import { addMinutes } from "@shared/helpers/date-manager"
import { VerifyTokenService } from "@modules/token/services/verify-token-service"

let tokenRepository: TokenRepository
let verifyTokenService: VerifyTokenService

jest.mock('@modules/token/repository/token-repository')

const application: Application = {
  id: 1,
  created_at: new Date(),
  enabled: true,
  name: 'Test Application',
  token: '123456',
  updated_at: new Date(),
}

const verifyTokenParams = {
  token: '123456',
  application,
  user: "tester00",
}
const verifiableToken = {
  id: 1,
  user: verifyTokenParams.user,
  token: '123456',
  destination: "5511911223344",
  type: 'SMS',
  created_at: addMinutes(new Date(), -1),
  expires_at: addMinutes(new Date(), 4),
  isVerified: false,
  id_application: 1
} as Token

const alreadyVerifiedToken = {
  id: 1,
  user: verifyTokenParams.user,
  token: '123456',
  destination: "5511911223344",
  type: 'SMS',
  created_at: addMinutes(new Date(), -1),
  expires_at: addMinutes(new Date(), 4),
  isVerified: true,
  id_application: 1
} as Token

const expiredToken = {
  id: 1,
  user: verifyTokenParams.user,
  token: '123456',
  destination: "5511911223344",
  type: 'SMS',
  created_at: addMinutes(new Date(), -6),
  expires_at: addMinutes(new Date(), -1),
  isVerified: false,
  id_application: 1
} as Token


describe('Verify token', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    tokenRepository = new TokenRepository()
    verifyTokenService = new VerifyTokenService({
      tokenRepository,
    })
  })

  it('Should verify token', async () => {

    (tokenRepository.findByToken as jest.Mock).mockResolvedValue(verifiableToken);

    const verifiedToken = await verifyTokenService.execute(
      verifyTokenParams.token,
      verifyTokenParams.application,
      verifyTokenParams.user,
    )

    expect(tokenRepository.findByToken).toBeCalledTimes(1)
    expect(tokenRepository.findByToken).toHaveBeenCalledWith(verifyTokenParams.token, verifyTokenParams.application.id, verifyTokenParams.user)

    expect(verifiedToken.status).toBe(true)

  })


  it('Should return token not found', async () => {

    (tokenRepository.findByToken as jest.Mock).mockResolvedValue(null);

    const verifiedToken = await verifyTokenService.execute(
      verifyTokenParams.token,
      verifyTokenParams.application,
      verifyTokenParams.user,
    )

    expect(tokenRepository.findByToken).toBeCalledTimes(1)
    expect(tokenRepository.findByToken).toHaveBeenCalledWith(verifyTokenParams.token, verifyTokenParams.application.id, verifyTokenParams.user)

    expect(verifiedToken).toThrow(AppError)
    expect(verifiedToken).toBe(FIND_TOKEN_VERIFY)

  })

  it('Should throw error because of a already verified token', async () => {

    (tokenRepository.findByToken as jest.Mock).mockResolvedValue(alreadyVerifiedToken);

    const verifiedToken = await verifyTokenService.execute(
      verifyTokenParams.token,
      verifyTokenParams.application,
      verifyTokenParams.user,
    )

    expect(tokenRepository.findByToken).toBeCalledTimes(1)
    expect(tokenRepository.findByToken).toHaveBeenCalledWith(verifyTokenParams.token, verifyTokenParams.application.id, verifyTokenParams.user)

    expect(verifiedToken.status).toBe(false)
  })

  it('Should throw error because of a expired token', async () => {

    (tokenRepository.findByToken as jest.Mock).mockResolvedValue(expiredToken);

    const verifiedToken = await verifyTokenService.execute(
      verifyTokenParams.token,
      verifyTokenParams.application,
      verifyTokenParams.user,
    )

    expect(tokenRepository.findByToken).toBeCalledTimes(1)
    expect(tokenRepository.findByToken).toHaveBeenCalledWith(verifyTokenParams.token, verifyTokenParams.application.id, verifyTokenParams.user)

    expect(verifiedToken.status).toBe(false)
  })

})
