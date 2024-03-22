'use client';
import { QuantitySelector, SizeSelector } from '@/components'
import type { CartProduct, Product, Size } from '@/interfaces';
import { useCartStore } from '@/store';
import { useState } from 'react';

interface Props {
  product: Product
}

export const AddToCart = ({ product }:Props) => {

  const addProductToCart = useCartStore(state => state.addProductToCart)

  const [size, setSize] = useState<Size | undefined>()
  const [quantity, setQuantity] = useState<number>(1)
  const [posted, setPosted] = useState<boolean>(false)

  const addToCart = () => {
    setPosted(true)
    if( !size ) return
    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity,
      size,
      image: product.images[0],
    }
    addProductToCart(cartProduct);
    setPosted(false)
    setSize(undefined)
    setQuantity(1)
  }

  return (
    <>
      {
        posted && !size
          && (<span className='text-xs text-red-600 my-1 font-bold fade-in'> &#128683; Debe seleccionar una talla.</span>)
      }
      {/* selector de tallas */}
      <SizeSelector
        selectedSize={ size }
        availableSizes={ product.sizes }
        onSizeSelected={ setSize }
      />
      {/* contador */}
      <QuantitySelector
        quantity={ quantity }
        onQuantityChanged={ setQuantity }
      />
      {/* botones de agregar al carrito */}
      <button
        onClick={ addToCart }
        className='btn btn-primary my-5'
      >
        Agregar al carrito
      </button>
    </>
  )
}
