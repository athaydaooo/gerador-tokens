import express from 'express'
import 'dotenv/config'
import cors from 'cors'

import { errorHandler } from './middleware/error-handler'
import { routes } from './routes'
import { bearerVerifier } from './middleware/bearer-verifier'

const internalPort = process.env.API_INTERNAL_PORT || 3000
const externalPort = process.env.API_EXTERNAL_PORT || 3000

const app = express()

app.use(cors())

app.use(express.json())

app.use(routes)

app.use(errorHandler)

app.use(bearerVerifier)

app.listen(process.env.API_INTERNAL_PORT || 3000, () => {
  console.log(`🚀 Server started on container port ${internalPort} and external port ${externalPort}`)
})

process.on('SIGTERM', () => process.exit())
