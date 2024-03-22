'use client';
import { titleFont } from '@/config/fonts'
import { useCartStore, useUIStore } from '@/store';
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5'
import { Loading } from '@/components';



export const TopMenu = () => {

  const [loaded, setLoaded] = useState(false)
  const openSidebar = useUIStore( state => state.openSidebar );
  const totalItemsInCart = useCartStore( state => state.getTotalItems() );

  useEffect(() => {
    setLoaded(true)
  }, [])

  if(!loaded){
    return (
      <Loading />
    )
  }

  return (
    <nav className='flex px-5 justify-between items-center w-full'>
      {/* logo */}
      <div>
        <Link href='/'>
          <span className={`${ titleFont.className } antialiased font-bold`}>Teslo</span>
          <span> | Shop</span>
        </Link>
      </div>
      {/* center menu */}
      <div className='hidden sm:block'>
        <Link
          className='m-2 p-2 rounded-md translate-all hover:bg-gray-200'
          href="/gender/men"
        >
          Hombres
        </Link>
        <Link
          className='m-2 p-2 rounded-md translate-all hover:bg-gray-200'
          href="/gender/women"
        >
          Mujeres
        </Link>
        <Link
          className='m-2 p-2 rounded-md translate-all hover:bg-gray-200'
          href="/gender/kids"
        >
          Niños
        </Link>
      </div>

      {/* search, cart, menu */}
      <div className='flex items-center'>
        <Link
          href='/search'
          className='mx-2'
        >
          <IoSearchOutline
            className='w-5 h-5'
          />
        </Link>
        <Link
          href={ ( loaded && totalItemsInCart > 0) ? '/cart' : '/empty'}
          className='mx-2'
        >
          <div className="relative">
            {
              ( loaded && totalItemsInCart > 0) && (
                <span className=" fade-in absolute text-xs rounded-full px-1 mx-1 font-bold -top-2 -right-2 bg-blue-700 text-white">
                  { totalItemsInCart }
                </span>
              )
            }
            <IoCartOutline
              className='w-5 h-5'
            />
          </div>
        </Link>
        <button
          onClick={ openSidebar }
          className="m-2 p-2 rounded-md translate-all hover:bg-gray-200">
          Menu
        </button>
      </div>
    </nav>

  )

}