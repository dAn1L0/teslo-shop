export const revalidate = 60

import { getPaginationProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';
// import { Category } from '@/interfaces';
// import { initialData } from '@/seed/seed';
import { Gender } from '@prisma/client';
import { notFound, redirect } from 'next/navigation';


interface Props{
  params: {
    gender: string
    // gender: Gender
  }
  searchParams: {
    page?: string
  }
}

// const seedProducts = initialData.products;


export default async function CategoryPage({ params, searchParams }: Props) {

  const { gender } = params;
  // const { page } = searchParams;
  const page = searchParams.page ? parseInt( searchParams.page ) : 1;

  // const products = seedProducts.filter( product => product.gender === id );
  const { products, currentPage, totalPages } = await getPaginationProductsWithImages({ page, gender: gender as Gender });

  if( products.length === 0 ){
    redirect(`/gender/${gender}`)
  }

  // const labels: Record<Gender, string[]> = {
  const labels: Record<string, string[]> = {
    men: ['para hombre','él'],
    women: ['de mujer', 'ella'],
    kids: ['para niños & niñas', 'los más pequeños'],
    unisex: ['unisex', 'hombre & mujer']
  }

  if( products.length === 0 ) {
    notFound();
  }

  return (
    <div className='px-1 sm:px-10 md:px-10 lg:px-10'>
      <Title
        title={`Ropa ${ labels[gender][0] }`}
        subtitle={`Artículos para ${ labels[gender][1] }.`}
        className='mb-2'
      />
      <ProductGrid products={ products } />
      <Pagination totalPages={ totalPages } />
    </div>
  );
}