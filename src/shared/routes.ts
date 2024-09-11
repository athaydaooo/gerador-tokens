import { Router } from 'express'
import tokenRouter from '@modules/token/routes/tokenRoutes'

const routes = Router()

routes.use('/token', tokenRouter)

export { routes }
