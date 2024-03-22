'use client';
import { Loading, ProductImage } from "@/components";
import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import Image from "next/image"
import { useEffect, useState } from "react";

export const ProductsInCheckout = () => {

  const [loaded, setLoaded] = useState(false)
  const productsInCart = useCartStore( state => state.cart );

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <>
      {
        !loaded
          ? (<Loading />)
          : (productsInCart.map( product => (
              <div className='flex' key={product.id+'-'+product.size} >
                <ProductImage
                  src={product.image}
                  alt={ product.slug }
                  width={50}
                  height={50}
                  className='w-auto h-auto mr-5 rounded-md'
                />
                <div>
                  <span className='text-xl'>
                    { product.size } - { product.title } - ({ product.quantity })
                  </span>
                  <p className='text-xl font-bold'>{ currencyFormat( product.price * product.quantity ) }</p>
                </div>
                <hr/>
              </div>
            )))
      }
    </>
  )
}
