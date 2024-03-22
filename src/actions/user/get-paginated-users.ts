'use server';

import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import prisma from '@/lib/prisma';


export const getPaginatedUsers = async() => {
  try {
    const session = await auth()
    if( !session?.user ){
      redirect('/auth/login')
    }
    if( session.user.role !== 'admin' ){
      return {
        ok: false,
        users: [],
        message: 'No tiene permisos para realizar esta operación'
      }
    }

    const users = await prisma.user.findMany({
      orderBy: {
        name: 'asc'
      }
    })

    return {
      ok: true,
      users
    }

  } catch (error) {
    console.log(error)
    return {
      ok: false,
      users: [],
      message: 'No se encontró el usuario',
    }
  }
}
