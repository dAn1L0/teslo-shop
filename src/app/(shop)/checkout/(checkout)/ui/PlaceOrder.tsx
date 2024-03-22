'use client';

import { placeOrder } from "@/actions";
import { Loading } from "@/components";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export const PlaceOrder = () => {

  const router = useRouter()
  const [loaded, setLoaded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const address = useAddressStore(state => state.address);
  const clearAddress = useAddressStore(state => state.clearAddress);
  const cart = useCartStore(state => state.cart);
  const clearCart = useCartStore(state => state.clearCart);
  const {
    total,
    subTotal,
    impSubTotal,
    quantityItems
  } = useCartStore( state => state.getSummaryInformation() )

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlacingOrder = async() => {
    setIsPlacingOrder(true);
    // setErrorMessage('')
    const productsToOrder = cart.map( product => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size
    }))
    console.log(address, productsToOrder);
    const resp = await placeOrder( productsToOrder, address );
    console.log(resp);
    if(!resp.ok){
      setIsPlacingOrder(false);
      setErrorMessage( resp.message )
      return
    }
    //limpiar carrito
    clearCart()
    clearAddress()
    // re-dirigir a la página de ordenes
    router.replace('/orders/'+ resp.order?.id)

  }

  if(!loaded) {
    return (
      <Loading />
    );
  }

  return (
    <>
      {
        ( cart.length !== 0 ) && (
          <div className='bg-white shadow-md rounded-xl p-7'>
            <h2 className='text-xl mb-2 font-bold'>Dirección de entrega</h2>
            <div className="mb-10">
              <p className='font-bold text-xl'>{ (address.firstName+' '+address.lastName).toUpperCase() }</p>
              <p>{ address.address.toUpperCase() }</p>
              <p>{ address.address2?.toUpperCase() || 'N/A' }</p>
              <p>{ address.city.toUpperCase() + ', ' + address.country.toUpperCase() }</p>
              <p>{ address.postalCode.toUpperCase() }</p>
              <p>{ address.phone }</p>
            </div>
            {/* divider */}
            <div className='w-full my-4 h-0.5 bg-gray-200' />

            <h2 className='text-xl mb-2 font-bold'>Detalle de la orden</h2>
            <div className="grid grid-cols-2">
              <span>Nro. Productos</span>
              <span className='text-right'>{ quantityItems > 1 ? `${quantityItems} artículos` : '1 artículo'  }</span>
              <span>Subtotal</span>
              <span className='text-right'>{ currencyFormat(subTotal) }</span>
              <span>{`Impuestos (${ process.env.NEXT_PUBLIC_TAX }%)`}</span>
              <span className='text-right'>{ currencyFormat(impSubTotal) }</span>
              <span className='font-bold text-2xl mt-5'>Total</span>
              <span className='text-right font-bold mt-5 text-2xl'>{ currencyFormat(total) }</span>
            </div>
            <div className='flex flex-col mt-5 mb-5'>
              <div className="mb-5">
                {/* disclaimer */}
                <span className='text-xs'>
                  Al hacer click en &ldquo;Agregar Orden&rdquo;, aceptas nuestras <a href="#" className='underline'>condiciones de uso</a> y <a href="#" className='underline'>políticas de privacidad</a>.
                </span>
              </div>
              <p className="text-xs text-red-500 mb-1">{ errorMessage }</p>
              <button
                // ir: /orders/123
                onClick={ onPlacingOrder }
                className={
                  clsx({
                    'btn-primary': !isPlacingOrder,
                    'btn-disabled cursor-not-allowed': isPlacingOrder
                  })
                }
              >
                Agregar Orden
              </button>
            </div>
          </div>
        )
      }
    </>
  )
}
