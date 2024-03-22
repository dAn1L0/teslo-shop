import { IoCartOutline } from "react-icons/io5";
import Link from 'next/link';



export default function EmptyPage() {
  return (
    <div className='flex flex-col justify-center items-center h-[800px] sm:px-10'>
      <IoCartOutline size={100} className='mx-5'/>
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-semibold">Tu carrito está vacío</h1>
        <Link
          href={'/'}
          className="btn btn-primary mt-5"
        >
          Regresar
        </Link>
      </div>
    </div>
  );
}