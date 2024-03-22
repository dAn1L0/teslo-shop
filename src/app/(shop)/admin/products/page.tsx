export const revalidate = 0;
import { getPaginationProductsWithImages } from '@/actions';
import { Pagination, ProductImage, Title } from '@/components';
import Image from 'next/image';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { IoAddOutline, IoCardOutline, IoReceiptOutline } from 'react-icons/io5';
import { currencyFormat } from '@/utils';

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function OrdersOfAdminPage({ searchParams }: Props) {

  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, currentPage, totalPages } = await getPaginationProductsWithImages({ page });


  return (
    <div className='px-px sm:px-10'>
      <Title title='Administrador de productos' />
      <div className="flex justify-end mb-5">
        <Link
          href='/admin/product/new'
          className='btn-primary flex'
        >
          <IoAddOutline size={25}/>
          Nuevo producto
        </Link>
      </div>

      <div className='overflow-x-auto mb-10'>
        <table className='w-full divide-y-2'>
          <thead className='bg-gray-200 border-b'>
            <tr>
              <th
                scope='col'
                className='whitespace-nowrap text-sm font-medium text-gray-900 px-3 py-4 text-center'
              >
                #
              </th>
              <th
                scope='col'
                className='whitespace-nowrap text-sm font-medium text-gray-900 px-3 py-4 text-center'
              >
                Imagen
              </th>
              <th
                scope='col'
                className='whitespace-nowrap text-sm font-medium text-gray-900 px-3 py-4 text-center'
              >
                Producto
              </th>
              <th
                scope='col'
                className='whitespace-nowrap text-sm font-medium text-gray-900 px-3 py-4 text-center'
              >
                Precio
              </th>
              <th
                scope='col'
                className='whitespace-nowrap text-sm font-medium text-gray-900 px-3 py-4 text-center'
              >
                Cantidad
              </th>
              <th
                scope='col'
                className='whitespace-nowrap text-sm font-medium text-gray-900 px-3 py-4 text-center'
              >
                Tallas
              </th>
              <th
                scope='col'
                className='whitespace-nowrap text-sm font-medium text-gray-900 px-3 py-4 text-center'
              >
                Categoría
              </th>
              <th
                scope='col'
                className='whitespace-nowrap text-sm font-medium text-gray-900 px-3 py-4 text-center'
              >
                Género
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {
              ( products.length > 0 )
              ? (
                products.map( (product, index) => (
                  <tr key={product.id} className=' bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100'>
                    <td className='px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900'>
                      { currentPage > 1 ? index + 1 + ( (currentPage - 1) * 12 ) : index + 1 }
                    </td>
                    <td className='px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900 cursor-pointer'>
                      <Link href={`/product/${product.slug}`}>
                        <ProductImage
                          src={product.ProductImage[0]?.url}
                          alt={product.slug}
                          width={80}
                          height={80}
                          className={"w-auto h-auto object-cover"}
                        />
                      </Link>
                    </td>
                    <td className='px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900 cursor-pointer hover:underline'>
                      <Link href={`/admin/product/${product.slug}`}>
                        { product.title }
                      </Link>
                    </td>
                    <td className='px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900'>
                      { currencyFormat(product.price) }
                    </td>
                    <td className='px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900'>
                      { product.inStock }
                    </td>
                    <td className='px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900'>
                      { product.sizes.join(', ') }
                    </td>
                    <td className='px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900'>
                      { product.tags.join(', ') }
                    </td>
                    <td className='px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900'>
                      { product.gender }
                    </td>
                  </tr>
                ))
              )
              : (
                <tr className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100'>
                  <td colSpan={7} className='whitespace-nowrap text-center text-gray-800'>
                    Al momento, no tiene productos
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
      <Pagination totalPages={totalPages} />
    </div>
  );
}
