import { PaymentController } from '../../presentation/controller/payments'
import { Controller } from '../../presentation/protocols/controller'

export const makeSignUpController = (): Controller => {
  const controller = new PaymentController()
  return controller
}
