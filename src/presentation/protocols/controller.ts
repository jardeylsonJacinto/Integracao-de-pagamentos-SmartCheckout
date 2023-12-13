import { HttpResponse } from '../protocols/http'

export interface Controller<T = any> {
  checkout: (request: T) => Promise<HttpResponse>
}
