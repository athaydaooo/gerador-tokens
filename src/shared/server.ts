import express from 'express'
import 'dotenv/config'
import cors from 'cors'

import { errorHandler } from './middleware/error-handler'
import { routes } from './routes'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from '../../docs/swagger-output.json'


const internalPort = process.env.API_INTERNAL_PORT || 3000
const externalPort = process.env.API_EXTERNAL_PORT || 3000

const app = express()

app.use(cors())

app.use(express.json())

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(routes)

app.use(errorHandler)

app.listen(process.env.API_INTERNAL_PORT || 3000, () => {
  console.log(`🚀 Server started on container port ${internalPort} and external port ${externalPort}`)
})

//added because restarts when file saves were not working during yarn run dev
process.on('SIGTERM', () => process.kill(process.pid, 'SIGINT'))
