'use server';
import prisma from '@/lib/prisma';
import { auth } from "@/auth.config";
import type { Address, Size } from "@/interfaces";


interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async( productsId: ProductToOrder[], address: Address ) => {
  try {
    const session = await auth()
    const userId = session?.user.id
    if(!userId){
      return {
        ok: false,
        message: "usuario no autenticado"
      }
    }
    // console.log(productsId, address, userId);
    // * obtener los productos
    // * ya sea con el mismo productId pero diferente size
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productsId.map( product => product.productId )
        }
      }
    })
    // * calcular los valores del encabezado
    const itemsInOrder = productsId.reduce( ( count, p ) => count + p.quantity, 0 );

    const { subtotal, tax, total } = productsId.reduce((totales, item) => {
      const productQuantity = item.quantity

      const product = products.find(p => p.id === item.productId)
      if( !product ) throw new Error(`Producto: ${ item.productId }, no encontrado`)

      const subtotal = product.price * productQuantity;
      totales.subtotal += subtotal;
      totales.tax += subtotal * (Number(process.env.NEXT_PUBLIC_TAX)/100);
      totales.total += subtotal * ((Number(process.env.NEXT_PUBLIC_TAX)/100) + 1);

      return totales
    }, { subtotal: 0, tax: 0, total:0 })

    const prismaTx = await prisma.$transaction(async(tx) => {
      // 1. Actualizar stock de productos
      // 1.1 acumular los valores por ID del producto
      const updatedProductsPromises = products.map((product) => {
        const productQuantity = productsId.filter(
          p => p.productId === product.id
        ).reduce(( acc, item) =>  acc + item.quantity, 0)

        if( productQuantity === 0 ){
          throw new Error(`${ product.id }, no tiene cantidad definida`)
        }
        return tx.product.update({
          where:{
            id: product.id
          },
          data: {
            // inStock: product.inStock - productQuantity
            inStock: {
              decrement: productQuantity
            }
          }
        })
      })
      const updatedProducts = await Promise.all( updatedProductsPromises )
      // Verificar valores negativos en las existencias inStock
      updatedProducts.forEach(p => {
        if( p.inStock < 0 ){
          throw new Error(`${ p.title } agotado`)
        }
      })
      // 2. Crear Order - OrderItems
      const order = await tx.order.create({
        data: {
          userId: userId,
          itemsInOrder: itemsInOrder,
          subtotal: subtotal,
          tax: tax,
          total: total,
          isPaid: false,
          OrderItem: {
            createMany: {
              data: productsId.map( p => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price: products.find( prod => prod.id === p.productId )?.price
              }))
            }
          }
        }
      })
      // console.log(address)
      // console.log(order)
      // * Validar, si el price es cero, lanzar una excepción
      // 3. Crear dirección de la orden
      const { country, ...restAddress } = address;
      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          countryId: country,
          orderId: order.id,
        }
      })
      return {
        updatedProducts,
        order: order,
        orderAddress,
      }
    })
    return {
      ok: true,
      order: prismaTx.order,
      prismaTx: prismaTx
    }
  } catch (error: any) {
    console.log(error);
    return {
      ok: false,
      message: error?.message
    }
  }
}

