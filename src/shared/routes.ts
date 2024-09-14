import { Router } from 'express'
import { healthcheckRoutes } from '@modules/healthcheck/routes'
import tokenRouter from '@modules/token/routes/token-routes'
import applicationRouter from '@modules/application/routes/application-routes'
import { registerRequest } from './middleware/register-request'

const routes = Router()

routes.use(registerRequest)
routes.use('', healthcheckRoutes)
routes.use('/token', tokenRouter)
routes.use('/application', applicationRouter)

export { routes }
