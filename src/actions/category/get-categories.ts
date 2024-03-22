'use server'
import prisma from '@/lib/prisma';


export const getCategories = async() => {
  try {
    const categories = await prisma.category.findMany();
    if(!categories) {
      return {
        ok: false,
        categories: [],
        message: 'No se encontraron categorías'
      }
    }
    return {
      ok: true,
      categories: categories,
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      categories: [],
      message: 'Error al obtener las categorías'
    }
  }
}