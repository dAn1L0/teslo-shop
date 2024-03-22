'use server'
import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';


export const getPaginatedOrders = async() => {
  try {

    const session = await auth()

    if( session?.user.role !== 'admin' ) {
      return {
        ok: false,
        message: 'Usuario no autorizado'
      }
    }

    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        createdAt: true,
        isPaid: true,
        total: true,
        OrderAddress:{
          select: {
            firstName: true,
            lastName: true
          }
        }
      }
    })
    // console.log(JSON.stringify(orders, null, 2))

    if(orders.length === 0) {
      return {
        ok: true,
        orders: []
      }
    }

    return {
      ok: true,
      orders
    }
  } catch (error: any) {
    console.log(error)
    return {
      ok: false,
      message: error.message
    }
  }
}