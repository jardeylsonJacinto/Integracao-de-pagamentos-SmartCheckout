import { Controller, HttpResponse } from '../../presentation/protocols'
import { ok, serverError } from '../../presentation/helpers'
import { Preference, MercadoPagoConfig } from 'mercadopago'

export class PaymentController implements Controller {
  getFullUrl = (response: HttpResponse) => {
    const url =
      (response.protocol || 'http') + '://' + (response.host || 'localhost')
    return url
  }

  async checkout(request: HttpResponse): Promise<HttpResponse> {
    const client = new MercadoPagoConfig({
      accessToken: 'access_token',
      options: { timeout: 5000, idempotencyKey: 'abc' },
    })

    const { id, email, description, amount } = request.params

    // Create purchase item object template
    const purchaseOrder = {
      body: {
        items: [
          {
            id: String(id),
            title: description,
            description,
            quantity: 1,
            currency_id: 'BRL',
            unit_price: parseFloat(amount),
          },
        ],
        payer: {
          email: String(email),
        },
        auto_return: 'all',
        external_reference: String(id),
        back_urls: {
          success: this.getFullUrl(request) + '/payments/success',
          pending: this.getFullUrl(request) + '/payments/pending',
          failure: this.getFullUrl(request) + '/payments/failure',
        },
      },
    }

    // Generate init_point to checkout
    try {
      const preference = new Preference(client)
      const init = preference.create(purchaseOrder)
      return ok(init)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
