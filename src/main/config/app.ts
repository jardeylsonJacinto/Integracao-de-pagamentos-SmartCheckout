import express, { Express } from 'express'
import setupMiddlewares from '../config/middlewares'
import SetupStaticFiles from './static-files'

export const SetupApp = async (): Promise<Express> => {
  const app = express()
  SetupStaticFiles(app)
  setupMiddlewares(app)
  return app
}
