'use client';
import { Loading, ProductImage, QuantitySelector } from "@/components"
import { useCartStore } from "@/store";
import Image from "next/image"
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoTrashOutline } from "react-icons/io5"

export const ProductsInCart = () => {

  const [loaded, setLoaded] = useState(false)
  const productsInCart = useCartStore( state => state.cart );
  const updatedItemQuantity = useCartStore( state => state.updateProductQuantityInCart );
  const removeProductFromCart = useCartStore( state => state.removeProductFromCart );

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
                  className='w-auto h-auto mr-5 rounded-md object-cover'
                />
                <div>
                  <Link href={`/product/${ product.slug }`}
                    className='text-xl hover:underline cursor-pointer'
                  >
                    { product.size } - { product.title }
                  </Link>
                  <p className='text-xl'>${ product.price }</p>
                  <QuantitySelector quantity={ product.quantity } onQuantityChanged={ (newQuantity) => updatedItemQuantity(product, newQuantity) } />
                  <button
                    onClick={ () => removeProductFromCart( product ) }
                    className='text-red-500 mt-3'>
                    <IoTrashOutline size={18} />
                  </button>
                </div>
                <hr/>
              </div>
            )))
      }
    </>
  )
}
