import { mercadopago } from "../shared/db/mercadopago.js";
import { Request, Response} from "express"
import { orm } from "../shared/db/orm.js";
import { Cuota } from "../cuotas/cuotas.entity.js";
import { MerchantOrder, Payment, Preference } from "mercadopago";
import { Pago } from "./pagos.entity.js";
import crypto from "crypto";
import 'dotenv/config';
const em = orm.em


async function create( req:Request,res:Response){
  try{
    const id = Number(req.params.id)     
    const cuota = await em.findOneOrFail(Cuota, {id})
    const cuotaId = req.params.id
    const response = await new Preference(mercadopago).create({ body:{
        items: [
          {
            id:"message",
            title: `Cuota de reserva`,
            quantity: 1,
            currency_id: "ARS",
            unit_price: cuota.monto,
          },
        ],
        back_urls: {
          success: "http://localhost:5173/pago-exitoso",
          failure: "http://localhost:5173/pago-fallido",
          pending: "http://localhost:5173/pago-pendiente",
        },
        metadata: {
          cuotaId /* a mp NO le Gusta el camelcase del orto lo transforma a cuota_id */
        },
        notification_url: "https://sialoid-unspitefully-calvin.ngrok-free.dev/api/webhook" , /* https://wnl3nxbf-3000.brs.devtunnels.ms */
  
    }})
    

    res.json({ init_point: response.init_point });
  }catch(error:any){
    res.status(500).json({ message: error.message })
  }

}

async function add(req:Request,res:Response){
  try {
    const paymentId = req.body.data?.id || req.query['data.id'] /* || req.body.resource */
/*   
    const topic = req.body.topic;

    let paymentId: string | undefined;

    if (topic === "payment") {
      paymentId = req.body.data?.id || req.query['data.id'];
    } else if (topic === "merchant_order") {
      const merchantOrderId = req.body.resource.split("/").pop();
      const merchantOrder = await new MerchantOrder(mercadopago).get({ merchantOrderId: merchantOrderId });
      paymentId = merchantOrder.preference_id;
    } */


    /*  if (!paymentId) {
      console.warn('Incomplete webhook data', {
        hasDataId: !!paymentId,  //<---testing
        hasReq: req
      })

      return res.status(400).send('Invalid request')
    }
 */

   /*  const xSignatureHeader = req.headers['x-signature']
    const xRequestId = req.headers['x-request-id']
     if (!xSignatureHeader || !xRequestId || !paymentId) {
      console.warn('Incomplete webhook data', {
        hasSignature: !!xSignatureHeader,
        hasRequestId: !!xRequestId,
        hasDataId: !!paymentId,
      })

      return res.status(400).send('Invalid request')
    }

    const xSignature = Array.isArray(xSignatureHeader)
      ? xSignatureHeader[0]
      : xSignatureHeader;

    if (!xSignature || typeof xSignature !== 'string') {
      return res.status(400).send('Invalid signature header');
    }
     // Separating the x-signature into parts
    const parts = xSignature.split(",");
    let ts: string | undefined;
    let hash: string | undefined;

    for (const part of parts) {
      const [key, value] = part.split("=");
      if (key.trim() === "ts") ts = value.trim();
      if (key.trim() === "v1") hash = value.trim();
    }

    if (!ts || !hash) {
      return res.status(400).send("Invalid signature format");
    }

    // Obtain the secret key for the user/application from Mercadopago developers site
    const secret = process.env.WEBHOOK_SECRET!

    // Generate the manifest string
    const manifest = `id:${paymentId};request-id:${xRequestId};ts:${ts};`

    // Create an HMAC signature
    const hmac = crypto.createHmac('sha256', secret)
    hmac.update(manifest)

    // Obtain the hash result as a hexadecimal string
    const calculatedHash = hmac.digest('hex')

    if (calculatedHash !== hash) {
      console.warn('HMAC verification failed', {
        calculatedHash,
        receivedHash: hash,
      })

      return res.status(400).send('Invalid signature')
    } */

   const payment = await new Payment(mercadopago).get({id: paymentId});
   const fecha = new Date(Date.now())

   console.warn('Incomplete webhook data', {
        hasDataId: !!paymentId,
        hasBody: req.body,
        payment:payment,
        metadata:payment.metadata
      })

  
    // Buscar la cuota asociada
    console.log("payment.metadata:", payment.metadata);
    const id = Number(payment.metadata?.cuota_id)
    const cuota = await em.findOneOrFail(Cuota, {id})

    const pago = em.create(Pago, {
      cuota,
      fecha,
      metodo:payment.payment_type_id || "",
      transactionId: paymentId,
      state: payment.status,  // 'approved', 'pending', 'rejected', etc
    });

    // Si el pago fue aprobado, actualizar el estado de la cuota
    if (payment.status === "approved") {
      cuota.state = "pagada";
    }

    await em.persistAndFlush([cuota, pago]);
    res.sendStatus(200);
  } catch (error) {
      console.error("Error procesando webhook:", error);
      res.sendStatus(500);
  }
}

export {add, create}