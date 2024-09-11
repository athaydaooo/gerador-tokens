import express from 'express'
import 'dotenv/config'
import cors from 'cors'

import { errorHandler } from './middleware/error-handler'
import { routes } from './routes'
import { bearerVerifier } from './middleware/bearer-verifier'

const app = express()

app.use(cors())

app.use(express.json())

app.use(routes)

app.use(errorHandler)

app.use(bearerVerifier)

app.listen(process.env.PORT || 3000, () => {
  console.log(`🚀 Server started on port ${process.env.PORT || 3000}`)
})
