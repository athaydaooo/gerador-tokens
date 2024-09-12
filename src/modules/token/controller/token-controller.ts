import { Request, Response } from 'express'
import { TokenControllerProps } from '../types/token-controller';
import createTokenSchema from '../validations/create-token-schema';
import verifyTokenSchema from '../validations/verify-token-schema';

export class TokenController {
  private props: TokenControllerProps
  constructor(props: TokenControllerProps) {
    this.props = props
  }

  async createToken(request: Request, response: Response) {
    const body = createTokenSchema.parse(request.body)
    const applicationId = Number(request.headers['application-id'])

    const application = await this.props.getApplicationServiceById.execute(applicationId)
    const createdToken = await this.props.createTokenService.execute(body.tokenType, application, body.user, body.destination)
    const sentToken = await this.props.sendTokenService.execute(createdToken.destination, createdToken.type, createdToken.token)

    const res = {
      destination: sentToken.destination,
      token: createdToken.token,
      type: body.tokenType,
      token_live_minutes: createdToken.token_live,
      expires_at: createdToken.expires_at,
      created_at: createdToken.created_at,
      already_created: createdToken.already_created,
    }

    response.status(200).json(res)
  }

  async verifyToken(request: Request, response: Response) {
    const body = verifyTokenSchema.parse(request.body)
    const applicationId = Number(request.headers['application-id'])
    const application = await this.props.getApplicationServiceById.execute(applicationId)

    const verifiedToken = await this.props.verifyTokenService.execute(body.token, application, body.user)

    response.status(200).json(verifiedToken)
  }
}
