import { ApplicationRepository } from '@modules/application/repository/applicationRepository'
import { Router } from 'express'
import { TokenController } from '../controller/tokenController'
import { TokenRepository } from '../repository/tokenRepository'

import { CreateTokenService } from '../services/CreateTokenService'
import { SendTokenService } from '../services/SendTokenService'
import { VerifyTokenService } from '../services/VerifyToken'
import { MessageTriggerHub } from '../clients/message-trigger-hub'
import { GetApplicationServiceById } from '@modules/application/services/GetApplicationServiceById'

const tokenRepository = new TokenRepository()
const applicationRepository = new ApplicationRepository()
const messageTriggerHubClient = new MessageTriggerHub()

const createTokenService = new CreateTokenService( { tokenRepository } )
const sendTokenService = new SendTokenService( { messageTriggerHubClient } )
const verifyTokenService = new VerifyTokenService( { tokenRepository } )
const getApplicationServiceById = new GetApplicationServiceById( { applicationRepository } )

const tokenController = new TokenController( 
  { 
    createTokenService, 
    sendTokenService, 
    verifyTokenService,
    getApplicationServiceById
  })

// Consulte o `REAMDE-PromisseWrapper.md` para entender o uso do wrapper
let wrapper =
  (fn:any) =>
  (...args : any) =>
    fn(...args).catch(args[2])

const tokenRouter = Router()

tokenRouter.post('/create', wrapper(tokenController.createToken.bind(tokenController)))
tokenRouter.get('/verify', wrapper(tokenController.verifyToken.bind(tokenController)))

export default tokenRouter
