import { Application } from "@prisma/client"
import { FIND_TOKEN_VERIFY } from "../errors"
import VerifyTokenMapper from "../mappers/verify-token-mapper"
import { ITokenRepository } from "../repository/i-token-repository"

interface TokenServiceProps {
  tokenRepository: ITokenRepository
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

    if (foundToken.isVerified === true || foundToken.expires_at < new Date()) {
      isVerificable = false
    }

    if (isVerificable) {
      foundToken.isVerified = true
      await this.props.tokenRepository.update(foundToken)
    }

    return VerifyTokenMapper.toService(isVerificable, foundToken, application)
  }
}
