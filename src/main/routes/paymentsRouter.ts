import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeSignUpController } from '../factories/makeSignUpController'

export default (router: Router): void => {
  router.get(
    '/api/checkout/:id/:email/:description/:amount',
    adaptRoute(makeSignUpController()),
  )
}
