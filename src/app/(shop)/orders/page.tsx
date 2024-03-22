export const revalidate = 0;
import { getOrdersByUser } from '@/actions';
import { auth } from '@/auth.config';
import { Title } from '@/components';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { IoCardOutline, IoReceiptOutline } from 'react-icons/io5';

export default async function OrdersByUserPage() {

  const session = await auth()

  if( !session?.user ){
    redirect('/auth/login')
  }

  const resp = await getOrdersByUser(session.user.id);
  if(!resp.ok) {
    redirect('/auth/login')
  }


  const { orders } = resp

  return (
    <div className='px-px sm:px-10'>
      <Title title='Orders' />
      <div className='overflow-x-auto mb-10'>
        <table className='min-w-full divide-y-2'>
          <thead className='bg-gray-200 border-b'>
            <tr>
              <th
                scope='col'
                className='whitespace-nowrap text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                ID
              </th>
              <th
                scope='col'
                className='whitespace-nowrap text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                Nombre completo
              </th>
              <th
                scope='col'
                className='whitespace-nowrap text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                Estado
              </th>
              <th
                scope='col'
                className='whitespace-nowrap text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                Opciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {
              ( orders!.length > 0 )
              ? (
                orders!.map(order => (
                  <tr key={order!.id} className=' bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100'>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                      { order!.id.split('-').at(-1) }
                    </td>
                    <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                      { (order.OrderAddress!.firstName + ' ' + order.OrderAddress!.lastName).toUpperCase() }
                    </td>
                    <td className='flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                      {
                        order!.isPaid
                        ? (<><IoCardOutline size={20} className='text-green-500'/><span className='ml-2 text-green-500'>Pagada</span></>)
                        : (<><IoCardOutline size={20} className='text-red-500'/><span className='ml-2 text-red-500'>No pagada</span></>)
                      }
                    </td>
                    <td className='whitespace-nowrap text-sm text-gray-900 px-6 '>
                      <Link href={`/orders/${ order!.id }`} className='flex items-center'>
                        <span className='mr-px'>Ver pedido</span>
                        <IoReceiptOutline size={20}/>
                      </Link>
                    </td>
                  </tr>
                ))
              )
              : (
                <tr className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100'>
                  <td colSpan={4} className='whitespace-nowrap text-center text-gray-800'>
                    Al momento, no tiene pedidos
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
