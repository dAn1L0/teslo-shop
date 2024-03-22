'use server'
import prisma from '@/lib/prisma';


export const getOrdersByUser = async( userId: string ) => {
  try {
    
    if( !userId ){
      return{
        ok: false,
        orders: []
      }
    }

    const orders = await prisma.order.findMany({
      where: {
        userId
      },
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