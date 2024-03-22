'use server';
import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';


export const getOrderById = async( orderId: string ) => {

  const session = await auth()
  if( !session?.user ){
    return {
      ok: false,
      message: 'No autorizado'
    }
  }

  try {
    const order = await prisma.order.findFirst({
      where: { id: orderId },
      include: {
        OrderItem: {
          select: {
            id: true,
            quantity: true,
            price: true,
            size: true,
            product: {
              select: {
                title: true,
                slug: true,
                ProductImage: {
                  select: {
                    url: true
                  },
                  take: 1
                },
              }
            }
          }
        },
        OrderAddress: true
      }
    })
    if(!order){
      throw `Orden ${orderId}', no existe'`
    }

    if( session.user.role === 'user' ){
      if( session.user.id !== order.userId ){
        throw `Orden ${orderId}', no tiene acceso a esta orden'`
      }
    }
    return {
      ok: true,
      order
    }
  } catch (error: any) {
    console.log(error);
    return {
      ok: false,
      message: error.message
    }
  }
}