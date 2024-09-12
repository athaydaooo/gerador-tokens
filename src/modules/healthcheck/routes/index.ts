import { Router } from 'express'
const healthcheckRoutes = Router()

healthcheckRoutes.get('/healthcheck', (_, response) =>
  response.status(200).send()
)

export { healthcheckRoutes }
