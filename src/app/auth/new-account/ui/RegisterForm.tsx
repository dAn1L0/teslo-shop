'use client';
import { login, registerUser } from "@/actions";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormInputs = {
  name: string
  email: string
  password: string
  password2: string
}

export const RegisterForm = () => {

  const [ errorMassage, setErrorMessage] = useState('')
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormInputs>()

  const onSubmit: SubmitHandler<FormInputs> = async(data) => {
    setErrorMessage('')
    const { name, email, password, password2 } = data;
    if( password !== password2 ) return;
    // console.log({ name, email, password, password2 });
    const resp = await registerUser({ name, email, password })

    if( !resp.ok ) {
      setErrorMessage(resp.message)
      return;
    };

    await login(email.toLowerCase(), password);
    window.location.replace('/')

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}  className="flex flex-col" noValidate>
      {/* name */}
      <label htmlFor="name">Nombre</label>
      {
        (errors.name?.type === "required" || errors.name?.type === "minLength") && (
          <span className="text-red-500 text-xs my-1">
            * Campo obligatorio y debe tener al menos 3 caracteres
          </span>
        )
      }
      <input
        className={
          clsx(
            "px-3 py-2 border bg-gray-300 rounded mb-2",
            {
              "border-red-500": errors.name
            }
          )
        }
        type="text" autoComplete="off" id="name" autoFocus
        {...register("name", {required: true, minLength: 3, maxLength: 20})}
      />
      {/* email */}
      <label htmlFor="email">Correo electrónico</label>
      {
        (errors.email?.type === "required" || errors.email?.type === "pattern") && (
          <span className="text-red-500 text-xs my-1">
            * Campo obligatorio y debe ser un correo válido
          </span>
        )
      }
      <input
        className={
          clsx(
            "px-3 py-2 border bg-gray-300 rounded mb-2",
            {
              "border-red-500": errors.email
            }
          )
        }
        type="email" autoComplete="off" id="email"
        {...register("email", {required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i })}
      />

      {/* contraseñas */}
      <label htmlFor="password">Contraseña</label>
      {
        (errors.password?.type === "required" || errors.password?.type === "minLength") && (
          <span className="text-red-500 text-xs my-1">
            * Campo obligatorio y debe tener al menos 6 caracteres
          </span>
        )
      }
      <input
        className={
          clsx(
            "px-3 py-2 border bg-gray-300 rounded mb-2",
            {
              "border-red-500": errors.password
            }
          )
        }
        type="password" id="password"
        {...register("password", {required: true, minLength: 6})}
      />

      <label htmlFor="password2">Confirmar contraseña</label>
      {
        (errors.password2?.type === "validate") && (
          <span className="text-red-500 text-xs my-1">
            * Las contraseñas no coinciden
          </span>
        )
      }
      <input
        className={
          clsx(
            "px-3 py-2 border bg-gray-300 rounded mb-2",
            {
              "border-red-500 border": errors.password2?.type === 'validate' ? true : false
            }
          )
        }
        type="password" id="password2"
        {...register("password2", { required: true,
          validate: (value) => value === watch('password') })}
      />

      {
        errorMassage && (
          <span className="text-red-500 text-xs my-1">
            {errorMassage}
          </span>
        )
      }
      <button
        type="submit"
        className="btn-primary mt-2">
        Aceptar
      </button>

      {/* divisor l ine */ }
      <div className="flex items-center my-3">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">ó</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link
        href="/auth/login"
        className="btn-secondary text-center">
        ¿Tienes una cuenta?
      </Link>
    </form>
  )
}
