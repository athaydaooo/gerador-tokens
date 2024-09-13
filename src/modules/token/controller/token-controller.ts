import { Request, Response } from 'express'
import { TokenControllerProps } from '../entities/token-controller-props';
import createTokenSchema from '../validations/create-token-schema';
import { CreateTokenMapper } from '../mappers/create-token-mapper';
import verifyTokenSchema from '../validations/verify-token-schema';
import resendTokenSchema from '../validations/resend-token-schema';
import { ResendTokenMapper } from '../mappers/resend-token-mapper';
import VerifyTokenMapper from '../mappers/verify-token-mapper';

export class TokenController {
  private props: TokenControllerProps
  constructor(props: TokenControllerProps) {
    this.props = props
  }

  async createToken(request: Request, response: Response) {
    const {
      destination,
      token_type: tokenType,
      user
    } = createTokenSchema.parse(request.body)
    const applicationId = Number(request.headers['application-id'])

    const application = await this.props.getApplicationServiceById.execute(applicationId)
    const createdToken = await this.props.createTokenService.execute(tokenType, application, user, destination)

    await this.props.sendTokenService.execute(createdToken.destination, createdToken.type, createdToken.token)

    response.status(200).json(CreateTokenMapper.toResponse(createdToken))
  }

  async verifyToken(request: Request, response: Response) {
    const {
      token,
      user
    } = verifyTokenSchema.parse(request.body)
    const applicationId = Number(request.headers['application-id'])
    const application = await this.props.getApplicationServiceById.execute(applicationId)

    const verifiedToken = await this.props.verifyTokenService.execute(token, application, user)

    response.status(verifiedToken.status ? 200 : 409).json(VerifyTokenMapper.toResponse(verifiedToken))
  }

  async resendToken(request: Request, response: Response) {
    const {
      destination,
      token_type: tokenType,
      user
    } = resendTokenSchema.parse(request.body)
    const applicationId = Number(request.headers['application-id'])

    const application = await this.props.getApplicationServiceById.execute(applicationId)

    const checkedToken = await this.props.checkTokenService.execute(tokenType, application, user)

    await this.props.sendTokenService.execute(destination, tokenType, checkedToken.token)

    response.status(200).json(ResendTokenMapper.toResponse(checkedToken))
  }

}
