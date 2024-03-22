'use client';
import Link from "next/link";
import { useFormState } from "react-dom";
import { authenticate } from "@/actions";
import { IoAlertCircleOutline } from "react-icons/io5";
import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { redirect } from "next/navigation";




export const LoginForm = () => {

  const [ errorMessage, dispatch ] = useFormState(authenticate, undefined)
  // const router = useRouter()

  useEffect(() => {
    if (errorMessage === 'Success') {
      // router.replace('/')
      // redirect('/')
      window.location.replace('/')
    }
  }, [errorMessage])


  return (
    <form action={dispatch} className="flex flex-col" >
      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 border bg-gray-300 rounded mb-5"
        autoComplete="off"
        type="email"
        name="email" id="email"/>
      <label htmlFor="password">Contraseña</label>
      <input
        className="px-5 py-2 border bg-gray-300 rounded mb-5"
        type="password"
        name="password" id="password"/>
      <div className="flex h-8 items-end space-x-1 my-1">
        {(errorMessage !== 'Success' && errorMessage !== undefined) && (
          <>
            <IoAlertCircleOutline className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
      </div>
      <button
        type="submit"
        className="btn-primary">
        Ingresar
      </button>
      {/* divisor l ine */ }
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">ó</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>
      <Link
        href="/auth/new-account"
        className="btn btn-secondary text-center">
        Crear una nueva cuenta
      </Link>
    </form>
  )
}
