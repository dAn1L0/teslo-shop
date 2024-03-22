export const revalidate = 60

import { getPaginationProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';
import { redirect } from 'next/navigation';
// import { initialData } from '@/seed/seed';

// ! temporal
// const products = initialData.products

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function Home({ searchParams }: Props) {

  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, currentPage, totalPages } = await getPaginationProductsWithImages({ page });

  if(products.length === 0) {
    redirect('/')
  }

  return (
    <div className='px-px sm:px-10 md:px-10 lg:px-10'>
      <Title
        title='Tienda'
        subtitle='Nuestros productos'
        className='mb-2'
      />
      <ProductGrid products={ products } />
      <Pagination totalPages={ totalPages } />
    </div>
  );
}
