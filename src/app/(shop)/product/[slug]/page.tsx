export const revalidate = 604800; // 7 días

import { getProductBySlug } from '@/actions';
import { ProductMobileSlideshow, ProductSlideshow, StockLabel } from '@/components';
import { titleFont } from '@/config/fonts';
import { Metadata, ResolvingMetadata } from 'next';
// import { initialData } from '@/seed/seed';
import { AddToCart } from './ui/AddToCart';
import { notFound } from 'next/navigation';


interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug

  // fetch data
  const product = await getProductBySlug( slug );

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? 'No hay descripción',
    openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? 'No hay descripción',
      // images: [],
      images: [`/products/${ product?.images[1] }`],
    },
  }
}


export default async function SlugProductPage({params}:Props) {

  const { slug } = params;
  // const product = initialData.products.find( product => product.slug === slug );

  const product = await getProductBySlug( slug );

  if( !product ) {
    notFound();
  }

  return (
    <div className='mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3'>
      {/* slideshow */}
      <div className="col-span-1 md:col-span-2">
        {/* mobile slideshow */}
        <ProductMobileSlideshow
          title={ product.title }
          images={ product.images }
          className='block sm:hidden overflow-x-hidden'
        />
        {/* slideshow de escritorio */}
        <ProductSlideshow
          title={ product.title }
          images={ product.images }
          className='hidden sm:block'
        />
      </div>
      {/* detalles */}
      <div className="col-span-1 px-5 ">
        {/* stock */}
        <StockLabel slug={ product.slug } />
        {/* title */}
        <h1 className={`${ titleFont.className } antialiased capitalize font-bold text-xl`}>
          { product.title }
        </h1>
        <p className='text-lg mb-5'>${ product.price }</p>
        {/* selector - contador - button */}
        {
          ( product.images.length >= 1 )
          ? (
            <AddToCart product={ product } />
          )
          : (
            <div className='h-10 w-full animate-pulse bg-gray-300 mb-3 cursor-not-allowed rounded py-2 px-4'></div>
          )
        }
        {/* descripción */}
        <h3 className='font-bold text-md'>Descripción</h3>
        <p className='text-sm'>
          { product.description }
        </p>
      </div>
    </div>
  );
}