import { Request, Response } from 'express'
import { TokenControllerProps } from '../entities/token-controller';
import createTokenSchema from '../validations/create-token-schema';
import { CreateTokenResponseMapper } from '../mappers/response/create-token-response-mapper';
import verifyTokenSchema from '../validations/verify-token-schema';
import VerifyTokenResponseMapper from '../mappers/response/verify-token-response-mapper';

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
    await this.props.sendTokenService.execute(createdToken.destination, createdToken.type, createdToken.token)

    response.status(200).json(CreateTokenResponseMapper.toResponse(createdToken))
  }

  async verifyToken(request: Request, response: Response) {
    const body = verifyTokenSchema.parse(request.body)
    const applicationId = Number(request.headers['application-id'])
    const application = await this.props.getApplicationServiceById.execute(applicationId)

    const verifiedToken = await this.props.verifyTokenService.execute(body.token, application, body.user)

    response.status(200).json(VerifyTokenResponseMapper.toResponse(verifiedToken))
  }
}
