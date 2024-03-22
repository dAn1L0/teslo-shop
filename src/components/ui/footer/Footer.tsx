import { titleFont } from '@/config/fonts';
import Link from 'next/link';

export const Footer = () => {
  return (
    <div className="flex w-full justify-center text-xs opacity-50 mb-5">
      <Link
        href={'/'}
      >
        <span className={`${ titleFont.className } antialiased font-bold`}>Teslo </span>
        <span>&#124; Shop </span>
        <span>&copy; { new Date().getFullYear() } </span>
      </Link>
      <Link href={'/'} className='mx-3'>
        Privacidad & Legal
      </Link>
      <Link href={'/'} >
        Nuestras tiendas
      </Link>
    </div>
  )
}
