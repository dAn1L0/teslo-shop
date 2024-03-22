import { Title } from '@/components';
// import { initialData } from '@/seed/seed';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ProductsInCart } from './ui/ProductsInCart';
import { OrderSummary } from './ui/OrderSummary';

// const productsInCart = [
//   initialData.products[0],
//   initialData.products[1],
//   initialData.products[2]
// ];

export default function CartPage() {

  // redirect('/empty')

  return (
    <div className='flex justify-center items-center mb-52 px-px sm:px-10'>
      <div className='flex flex-col w-full'>
        <Title title='Carrito' />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        {/* carrito */}
        <div className="flex flex-col mt-5">
          <span className='text-xl mb-3'>Agregar más artículos</span>
          <Link
            href={'/'}
            className='underline mb-3'
          >
            Seguir comprando
          </Link>

          {/* items carrito */}
          <ProductsInCart />

        </div>
        {/* checkout - resumen de la compra*/}
        <div className='bg-white shadow-md rounded-xl p-7 h-fit'>
          <h2 className='text-xl mb-2'>Detalle de orden</h2>
          <OrderSummary />
          <div className='mt-5 mb-5'>
            <Link
              href={'/checkout/address'}
              className='flex btn-primary justify-center'
            >
              Checkout
            </Link>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}