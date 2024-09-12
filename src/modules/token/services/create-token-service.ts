import { Application, Token} from "@prisma/client";
import { addMinutes } from "../../../shared/helpers/date-manager";
import tokenGenerator from "../../../shared/helpers/token-generator";
import { TokenRepository } from "../repository/token-repository";

interface TokenServiceProps {
  tokenRepository: TokenRepository
}
export class CreateTokenService {
  private tokenLive : number
  private tokenLength : number
  private props : TokenServiceProps

  constructor(props : TokenServiceProps) {
    this.tokenLive = Number(process.env.TOKEN_LIVE)
    this.tokenLength = Number(process.env.TOKEN_LENGTH)
    this.props = {
      ...props
    }
  }

  async execute (tokenType:string, application: Application, user:string, destination:string) {
    let already_created = false;

    let token : Token = {
      id:0,
      user: user,
      id_application: application.id,
      destination: destination,
      token: tokenGenerator(this.tokenLength),
      type: tokenType,
      created_at: new Date(),
      expires_at: addMinutes(new Date(),this.tokenLive),
      isVerified: false
    }

    const foundToken = await this.props.tokenRepository.findByCallerUser(token.id_application,token.user, false,tokenType)
    
    if(foundToken.length > 0) {
      token = foundToken[0]
      already_created = true
    }

    if(!already_created) await this.props.tokenRepository.create(token)
    
    return {
      user: token.user,
      application: application.name,
      type: token.type,
      destination: token.destination,
      token: token.token,
      created_at: token.created_at,
      expires_at: token.expires_at,
      token_live: this.tokenLive,
      already_created,
    }
  }
}
