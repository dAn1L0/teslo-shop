'use client';
import { Loading } from "@/components";
import { useCartStore } from "@/store"
import { currencyFormat } from "@/utils";
import Link from "next/link"
import { useEffect, useState } from "react";


export const OrderSummary = () => {

  const [loaded, setLoaded] = useState(false)
  const {
    total,
    subTotal,
    impSubTotal,
    quantityItems
  } = useCartStore( state => state.getSummaryInformation() )

  useEffect(() => {
    setLoaded(true)
  }, [])


  return (
    <>
      {
        !loaded
          ? (<Loading />)
          : (
            <div className="grid grid-cols-2">
              <span>Cantidad </span>
              <span className='text-right'>{  quantityItems === 1 ? '1 artículo' : `${ quantityItems } artículos` } </span>
              <span>Subtotal </span>
              <span className='text-right'>{ currencyFormat(subTotal) }</span>
              <span>{`Impuestos (${process.env.NEXT_PUBLIC_TAX}%)`}</span>
              <span className='text-right'>{ currencyFormat(impSubTotal) }</span>
              <span className='font-bold text-2xl mt-5'>Total </span>
              <span className='text-right font-bold mt-5 text-2xl'>{ currencyFormat(total) }</span>
            </div>
          )
      }
    </>
  )
}
