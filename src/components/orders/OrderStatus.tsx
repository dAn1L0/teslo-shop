import clsx from "clsx"
import { IoCartOutline } from "react-icons/io5"

interface Props {
  isPaid: boolean
}


export const OrderStatus = ({ isPaid }: Props) => {
  return (
    <div className={
      clsx(
        'flex items-center rounded-md py-2 px-3.5 text-xs font-bold text-white mb-5',
        {
          'bg-red-500': isPaid === false,
          'bg-green-500': isPaid === true,
        }
      )
    }>
      {
        isPaid
        ? (<><IoCartOutline size={20}/><span className='ml-2'>Pagado</span></>)
        : (<><IoCartOutline size={20}/><span className='ml-2'>Pendiente de pago</span></>)
      }
    </div>
  )
}
