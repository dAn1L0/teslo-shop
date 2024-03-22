'use server'

import bcryptjs from 'bcryptjs';

interface Props {
  name: string
  email: string
  password: string
}

export const registerUser = async({ name, email, password }: Props) => {
  try {

    const userDB = await prisma?.user.findFirst({
      where: {
        email
      },
      select: {
        id: true
      }
    })

    if(userDB?.id) {
      return {
        ok: false,
        message: 'Usuario ya existe'
      }
    }

    const newUser = await prisma?.user.create({
      data: {
        name,
        email,
        password: bcryptjs.hashSync(password, 10)
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })

    return {
      ok: true,
      user: newUser,
      message: 'Usuario registrado'
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Error al registrar el usuario'
    }
  }
}