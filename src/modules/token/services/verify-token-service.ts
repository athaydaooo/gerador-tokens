import { Application } from "@prisma/client"
import { FIND_TOKEN_VERIFY } from "../errors"
import { TokenRepository } from "../repository/token-repository"
import VerifyTokenServiceMapper from "../mappers/service/verify-token-service-mapper"

interface TokenServiceProps {
  tokenRepository: TokenRepository
}

export class VerifyTokenService {

  private props: TokenServiceProps
  constructor(props: TokenServiceProps) {
    this.props = {
      ...props
    }
  }

  async execute(token: string, application: Application, user: string) {
    let isVerificable = true

    const foundToken = await this.props.tokenRepository.findByToken(token, application.id, user)

    if (!foundToken) throw FIND_TOKEN_VERIFY

    if (foundToken.isVerified === true || foundToken.expires_at.getMilliseconds < new Date().getMilliseconds) {
      isVerificable = false
    }

    if (isVerificable) {
      foundToken.isVerified = true
      await this.props.tokenRepository.update(foundToken)
    }

    return VerifyTokenServiceMapper.toService(isVerificable, foundToken, application)
  }
}
