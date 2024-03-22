import { Title } from '@/components';
import Link from 'next/link';
import { ProductsInCheckout } from './ui/ProductsInCheckout';
import { PlaceOrder } from './ui/PlaceOrder';



export default function CheckoutPage() {

  return (
    <div className='flex justify-center items-center mb-52 px-1 sm:px-10'>
      <div className='flex flex-col w-full'>
        <Title title='Verificar compra' />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        {/* carrito */}
        <div className="flex flex-col mt-5">
          {/* <span className='text-xl mb-3'>Agregar más artículos</span> */}
          <Link
            href={'/cart'}
            className='underline mb-3'
          >
            Editar compra
          </Link>
          {/* items carrito */}
          <ProductsInCheckout />
        </div>
        {/* resumen de la compra*/}
        <PlaceOrder />
        </div>
      </div>
    </div>
  );
}