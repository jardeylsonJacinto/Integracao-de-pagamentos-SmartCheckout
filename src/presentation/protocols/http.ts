export type HttpResponse = {
  params: any
  statusCode: number
  body: any
  protocol?: 'http' | 'https' | undefined
  host?: string | undefined
}
