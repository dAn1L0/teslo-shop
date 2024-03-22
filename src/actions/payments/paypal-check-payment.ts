'use server'

import { PayPalOrderStatusResponse } from "@/interfaces";
import prisma from '@/lib/prisma';
import { revalidatePath } from "next/cache";


export const paypalCheckPayment = async( paypalTransactionId: string ) => {
  try {
    const authToken = await getPayPalBearerToken();
    // console.log('authToken:', authToken);

    if(!authToken){
      return {
        ok: false,
        message: 'No hay token en la verificación'
      }
    }

    const resp = await verifyPayPalPayment(paypalTransactionId, authToken);
    if( !resp ) {
      return {
        ok: false,
        message: 'No se pudo verificar la transacción'
      }
    }

    const { status, purchase_units } = resp

    if(status !== 'COMPLETED') {
      return {
        ok: false,
        message: 'No se pudo verificar la Transacción',
      }
    }
    // console.log({ status, purchase_units });
    // invoice_id es igual que order_id
    const { invoice_id } = purchase_units[0] 

    //Actualización del pago en la base de datos
    await prisma.order.update({
      where: {
        id: invoice_id
      },
      data: {
        isPaid: true,
        paidAt: new Date()
      }
    })
    // Revalidar un path
    revalidatePath(`/orders/${ invoice_id }`)

    return {
      ok: true,
      message: 'Transacción exitosa'
    }

  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Error al registrar la transacción'
    }
  }
}

const getPayPalBearerToken = async(): Promise<string|null> => {

  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET
  const PAYPAL_OAUTH_URL = process.env.PAYPAL_OAUTH_URL ?? ''

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    'utf-8'
  ).toString('base64');

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", `Basic ${base64Token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const result = await fetch(PAYPAL_OAUTH_URL,{
      ...requestOptions,
      cache: 'no-store'
    }).then(r => r.json());
    return result.access_token
  } catch (error) {
    console.log(error)
    return null
  }
}

const verifyPayPalPayment = async(
  paypalTransactionId: string,
  bearerToken: string
  ): Promise<PayPalOrderStatusResponse|null>  => {
  const paypalOrderUrl = `${ process.env.PAYPAL_ORDERS_URL }/${ paypalTransactionId }`
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${bearerToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const resp = await fetch(paypalOrderUrl,{
      ...requestOptions,
      cache: 'no-store'
    }).then(r => r.json());
    return resp
  } catch (error) {
    console.log(error)
    return null
  }

}