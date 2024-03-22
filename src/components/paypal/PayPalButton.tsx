'use client';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions } from "@paypal/paypal-js"
import { Loading } from '@/components';
import { paypalCheckPayment, setTransactionId } from "@/actions";


interface Props {
  orderId: string
  amount: number
}

export const PayPalButton = ({ orderId, amount }: Props) => {

  const [{ isPending }] = usePayPalScriptReducer();
  const roundedAmount = (Math.round(amount * 100)/100).toFixed(2)

  if(isPending) {
    return (
      <Loading />
    )
  }

  const createOrder = async(data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {

    const transactionId = await actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [
        {
          invoice_id: `${ orderId }`,
          amount: {
            currency_code: 'USD',
            value: `${roundedAmount}`,
          }
        }
      ]
    })
    const resp = await setTransactionId(orderId, transactionId)
    if(!resp.ok) {
      throw new Error('Error al registrar la transacción');
    }
    console.log('transactionId:', transactionId);
    return transactionId

  }

  const onApprove = async(data: OnApproveData, actions: OnApproveActions) => {
    const details = await actions.order?.capture();

    if(!details) return;

    await paypalCheckPayment( details.id! )
  }

  return (
    <div className="relative z-0">
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
      />
    </div>
  )
}
