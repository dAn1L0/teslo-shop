'use server';
import { auth } from "@/auth.config";
import prisma from '@/lib/prisma';
import { revalidatePath } from "next/cache";



export const changeRoleUser = async(userId: string, role: string) => {
  try {

    const newRole = (role === "admin") ? "admin" : "user";

    const session = await auth();
    if( session?.user.role !== "admin" ) {
      return {
        ok: false,
        message: "No tiene permisos para realizar este cambio"
      }
    }
    if( session?.user.id === userId ) {
      return {
        ok: false,
        message: "No puede cambiar su propio rol"
      }
    }
    const user = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        role: newRole
      }
    })


    revalidatePath(`/admin/users`)

    return {
      ok: true
    }

  } catch (error: any) {
    console.log(error)
    return {
      ok: false,
      message: error.message
    }
  }
}