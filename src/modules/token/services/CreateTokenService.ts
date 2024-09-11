import { Application, Token} from "@prisma/client";
import DateManager from "../../../shared/helpers/dateManager";
import tokenGenerator from "../../../shared/helpers/tokenGenerator";
import { TokenRepository } from "../repository/tokenRepository";

interface TokenServiceProps {
  tokenRepository: TokenRepository
}

const dateManager = new DateManager()
const tokenLive = Number(process.env.TOKEN_LIVE)
const tokenLength = Number(process.env.TOKEN_LENGTH)

export class CreateTokenService {

  private props : TokenServiceProps
  constructor(props : TokenServiceProps) {
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
      token: tokenGenerator(tokenLength),
      type: tokenType,
      created_at: new Date(),
      expires_at: dateManager.addMinutes(new Date(),tokenLive),
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
      token_live: tokenLive,
      already_created,
    }
  }
}
