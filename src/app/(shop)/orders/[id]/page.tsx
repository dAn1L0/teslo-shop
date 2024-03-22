import { getOrderById } from '@/actions';
import { OrderStatus, PayPalButton, ProductImage, Title } from '@/components';
import { currencyFormat } from '@/utils';
import Image from 'next/image';
import { redirect } from 'next/navigation';


interface Props {
  params: {
    id: string
  }
}

export default async function OrderByIdPage({params}: Props) {

  const { id } = params;
  const resp = await getOrderById(id);
  if(!resp.ok) {
    redirect('/')
  }
  const { order } = resp
  const dir = resp.order?.OrderAddress
  if(!dir) {
    redirect('/')
  }


  return (
    <div className='flex justify-center items-center mb-52 px-1 sm:px-10'>
      <div className='flex flex-col w-full'>
        <Title title={`Orden: #${ id.split('-').at(-1) }`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        {/* carrito */}
        <div className="flex flex-col mt-5">
          <OrderStatus isPaid={ order!.isPaid } />
          {/* items carrito */}
          {
            order?.OrderItem.map( item => (
              <div className='flex' key={item.id} >
                <ProductImage
                  src={item.product.ProductImage[0].url}
                  alt={ item.product.slug }
                  width={100}
                  height={100}
                  style={{ width: '100px', height: '100px' }}
                  className='mr-5 rounded-md'
                  priority={true}
                />
                <div>
                  <p className='text-xl'>Talla { item.size }</p>
                  <p className='text-xl'>{ item.product.title }</p>
                  <p className='text-xl'>{ currencyFormat(item.price) } x { item.quantity }</p>
                  <p className='text-xl font-bold'>Subtotal { currencyFormat(item.price * item.quantity) }</p>
                </div>
                <hr/>
              </div>
            ))
          }
        </div>
        {/* resumen de la compra*/}
        <div className='bg-white shadow-md rounded-xl p-7 '>
          <h2 className='text-xl mb-2 font-bold'>Dirección de entrega</h2>
          <div className="mb-10">
            <p className='font-bold text-xl'>{ (dir.firstName+' '+dir.lastName).toUpperCase()}</p>
            <p>{ dir.address.toUpperCase() }</p>
            <p>{ dir.address2?.toUpperCase() || 'N/A' }</p>
            <p>{ ( dir.city+', '+dir.countryId ).toUpperCase() }</p>
            <p>{ dir.postalCode.toUpperCase() }</p>
            <p>{ dir.phone }</p>
          </div>
          {/* divider */}
          <div className='w-full my-4 h-0.5 bg-gray-200' />

          <h2 className='text-xl mb-2 font-bold'>Detalle de orden</h2>
          <div className="grid grid-cols-2">
            <span>Nro. Productos</span>
            <span className='text-right'>{ `${ (order!.itemsInOrder > 1) ? order!.itemsInOrder+' artículos' : order!.itemsInOrder+' artículo' }` }</span>
            <span>Subtotal</span>
            <span className='text-right'>{ currencyFormat(order!.subtotal) }</span>
            <span>{`Impuestos (${process.env.NEXT_PUBLIC_TAX}%)`}</span>
            <span className='text-right'>{ currencyFormat(order!.tax) }</span>
            <span className='font-bold text-2xl mt-5'>Total</span>
            <span className='text-right font-bold mt-5 text-2xl'>{ currencyFormat(order!.total) }</span>
          </div>
          <div className='mt-5 mb-5'>
            {
              order!.isPaid
              ? (
                <OrderStatus isPaid={ order!.isPaid }/>
              )
              : (
                <PayPalButton orderId={ order!.id } amount={ order!.total }/>
              )
            }
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}