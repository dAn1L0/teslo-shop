'use server';
import type { Address } from "@/interfaces";
import prisma from '@/lib/prisma';



export const setUserAddress = async( address: Address, userId: string) => {
  try {
    const newAddress = await createOrReplaceAddress(address, userId)

    return {
      ok: true,
      address: newAddress
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Problemas al registrar la dirección'
    }
  }
}

const createOrReplaceAddress = async(address: Address, userId: string) => {
  try {
    const addressToSave = {
      userId: userId,
      address: address.address,
      address2: address.address2,
      city: address.city,
      countryId: address.country,
      firstName: address.firstName,
      lastName: address.lastName,
      phone: address.phone,
      postalCode: address.postalCode
    }

    const newAddress = await prisma.userAddress.upsert({
      where: {
        userId
      },
      create: addressToSave,
      update: addressToSave
    })
    return newAddress

  } catch (error) {
    console.log(error);
    throw new Error('Problemas al registrar la dirección');
  }
}