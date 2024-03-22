'use server'
import { Size } from '@/interfaces';
import prisma from '@/lib/prisma';
import { Gender } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import {v2 as cloudinary} from 'cloudinary';

cloudinary.config( process.env.CLOUDINARY_URL ?? '');


const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce.number().min(0).transform( v => Number( v.toFixed(2) )),
  inStock: z.coerce.number().min(0).transform( v => Number( v.toFixed(0) )),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform( v => v.trim().split(",") ),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
})


export const createUpdateProduct = async(formData: FormData) => {
  try {
    const data = Object.fromEntries( formData );
    const productParsed = productSchema.safeParse(data);

    if(!productParsed.success){
      return {
        ok: false,
        message: productParsed.error
      }
    }

    const product = productParsed.data;

    const { id, ...rest} = product;

    const prismaTx = await prisma.$transaction(async(tx) => {

      const productDB = await tx.product.upsert({
        where: {
          id: id || ''
        },
        update: {
          ...rest,
          sizes:{
            set: rest.sizes as Size[]
          },
          tags:{
            set: rest.tags.split(",").map(t => t.trim())
          },
        },
        create: {
          ...rest,
          sizes:{
            set: rest.sizes as Size[]
          },
          tags:{
            set: rest.tags.split(",").map(t => t.trim())
          },
        }
      })

      // ! Proceso de carga y guardado de imágenes...
      // * recorrer las imágenes y guardarlas
      if ( formData.getAll('images').length > 0){
        const images = await uploadImages(formData.getAll('images') as File[]);
        if( !images ){
          throw new Error('Error al cargar las imágenes')
        }
        await prisma.productImage.createMany({
          data: images.map( img => ({
            productId: productDB.id,
            url: img
          }))
        })
      }
      return {
        product: productDB
      }
    })

    // revalidatePaths
    revalidatePath('/admin/products');
    revalidatePath(`/admin/product/${ product.slug }`);
    revalidatePath(`/products/${ product.slug }`);

    return {
      ok: true,
      product: prismaTx.product,
      message: 'Producto actualizado/creado con éxito'
    }

  } catch (error: any) {
    console.log(error)
    return {
      ok: false,
      message: 'Revisar logs'
    }
  }
}

const uploadImages = async( images: File[] ) => {
  try {
    const uploadPromises = images.map( async( image ) => {
      const buffer = await image.arrayBuffer();
      const base64Image = Buffer.from(buffer).toString('base64');
      return cloudinary.uploader.upload(`data:image/png;base64,${ base64Image }`,{
        upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET ?? ''
      }).then( r => r.secure_url )
    })
    const uploadedImages = await Promise.all(uploadPromises);
    return uploadedImages
  } catch (error) {
    console.log(error)
    return null
  }
}