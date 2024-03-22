'use server'
import prisma from '@/lib/prisma';


export const removeUserAddress = async(userId: string) => {
  try {
    // const addressRemoved = {
    //   address: '',
    //   address2: '',
    //   city: '',
    //   countryId: '',
    //   firstName: '',
    //   lastName: '',
    //   phone: '',
    //   postalCode: ''
    // }
    await prisma.userAddress.delete({
      where: {
        userId
      }
    })
    return {
      ok: true,
      // address: addressRemoved
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Problemas al remover la dirección'
    }
  }
}