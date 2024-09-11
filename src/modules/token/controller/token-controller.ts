import { Request, Response } from 'express'
import { INVALID_DESTINATION_PARAMETER, INVALID_TOKENTYPE_PARAMETER, MISSING_BEARER_PARAMETER, MISSING_DESTINATION_PARAMETER, MISSING_TOKENTYPE_PARAMETER, MISSING_TOKEN_PARAMETER, MISSING_USER_PARAMETER } from '../errors'
import { createTokenBody, TokenControllerProps, verifyTokenBody } from '../types/token-controller';

const tokenTypes = [
  {type: 'SMS', regex: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/},
  {type: 'EMAIL', regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/},
]

export class TokenController {
  private props : TokenControllerProps
  constructor(props : TokenControllerProps) {
    this.props = props
  }
  
  fetch = (request: Request, response: Response) => {
    const { id } = request.params

    response.status(201).send(`Requisição recebida com sucesso! ${id}`)
  }

  async createToken (request: Request, response: Response) {
    const body = request.body as createTokenBody
    const applicationId = Number(request.headers['application-id'])
    const application = await this.props.getApplicationServiceById.execute(applicationId)

    if(!body.user) throw MISSING_USER_PARAMETER
    if(!body.tokenType) throw MISSING_TOKENTYPE_PARAMETER
    if(!body.destination) throw MISSING_DESTINATION_PARAMETER
    
    const foundType = tokenTypes.find((element) => element.type === body.tokenType)

    if(!foundType) throw INVALID_TOKENTYPE_PARAMETER
    if(!foundType.regex.test(body.destination)) throw INVALID_DESTINATION_PARAMETER
    
    const createdToken = await this.props.createTokenService.execute(body.tokenType,application,body.user,body.destination)

    const sentToken = await this.props.sendTokenService.execute(createdToken.destination,createdToken.type,createdToken.token)

    const res = {
      destination:sentToken.destination,
      token:createdToken.token,
      type: foundType.type,
      token_live_minutes: createdToken.token_live,
      expires_at: createdToken.expires_at,
      created_at: createdToken.created_at,
      already_created: createdToken.already_created,
    }

    response.status(200).json(res)
  }

  async verifyToken (request: Request, response: Response) {
    const body = request.body as verifyTokenBody
    const applicationId = Number(request.headers['application-id'])
    const application = await this.props.getApplicationServiceById.execute(applicationId)
    
    if(!body.user) throw MISSING_USER_PARAMETER
    if(!body.token) throw MISSING_TOKEN_PARAMETER

    const verifiedToken = await this.props.verifyTokenService.execute(body.token,application,body.user)

    response.status(200).json(verifiedToken)
  }
}
