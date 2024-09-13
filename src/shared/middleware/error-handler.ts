import { NextFunction, Request, Response } from 'express'
import { AppError } from '../errors/app-error'
import { z } from 'zod'

export const errorHandler = (err: Error, request: Request, response: Response, next: NextFunction) => {
  console.log(err)

  if (err instanceof z.ZodError) {
    if (err.message.includes('|~|')) {
      return err.errors.map((err) => {
        const [errorCode, erroMessage, statusCode] =
          err.message.split(' |~| ')
        const finalStatusCode = statusCode ? Number(statusCode) : 400
        const finalErrorCode = (errorCode && errorCode !== 'undefined') ? errorCode : finalStatusCode
        return response.status(finalStatusCode).json({
          status: finalErrorCode,
          message: erroMessage,
        })
      })
    }

    return response.status(400).json({
      status: 400,
      message: err.message,
    })
  }

  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: err.errorCode ? err.errorCode : err.statusCode,
      message: err.message,
    })
  }

  return response.status(500).json({
    status: 500,
    message: 'Internal server error',
  })
}
