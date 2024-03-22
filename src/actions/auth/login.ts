'use server';
import { signIn } from '@/auth.config';
import { AuthError } from 'next-auth';

// ...

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    // console.log('formData:', Object.fromEntries(formData));
    // await signIn('credentials', formData);
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false
    });

    return 'Success';

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Credenciales incorrectas';
        default:
          return 'Algo salió mal';
      }
    }
    return 'UnKnownError';
  }
}

//  ! Login After Registration
export const login = async(email: string, password: string) => {
  try {
    await signIn('credentials', {
      email,
      password
    })
    return { ok: true, message: 'Sesión iniciada' }
  } catch (error) {
    console.log('error:', error);
    return {
      ok: false,
      message: 'Error al iniciar sesión'
    }
  }
}