import { ServerError } from '../errors/server-error'
import { HttpResponse } from '../protocols'

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack || 'No stack trace available'),
  params: 'error',
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
  params: 'error',
})
