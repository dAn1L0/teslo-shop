'use client';
import { ProductImage } from '@/components';
import type { Product } from '@/interfaces'
import { currencyFormat } from '@/utils';
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react';

interface Props {
  product: Product
  priority?: boolean
}


export const ProductGridItem = ({ product, priority = false }:Props) => {

  const [displayImage, setDisplayImage] = useState(product.images[0])

  return (
    <div className='rounded-md overflow-hidden fade-in'>
      <Link href={ `/product/${ product.slug }`}>
        <ProductImage
          src={ displayImage }
          alt={ product.slug }
          className='w-auto h-auto object-cover rounded'
          width={ 500 }
          height={ 500 }
          priority={ priority }
          onMouseEnter={ () => setDisplayImage(product.images[1] ?? '') }
          onMouseLeave={ () => setDisplayImage(product.images[0] ?? '') }
        />
      </Link>
      <div className="p-4 flex flex-col">
        <Link
          className='hover:text-blue-700'
          href={ `/product/${ product.slug }`}>
          { product.title }
        </Link>
        <span className='text-lg font-bold mt-1'>{ currencyFormat(product.price) } </span>
      </div>
    </div>
  )

}