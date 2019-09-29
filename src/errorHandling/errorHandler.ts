import { NextFunction, Request, Response } from 'express' // eslint-disable-line no-unused-vars
import HttpError from './httpError' // eslint-disable-line no-unused-vars

function errorHandler(error: HttpError, request: Request, response: Response, next: NextFunction) { // eslint-disable-line no-unused-vars
  response
    .status(error.status)
    .send(error)
}

export default errorHandler