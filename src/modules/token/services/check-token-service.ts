import { Application } from "@prisma/client";
import { TokenRepository } from "../repository/token-repository";
import CreatedToken from "../entities/created-token";
import { NO_PENDING_TOKEN } from "../errors";
import CheckTokenServiceMapper from "../mappers/check-token-mapper";
import { ITokenRepository } from "../repository/i-token-repository";

interface TokenServiceProps {
  tokenRepository: ITokenRepository
}
export class CheckTokenService {
  private tokenLive: number
  private props: TokenServiceProps

  constructor(props: TokenServiceProps) {
    this.tokenLive = Number(process.env.TOKEN_LIVE)
    this.props = {
      ...props
    }
  }

  async execute(tokenType: string, application: Application, user: string): Promise<CreatedToken> {

    const foundToken = await this.props.tokenRepository.findByCallerUser(application.id, user, false, tokenType)

    if (foundToken.length === 0)
      throw NO_PENDING_TOKEN
    const token = foundToken[0]
    return CheckTokenServiceMapper.toService(token, application, this.tokenLive)
  }
}
