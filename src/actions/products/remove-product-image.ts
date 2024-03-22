'use server'
import {v2 as cloudinary} from 'cloudinary';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';


cloudinary.config( process.env.CLOUDINARY_URL ?? '');


export const removeProductImage = async( imageId: number, imageUrl: string ) => {
  try {
    if( !imageUrl.startsWith('http') ){
      return {
        ok:false,
        message: "No se puede borrar imágenes del FS"
      }
    }
    const imageName = imageUrl.split('/').pop()?.split('.')[0] || '';
    // const imageName = imageUrl.split('/').pop();
    // console.log({imageName})
    // const resp = await cloudinary.uploader.destroy(imageName, process.env.CLOUDINARY_UPLOAD_PRESET || '');
    await cloudinary.uploader.destroy(`${process.env.CLOUDINARY_UPLOAD_PRESET}/${imageName}`);

    const deletedImage = await prisma.productImage.delete({
      where: {
        id: imageId
      },
      select: {
        product:{
          select: {
            slug: true
          }
        }
      }
    })

    revalidatePath('/admin/products');
    revalidatePath(`/admin/product/${ deletedImage.product.slug }`);
    revalidatePath(`/product/${ deletedImage.product.slug }`);


    return {
      ok:true,
      // deletedImage
    }

  } catch (error) {
    console.log(error)
    return {
      ok:false,
      message: "Ver logs"
    }
  }
}