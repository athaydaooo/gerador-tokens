import { Router } from 'express'
import { TokenController } from '../controller/token-controller'
import { TokenRepository } from '../repository/token-repository'

import { CreateTokenService } from '../services/create-token-service'
import { SendTokenService } from '../services/send-token-service'
import { VerifyTokenService } from '../services/verify-token-service'
import { MessageTriggerHub } from '../clients/message-trigger-hub'
import { ApplicationRepository } from '@modules/application/repository/application-repository'
import { CheckTokenService } from '../services/check-token-service'
import { GetApplicationServiceById } from '@modules/application/services/get-application-by-id-service'
import { bearerUserVerifier } from '@shared/middleware/bearer-user-verifier'
import { MessageTriggerHubFake } from 'src/tests/token/clients/messagetriggehub-fake'

const tokenRepository = new TokenRepository()
const applicationRepository = new ApplicationRepository()
const messageTriggerHub = new MessageTriggerHub()

const createTokenService = new CreateTokenService({ tokenRepository })
const sendTokenService = new SendTokenService({ messageTriggerHub })
const checkTokenService = new CheckTokenService({ tokenRepository })
const verifyTokenService = new VerifyTokenService({ tokenRepository })
const getApplicationServiceById = new GetApplicationServiceById({ applicationRepository })

const tokenController = new TokenController(
  {
    createTokenService,
    sendTokenService,
    checkTokenService,
    verifyTokenService,
    getApplicationServiceById
  })

// Consulte o `REAMDE-PromisseWrapper.md` para entender o uso do wrapper
let wrapper =
  (fn: any) =>
    (...args: any) =>
      fn(...args).catch(args[2])

const tokenRouter = Router()

tokenRouter.use(bearerUserVerifier)
tokenRouter.post('/create', wrapper(tokenController.createToken.bind(tokenController))
  /* 
    #swagger.tags = ['Token']  
    #swagger.description = 'Endpoint to create and send a token' 
    #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Create token input.',
        required: true,
        schema: { $ref: "#/definitions/CreateTokenInput" }
    } 
  */
)

tokenRouter.post('/verify', wrapper(tokenController.verifyToken.bind(tokenController))
  /* 
    #swagger.tags = ['Token']  
    #swagger.description = 'Endpoint to verify a token' 
    #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Verify token input.',
        required: true,
        schema: { $ref: "#/definitions/VerifyTokenInput" }
    } 
  */
)

tokenRouter.post('/resend', wrapper(tokenController.resendToken.bind(tokenController))
  /* 
    #swagger.tags = ['Token']  
    #swagger.description = 'Endpoint to re-send a token' 
    #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Resend token input.',
        required: true,
        schema: { $ref: "#/definitions/ResendTokenInput" }
    } 
  */
)

export default tokenRouter
