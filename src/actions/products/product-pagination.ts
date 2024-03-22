import prisma from '@/lib/prisma';
import { Gender } from '@prisma/client';

// interface Props {
//   searchParams: {
//     gender: Gender
//   }
// }
interface PaginationOptions {
  gender?: Gender
  page?: number
  take?: number
}

export const getPaginationProductsWithImages = async({ page = 1, take = 12, gender }: PaginationOptions) => {

  if( isNaN(+page) || page < 1 ){
    page = 1
  }

  try {
    const [ productsDB, totalCount ] = await Promise.all([
      prisma.product.findMany({
        take: +take,
        skip: (+page - 1) * +take,
        include: {
          ProductImage: {
            take: 2,
            select: {
              url: true
            }
          }
        },
        where: { gender: gender as Gender },
      }),
      prisma.product.count({ where: { gender } }),
    ])
    // console.log( productsDB, totalCount);

    // const productsDB = await prisma.product.findMany({
    //   take: +take,
    //   skip: (+page - 1) * +take,
    //   include: {
    //     ProductImage: {
    //       take: 2,
    //       select: {
    //         url: true
    //       }
    //     }
    //   }
    // })
    return {
      currentPage: page,
      // totalPages: Math.ceil((await prisma.product.count()) / +take),
      totalPages: Math.ceil( totalCount / +take),
      products: productsDB.map((product) => ({
        ...product,
        images: product.ProductImage.map( image => image.url )
      }))
    }
  } catch (error: any) {
    throw new Error(error)
  }
}