import { NextFunction, Request, Response } from 'express'
import { AppError } from '../errors/app-error'

export const errorHandler = (err: Error, request: Request, response: Response, next: NextFunction) => {
  console.log(err)

  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      code: err.errorCode,
      message: err.message,
    })
  }

  return response.status(500).json({
    status: 'Error',
    message: 'Internal server error',
  })
}
