import { Router } from 'express'
import { healthcheckRoutes } from '@modules/healthcheck/routes'
import tokenRouter from '@modules/token/routes/token-routes'

const routes = Router()

routes.use('', healthcheckRoutes)
routes.use('/token', tokenRouter)

export { routes }
