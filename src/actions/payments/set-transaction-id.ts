'use server'
import prisma from '@/lib/prisma';


export const setTransactionId = async( orderId: string, transactionId: string ) => {
  try {

    const order = await prisma.order.update({
      where: {
        id: orderId
      },
      data: {
        transactionId
      }
    })
    if(!order) {
      return {
        ok: false,
        message: 'No se encontró la orden para actualizar'
      }
    }

    return {
      ok: true,
      message: 'Orden actualizada'
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Error al actualizar la orden'
    }
  }
}