import { Router } from 'express'
import { TokenController } from '../controller/token-controller'
import { TokenRepository } from '../repository/token-repository'

import { CreateTokenService } from '../services/create-token-service'
import { SendTokenService } from '../services/send-token-service'
import { VerifyTokenService } from '../services/verify-token-service'
import { MessageTriggerHub } from '../clients/message-trigger-hub'
import { ApplicationRepository } from '@modules/application/repository/application-repository'
import { GetApplicationServiceById } from '@modules/application/services/get-application-by-id'
import { FakeMessageTriggerHub } from 'src/tests/token/clients/fake-message-trigger-hub'
import { CheckTokenService } from '../services/check-token-service'

const tokenRepository = new TokenRepository()
const applicationRepository = new ApplicationRepository()
const messageTriggerHub = new FakeMessageTriggerHub()

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

tokenRouter.post('/create', wrapper(tokenController.createToken.bind(tokenController)))
tokenRouter.post('/verify', wrapper(tokenController.verifyToken.bind(tokenController)))
tokenRouter.post('/resend', wrapper(tokenController.resendToken.bind(tokenController)))

export default tokenRouter
