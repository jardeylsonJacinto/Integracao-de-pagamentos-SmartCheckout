import { HttpResponse } from '../protocols/http'

export interface Controller<T = any> {
  checkout: (request: T, response: T) => Promise<HttpResponse>
}
