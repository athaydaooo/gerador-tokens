import { Router } from 'express'
import { healthcheckRoutes } from '@modules/healthcheck/routes'
import tokenRouter from '@modules/token/routes/token-routes'
import { bearerVerifier } from './middleware/bearer-verifier'

const routes = Router()

routes.use(bearerVerifier)
routes.use('', healthcheckRoutes)
routes.use('/token', tokenRouter)

export { routes }
