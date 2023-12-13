import {
  Controller,
  HttpResponse,
} from '../../presentation/protocols'
import {serverError} from '../../presentation/helpers'
import * as mercadopago from 'mercadopago'

export class SignUpController implements Controller {
  constructor() {}

  async checkout(request: Request): Promise<HttpResponse> {

    const client = new mercadopago.MercadoPagoConfig({ accessToken: 'access_token', options: { timeout: 5000, idempotencyKey: 'abc' } });


    const { id, email, description, amount } = req.params;

    //Create purchase item object template
    const purchaseOrder = {
        items: [
          item = {
            id: id,
            title: description,
            description : description,
            quantity: 1,
            currency_id: 'BRL',
            unit_price: parseFloat(amount)
          }
        ],
        payer : {
          email: email
        },
        auto_return : "all",
        external_reference : id,
        back_urls : {
          success : getFullUrl(req) + "/payments/success",
          pending : getFullUrl(req) + "/payments/pending",
          failure : getFullUrl(req) + "/payments/failure",
        }
      }
  
      //Generate init_point to checkout
      try {
        const preference = await mercadopago.preferences.create(purchaseOrder);
        return res.redirect(`${preference.body.init_point}`);
      }catch(error){
        return serverError(error)
      }
}
